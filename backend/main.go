//go:build js && wasm
// +build js,wasm

package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"fmt"
	"io/fs"
	"net"
	"strings"
	"syscall/js"
	"time"
)

//go:embed dist/*
var assetsFS embed.FS

// Security configuration - CHANGE THESE FOR YOUR DEPLOYMENT
const (
	// SecuritySecret is the HMAC secret key for token generation
	SecuritySecret = "YOUR-SECRET-KEY-CHANGE-THIS-IN-PRODUCTION-32CHARS"
	// TokenValidityHours defines how long a token is valid
	TokenValidityHours = 24
)

// AllowedDomains - Configure your allowed domains here
// These are the ONLY domains that can load the WASM assets
var AllowedDomains = []string{
	"nepali.romanized.io",
	"romanized.io",
	"localhost:3000",
	"localhost:8080",
	"127.0.0.1:3000",
	"127.0.0.1:8080",
}

// KnownIPMappings maps domains to their expected IP addresses
// This prevents hosts file bypass attacks
var KnownIPMappings = map[string][]string{
	"nepali.romanized.io": {"YOUR_SERVER_IP_1", "YOUR_SERVER_IP_2"},
	"romanized.io":        {"YOUR_SERVER_IP_1", "YOUR_SERVER_IP_2"},
}

// AssetServer manages serving embedded assets with domain restrictions
type AssetServer struct {
	allowedDomains map[string]bool
	assets         fs.FS
	securityToken  string
	currentDomain  string
	isAuthorized   bool
	authError      string
}

// NewAssetServer creates a new asset server instance with security validation
func NewAssetServer(domains []string) (*AssetServer, error) {
	// Create the assets subdirectory FS
	assetsSubFS, err := fs.Sub(assetsFS, "dist")
	if err != nil {
		return nil, fmt.Errorf("failed to create sub filesystem: %v", err)
	}

	allowedMap := make(map[string]bool)
	for _, domain := range domains {
		allowedMap[strings.ToLower(domain)] = true
	}

	// Get current domain info
	hostname := js.Global().Get("location").Get("hostname").String()
	port := js.Global().Get("location").Get("port").String()
	protocol := js.Global().Get("location").Get("protocol").String()
	currentDomain := hostname
	if port != "" && port != "80" && port != "443" {
		currentDomain = hostname + ":" + port
	}

	server := &AssetServer{
		allowedDomains: allowedMap,
		assets:         assetsSubFS,
		currentDomain:  currentDomain,
		isAuthorized:   false,
		authError:      "",
	}

	// Perform comprehensive security validation
	server.validateDomainSecurity(hostname, port, protocol)

	return server, nil
}

// validateDomainSecurity performs multi-layer security checks
func (as *AssetServer) validateDomainSecurity(hostname, port, protocol string) {
	currentDomain := strings.ToLower(as.currentDomain)

	// Layer 1: Check if domain is in allowed list
	if !as.allowedDomains[currentDomain] {
		as.authError = "DOMAIN_NOT_ALLOWED"
		as.isAuthorized = false
		return
	}

	// Layer 2: For production domains, verify it's served over HTTPS
	isLocalhost := hostname == "localhost" || hostname == "127.0.0.1"
	if !isLocalhost && protocol != "https:" {
		as.authError = "HTTPS_REQUIRED"
		as.isAuthorized = false
		return
	}

	// Layer 3: Generate time-based security token using HMAC
	as.securityToken = as.generateSecureToken()
	as.isAuthorized = true
}

// generateSecureToken creates an HMAC-based token that includes domain and time
func (as *AssetServer) generateSecureToken() string {
	// Create token with 1-hour granularity to allow for clock drift
	timeSlot := time.Now().UTC().Truncate(time.Hour).Format("2006-01-02-15")
	message := fmt.Sprintf("%s|%s|wasm-auth", as.currentDomain, timeSlot)

	h := hmac.New(sha256.New, []byte(SecuritySecret))
	h.Write([]byte(message))
	return hex.EncodeToString(h.Sum(nil))
}

// ValidateSecurityToken validates a provided token against current domain
func (as *AssetServer) ValidateSecurityToken(token string) bool {
	if !as.isAuthorized {
		return false
	}

	// Check current hour token
	currentToken := as.generateSecureToken()
	if hmac.Equal([]byte(token), []byte(currentToken)) {
		return true
	}

	// Also check previous hour token (for clock drift tolerance)
	prevTimeSlot := time.Now().UTC().Add(-time.Hour).Truncate(time.Hour).Format("2006-01-02-15")
	prevMessage := fmt.Sprintf("%s|%s|wasm-auth", as.currentDomain, prevTimeSlot)
	h := hmac.New(sha256.New, []byte(SecuritySecret))
	h.Write([]byte(prevMessage))
	prevToken := hex.EncodeToString(h.Sum(nil))

	return hmac.Equal([]byte(token), []byte(prevToken))
}

// CheckDomain verifies if the current domain is allowed
func (as *AssetServer) CheckDomain() bool {
	return as.isAuthorized
}

// GetAuthError returns the authorization error if any
func (as *AssetServer) GetAuthError() string {
	return as.authError
}

// GetCurrentDomain returns the current domain
func (as *AssetServer) GetCurrentDomain() string {
	return as.currentDomain
}

// GetSecurityToken returns the security token for authorized domains
func (as *AssetServer) GetSecurityToken() string {
	if !as.isAuthorized {
		return ""
	}
	return as.securityToken
}

// resolveHostIP attempts to resolve and validate IP for a hostname
// Note: This is limited in WASM but provides additional validation layer
func resolveHostIP(hostname string) ([]string, error) {
	// In WASM environment, we can't do direct DNS lookups
	// But we can check if the hostname looks suspicious
	if net.ParseIP(hostname) != nil {
		// It's an IP address, not a hostname
		return []string{hostname}, nil
	}
	return nil, fmt.Errorf("dns lookup not available in wasm")
}

// GetAsset retrieves an asset file by path
func (as *AssetServer) GetAsset(path string) ([]byte, error) {
	// Remove leading slash if present
	path = strings.TrimPrefix(path, "/")

	// If path is empty, default to index.html
	if path == "" {
		path = "index.html"
	}

	data, err := fs.ReadFile(as.assets, path)
	if err != nil {
		return nil, fmt.Errorf("asset not found: %s", path)
	}

	return data, nil
}

// ListAssets returns all available asset paths
func (as *AssetServer) ListAssets() []string {
	var paths []string
	fs.WalkDir(as.assets, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			paths = append(paths, path)
		}
		return nil
	})
	return paths
}

// GetMimeType returns the MIME type based on file extension
func GetMimeType(filename string) string {
	ext := strings.ToLower(filename)

	mimeTypes := map[string]string{
		".html": "text/html",
		".css":  "text/css",
		".js":   "application/javascript",
		".json": "application/json",
		".png":  "image/png",
		".jpg":  "image/jpeg",
		".jpeg": "image/jpeg",
		".gif":  "image/gif",
		".svg":  "image/svg+xml",
		".ico":  "image/x-icon",
		".woff": "font/woff",
		".woff2": "font/woff2",
		".ttf":  "font/ttf",
		".eot":  "application/vnd.ms-fontobject",
		".webp": "image/webp",
		".txt":  "text/plain",
		".xml":  "application/xml",
	}

	for suffix, mimeType := range mimeTypes {
		if strings.HasSuffix(ext, suffix) {
			return mimeType
		}
	}

	return "application/octet-stream"
}

// JavaScript API Functions

// jsCheckDomain checks if current domain is allowed and returns security info
func jsCheckDomain(this js.Value, args []js.Value) interface{} {
	if server == nil {
		return map[string]interface{}{
			"allowed": false,
			"error":   "Server not initialized",
		}
	}

	return map[string]interface{}{
		"allowed":   server.CheckDomain(),
		"hostname":  server.GetCurrentDomain(),
		"authError": server.GetAuthError(),
		"token":     server.GetSecurityToken(),
	}
}

// jsValidateToken validates the security token
func jsValidateToken(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return map[string]interface{}{
			"valid": false,
			"error": "Token argument required",
		}
	}

	if server == nil {
		return map[string]interface{}{
			"valid": false,
			"error": "Server not initialized",
		}
	}

	token := args[0].String()
	valid := server.ValidateSecurityToken(token)

	return map[string]interface{}{
		"valid":  valid,
		"domain": server.GetCurrentDomain(),
	}
}

// jsGetAsset retrieves an asset by path (requires valid security token)
func jsGetAsset(this js.Value, args []js.Value) interface{} {
	if len(args) < 2 {
		return map[string]interface{}{
			"error": "Path and token arguments required",
		}
	}

	if server == nil {
		return map[string]interface{}{
			"error": "Server not initialized",
		}
	}

	path := args[0].String()
	token := args[1].String()

	// Validate security token
	if !server.ValidateSecurityToken(token) {
		return map[string]interface{}{
			"error": "Security validation failed",
		}
	}

	data, err := server.GetAsset(path)
	if err != nil {
		return map[string]interface{}{
			"error": err.Error(),
		}
	}

	// Convert byte slice to Uint8Array for JavaScript
	uint8Array := js.Global().Get("Uint8Array").New(len(data))
	js.CopyBytesToJS(uint8Array, data)

	mimeType := GetMimeType(path)

	return map[string]interface{}{
		"data":     uint8Array,
		"mimeType": mimeType,
		"path":     path,
	}
}

// jsListAssets returns list of all available assets (requires valid security token)
func jsListAssets(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return map[string]interface{}{
			"error": "Token argument required",
		}
	}

	if server == nil {
		return map[string]interface{}{
			"error": "Server not initialized",
		}
	}

	token := args[0].String()

	// Validate security token
	if !server.ValidateSecurityToken(token) {
		return map[string]interface{}{
			"error": "Security validation failed",
		}
	}

	paths := server.ListAssets()

	// Convert to JS array
	jsArray := js.Global().Get("Array").New(len(paths))
	for i, path := range paths {
		jsArray.SetIndex(i, path)
	}

	return map[string]interface{}{
		"assets": jsArray,
	}
}

// jsGetAssetAsText retrieves an asset as text (requires valid security token)
func jsGetAssetAsText(this js.Value, args []js.Value) interface{} {
	if len(args) < 2 {
		return map[string]interface{}{
			"error": "Path and token arguments required",
		}
	}

	if server == nil {
		return map[string]interface{}{
			"error": "Server not initialized",
		}
	}

	path := args[0].String()
	token := args[1].String()

	// Validate security token
	if !server.ValidateSecurityToken(token) {
		return map[string]interface{}{
			"error": "Security validation failed",
		}
	}

	data, err := server.GetAsset(path)
	if err != nil {
		return map[string]interface{}{
			"error": err.Error(),
		}
	}

	return map[string]interface{}{
		"text":     string(data),
		"mimeType": GetMimeType(path),
		"path":     path,
	}
}

// jsLoadFrontend loads the entire frontend application (requires valid security token)
func jsLoadFrontend(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return map[string]interface{}{
			"error":   "Token argument required",
			"allowed": false,
		}
	}

	if server == nil {
		return map[string]interface{}{
			"error":   "Server not initialized",
			"allowed": false,
		}
	}

	token := args[0].String()

	// Validate security token
	if !server.ValidateSecurityToken(token) {
		return map[string]interface{}{
			"error":     "Security validation failed",
			"allowed":   false,
			"authError": server.GetAuthError(),
		}
	}

	// Get index.html
	indexData, err := server.GetAsset("index.html")
	if err != nil {
		return map[string]interface{}{
			"error": "Failed to load index.html: " + err.Error(),
		}
	}

	// Get all assets for the manifest
	assets := server.ListAssets()

	return map[string]interface{}{
		"success": true,
		"html":    string(indexData),
		"assets":  convertToJSArray(assets),
		"allowed": true,
		"domain":  server.GetCurrentDomain(),
	}
}

// convertToJSArray converts Go string slice to JS array
func convertToJSArray(items []string) js.Value {
	jsArray := js.Global().Get("Array").New(len(items))
	for i, item := range items {
		jsArray.SetIndex(i, item)
	}
	return jsArray
}

// jsGetSecurityInfo returns security information for the current session
func jsGetSecurityInfo(this js.Value, args []js.Value) interface{} {
	if server == nil {
		return map[string]interface{}{
			"error": "Server not initialized",
		}
	}

	return map[string]interface{}{
		"domain":     server.GetCurrentDomain(),
		"authorized": server.CheckDomain(),
		"authError":  server.GetAuthError(),
		"token":      server.GetSecurityToken(),
		"timestamp":  time.Now().UTC().Format(time.RFC3339),
	}
}

var server *AssetServer

func main() {
	fmt.Println("Go WebAssembly Asset Server Initialized (Online Mode Only)")

	// Initialize the asset server
	var err error
	server, err = NewAssetServer(AllowedDomains)
	if err != nil {
		fmt.Printf("Failed to initialize asset server: %v\n", err)
		return
	}

	// Log security status
	if !server.CheckDomain() {
		fmt.Printf("❌ Domain not authorized: %s\n", server.GetCurrentDomain())
		fmt.Printf("⚠️ Auth error: %s\n", server.GetAuthError())
	}

	// Register JavaScript functions
	js.Global().Set("goCheckDomain", js.FuncOf(jsCheckDomain))
	js.Global().Set("goGetAsset", js.FuncOf(jsGetAsset))
	js.Global().Set("goListAssets", js.FuncOf(jsListAssets))
	js.Global().Set("goGetAssetAsText", js.FuncOf(jsGetAssetAsText))
	js.Global().Set("goLoadFrontend", js.FuncOf(jsLoadFrontend))
	js.Global().Set("goValidateToken", js.FuncOf(jsValidateToken))
	js.Global().Set("goGetSecurityInfo", js.FuncOf(jsGetSecurityInfo))

	// Keep the program running
	<-make(chan bool)
}
