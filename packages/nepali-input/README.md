# @oarkflow/nepali-input

Headless Devanagari input components with instant romanized-to-script transliteration for Nepali, Hindi, Marathi, Sanskrit, and other Devanagari languages.

## Features

- **Headless Architecture**: Framework-agnostic core with optional DOM adapters
- **Instant Conversion**: Real-time character-by-character transliteration as you type
- **Bidirectional**: Roman → Devanagari and Devanagari → Roman conversion
- **Language Profiles**: Tuned common-word behavior for Nepali, Hindi, Marathi, Sanskrit, Maithili, Newari, Dogri, Bodo, Konkani, Kashmiri, and Sindhi
- **Extended Romanization**: Optional scholarly and Vedic symbols for advanced transliteration workflows
- **Custom Dictionaries**: Override or extend word-level mappings with your own `customWordMap`
- **Zero Dependencies**: Lightweight and self-contained
- **Customizable**: Full control over behavior and styling
- **ESM & CJS**: Modern ES modules with CommonJS fallback
- **TypeScript**: Full type definitions included
- **1,225+ Lexicon**: Accurate proper nouns (cities, districts, names)

## Installation

```bash
npm install @oarkflow/nepali-input
# or
pnpm add @oarkflow/nepali-input
# or
yarn add @oarkflow/nepali-input
```

## Quick Start

### Vanilla JavaScript - DOM Adapters

```javascript
import { createNepaliInput, createNepaliTextarea, createNepaliConverter } from '@oarkflow/nepali-input'

// Single-line input
const input = createNepaliInput('#my-input', {
  useDevanagariDigits: true,
  language: 'nepali',
  onInput: (value) => console.log('Current:', value)
})

// Multi-line textarea
const textarea = createNepaliTextarea('#my-textarea', {
  useDevanagariDigits: true,
  language: 'hindi'
})

// Converter with copy button
const converter = createNepaliConverter(
  '#input-textarea',
  '#output-div',
  '#copy-button',
  {
    useDevanagariDigits: true,
    language: 'generic',
    debounceMs: 300
  }
)
```

### Headless Core (Framework Integration)

```javascript
import { NepaliIMECore, NepaliConverterCore } from '@oarkflow/nepali-input'

// IME for character-by-character conversion
const imeCore = new NepaliIMECore({
  useDevanagariDigits: true,
  language: 'nepali',
  onStateChange: (state) => {
    console.log('Output:', state.output)
  }
})

// Handle keyboard input
const handled = imeCore.handleKey('n', { ctrl: false, alt: false, meta: false })

// Converter for block text with debouncing
const converterCore = new NepaliConverterCore({
  useDevanagariDigits: true,
  language: 'hindi',
  debounceMs: 300,
  onInput: (input, output) => console.log('Converting...'),
  onChange: (input, output) => console.log('Done:', output)
})

converterCore.setInput('namaste')
```

## Framework Wrappers

For React, Vue, Svelte, and Angular, use the dedicated wrapper packages:

- **React**: `@oarkflow/nepali-react`
- **Vue**: `@oarkflow/nepali-vue`
- **Svelte**: `@oarkflow/nepali-svelte`
- **SolidJS**: `@oarkflow/nepali-solid`
- **Angular**: `@oarkflow/nepali-angular`

## API Documentation

### NepaliIMECore

```typescript
interface NepaliIMECoreOptions {
  useDevanagariDigits?: boolean
  language?: 'generic' | 'nepali' | 'hindi' | 'marathi' | 'sanskrit' | 'maithili' | 'newari' | 'dogri' | 'bodo' | 'konkani' | 'kashmiri' | 'sindhi'
  enableExtendedRomanization?: boolean
  customWordMap?: Record<string, string>
  onStateChange?: (state: IMEState) => void
}

interface IMEState {
  romanBuffer: string[]
  currentWord: string
  output: string
  cursorPosition: number
}

class NepaliIMECore {
  constructor(options: NepaliIMECoreOptions)

  handleKey(key: string, modifiers: KeyModifiers): boolean
  insertText(text: string): void
  deleteCharacter(): void
  clear(): void
  setValue(value: string): void
  getValue(): string
  getState(): IMEState
  setUseDevanagariDigits(value: boolean): void
  setLanguage(value: DevanagariLanguage): void
}
```

### NepaliConverterCore

```typescript
interface NepaliConverterCoreOptions {
  useDevanagariDigits?: boolean
  bidirectional?: boolean
  debounceMs?: number
  language?: 'generic' | 'nepali' | 'hindi' | 'marathi' | 'sanskrit' | 'maithili' | 'newari' | 'dogri' | 'bodo' | 'konkani' | 'kashmiri' | 'sindhi'
  enableExtendedRomanization?: boolean
  customWordMap?: Record<string, string>
  onInput?: (input: string, output: string) => void
  onChange?: (input: string, output: string) => void
}

class NepaliConverterCore {
  constructor(options: NepaliConverterCoreOptions)

  setInput(text: string): void
  getOutput(): string
  setDirection(direction: 'toNepali' | 'toRoman'): void
  toggleDirection(): void
  getDirection(): 'toNepali' | 'toRoman'
  setUseDevanagariDigits(value: boolean): void
  getUseDevanagariDigits(): boolean
  setLanguage(value: DevanagariLanguage): void
  getLanguage(): DevanagariLanguage
  clear(): void
}
```

### DOM Adapters

```typescript
// createNepaliInput / createNepaliTextarea
function createNepaliInput(
  element: HTMLInputElement | string,
  options?: {
    useDevanagariDigits?: boolean
    autoConvert?: boolean
    language?: 'generic' | 'nepali' | 'hindi' | 'marathi' | 'sanskrit' | 'maithili' | 'newari' | 'dogri' | 'bodo' | 'konkani' | 'kashmiri' | 'sindhi'
    enableExtendedRomanization?: boolean
    customWordMap?: Record<string, string>
    onInput?: (value: string) => void
    onChange?: (value: string) => void
  }
): NepaliInputInstance

interface NepaliInputInstance {
  enable(): void
  disable(): void
  clear(): void
  setValue(value: string): void
  getValue(): string
  getCore(): NepaliIMECore
  destroy(): void
}

// createNepaliConverter
function createNepaliConverter(
  inputElement: HTMLTextAreaElement | string,
  outputElement: HTMLElement | string,
  copyButton?: HTMLButtonElement | string,
  options?: {
    useDevanagariDigits?: boolean
    bidirectional?: boolean
    debounceMs?: number
    language?: 'generic' | 'nepali' | 'hindi' | 'marathi' | 'sanskrit' | 'maithili' | 'newari' | 'dogri' | 'bodo' | 'konkani' | 'kashmiri' | 'sindhi'
    enableExtendedRomanization?: boolean
    customWordMap?: Record<string, string>
    onInput?: (input: string, output: string) => void
    onChange?: (input: string, output: string) => void
  }
): NepaliConverterInstance

interface NepaliConverterInstance {
  setInput(text: string): void
  getOutput(): string
  setDirection(direction: 'toNepali' | 'toRoman'): void
  toggleDirection(): void
  clear(): void
  getCore(): NepaliConverterCore
  destroy(): void
}
```

## Transliteration Rules

### Language Profiles
- `generic`: broad Devanagari defaults with shared common-word support
- `nepali`: prioritizes Nepali-friendly common words like `tapai`, `hajur`, `nepali`
- `hindi`: adds Hindi-oriented words like `aap`, `main`, `nahin`, `hindi`
- `marathi`: includes words like `tumhi`, `ahe`, `marathi`
- `sanskrit`: includes words like `namah`, `samskritam`, `shantih`
- `maithili`, `newari`, `dogri`, `bodo`, `konkani`, `kashmiri`, `sindhi`: use the shared Devanagari engine with language-specific word overrides where available

```ts
import { transliterate, reverseTransliterate } from '@oarkflow/nepali-input'

transliterate('aap kaise hain', { language: 'hindi' })
transliterate('tumhi kase aahat', { language: 'marathi' })
reverseTransliterate('संस्कृतम्', { language: 'sanskrit' })
```

### Reverse Phonology

Reverse transliteration now applies light language-aware phonology on top of the base character mapping:

- `hindi` and `dogri`: final schwa deletion plus a small consonant-cluster schwa rule
- `marathi` and `konkani`: final schwa deletion only
- `generic`, `nepali`, and `sanskrit`: keep more phonetic `a` vowels by default

```ts
reverseTransliterate('धर्म', { language: 'hindi' })   // dharm
reverseTransliterate('धर्म', { language: 'sanskrit' }) // dharma
reverseTransliterate('विक्रम', { language: 'hindi' }) // vikram
```

### Vowels
- Short: `a` → अ, `i` → इ, `u` → उ
- Long: `aa` → आ, `ee` → ई, `oo` → ऊ
- Combined: `ai` → ऐ, `au` → औ
- Vocalic: `ri` → ऋ, `ree` → ॠ

### Consonants
- Basic: `k` → क, `g` → ग, `ch` → च, `j` → ज
- Aspirated: `kh` → ख, `gh` → घ, `chh` → छ, `jh` → झ
- Special: `sh` → श, `Sh` → ष, `gy` → ज्ञ

### Consonant Clusters
Use `^` to drop inherent vowel:
- `k^sha` → क्ष
- `g^ya` → ग्य
- `pr^` → प्र

### Diacritics
- `m~` → ं (anusvara)
- `n~` → ँ (chandrabindu)
- `h~` → ः (visarga)

### Punctuation
- `.` or `|` → । (danda)
- `||` → ॥ (double danda)

### Extended Scholarly Romanization

Set `enableExtendedRomanization: true` when you want access to advanced Vedic and scholarly symbols. This keeps everyday phonetic typing safe by default while still allowing specialized transliteration workflows when needed.

```ts
transliterate('va', { enableExtendedRomanization: false }) // व
transliterate('va', { enableExtendedRomanization: true })  // Vedic tone mark
```

### Custom Word Maps

Use `customWordMap` to force preferred spellings or add domain-specific vocabulary.

```ts
transliterate('romanized rocks', {
  language: 'generic',
  customWordMap: {
    romanized: 'रोमनाइज्ड',
    rocks: 'रक्स'
  }
})
```

## License

MIT © Oarkflow

## Contributing

Contributions welcome! Please see the monorepo root for contribution guidelines.

## Testing

```bash
pnpm --filter @oarkflow/nepali-input test
# or from the repo root
pnpm test:core
```

Fixture files live in `test/fixtures/`, and the per-language lexicons now live in `src/language-data/` so you can expand dictionaries without editing the transliteration engine directly.
