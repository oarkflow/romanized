# Nepali Input - Feature Requirements & Implementation Plan

## Project Vision
Create the most comprehensive, accessible, and developer-friendly Nepali input system supporting multiple frameworks, transliteration schemes, and use cases.

---

## Phase 1: Core Character Support (Priority: CRITICAL)

### 1.1 Missing Devanagari Characters

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 2-4 hours

**Missing Characters:**
- [ ] Candra E (ॅ) - For English loanwords
  - Input: `e^` or `eN` → ॅ
  - Example: `cafe` → कॅफे, `batumane` → बटुमॅने

- [ ] Avagraha (ऽ) - Sanskrit word separator
  - Input: `.a` or `'` → ऽ
  - Example: `so'ham` → सोऽहम्

- [ ] Nukta (़) - For Urdu/Persian loanwords
  - Input: `qa` → क़, `kha` → ख़, `za` → ज़, `fa` → फ़
  - Examples: `qalam` → क़लम, `zaroorat` → ज़रूरत, `faida` → फ़ाइदा

- [ ] Vocalic L (ऌ, ॡ) - Sanskrit vowels
  - Input: `lri` → ऌ, `lree` → ॡ
  - Example: `klripta` → क्लृप्त

- [ ] Long Vocalic R (ॠ)
  - Input: `rri` or `R` → ॠ
  - Example: `deerghaa` → दीर्घॠ

**Implementation:**
- Add to `transliterate.ts` character maps
- Update lexicon for common loanwords
- Add examples to README

---

## Phase 2: Alternative Transliteration Schemes (Priority: HIGH)

### 2.1 IAST (International Alphabet of Sanskrit Transliteration)

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 8-12 hours

**Requirements:**
- [ ] Support diacritical marks input
  - ā ī ū ṛ ṝ ḷ ḹ → आ ई ऊ ऋ ॠ ऌ ॡ
  - ṅ ñ ṭ ḍ ṇ ś ṣ → ङ ञ ट ड ण श ष
  - ṃ ḥ → ं ः

- [ ] Input methods:
  - Unicode diacritics (copy-paste)
  - Compose key sequences
  - Alternative ASCII notation (aa → ā, .m → ṃ)

- [ ] Bidirectional conversion:
  - IAST → Devanagari
  - Devanagari → IAST

**Implementation:**
- New file: `src/schemes/iast.ts`
- Add scheme selector UI
- Update `transliterate.ts` to support multiple schemes

### 2.2 ISO 15919 (International Standard)

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 4-6 hours

**Requirements:**
- [ ] ISO standard diacritics support
- [ ] Documentation for differences from IAST
- [ ] Scheme switcher in UI

### 2.3 Harvard-Kyoto Notation

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 4-6 hours

**Requirements:**
- [ ] ASCII-only input (A, I, U, R, RR, lR, etc.)
- [ ] Case-sensitive (R=ऋ, r=र)
- [ ] Common in academic LaTeX documents

### 2.4 Velthuis Notation

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 4-6 hours

**Requirements:**
- [ ] LaTeX-friendly notation
- [ ] Dot-prefix system (.n → ङ)

### 2.5 SLP1 (Sanskrit Library Phonetic Basic)

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 4-6 hours

**Requirements:**
- [ ] Single ASCII character per Devanagari character
- [ ] Used by Sanskrit computational linguistics

**Implementation Plan:**
- Create `src/schemes/` directory
- Abstract transliteration engine
- Pluggable scheme architecture
- UI scheme selector dropdown

---

## Phase 3: Intelligent Features (Priority: HIGH)

### 3.1 Auto-suggestions / Autocomplete

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 12-16 hours

**Requirements:**
- [ ] Suggest completions as user types
- [ ] Frequency-based ranking
- [ ] Dictionary of 10,000+ common words
- [ ] Arrow keys to navigate suggestions
- [ ] Tab/Enter to accept

**Data Sources:**
- Nepali word frequency corpus
- Common phrases database
- User's typing history (localStorage)

**UI:**
```
Input: namas|
Suggestions:
  1. namaste (नमस्ते)
  2. namaskar (नमस्कार)
  3. namastey (नमस्ते)
```

**Implementation:**
- New file: `src/autocomplete.ts`
- Trie data structure for fast prefix search
- Integration with lexicon
- Debounced suggestion updates

### 3.2 Auto-correction

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 8-10 hours

**Requirements:**
- [ ] Correct common romanization variants
  - `namasthe` → `namaste`
  - `katmandu` → `Kathmandu`
  - `ccha` → `chha`
  - `bhannu` → `bhanu`

- [ ] Configurable (enable/disable)
- [ ] Show suggestion before applying
- [ ] Learn from user corrections

**Implementation:**
- Common mistake dictionary
- Levenshtein distance algorithm
- User preference storage

### 3.3 Context-aware Conversion

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 8-12 hours

**Requirements:**
- [ ] Detect English vs Nepali words
- [ ] Mixed language text support
- [ ] Preserve English words in output

**Examples:**
```
Input: "I ate momo yesterday"
Output: "I ate मोमो yesterday"

Input: "Install via npm install package"
Output: "Install via npm install package" (no conversion)
```

**Implementation:**
- English dictionary check
- Word-level language detection
- Configurable conversion mode (all/nepali-only/manual)

### 3.4 Spell Checker

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 16-20 hours

**Requirements:**
- [ ] Mark incorrect Nepali words
- [ ] Suggest corrections
- [ ] Dictionary lookup (50,000+ words)
- [ ] Visual indicators (red underline)
- [ ] Right-click context menu

**Implementation:**
- Nepali dictionary database
- Hunspell-compatible format
- ContentEditable integration
- Custom context menu

---

## Phase 4: Editor Features (Priority: HIGH)

### 4.1 Undo/Redo

**Status:** Not Implemented  
**Priority:** CRITICAL  
**Effort:** 4-6 hours

**Requirements:**
- [ ] Ctrl+Z / Cmd+Z - Undo
- [ ] Ctrl+Y / Cmd+Y - Redo
- [ ] Ctrl+Shift+Z - Redo (alternative)
- [ ] History stack (100 states)
- [ ] Preserve cursor position

**Implementation:**
- History manager class
- State snapshots
- Event listener integration

### 4.2 Find and Replace

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 8-10 hours

**Requirements:**
- [ ] Find text (Ctrl+F)
- [ ] Replace single instance
- [ ] Replace all instances
- [ ] Case-sensitive option
- [ ] Regex support
- [ ] Highlight matches

**UI:**
```
Find:    [ram        ] [Next] [Previous]
Replace: [राम        ] [Replace] [Replace All]
☐ Case sensitive  ☐ Regex
```

### 4.3 Keyboard Shortcuts

**Status:** Partial (Some shortcuts exist)  
**Priority:** HIGH  
**Effort:** 6-8 hours

**Requirements:**
- [ ] Ctrl+Space - Toggle conversion mode
- [ ] Ctrl+D - Toggle digit format
- [ ] Ctrl+Shift+C - Copy output
- [ ] Alt+← / Alt+→ - Switch direction
- [ ] Ctrl+L - Clear all
- [ ] Ctrl+A - Select all
- [ ] Ctrl+/ - Show shortcuts help
- [ ] F1 - Show help/tutorial

**Implementation:**
- Keyboard event manager
- Shortcut registry
- Help modal with shortcut list
- Configurable shortcuts (future)

### 4.4 Character Palette/Picker

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 10-12 hours

**Requirements:**
- [ ] Visual Devanagari keyboard layout
- [ ] Click to insert character
- [ ] Show romanization hint on hover
- [ ] Organized by categories (vowels, consonants, etc.)
- [ ] Search characters
- [ ] Recent characters history

**UI:**
```
[Vowels] [Consonants] [Diacritics] [Numbers] [Symbols]

अ आ इ ई उ ऊ ए ऐ ओ औ ऋ
(Hover shows: "Type: a aa i ee u oo...")
```

---

## Phase 5: Multi-format Support (Priority: MEDIUM)

### 5.1 Multiple Output Formats

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 6-8 hours

**Requirements:**
- [ ] Unicode Devanagari (default)
- [ ] IAST romanization
- [ ] ISO 15919 romanization
- [ ] Harvard-Kyoto
- [ ] IPA (International Phonetic Alphabet)
- [ ] Format selector dropdown

**Implementation:**
- Format converters for each scheme
- Output preview panel
- Copy in selected format

### 5.2 Batch File Conversion

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 8-10 hours

**Requirements:**
- [ ] Upload .txt file
- [ ] Convert entire content
- [ ] Download as .txt
- [ ] Download as .docx (with formatting)
- [ ] Progress indicator
- [ ] Max file size: 10MB

**Implementation:**
- File upload API
- Stream processing for large files
- docx library integration
- Download manager

### 5.3 Export Options

**Status:** Partial (Copy exists)  
**Priority:** MEDIUM  
**Effort:** 6-8 hours

**Requirements:**
- [ ] Copy as plain text (exists)
- [ ] Copy as HTML (preserves formatting)
- [ ] Copy as Markdown
- [ ] Export to PDF
- [ ] Share via URL (text in hash)
- [ ] Download as file

**Implementation:**
- Clipboard API enhancements
- PDF generation (jsPDF)
- URL encoding/decoding
- Share button with link

---

## Phase 6: Platform Integration (Priority: HIGH)

### 6.1 Browser Extension

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 20-30 hours

**Requirements:**
- [ ] Chrome/Edge extension
- [ ] Firefox extension
- [ ] Convert in any text field
- [ ] Right-click context menu
- [ ] Popup interface
- [ ] Settings sync

**Features:**
- Inject into contentEditable
- Gmail/WhatsApp Web integration
- Keyboard shortcut activation
- Offline support

**Implementation:**
- Manifest V3
- Content scripts
- Background service worker
- Options page

### 6.2 VS Code Extension

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 15-20 hours

**Requirements:**
- [ ] Real-time conversion in editor
- [ ] Command palette integration
- [ ] Status bar indicator
- [ ] Configurable file types
- [ ] Snippet support

**Implementation:**
- VS Code Extension API
- Language server (optional)
- WebView for UI
- Settings contribution

### 6.3 REST API

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 12-16 hours

**Requirements:**
- [ ] RESTful endpoints
- [ ] Rate limiting
- [ ] API key authentication
- [ ] Documentation (OpenAPI)
- [ ] Multiple schemes support

**Endpoints:**
```
POST /api/v1/transliterate
{
  "text": "namaste",
  "from": "roman",
  "to": "devanagari",
  "scheme": "default"
}

Response:
{
  "input": "namaste",
  "output": "नमस्ते",
  "scheme": "default",
  "alternatives": ["namastey", "namaskar"]
}
```

**Implementation:**
- Express.js or Fastify
- Deploy on Vercel/Railway
- Redis for rate limiting
- Swagger UI

### 6.4 Mobile Keyboard (Android/iOS)

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 60-80 hours (per platform)

**Requirements:**
- [ ] System-wide keyboard
- [ ] Swipe typing (Android)
- [ ] Predictive text
- [ ] Emoji support
- [ ] Themes

**Implementation:**
- Android: Kotlin + InputMethodService
- iOS: Swift + Custom Keyboard Extension
- Shared core (via Rust/WebAssembly)

---

## Phase 7: Advanced Features (Priority: LOW)

### 7.1 Voice Input

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 20-30 hours

**Requirements:**
- [ ] Speech recognition
- [ ] Nepali language support
- [ ] Real-time transcription
- [ ] Voice commands

**Implementation:**
- Web Speech API
- Google Cloud Speech-to-Text
- Fallback for browser compatibility

### 7.2 OCR Support

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 25-35 hours

**Requirements:**
- [ ] Upload image with Devanagari text
- [ ] Extract text via OCR
- [ ] Convert to romanized
- [ ] Edit extracted text

**Implementation:**
- Tesseract.js with Devanagari training
- Canvas manipulation
- Image preprocessing

### 7.3 Live Collaboration

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 40-50 hours

**Requirements:**
- [ ] Real-time co-editing
- [ ] User cursors/selections
- [ ] Chat/comments
- [ ] Conflict resolution

**Implementation:**
- WebSocket (Socket.io)
- Operational Transform or CRDT
- User presence system

### 7.4 Cloud Sync

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 20-25 hours

**Requirements:**
- [ ] Save documents to cloud
- [ ] Google Drive integration
- [ ] Dropbox integration
- [ ] Access from any device

**Implementation:**
- OAuth 2.0
- Cloud storage APIs
- Sync conflict resolution

---

## Phase 8: UI/UX Enhancements (Priority: MEDIUM)

### 8.1 Theme Customization

**Status:** Partial (Dark theme exists)  
**Priority:** MEDIUM  
**Effort:** 8-10 hours

**Requirements:**
- [ ] Light theme
- [ ] Dark theme (exists)
- [ ] High contrast theme
- [ ] Custom color picker
- [ ] Font family selector
- [ ] Font size adjustment
- [ ] Theme persistence

### 8.2 Layout Options

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 6-8 hours

**Requirements:**
- [ ] Split view (side-by-side)
- [ ] Stacked view (top-bottom)
- [ ] Fullscreen mode (F11)
- [ ] Distraction-free writing
- [ ] Resizable panels

### 8.3 Accessibility

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 12-16 hours

**Requirements:**
- [ ] ARIA labels for all controls
- [ ] Screen reader support
- [ ] Keyboard-only navigation
- [ ] Focus indicators
- [ ] High contrast mode
- [ ] Reduced motion option
- [ ] WCAG 2.1 AA compliance

**Testing:**
- NVDA screen reader
- JAWS screen reader
- VoiceOver (macOS/iOS)
- axe DevTools

### 8.4 Multi-language Interface

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 10-12 hours

**Requirements:**
- [ ] UI in Nepali
- [ ] UI in English (default)
- [ ] UI in Hindi
- [ ] Context-sensitive help
- [ ] i18n framework

**Implementation:**
- i18next or vue-i18n
- Translation files
- Language selector

### 8.5 Tutorial/Onboarding

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 8-10 hours

**Requirements:**
- [ ] First-time user guide
- [ ] Interactive tooltips
- [ ] Example templates
- [ ] Video tutorials
- [ ] Skip option

**Implementation:**
- Intro.js or Shepherd.js
- Tutorial steps
- Progress tracking

### 8.6 Statistics & Analytics

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 6-8 hours

**Requirements:**
- [ ] Word count (Nepali/English/Total)
- [ ] Character count
- [ ] Typing speed (WPM)
- [ ] Most used characters
- [ ] Session time
- [ ] Export statistics

### 8.7 Templates & Presets

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 4-6 hours

**Requirements:**
- [ ] Letter templates
- [ ] Poetry templates
- [ ] Common phrases
- [ ] User-created templates
- [ ] Template library

---

## Phase 9: Performance & Technical (Priority: HIGH)

### 9.1 WebAssembly Implementation

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 30-40 hours

**Requirements:**
- [ ] 10x faster transliteration
- [ ] Large file processing
- [ ] Compile core to WASM (Rust/C++)
- [ ] JS fallback

**Benefits:**
- Near-native performance
- Handle 1MB+ documents
- Real-time conversion

### 9.2 Progressive Web App (PWA)

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 8-12 hours

**Requirements:**
- [ ] Service worker for offline support
- [ ] App manifest
- [ ] Installable on desktop/mobile
- [ ] Push notifications (updates)
- [ ] Background sync

**Implementation:**
- Workbox for service worker
- manifest.json
- Icons (192x192, 512x512)
- Update notifications

### 9.3 Performance Optimization

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 10-12 hours

**Requirements:**
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Virtual scrolling (long documents)
- [ ] Debounced updates (exists)
- [ ] Web Workers for processing
- [ ] Lighthouse score 90+

### 9.4 Testing Suite

**Status:** Not Implemented  
**Priority:** HIGH  
**Effort:** 20-30 hours

**Requirements:**
- [ ] Unit tests (Vitest)
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests
- [ ] Coverage > 80%

**Test Cases:**
- Character conversion accuracy
- Edge cases (empty, special chars)
- Performance benchmarks
- Cross-browser compatibility

---

## Phase 10: Community & Ecosystem (Priority: MEDIUM)

### 10.1 Messaging Platform Bots

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 8-10 hours per platform

**Telegram Bot:**
```
@NepaliInputBot namaste → नमस्ते
```

**Discord Bot:**
```
!np namaste → नमस्ते
```

**WhatsApp Bot** (via Twilio)

**Slack Bot**

### 10.2 CMS Integrations

**Status:** Not Implemented  
**Priority:** LOW  
**Effort:** 10-15 hours per integration

**WordPress Plugin:**
- Visual editor integration
- Gutenberg block
- Settings page

**Drupal Module**

**Joomla Extension**

### 10.3 Office Suite Add-ins

**Status:** Not Implemented  
**Priority:** MEDIUM  
**Effort:** 20-25 hours per platform

**Microsoft Word Add-in:**
- Office.js API
- Ribbon button
- Task pane

**Google Docs Add-on:**
- Apps Script
- Sidebar UI
- Menu integration

**LibreOffice Extension**

---

## Implementation Priority Matrix

### Phase 1 (Weeks 1-2): Foundation
1. Missing characters (Nukta, Candra E, etc.)
2. Undo/Redo functionality
3. Keyboard shortcuts
4. PWA setup
5. Testing suite foundation

### Phase 2 (Weeks 3-4): Intelligence
1. Auto-suggestions/Autocomplete
2. IAST scheme support
3. Context-aware conversion
4. Character palette
5. Find and replace

### Phase 3 (Weeks 5-6): Integration
1. Browser extension (Chrome)
2. REST API
3. Batch file conversion
4. Export options (PDF, HTML)
5. Multi-format output

### Phase 4 (Weeks 7-8): Enhancement
1. Spell checker
2. Auto-correction
3. VS Code extension
4. Accessibility improvements
5. Theme customization

### Phase 5 (Weeks 9-10): Expansion
1. Alternative schemes (Harvard-Kyoto, ISO 15919)
2. Mobile keyboard (Android)
3. Layout options
4. Statistics & analytics
5. Tutorial/onboarding

### Phase 6+ (Weeks 11+): Advanced
1. WebAssembly optimization
2. Voice input
3. OCR support
4. Live collaboration
5. Cloud sync

---

## Success Metrics

### User Engagement
- [ ] 1,000+ daily active users
- [ ] 10,000+ monthly active users
- [ ] Average session time > 5 minutes
- [ ] Return rate > 40%

### Performance
- [ ] Lighthouse score 90+
- [ ] First Contentful Paint < 1s
- [ ] Time to Interactive < 2s
- [ ] Conversion latency < 50ms

### Quality
- [ ] Test coverage > 80%
- [ ] Zero critical bugs
- [ ] WCAG 2.1 AA compliance
- [ ] Cross-browser support (Chrome, Firefox, Safari, Edge)

### Adoption
- [ ] 500+ GitHub stars
- [ ] 50+ npm weekly downloads per package
- [ ] 10+ community contributors
- [ ] Documentation viewed 1,000+ times/month

---

## Technical Stack

### Core
- TypeScript
- Vite (build tool)
- Vitest (testing)
- Playwright (E2E)

### Frameworks
- React 18
- Vue 3
- Svelte 5
- Angular 19

### Performance
- WebAssembly (Rust/C++)
- Web Workers
- Service Workers

### API
- Express.js / Fastify
- Redis (rate limiting)
- PostgreSQL (user data)

### Deployment
- Vercel (web app)
- Railway (API)
- Chrome Web Store (extension)
- npm (packages)

---

## Documentation Requirements

- [ ] API documentation (OpenAPI/Swagger)
- [ ] Component API docs (Storybook)
- [ ] Developer guide
- [ ] User guide (multi-language)
- [ ] Video tutorials
- [ ] FAQ
- [ ] Changelog
- [ ] Migration guides

---

## Risk Assessment

### Technical Risks
- **WebAssembly compatibility** - Fallback to JS required
- **Mobile keyboard approval** - App store review process
- **API rate limiting** - Need CDN/caching strategy
- **CORS issues** - Proxy or serverless functions

### Resource Risks
- **Time commitment** - 500+ hours total
- **Maintenance burden** - Multiple platforms
- **Testing complexity** - Cross-platform/browser
- **Documentation** - Keep up-to-date

### Mitigation Strategies
- Incremental rollout
- Automated testing
- Community involvement
- Sponsor/funding model

---

**Document Version:** 1.0  
**Last Updated:** January 27, 2026  
**Next Review:** February 15, 2026
