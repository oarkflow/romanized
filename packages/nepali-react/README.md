# @oarkflow/nepali-react

React components for Nepali input with instant romanized-to-Devanagari transliteration.

## Installation

```bash
npm install @oarkflow/nepali-react
# or
pnpm add @oarkflow/nepali-react
# or
yarn add @oarkflow/nepali-react
```

## Components

### NepaliInput

Single-line input with instant conversion as you type.

```tsx
import { NepaliInput } from '@oarkflow/nepali-react'

function App() {
  const [value, setValue] = useState('')

  return (
    <NepaliInput
      value={value}
      onChange={setValue}
      placeholder="Type in romanized Nepali..."
      className="my-input"
    />
  )
}
```

### NepaliTextarea

Multi-line textarea with instant conversion.

```tsx
import { NepaliTextarea } from '@oarkflow/nepali-react'

function App() {
  return (
    <NepaliTextarea
      placeholder="Write your story..."
      rows={10}
      onChange={(value) => console.log(value)}
    />
  )
}
```

### NepaliConverter

Input/Output pair with copy button for converting paragraphs.

```tsx
import { NepaliConverter } from '@oarkflow/nepali-react'

function App() {
  return (
    <NepaliConverter
      showCopyButton={true}
      debounceMs={300}
      onChange={(input, output) => console.log({ input, output })}
    />
  )
}
```

## API

### NepaliInput Props

```typescript
interface NepaliInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
  useDevanagariDigits?: boolean
}
```

### NepaliTextarea Props

```typescript
interface NepaliTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
  useDevanagariDigits?: boolean
}
```

### NepaliConverter Props

```typescript
interface NepaliConverterProps {
  value?: string
  onChange?: (input: string, output: string) => void
  onInput?: (input: string, output: string) => void
  useDevanagariDigits?: boolean
  debounceMs?: number
  showCopyButton?: boolean
  direction?: 'toNepali' | 'toRoman'
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
  outputProps?: HTMLAttributes<HTMLDivElement>
  className?: string
}
```

### Ref Methods

All components support ref forwarding with these methods:

```typescript
// NepaliInput & NepaliTextarea
interface NepaliInputRef {
  clear: () => void
  setValue: (value: string) => void
  getValue: () => string
  getCore: () => NepaliIMECore | null
}

// NepaliConverter
interface NepaliConverterRef {
  clear: () => void
  getOutput: () => string
  setDirection: (direction: 'toNepali' | 'toRoman') => void
  toggleDirection: () => void
  getCore: () => NepaliConverterCore | null
}
```

### Usage with Ref

```tsx
import { useRef } from 'react'
import { NepaliInput } from '@oarkflow/nepali-react'
import type { NepaliInputRef } from '@oarkflow/nepali-react'

function App() {
  const inputRef = useRef<NepaliInputRef>(null)

  return (
    <>
      <NepaliInput ref={inputRef} />
      <button onClick={() => inputRef.current?.clear()}>Clear</button>
      <button onClick={() => console.log(inputRef.current?.getValue())}>
        Get Value
      </button>
    </>
  )
}
```

## License

MIT © Oarkflow
