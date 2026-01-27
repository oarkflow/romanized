# Nepali Input Components 🇳🇵

Lightweight, performant TypeScript components for typing Nepali (Devanagari) text using romanized input. Built with zero dependencies and optimized for real-time conversion.

## Features

✨ **Instant Conversion** - Type in romanized Nepali and see Devanagari appear in real-time
⚡ **Lightweight** - Zero dependencies, minimal overhead
🎯 **Type-Safe** - Full TypeScript support
🔧 **Configurable** - Control digit conversion, callbacks, and behavior
📦 **Reusable** - Works with any `<input>` or `<textarea>`
⌨️ **Smart Input** - Preserves Ctrl+A, Ctrl+C, Ctrl+V and other keyboard shortcuts

## Quick Start

### Installation

```bash
# Clone or download the repository
git clone <repository-url>
cd romanized

# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

### Basic Usage

#### NepaliInput Component

```typescript
import { createNepaliInput } from './nepali-input'

// Create from selector
const input = createNepaliInput('#my-input', {
  useDevanagariDigits: true,
  autoConvert: true
})

// Or from element reference
const inputElement = document.querySelector('input')
const input = createNepaliInput(inputElement)
```

#### NepaliTextarea Component

```typescript
import { createNepaliTextarea } from './nepali-textarea'

// Create from selector
const textarea = createNepaliTextarea('#my-textarea', {
  useDevanagariDigits: true,
  autoConvert: true,
  onInput: (value) => {
    console.log('Current value:', value)
  }
})
```

### HTML Setup

```html
<input type="text" id="my-input" placeholder="Type in romanized Nepali..." />
<textarea id="my-textarea" rows="5"></textarea>

<script type="module">
  import { createNepaliInput, createNepaliTextarea } from './src/index'

  createNepaliInput('#my-input')
  createNepaliTextarea('#my-textarea')
</script>
```

## API Reference

### NepaliInput / NepaliTextarea Options

```typescript
interface NepaliInputOptions {
  // Use Nepali digits (०-९) instead of Latin digits (0-9)
  useDevanagariDigits?: boolean  // default: true

  // Enable automatic conversion as you type
  autoConvert?: boolean  // default: true

  // Callback fired on every input change
  onInput?: (value: string) => void

  // Callback fired when input loses focus
  onChange?: (value: string) => void
}
```

### Instance Methods

```typescript
// Enable/disable conversion
input.enable()
input.disable()
input.isEnabled()  // returns boolean

// Set/get value
input.setValue('namaste')
input.getValue()  // returns current value

// Clear input
input.clear()

// Update options
input.setOptions({ useDevanagariDigits: false })

// Clean up event listeners
input.destroy()
```

## Transliteration Rules

### Vowels
| Roman | Nepali | Example |
|-------|--------|---------|
| a | अ | **a**m → अम |
| aa, A | आ | **aa**m → आम |
| i | इ | **i**ndia → इन्डिया |
| ii, I, ee | ई | **ii**maandaar → ईमान्दार |
| u | उ | **u**phar → उफार |
| uu, U, oo | ऊ | **uu**n → ऊन |
| ri, R | ऋ | **ri**shi → ऋषि |
| e | ए | **e**k → एक |
| ai | ऐ | **ai**tbaar → ऐतबार |
| o | ओ | **o**ral → ओरल |
| au | औ | **au**raat → औरात |

### Consonants
| Roman | Nepali | Example |
|-------|--------|---------|
| k | क | **k**aam → काम |
| kh | ख | **kh**aana → खाना |
| g | ग | **g**eet → गीत |
| gh | घ | **gh**ar → घर |
| ch | च | **ch**iya → चिया |
| chh | छ | **chh**ori → छोरी |
| j | ज | **j**aan → जान |
| jh | झ | **jh**yaal → झ्याल |
| t | ट | **t**ekaa → टेका |
| th | ठ | **th**egaanaa → ठेगाना |
| d | ड | **d**aaktar → डाक्टर |
| dh | ढ | **dh**okaa → ढोका |
| N | ण | **N**amaste → णमस्ते |
| t | त | **t**apaai → तपाई |
| th | थ | **th**aahaa → थाहा |
| d | द | **d**esh → देश |
| dh | ध | **dh**an → धन |
| n | न | **n**aam → नाम |
| p | प | **p**aani → पानी |
| ph, f | फ | **ph**ool → फूल |
| b | ब | **b**ihaan → बिहान |
| bh | भ | **bh**aara → भारा |
| m | म | **m**aanchhe → मान्छे |
| y | य | **y**ahaa ~ → यहाँ |
| r | र | **r**aat → रात |
| l | ल | **l**aamo → लामो |
| w, v | व | **w**idesh → विदेश |
| sh | श | **sh**aanti → शान्ति |
| shh | ष | **shh**at → षट् |
| s | स | **s**aathi → साथी |
| h | ह | **h**aami → हामी |
| ksh, x | क्ष | **ksh**etra → क्षेत्र |
| tr | त्र | **tr**aya → त्रय |
| gy | ज्ञ | **gy**aan → ज्ञान |

### Special Characters
| Roman | Nepali | Description |
|-------|--------|-------------|
| ~ | ँ | Chandrabindu |
| M | ं | Anusvara |
| H | ः | Visarga |
| . or \| | । | Danda (full stop) |
| 0-9 | ०-९ | Nepali digits (when enabled) |

### Conjuncts (Automatic Halant)
Type consonants together naturally:
- **namaste** → नमस्ते
- **dharma** → धर्म
- **swasthya** → स्वास्थ्य
- **prakriti** → प्रकृति

## Examples

### Enable/Disable Based on User Preference

```typescript
const input = createNepaliInput('#my-input')
const toggleButton = document.querySelector('#toggle-nepali')

toggleButton.addEventListener('click', () => {
  if (input.isEnabled()) {
    input.disable()
    toggleButton.textContent = 'Enable Nepali'
  } else {
    input.enable()
    toggleButton.textContent = 'Disable Nepali'
  }
})
```

### Form Integration

```typescript
const form = document.querySelector('form')
const nameInput = createNepaliInput('#name')
const addressTextarea = createNepaliTextarea('#address')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = {
    name: nameInput.getValue(),
    address: addressTextarea.getValue()
  }

  console.log('Form data:', data)
  // Send to server...
})
```

### Dynamic Digit Toggle

```typescript
const input = createNepaliInput('#my-input', {
  useDevanagariDigits: true
})

const digitToggle = document.querySelector('#digit-toggle')

digitToggle.addEventListener('change', (e) => {
  input.setOptions({
    useDevanagariDigits: e.target.checked
  })
})
```

## Performance

Both components are optimized for performance:

- **Lazy rendering**: Only updates DOM when necessary
- **Efficient state management**: Minimal memory overhead
- **Debounced callbacks**: Prevents excessive function calls
- **No external dependencies**: Zero bundle bloat
- **Tree-shakeable**: Import only what you need

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES6+ support

## Building for Production

```bash
# Build optimized bundle
pnpm run build

# Output will be in dist/ folder
```

## License

MIT License - feel free to use in your projects!

## Credits

Built with ❤️ for the Nepali developer community.

---

**Need help?** Open an issue or check the [examples](./src/main.ts) in the source code.
