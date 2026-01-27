# 🆕 New Features Guide

## Table of Contents
1. [Undo/Redo System](#undoredo-system)
2. [Autocomplete](#autocomplete)
3. [Keyboard Shortcuts](#keyboard-shortcuts)
4. [IAST Transliteration](#iast-transliteration)
5. [Character Palette](#character-palette)
6. [Missing Characters](#missing-characters)

---

## Undo/Redo System

### Overview
Full history management with smart state merging and configurable size.

### Usage
```typescript
import { HistoryManager } from '@verishore/nepali-input'

const history = new HistoryManager({ 
  maxHistory: 100,  // Keep last 100 states (default)
  mergeDelay: 300   // Merge states within 300ms (default)
})

// Push state
history.push({
  sourceText: 'namaste',
  targetText: 'नमस्ते',
  cursorPosition: 7
})

// Undo/Redo
if (history.canUndo()) {
  const prevState = history.undo()
}

if (history.canRedo()) {
  const nextState = history.redo()
}

// Jump to specific point
history.jumpTo(5) // Go to 5th state
```

### Integration with IME
```typescript
const ime = new NepaliIMECore({
  enableHistory: true,
  maxHistory: 50
})

// Shortcuts work automatically
// Ctrl+Z → undo
// Ctrl+Y → redo  
// Ctrl+Shift+Z → redo
```

---

## Autocomplete

### Overview
Trie-based word suggestion system with learning capabilities.

### Usage
```typescript
import { AutocompleteManager, COMMON_WORDS } from '@verishore/nepali-input'

const autocomplete = new AutocompleteManager({
  maxSuggestions: 5,  // Return top 5 matches (default)
  minScore: 0         // Minimum score threshold
})

// Add common words (70+ included)
autocomplete.addWords(COMMON_WORDS)

// Add custom words
autocomplete.addWords([
  { roman: 'school', devanagari: 'स्कूल', frequency: 80 },
  { roman: 'computer', devanagari: 'कम्प्युटर', frequency: 75 }
])

// Get suggestions
const suggestions = autocomplete.getSuggestions('nam')
// Returns: [
//   { roman: 'namaste', devanagari: 'नमस्ते', score: 100 },
//   { roman: 'namaskar', devanagari: 'नमस्कार', score: 95 }
// ]

// Record user selection (learns preference)
autocomplete.recordSelection('namaste')

// Export/import history for persistence
const history = autocomplete.exportHistory()
localStorage.setItem('autocomplete', JSON.stringify(history))
autocomplete.importHistory(JSON.parse(localStorage.getItem('autocomplete')))
```

### Included Common Words
- **Greetings:** namaste, dhanyabad, namaskar
- **Pronouns:** ma, tapai, timro, hamro
- **Verbs:** huncha, cha, garnu, jannu
- **Family:** aama, buwa, didi, bhai
- **Cities:** Kathmandu, Pokhara, Lalitpur
- **Question words:** kasto, kahile, kaha

---

## Keyboard Shortcuts

### Overview
Centralized keyboard shortcut management with platform detection.

### Usage
```typescript
import { KeyboardShortcutManager, createDefaultShortcuts } from '@verishore/nepali-input'

const shortcuts = new KeyboardShortcutManager()

// Add default shortcuts (15 included)
const defaults = createDefaultShortcuts(ime)
defaults.forEach(shortcut => shortcuts.register(shortcut))

// Custom shortcut
shortcuts.register({
  key: 'k',
  ctrl: true,
  shift: true,
  handler: () => console.log('Custom shortcut'),
  description: 'My custom action',
  category: 'editing'
})

// Handle events
element.addEventListener('keydown', (e) => {
  if (shortcuts.handleEvent(e)) {
    e.preventDefault() // Shortcut was handled
  }
})

// Get all shortcuts by category
const editingShortcuts = shortcuts.getShortcutsByCategory('editing')

// Display shortcut (platform-aware)
const display = shortcuts.getShortcutDisplay(shortcut)
// Mac: "⌘Z"
// Windows: "Ctrl+Z"
```

### Default Shortcuts

#### Editing
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo
- **Ctrl+L** - Clear input

#### Conversion
- **Ctrl+Space** - Toggle mode
- **Ctrl+D** - Toggle digits

#### Search
- **Ctrl+F** - Find
- **Ctrl+H** - Find & replace

#### Help
- **Ctrl+/** - Show shortcuts
- **F1** - Help

#### Clipboard
- **Ctrl+Shift+C** - Copy

#### File
- **Ctrl+S** - Save

#### Navigation
- **Escape** - Cancel
- **Alt+←** - Previous mode
- **Alt+→** - Next mode

---

## IAST Transliteration

### Overview
Academic standard romanization with diacritical marks.

### Usage
```typescript
import { 
  iastToDevanagari, 
  devanagariToIAST,
  IAST_TO_DEVANAGARI,
  DEVANAGARI_TO_IAST
} from '@verishore/nepali-input'

// Convert IAST to Devanagari
iastToDevanagari('namaḥ')      // → नमः
iastToDevanagari('śānti')      // → शान्ति
iastToDevanagari('kṛṣṇa')      // → कृष्ण
iastToDevanagari('saṃskṛtam')  // → संस्कृतम्

// Convert Devanagari to IAST
devanagariToIAST('योगः')       // → yogaḥ
devanagariToIAST('धर्मः')      // → dharmaḥ

// Use ASCII alternatives
iastToDevanagari('kr.s.na')    // → कृष्ण (using .r .s)
iastToDevanagari('sama~na')    // → समञ (using ~n)
```

### IAST Characters

| IAST | ASCII Alt | Devanagari | Description |
|------|-----------|------------|-------------|
| ā | aa | आ/ा | Long a |
| ī | ii | ई/ी | Long i |
| ū | uu | ऊ/ू | Long u |
| ṛ | .r | ऋ/ृ | Vocalic r |
| ṝ | .rr | ॠ/ॄ | Long vocalic r |
| ḷ | .l | ऌ/ॢ | Vocalic l |
| ḹ | .ll | ॡ/ॣ | Long vocalic l |
| ṅ | .n | ङ | Velar nasal |
| ñ | ~n | ञ | Palatal nasal |
| ṭ | .t | ट | Retroflex t |
| ḍ | .d | ड | Retroflex d |
| ṇ | .n | ण | Retroflex n |
| ś | .s | श | Palatal s |
| ṣ | s. | ष | Retroflex s |
| ṃ | .m | ं | Anusvara |
| ḥ | .h | ः | Visarga |

### Demo
Try the interactive IAST demo: [demos/iast-demo.html](demos/iast-demo.html)

---

## Character Palette

### Overview
Organized access to all 109 Devanagari characters with search.

### Usage
```typescript
import { CharacterPaletteManager, CHARACTER_CATEGORIES } from '@verishore/nepali-input'

const palette = new CharacterPaletteManager({
  showRomanization: true,
  showUnicode: false,
  maxRecent: 20,
  onSelect: (char) => {
    console.log(`Selected: ${char.char} (${char.name})`)
    insertText(char.char)
  }
})

// Get all categories (7 total)
const categories = palette.getCategories()
// Returns: vowels, consonants, matras, diacritics, nukta, digits, symbols

// Get characters by category
const vowels = palette.getCategoryCharacters('vowels')
// Returns: [{ char: 'अ', name: 'a', romanization: 'a', unicode: 'U+0905' }, ...]

// Search characters
const results = palette.search('nukta')
// Returns all nukta characters: क़ ख़ ग़ ज़ etc.

results = palette.search('ka')
// Returns: क ख ग घ (all ka-varga)

// Record selection (adds to recent)
palette.selectCharacter({ 
  char: 'ॐ', 
  name: 'Om', 
  romanization: 'om', 
  unicode: 'U+0950' 
})

// Get recent characters
const recent = palette.getRecentCharacters()

// Get character info
const info = palette.getCharacterInfo('ॐ')
// Returns: { char: 'ॐ', name: 'Om', romanization: 'om', unicode: 'U+0950' }
```

### Categories

1. **Vowels (स्वर)** - 15 characters
   - Independent vowels: अ आ इ ई उ ऊ ए ऐ ओ औ
   - Vocalic: ऋ ॠ ऌ ॡ
   - Candra E: ऍ

2. **Consonants (व्यञ्जन)** - 33 characters
   - Velars: क ख ग घ ङ
   - Palatals: च छ ज झ ञ
   - Retroflex: ट ठ ड ढ ण
   - Dentals: त थ द ध न
   - Labials: प फ ब भ म
   - Semivowels: य र ल व
   - Sibilants: श ष स ह

3. **Vowel Diacritics (मात्रा)** - 13 matras
   - ा ि ी ु ू ृ ॄ ॢ ॣ े ै ो ौ

4. **Diacritical Marks** - 5 marks
   - ं (anusvara), ः (visarga), ँ (chandrabindu), ् (halant), ़ (nukta)

5. **Nukta Characters** - 8 characters
   - क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़

6. **Devanagari Digits** - 10 numerals
   - ० १ २ ३ ४ ५ ६ ७ ८ ९

7. **Special Symbols** - 5 symbols
   - । (danda), ॥ (double danda), ॐ (om), ऽ (avagraha), ॰ (abbreviation)

### Demo
Try the interactive palette: [demos/character-palette-demo.html](demos/character-palette-demo.html)

---

## Missing Characters

### Overview
8 previously missing Devanagari characters now supported.

### Added Characters

| Character | Roman | Unicode | Description |
|-----------|-------|---------|-------------|
| ॠ | rri, R | U+0960 | Long vocalic R |
| ऌ | lri | U+090C | Vocalic L |
| ॡ | lree | U+0961 | Long vocalic L |
| ॅ | e^, eN | U+090D | Candra E |
| क़ | qa | U+0958 | Qa (nukta) |
| ज़ | za | U+095B | Za (nukta) |
| फ़ | fa | U+095E | Fa (nukta) |
| ऽ | .a, ' | U+093D | Avagraha |
| ॐ | om | U+0950 | Om symbol |

### Usage
```typescript
import { transliterate } from '@verishore/nepali-input'

transliterate('rri')   // → ॠ
transliterate('lri')   // → ऌ
transliterate('e^')    // → ॅ
transliterate('qa')    // → क़
transliterate('za')    // → ज़
transliterate('fa')    // → फ़
transliterate('.a')    // → ऽ
transliterate('om')    // → ॐ
```

---

## Migration Guide

### From v0.x to v1.0

All existing APIs remain unchanged. New features are opt-in:

```typescript
// Old code still works
const ime = new NepaliIMECore()

// New features are optional
const ime = new NepaliIMECore({
  enableHistory: true,        // NEW: Undo/redo
  enableAutocomplete: true,   // NEW: Suggestions
  scheme: 'iast'              // NEW: IAST scheme
})
```

No breaking changes! ✅

---

## Performance

| Feature | Overhead | Notes |
|---------|----------|-------|
| **History** | ~0.1ms per push | Smart merging minimizes memory |
| **Autocomplete** | O(m) lookup | Trie ensures fast prefix search |
| **Shortcuts** | O(1) handler | HashMap-based registration |
| **IAST** | Same as default | Greedy matching, no regex |
| **Palette** | O(1) category | O(log n) search with index |

---

## Examples

### Complete IME Setup
```typescript
import {
  NepaliIMECore,
  AutocompleteManager,
  KeyboardShortcutManager,
  CharacterPaletteManager,
  createDefaultShortcuts,
  COMMON_WORDS
} from '@verishore/nepali-input'

// Initialize IME
const ime = new NepaliIMECore({
  enableHistory: true,
  enableAutocomplete: true,
  scheme: 'default' // or 'iast'
})

// Setup autocomplete
const autocomplete = new AutocompleteManager()
autocomplete.addWords(COMMON_WORDS)

// Setup shortcuts
const shortcuts = new KeyboardShortcutManager()
createDefaultShortcuts(ime).forEach(s => shortcuts.register(s))

// Setup character palette
const palette = new CharacterPaletteManager({
  onSelect: (char) => ime.insertText(char.char)
})

// Wire up events
input.addEventListener('keydown', (e) => {
  if (shortcuts.handleEvent(e)) {
    e.preventDefault()
    return
  }
  ime.handleKey(e.key, { ctrl: e.ctrlKey, shift: e.shiftKey })
})
```

---

## FAQ

**Q: Can I disable new features?**  
A: Yes! All features are opt-in via constructor options.

**Q: What's the bundle size impact?**  
A: ~32 KB uncompressed, ~7 KB gzipped for all features.

**Q: Does IAST replace the default scheme?**  
A: No, both coexist. Use `scheme: 'iast'` to switch.

**Q: Can I customize autocomplete words?**  
A: Yes! Use `addWords()` to add custom entries.

**Q: Are keyboard shortcuts configurable?**  
A: Yes! Use `register()` to add/override shortcuts.

---

## Support

- 📖 [Full Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/verishore/nepali-input/issues)
- 💬 [Discussions](https://github.com/verishore/nepali-input/discussions)

---

**Version:** 1.0.0  
**Last Updated:** January 2025
