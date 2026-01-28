#!/bin/bash

# Build script for Go WASM Asset Server
# This script builds the WASM module and copies necessary files

set -e  # Exit on error

echo "🚀 Building Go WebAssembly Asset Server..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go 1.21 or later."
    exit 1
fi

echo -e "${BLUE}Go version:${NC}"
go version
echo ""

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}⚠️  Warning: 'dist' directory not found.${NC}"
    echo "Creating sample dist directory..."
    mkdir -p dist
    echo "Please add your React/Vue/frontend build output to the 'dist/' directory."
    echo ""
fi

# Count files in dist
ASSET_COUNT=$(find dist -type f 2>/dev/null | wc -l)
echo -e "${BLUE}dist found:${NC} $ASSET_COUNT files"
echo ""

# Build the WASM module
echo -e "${BLUE}Building WASM module...${NC}"
GOOS=js GOARCH=wasm go build -ldflags="-s -w" -trimpath -buildvcs=false -o app.wasm main.go

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ WASM build successful!${NC}"

    # Get file size
    WASM_SIZE=$(du -h app.wasm | cut -f1)
    echo -e "${BLUE}WASM file size:${NC} $WASM_SIZE"
else
    echo "❌ WASM build failed!"
    exit 1
fi

echo ""

# Copy wasm_exec.js
echo -e "${BLUE}Copying wasm_exec.js...${NC}"
GOROOT=$(go env GOROOT)
WASM_EXEC="$GOROOT/lib/wasm/wasm_exec.js"

if [ -f "$WASM_EXEC" ]; then
    cp "$WASM_EXEC" .
    echo -e "${GREEN}✅ wasm_exec.js copied${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Could not find wasm_exec.js${NC}"
    echo "You may need to copy it manually from: $GOROOT/misc/wasm/wasm_exec.js"
fi

# Copy service-worker.js to root for deployment
echo ""
echo -e "${BLUE}Copying service-worker.js...${NC}"
if [ -f "service-worker.js" ]; then
    echo -e "${GREEN}✅ service-worker.js ready${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: service-worker.js not found${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Build complete!${NC}"
echo ""
echo "Files created:"
echo "  • app.wasm"
echo "  • wasm_exec.js"
echo "  • service-worker.js (for offline support)"
echo ""
echo "To test locally, run:"
echo -e "  ${BLUE}python3 -m http.server 8080${NC}"
echo "  or"
echo -e "  ${BLUE}npx serve -p 8080${NC}"
echo ""
echo "Then visit: http://localhost:8080"
echo ""
echo "To deploy, upload these files to your hosting:"
echo "  • app.wasm"
echo "  • wasm_exec.js"
echo "  • index.html"
echo "  • service-worker.js (enables offline mode)"
echo ""
