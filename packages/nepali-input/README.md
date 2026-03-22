# @oarkflow/nepali-input

Headless Nepali input components with instant romanized-to-Devanagari transliteration.

## Features

- **Headless Architecture**: Framework-agnostic core with optional DOM adapters
- **Instant Conversion**: Real-time character-by-character transliteration as you type
- **Bidirectional**: Roman → Nepali and Nepali → Roman conversion
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
  onInput: (value) => console.log('Current:', value)
})

// Multi-line textarea
const textarea = createNepaliTextarea('#my-textarea', {
  useDevanagariDigits: true
})

// Converter with copy button
const converter = createNepaliConverter(
  '#input-textarea',
  '#output-div',
  '#copy-button',
  {
    useDevanagariDigits: true,
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
  onStateChange: (state) => {
    console.log('Output:', state.output)
  }
})

// Handle keyboard input
const handled = imeCore.handleKey('n', { ctrl: false, alt: false, meta: false })

// Converter for block text with debouncing
const converterCore = new NepaliConverterCore({
  useDevanagariDigits: true,
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
- **Angular**: `@oarkflow/nepali-angular`

## API Documentation

### NepaliIMECore

```typescript
interface NepaliIMECoreOptions {
  useDevanagariDigits?: boolean
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
}
```

### NepaliConverterCore

```typescript
interface NepaliConverterCoreOptions {
  useDevanagariDigits?: boolean
  bidirectional?: boolean
  debounceMs?: number
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

## License

MIT © Oarkflow

## Contributing

Contributions welcome! Please see the monorepo root for contribution guidelines.
