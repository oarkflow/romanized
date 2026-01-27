# Framework Integration Examples

The Nepali Input components are built with a **headless architecture** that separates logic from UI. This makes them framework-agnostic and easy to integrate with any JavaScript framework.

## Architecture

- **`NepaliIMECore`**: Headless IME engine for character-by-character input
- **`NepaliConverterCore`**: Headless converter for full text block conversion
- **`NepaliInput`** & **`NepaliTextarea`**: Vanilla JS IME adapters
- **`NepaliConverter`**: Vanilla JS converter adapter (input → output with copy)
- **`NepaliInputBase`**: Base class for custom adapters

## Components Overview

### IME Components (Instant Character Conversion)
- **NepaliInput**: Single-line input with instant conversion as you type
- **NepaliTextarea**: Multi-line textarea with instant conversion

### Converter Component (Block Text Conversion)
- **NepaliConverter**: Input/Output pair with copy button for converting paragraphs of text

## Vanilla JavaScript

### IME Input (Character-by-character)

```javascript
import { createNepaliInput, createNepaliTextarea } from 'romanized'

// Single-line input
const input = createNepaliInput('#my-input', {
  useDevanagariDigits: true,
  onInput: (value) => console.log('Current:', value),
  onChange: (value) => console.log('Final:', value)
})

// Multi-line textarea
const textarea = createNepaliTextarea('#my-textarea', {
  useDevanagariDigits: true
})
```

### Converter (Block text conversion)

```javascript
import { createNepaliConverter } from 'romanized'

// HTML structure:
// <textarea id="input"></textarea>
// <div id="output"></div>
// <button id="copy-btn">Copy</button>

const converter = createNepaliConverter(
  '#input',      // Input textarea
  '#output',     // Output display (div, pre, or textarea)
  '#copy-btn',   // Copy button (optional)
  {
    useDevanagariDigits: true,
    debounceMs: 300,
    onInput: (input, output) => console.log('Converting...'),
    onChange: (input, output) => console.log('Conversion complete')
  }
)

// Control methods
converter.setDirection('toNepali')  // or 'toRoman' for reverse
converter.toggleDirection()         // Switch direction
converter.clear()                   // Clear both input and output
converter.getOutput()               // Get converted text
```

## React

### Wrapper Components (Recommended)

Create reusable wrapper components that work like native React components:

#### NepaliInput Wrapper

```tsx
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { NepaliIMECore } from 'romanized'

interface NepaliInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
  useDevanagariDigits?: boolean
}

export interface NepaliInputRef {
  clear: () => void
  setValue: (value: string) => void
  getValue: () => string
  getCore: () => NepaliIMECore | null
}

export const NepaliInput = forwardRef<NepaliInputRef, NepaliInputProps>(
  ({ value, onChange, onInput, useDevanagariDigits = true, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || '')
    const coreRef = useRef<NepaliIMECore | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      coreRef.current = new NepaliIMECore({
        useDevanagariDigits,
        onStateChange: (state) => {
          setInternalValue(state.output)
          onInput?.(state.output)
          onChange?.(state.output)
        }
      })

      return () => {
        coreRef.current = null
      }
    }, [useDevanagariDigits])

    // Sync external value changes
    useEffect(() => {
      if (value !== undefined && value !== internalValue) {
        coreRef.current?.setValue(value)
        setInternalValue(value)
      }
    }, [value])

    useImperativeHandle(ref, () => ({
      clear: () => coreRef.current?.clear(),
      setValue: (val: string) => coreRef.current?.setValue(val),
      getValue: () => coreRef.current?.getValue() || '',
      getCore: () => coreRef.current
    }))

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!coreRef.current) return

      const hasSelection = inputRef.current!.selectionStart !== inputRef.current!.selectionEnd
      if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault()
        coreRef.current.clear()
        return
      }

      const handled = coreRef.current.handleKey(e.key, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey
      })

      if (handled) e.preventDefault()
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!coreRef.current) return
      e.preventDefault()
      const text = e.clipboardData.getData('text/plain')
      coreRef.current.insertText(text)
    }

    return (
      <input
        {...props}
        ref={inputRef}
        type="text"
        value={internalValue}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={(e) => {
          if (e.target.value === '') {
            coreRef.current?.clear()
          }
        }}
        className={className}
        lang="ne"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    )
  }
)

NepaliInput.displayName = 'NepaliInput'
```

#### NepaliTextarea Wrapper

```tsx
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { NepaliIMECore } from 'romanized'

interface NepaliTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  onInput?: (value: string) => void
  useDevanagariDigits?: boolean
}

export interface NepaliTextareaRef {
  clear: () => void
  setValue: (value: string) => void
  getValue: () => string
  getCore: () => NepaliIMECore | null
}

export const NepaliTextarea = forwardRef<NepaliTextareaRef, NepaliTextareaProps>(
  ({ value, onChange, onInput, useDevanagariDigits = true, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || '')
    const coreRef = useRef<NepaliIMECore | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      coreRef.current = new NepaliIMECore({
        useDevanagariDigits,
        onStateChange: (state) => {
          setInternalValue(state.output)
          onInput?.(state.output)
          onChange?.(state.output)
        }
      })

      return () => {
        coreRef.current = null
      }
    }, [useDevanagariDigits])

    useEffect(() => {
      if (value !== undefined && value !== internalValue) {
        coreRef.current?.setValue(value)
        setInternalValue(value)
      }
    }, [value])

    useImperativeHandle(ref, () => ({
      clear: () => coreRef.current?.clear(),
      setValue: (val: string) => coreRef.current?.setValue(val),
      getValue: () => coreRef.current?.getValue() || '',
      getCore: () => coreRef.current
    }))

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!coreRef.current) return

      const hasSelection = textareaRef.current!.selectionStart !== textareaRef.current!.selectionEnd
      if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault()
        coreRef.current.clear()
        return
      }

      const handled = coreRef.current.handleKey(e.key, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey
      })

      if (handled) e.preventDefault()
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      if (!coreRef.current) return
      e.preventDefault()
      const text = e.clipboardData.getData('text/plain')
      coreRef.current.insertText(text)
    }

    return (
      <textarea
        {...props}
        ref={textareaRef}
        value={internalValue}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={(e) => {
          if (e.target.value === '') {
            coreRef.current?.clear()
          }
        }}
        className={className}
        lang="ne"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    )
  }
)

NepaliTextarea.displayName = 'NepaliTextarea'
```

#### NepaliConverter Wrapper

```tsx
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { NepaliConverterCore } from 'romanized'

interface NepaliConverterProps {
  value?: string
  onChange?: (input: string, output: string) => void
  onInput?: (input: string, output: string) => void
  useDevanagariDigits?: boolean
  debounceMs?: number
  showCopyButton?: boolean
  direction?: 'toNepali' | 'toRoman'
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
  outputProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
}

export interface NepaliConverterRef {
  clear: () => void
  getOutput: () => string
  setDirection: (direction: 'toNepali' | 'toRoman') => void
  toggleDirection: () => void
  getCore: () => NepaliConverterCore | null
}

export const NepaliConverter = forwardRef<NepaliConverterRef, NepaliConverterProps>(
  ({
    value,
    onChange,
    onInput,
    useDevanagariDigits = true,
    debounceMs = 300,
    showCopyButton = true,
    direction = 'toNepali',
    inputProps = {},
    outputProps = {},
    className = ''
  }, ref) => {
    const [input, setInput] = useState(value || '')
    const [output, setOutput] = useState('')
    const [copied, setCopied] = useState(false)
    const coreRef = useRef<NepaliConverterCore | null>(null)

    useEffect(() => {
      coreRef.current = new NepaliConverterCore({
        useDevanagariDigits,
        debounceMs,
        bidirectional: true,
        onInput: (inputText, outputText) => {
          setOutput(outputText)
          onInput?.(inputText, outputText)
        },
        onChange: (inputText, outputText) => {
          onChange?.(inputText, outputText)
        }
      })

      coreRef.current.setDirection(direction)

      return () => {
        coreRef.current = null
      }
    }, [useDevanagariDigits, debounceMs])

    useEffect(() => {
      if (value !== undefined && value !== input) {
        setInput(value)
        coreRef.current?.setInput(value)
      }
    }, [value])

    useImperativeHandle(ref, () => ({
      clear: () => {
        coreRef.current?.clear()
        setInput('')
        setOutput('')
      },
      getOutput: () => coreRef.current?.getOutput() || '',
      setDirection: (dir: 'toNepali' | 'toRoman') => coreRef.current?.setDirection(dir),
      toggleDirection: () => coreRef.current?.toggleDirection(),
      getCore: () => coreRef.current
    }))

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setInput(newValue)
      coreRef.current?.setInput(newValue)
    }

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    return (
      <div className={`nepali-converter ${className}`}>
        <div className="input-section">
          <label>Romanized Input</label>
          <textarea
            {...inputProps}
            value={input}
            onChange={handleInputChange}
            placeholder="Type in romanized Nepali..."
            rows={6}
          />
        </div>

        <div className="output-section">
          <label>Nepali Output</label>
          <div {...outputProps} className={`output-display ${outputProps.className || ''}`} lang="ne">
            {output || 'देवनागरी परिणाम यहाँ देखिन्छ'}
          </div>
          {showCopyButton && (
            <button onClick={handleCopy} disabled={!output}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>
    )
  }
)

NepaliConverter.displayName = 'NepaliConverter'
```

#### Usage Example

```tsx
import { useRef } from 'react'
import { NepaliInput, NepaliTextarea, NepaliConverter } from './components/nepali'
import type { NepaliInputRef, NepaliConverterRef } from './components/nepali'

function App() {
  const inputRef = useRef<NepaliInputRef>(null)
  const converterRef = useRef<NepaliConverterRef>(null)

  return (
    <div>
      {/* Simple usage */}
      <NepaliInput
        placeholder="Type in Nepali..."
        onChange={(value) => console.log('Changed:', value)}
        className="my-input"
      />

      {/* Controlled component */}
      <NepaliInput
        value={controlledValue}
        onChange={setControlledValue}
        useDevanagariDigits={false}
      />

      {/* With ref for imperative methods */}
      <NepaliInput
        ref={inputRef}
        onChange={(value) => console.log(value)}
      />
      <button onClick={() => inputRef.current?.clear()}>Clear</button>

      {/* Textarea */}
      <NepaliTextarea
        rows={10}
        placeholder="Write your story..."
        onChange={(value) => console.log(value)}
        className="my-textarea"
      />

      {/* Converter */}
      <NepaliConverter
        ref={converterRef}
        onChange={(input, output) => console.log({ input, output })}
        showCopyButton={true}
        debounceMs={200}
      />
      <button onClick={() => converterRef.current?.toggleDirection()}>
        Toggle Direction
      </button>
    </div>
  )
}
```

### Core Headless Usage (Advanced)

For advanced use cases where you need full control:

```tsx
import { useState, useEffect, useRef } from 'react'
import { NepaliIMECore, NepaliConverterCore } from 'romanized'

function CustomNepaliInput() {
  const [value, setValue] = useState('')
  const coreRef = useRef<NepaliIMECore | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    coreRef.current = new NepaliIMECore({
      useDevanagariDigits: true,
      onStateChange: (state) => {
        setValue(state.output)
      }
    })

    return () => {
      coreRef.current = null
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!coreRef.current) return

    const hasSelection = inputRef.current!.selectionStart !== inputRef.current!.selectionEnd
    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      coreRef.current.clear()
      return
    }

    const handled = coreRef.current.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (!coreRef.current) return
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    coreRef.current.insertText(text)
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={(e) => {
        if (e.target.value === '') {
          coreRef.current?.clear()
        }
      }}
      lang="ne"
      autoComplete="off"
    />
  )
}
```

### Using DOM Adapters (Ref-based)

```tsx
import { useEffect, useRef } from 'react'
import { createNepaliInput } from 'romanized'

function NepaliInputWrapper({ onChange }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const instanceRef = useRef<any>(null)

  useEffect(() => {
    if (inputRef.current) {
      instanceRef.current = createNepaliInput(inputRef.current, {
        useDevanagariDigits: true,
        onInput: (value) => onChange?.(value)
      })
    }

    return () => {
      instanceRef.current?.destroy()
    }
  }, [])

  return <input ref={inputRef} type="text" />
}
```

## Vue 3

### Wrapper Components (Recommended)

Create reusable wrapper components:

#### NepaliInput Wrapper

```vue
<!-- NepaliInput.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NepaliIMECore } from 'romanized'

interface Props {
  modelValue?: string
  useDevanagariDigits?: boolean
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  useDevanagariDigits: true,
  placeholder: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [value: string]
  'change': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.modelValue)
let core: NepaliIMECore | null = null

onMounted(() => {
  core = new NepaliIMECore({
    useDevanagariDigits: props.useDevanagariDigits,
    onStateChange: (state) => {
      internalValue.value = state.output
      emit('update:modelValue', state.output)
      emit('input', state.output)
      emit('change', state.output)
    }
  })
})

onUnmounted(() => {
  core = null
})

// Sync external value changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    core?.setValue(newValue)
    internalValue.value = newValue
  }
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (!core) return

  const hasSelection = inputRef.value!.selectionStart !== inputRef.value!.selectionEnd
  if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
    e.preventDefault()
    core.clear()
    return
  }

  const handled = core.handleKey(e.key, {
    ctrl: e.ctrlKey,
    alt: e.altKey,
    meta: e.metaKey
  })

  if (handled) e.preventDefault()
}

const handlePaste = (e: ClipboardEvent) => {
  if (!core) return
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  core.insertText(text)
}

// Expose methods
const clear = () => core?.clear()
const setValue = (value: string) => core?.setValue(value)
const getValue = () => core?.getValue() || ''

defineExpose({
  clear,
  setValue,
  getValue,
  getCore: () => core
})
</script>

<template>
  <input
    ref="inputRef"
    v-model="internalValue"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    @keydown="handleKeyDown"
    @paste="handlePaste"
    lang="ne"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  />
</template>
```

#### NepaliTextarea Wrapper

```vue
<!-- NepaliTextarea.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NepaliIMECore } from 'romanized'

interface Props {
  modelValue?: string
  useDevanagariDigits?: boolean
  placeholder?: string
  rows?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  useDevanagariDigits: true,
  placeholder: '',
  rows: 4,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [value: string]
  'change': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const internalValue = ref(props.modelValue)
let core: NepaliIMECore | null = null

onMounted(() => {
  core = new NepaliIMECore({
    useDevanagariDigits: props.useDevanagariDigits,
    onStateChange: (state) => {
      internalValue.value = state.output
      emit('update:modelValue', state.output)
      emit('input', state.output)
      emit('change', state.output)
    }
  })
})

onUnmounted(() => {
  core = null
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    core?.setValue(newValue)
    internalValue.value = newValue
  }
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (!core) return

  const hasSelection = textareaRef.value!.selectionStart !== textareaRef.value!.selectionEnd
  if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
    e.preventDefault()
    core.clear()
    return
  }

  const handled = core.handleKey(e.key, {
    ctrl: e.ctrlKey,
    alt: e.altKey,
    meta: e.metaKey
  })

  if (handled) e.preventDefault()
}

const handlePaste = (e: ClipboardEvent) => {
  if (!core) return
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  core.insertText(text)
}

const clear = () => core?.clear()
const setValue = (value: string) => core?.setValue(value)
const getValue = () => core?.getValue() || ''

defineExpose({
  clear,
  setValue,
  getValue,
  getCore: () => core
})
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model="internalValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    @keydown="handleKeyDown"
    @paste="handlePaste"
    lang="ne"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  />
</template>
```

#### NepaliConverter Wrapper

```vue
<!-- NepaliConverter.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NepaliConverterCore } from 'romanized'

interface Props {
  modelValue?: string
  useDevanagariDigits?: boolean
  debounceMs?: number
  showCopyButton?: boolean
  direction?: 'toNepali' | 'toRoman'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  useDevanagariDigits: true,
  debounceMs: 300,
  showCopyButton: true,
  direction: 'toNepali'
})

const emit = defineEmits<{
  'update:modelValue': [input: string, output: string]
  'input': [input: string, output: string]
  'change': [input: string, output: string]
}>()

const input = ref(props.modelValue)
const output = ref('')
const copied = ref(false)
let core: NepaliConverterCore | null = null

onMounted(() => {
  core = new NepaliConverterCore({
    useDevanagariDigits: props.useDevanagariDigits,
    debounceMs: props.debounceMs,
    bidirectional: true,
    onInput: (inputText, outputText) => {
      output.value = outputText
      emit('input', inputText, outputText)
    },
    onChange: (inputText, outputText) => {
      emit('change', inputText, outputText)
      emit('update:modelValue', inputText, outputText)
    }
  })

  core.setDirection(props.direction)
})

onUnmounted(() => {
  core = null
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== input.value) {
    input.value = newValue
    core?.setInput(newValue)
  }
})

const handleInput = () => {
  core?.setInput(input.value)
}

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const clear = () => {
  core?.clear()
  input.value = ''
  output.value = ''
}

const setDirection = (dir: 'toNepali' | 'toRoman') => core?.setDirection(dir)
const toggleDirection = () => core?.toggleDirection()

defineExpose({
  clear,
  setDirection,
  toggleDirection,
  getOutput: () => output.value,
  getCore: () => core
})
</script>

<template>
  <div class="nepali-converter">
    <div class="input-section">
      <label>Romanized Input</label>
      <textarea
        v-model="input"
        @input="handleInput"
        placeholder="Type in romanized Nepali..."
        rows="6"
      />
    </div>

    <div class="output-section">
      <label>Nepali Output</label>
      <div class="output-display" lang="ne">
        {{ output || 'देवनागरी परिणाम यहाँ देखिन्छ' }}
      </div>
      <button v-if="showCopyButton" @click="handleCopy" :disabled="!output">
        {{ copied ? '✓ Copied!' : 'Copy' }}
      </button>
    </div>
  </div>
</template>
```

#### Usage Example

```vue
<script setup>
import { ref } from 'vue'
import NepaliInput from './components/NepaliInput.vue'
import NepaliTextarea from './components/NepaliTextarea.vue'
import NepaliConverter from './components/NepaliConverter.vue'

const inputValue = ref('')
const textareaValue = ref('')
const inputRef = ref(null)
const converterRef = ref(null)

const handleChange = (value) => {
  console.log('Changed:', value)
}
</script>

<template>
  <div>
    <!-- Simple usage -->
    <NepaliInput
      v-model="inputValue"
      placeholder="Type in Nepali..."
      @change="handleChange"
    />

    <!-- With ref for imperative methods -->
    <NepaliInput
      ref="inputRef"
      v-model="inputValue"
      :use-devanagari-digits="false"
    />
    <button @click="inputRef?.clear()">Clear</button>

    <!-- Textarea -->
    <NepaliTextarea
      v-model="textareaValue"
      :rows="10"
      placeholder="Write your story..."
    />

    <!-- Converter -->
    <NepaliConverter
      ref="converterRef"
      v-model="inputValue"
      :show-copy-button="true"
      :debounce-ms="200"
      @change="(input, output) => console.log({ input, output })"
    />
    <button @click="converterRef?.toggleDirection()">
      Toggle Direction
    </button>
  </div>
</template>
```

### Core Headless Usage (Advanced)

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NepaliIMECore } from 'romanized'

const inputRef = ref(null)
const value = ref('')
let core = null

onMounted(() => {
  core = new NepaliIMECore({
    useDevanagariDigits: true,
    onStateChange: (state) => {
      value.value = state.output
    }
  })
})

onUnmounted(() => {
  core = null
})

const handleKeyDown = (e) => {
  if (!core) return

  const hasSelection = inputRef.value.selectionStart !== inputRef.value.selectionEnd
  if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
    e.preventDefault()
    core.clear()
    return
  }

  const handled = core.handleKey(e.key, {
    ctrl: e.ctrlKey,
    alt: e.altKey,
    meta: e.metaKey
  })

  if (handled) e.preventDefault()
}

const handlePaste = (e) => {
  if (!core) return
  e.preventDefault()
  const text = e.clipboardData.getData('text/plain')
  core.insertText(text)
}
</script>

<template>
  <input
    ref="inputRef"
    v-model="value"
    @keydown="handleKeyDown"
    @paste="handlePaste"
    type="text"
    lang="ne"
    autocomplete="off"
  />
</template>
```

### Using DOM Adapters

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { createNepaliInput } from 'romanized'

const inputRef = ref(null)
let instance = null

onMounted(() => {
  if (inputRef.value) {
    instance = createNepaliInput(inputRef.value, {
      useDevanagariDigits: true
    })
  }
})

onUnmounted(() => {
  instance?.destroy()
})
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
```

## Svelte

### Wrapper Components (Recommended)

Create reusable wrapper components:

#### NepaliInput Wrapper

```svelte
<!-- NepaliInput.svelte -->
<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { NepaliIMECore } from 'romanized'

  export let value = ''
  export let useDevanagariDigits = true
  export let placeholder = ''
  export let disabled = false

  let inputElement
  let internalValue = value
  let core

  const dispatch = createEventDispatcher()

  onMount(() => {
    core = new NepaliIMECore({
      useDevanagariDigits,
      onStateChange: (state) => {
        internalValue = state.output
        dispatch('input', internalValue)
        dispatch('change', internalValue)
      }
    })
  })

  onDestroy(() => {
    core = null
  })

  // Sync external value changes
  $: if (value !== internalValue && core) {
    core.setValue(value)
    internalValue = value
  }

  function handleKeyDown(e) {
    if (!core) return

    const hasSelection = inputElement.selectionStart !== inputElement.selectionEnd
    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      core.clear()
      return
    }

    const handled = core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  function handlePaste(e) {
    if (!core) return
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    core.insertText(text)
  }

  // Expose methods
  export function clear() {
    core?.clear()
  }

  export function setValue(val) {
    core?.setValue(val)
  }

  export function getValue() {
    return core?.getValue() || ''
  }

  export function getCore() {
    return core
  }
</script>

<input
  bind:this={inputElement}
  bind:value={internalValue}
  on:keydown={handleKeyDown}
  on:paste={handlePaste}
  type="text"
  {placeholder}
  {disabled}
  lang="ne"
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
  {...$$restProps}
/>
```

#### NepaliTextarea Wrapper

```svelte
<!-- NepaliTextarea.svelte -->
<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { NepaliIMECore } from 'romanized'

  export let value = ''
  export let useDevanagariDigits = true
  export let placeholder = ''
  export let rows = 4
  export let disabled = false

  let textareaElement
  let internalValue = value
  let core

  const dispatch = createEventDispatcher()

  onMount(() => {
    core = new NepaliIMECore({
      useDevanagariDigits,
      onStateChange: (state) => {
        internalValue = state.output
        dispatch('input', internalValue)
        dispatch('change', internalValue)
      }
    })
  })

  onDestroy(() => {
    core = null
  })

  $: if (value !== internalValue && core) {
    core.setValue(value)
    internalValue = value
  }

  function handleKeyDown(e) {
    if (!core) return

    const hasSelection = textareaElement.selectionStart !== textareaElement.selectionEnd
    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      core.clear()
      return
    }

    const handled = core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  function handlePaste(e) {
    if (!core) return
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    core.insertText(text)
  }

  export function clear() {
    core?.clear()
  }

  export function setValue(val) {
    core?.setValue(val)
  }

  export function getValue() {
    return core?.getValue() || ''
  }

  export function getCore() {
    return core
  }
</script>

<textarea
  bind:this={textareaElement}
  bind:value={internalValue}
  on:keydown={handleKeyDown}
  on:paste={handlePaste}
  {placeholder}
  {rows}
  {disabled}
  lang="ne"
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
  {...$$restProps}
/>
```

#### NepaliConverter Wrapper

```svelte
<!-- NepaliConverter.svelte -->
<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { NepaliConverterCore } from 'romanized'

  export let value = ''
  export let useDevanagariDigits = true
  export let debounceMs = 300
  export let showCopyButton = true
  export let direction = 'toNepali'

  let input = value
  let output = ''
  let copied = false
  let core

  const dispatch = createEventDispatcher()

  onMount(() => {
    core = new NepaliConverterCore({
      useDevanagariDigits,
      debounceMs,
      bidirectional: true,
      onInput: (inputText, outputText) => {
        output = outputText
        dispatch('input', { input: inputText, output: outputText })
      },
      onChange: (inputText, outputText) => {
        dispatch('change', { input: inputText, output: outputText })
      }
    })

    core.setDirection(direction)
  })

  onDestroy(() => {
    core = null
  })

  $: if (value !== input && core) {
    input = value
    core.setInput(value)
  }

  function handleInput() {
    core?.setInput(input)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output)
      copied = true
      setTimeout(() => { copied = false }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  export function clear() {
    core?.clear()
    input = ''
    output = ''
  }

  export function setDirection(dir) {
    core?.setDirection(dir)
  }

  export function toggleDirection() {
    core?.toggleDirection()
  }

  export function getOutput() {
    return output
  }

  export function getCore() {
    return core
  }
</script>

<div class="nepali-converter" {...$$restProps}>
  <div class="input-section">
    <label>Romanized Input</label>
    <textarea
      bind:value={input}
      on:input={handleInput}
      placeholder="Type in romanized Nepali..."
      rows="6"
    />
  </div>

  <div class="output-section">
    <label>Nepali Output</label>
    <div class="output-display" lang="ne">
      {output || 'देवनागरी परिणाम यहाँ देखिन्छ'}
    </div>
    {#if showCopyButton}
      <button on:click={handleCopy} disabled={!output}>
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
    {/if}
  </div>
</div>
```

#### Usage Example

```svelte
<script>
  import NepaliInput from './components/NepaliInput.svelte'
  import NepaliTextarea from './components/NepaliTextarea.svelte'
  import NepaliConverter from './components/NepaliConverter.svelte'

  let inputValue = ''
  let textareaValue = ''
  let inputRef
  let converterRef

  function handleChange(event) {
    console.log('Changed:', event.detail)
  }
</script>

<div>
  <!-- Simple usage -->
  <NepaliInput
    bind:value={inputValue}
    placeholder="Type in Nepali..."
    on:change={handleChange}
  />

  <!-- With bind:this for imperative methods -->
  <NepaliInput
    bind:this={inputRef}
    bind:value={inputValue}
    useDevanagariDigits={false}
  />
  <button on:click={() => inputRef?.clear()}>Clear</button>

  <!-- Textarea -->
  <NepaliTextarea
    bind:value={textareaValue}
    rows={10}
    placeholder="Write your story..."
  />

  <!-- Converter -->
  <NepaliConverter
    bind:this={converterRef}
    bind:value={inputValue}
    showCopyButton={true}
    debounceMs={200}
    on:change={(e) => console.log(e.detail)}
  />
  <button on:click={() => converterRef?.toggleDirection()}>
    Toggle Direction
  </button>
</div>
```

### Core Headless Usage (Advanced)

```svelte
<script>
  import { onMount, onDestroy } from 'svelte'
  import { NepaliIMECore } from 'romanized'

  let inputElement
  let value = ''
  let core

  onMount(() => {
    core = new NepaliIMECore({
      useDevanagariDigits: true,
      onStateChange: (state) => {
        value = state.output
      }
    })
  })

  onDestroy(() => {
    core = null
  })

  function handleKeyDown(e) {
    if (!core) return

    const hasSelection = inputElement.selectionStart !== inputElement.selectionEnd
    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      core.clear()
      return
    }

    const handled = core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  function handlePaste(e) {
    if (!core) return
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    core.insertText(text)
  }
</script>

<input
  bind:this={inputElement}
  bind:value
  on:keydown={handleKeyDown}
  on:paste={handlePaste}
  type="text"
  lang="ne"
  autocomplete="off"
/>
```

### Using DOM Adapters

```svelte
<script>
  import { onMount, onDestroy } from 'svelte'
  import { createNepaliInput } from 'romanized'

  let inputElement
  let instance

  onMount(() => {
    instance = createNepaliInput(inputElement, {
      useDevanagariDigits: true
    })
  })

  onDestroy(() => {
    instance?.destroy()
  })
</script>

<input bind:this={inputElement} type="text" />
```

## Angular

### Wrapper Components (Recommended)

Create reusable wrapper components:

#### NepaliInput Component

```typescript
// nepali-input.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { NepaliIMECore } from 'romanized'

@Component({
  selector: 'app-nepali-input',
  template: `
    <input
      #inputElement
      type="text"
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      (keydown)="handleKeyDown($event)"
      (paste)="handlePaste($event)"
      (change)="handleChange($event)"
      lang="ne"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      [class]="className"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NepaliInputComponent),
      multi: true
    }
  ]
})
export class NepaliInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>

  @Input() useDevanagariDigits = true
  @Input() placeholder = ''
  @Input() disabled = false
  @Input() className = ''

  @Output() inputChange = new EventEmitter<string>()
  @Output() valueChange = new EventEmitter<string>()

  value = ''
  private core: NepaliIMECore | null = null
  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  ngOnInit() {
    this.core = new NepaliIMECore({
      useDevanagariDigits: this.useDevanagariDigits,
      onStateChange: (state) => {
        this.value = state.output
        this.onChange(state.output)
        this.inputChange.emit(state.output)
        this.valueChange.emit(state.output)
      }
    })
  }

  ngOnDestroy() {
    this.core = null
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!this.core) return

    const input = this.inputElement.nativeElement
    const hasSelection = input.selectionStart !== input.selectionEnd

    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      this.core.clear()
      return
    }

    const handled = this.core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  handlePaste(e: ClipboardEvent) {
    if (!this.core) return
    e.preventDefault()
    const text = e.clipboardData?.getData('text/plain') || ''
    this.core.insertText(text)
  }

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.value === '') {
      this.core?.clear()
    }
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    if (value !== this.value) {
      this.core?.setValue(value)
      this.value = value
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  // Public methods
  clear() {
    this.core?.clear()
  }

  setValue(value: string) {
    this.core?.setValue(value)
  }

  getValue() {
    return this.core?.getValue() || ''
  }

  getCore() {
    return this.core
  }
}
```

#### NepaliTextarea Component

```typescript
// nepali-textarea.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { NepaliIMECore } from 'romanized'

@Component({
  selector: 'app-nepali-textarea',
  template: `
    <textarea
      #textareaElement
      [value]="value"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [rows]="rows"
      (keydown)="handleKeyDown($event)"
      (paste)="handlePaste($event)"
      (change)="handleChange($event)"
      lang="ne"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      [class]="className"
    ></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NepaliTextareaComponent),
      multi: true
    }
  ]
})
export class NepaliTextareaComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('textareaElement') textareaElement!: ElementRef<HTMLTextAreaElement>

  @Input() useDevanagariDigits = true
  @Input() placeholder = ''
  @Input() disabled = false
  @Input() rows = 4
  @Input() className = ''

  @Output() inputChange = new EventEmitter<string>()
  @Output() valueChange = new EventEmitter<string>()

  value = ''
  private core: NepaliIMECore | null = null
  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  ngOnInit() {
    this.core = new NepaliIMECore({
      useDevanagariDigits: this.useDevanagariDigits,
      onStateChange: (state) => {
        this.value = state.output
        this.onChange(state.output)
        this.inputChange.emit(state.output)
        this.valueChange.emit(state.output)
      }
    })
  }

  ngOnDestroy() {
    this.core = null
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!this.core) return

    const textarea = this.textareaElement.nativeElement
    const hasSelection = textarea.selectionStart !== textarea.selectionEnd

    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      this.core.clear()
      return
    }

    const handled = this.core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  handlePaste(e: ClipboardEvent) {
    if (!this.core) return
    e.preventDefault()
    const text = e.clipboardData?.getData('text/plain') || ''
    this.core.insertText(text)
  }

  handleChange(e: Event) {
    const textarea = e.target as HTMLTextAreaElement
    if (textarea.value === '') {
      this.core?.clear()
    }
  }

  writeValue(value: string): void {
    if (value !== this.value) {
      this.core?.setValue(value)
      this.value = value
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  clear() {
    this.core?.clear()
  }

  setValue(value: string) {
    this.core?.setValue(value)
  }

  getValue() {
    return this.core?.getValue() || ''
  }

  getCore() {
    return this.core
  }
}
```

#### NepaliConverter Component

```typescript
// nepali-converter.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core'
import { NepaliConverterCore } from 'romanized'

@Component({
  selector: 'app-nepali-converter',
  template: `
    <div class="nepali-converter" [class]="className">
      <div class="input-section">
        <label>Romanized Input</label>
        <textarea
          [(ngModel)]="input"
          (ngModelChange)="handleInput()"
          placeholder="Type in romanized Nepali..."
          rows="6"
        ></textarea>
      </div>

      <div class="output-section">
        <label>Nepali Output</label>
        <div class="output-display" lang="ne">
          {{ output || 'देवनागरी परिणाम यहाँ देखिन्छ' }}
        </div>
        <button *ngIf="showCopyButton" (click)="handleCopy()" [disabled]="!output">
          {{ copied ? '✓ Copied!' : 'Copy' }}
        </button>
      </div>
    </div>
  `
})
export class NepaliConverterComponent implements OnInit, OnDestroy {
  @Input() value = ''
  @Input() useDevanagariDigits = true
  @Input() debounceMs = 300
  @Input() showCopyButton = true
  @Input() direction: 'toNepali' | 'toRoman' = 'toNepali'
  @Input() className = ''

  @Output() inputChange = new EventEmitter<{ input: string; output: string }>()
  @Output() valueChange = new EventEmitter<{ input: string; output: string }>()

  input = ''
  output = ''
  copied = false
  private core: NepaliConverterCore | null = null

  ngOnInit() {
    this.input = this.value

    this.core = new NepaliConverterCore({
      useDevanagariDigits: this.useDevanagariDigits,
      debounceMs: this.debounceMs,
      bidirectional: true,
      onInput: (inputText, outputText) => {
        this.output = outputText
        this.inputChange.emit({ input: inputText, output: outputText })
      },
      onChange: (inputText, outputText) => {
        this.valueChange.emit({ input: inputText, output: outputText })
      }
    })

    this.core.setDirection(this.direction)
  }

  ngOnDestroy() {
    this.core = null
  }

  handleInput() {
    this.core?.setInput(this.input)
  }

  async handleCopy() {
    try {
      await navigator.clipboard.writeText(this.output)
      this.copied = true
      setTimeout(() => { this.copied = false }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  clear() {
    this.core?.clear()
    this.input = ''
    this.output = ''
  }

  setDirection(dir: 'toNepali' | 'toRoman') {
    this.core?.setDirection(dir)
  }

  toggleDirection() {
    this.core?.toggleDirection()
  }

  getOutput() {
    return this.output
  }

  getCore() {
    return this.core
  }
}
```

#### Usage Example

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core'
import { NepaliInputComponent, NepaliConverterComponent } from './components/nepali'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- Simple usage -->
      <app-nepali-input
        placeholder="Type in Nepali..."
        (valueChange)="handleChange($event)"
        className="my-input"
      ></app-nepali-input>

      <!-- With ngModel (reactive forms) -->
      <app-nepali-input
        [(ngModel)]="inputValue"
        [useDevanagariDigits]="false"
      ></app-nepali-input>

      <!-- With ViewChild for imperative methods -->
      <app-nepali-input
        #inputRef
        [(ngModel)]="inputValue"
      ></app-nepali-input>
      <button (click)="inputRef.clear()">Clear</button>

      <!-- Textarea -->
      <app-nepali-textarea
        [(ngModel)]="textareaValue"
        [rows]="10"
        placeholder="Write your story..."
      ></app-nepali-textarea>

      <!-- Converter -->
      <app-nepali-converter
        #converterRef
        [value]="inputValue"
        [showCopyButton]="true"
        [debounceMs]="200"
        (valueChange)="handleConverterChange($event)"
      ></app-nepali-converter>
      <button (click)="converterRef.toggleDirection()">
        Toggle Direction
      </button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('inputRef') inputRef!: NepaliInputComponent
  @ViewChild('converterRef') converterRef!: NepaliConverterComponent

  inputValue = ''
  textareaValue = ''

  handleChange(value: string) {
    console.log('Changed:', value)
  }

  handleConverterChange(event: { input: string; output: string }) {
    console.log('Converter:', event)
  }
}
```

### Core Headless Usage (Advanced)

```typescript
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { NepaliIMECore } from 'romanized'

@Component({
  selector: 'app-custom-nepali-input',
  template: `
    <input
      #inputElement
      type="text"
      [value]="value"
      (keydown)="handleKeyDown($event)"
      (paste)="handlePaste($event)"
      lang="ne"
      autocomplete="off"
    />
  `
})
export class CustomNepaliInputComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>

  value = ''
  private core: NepaliIMECore | null = null

  ngOnInit() {
    this.core = new NepaliIMECore({
      useDevanagariDigits: true,
      onStateChange: (state) => {
        this.value = state.output
      }
    })
  }

  ngOnDestroy() {
    this.core = null
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!this.core) return

    const input = this.inputElement.nativeElement
    const hasSelection = input.selectionStart !== input.selectionEnd

    if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault()
      this.core.clear()
      return
    }

    const handled = this.core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    })

    if (handled) e.preventDefault()
  }

  handlePaste(e: ClipboardEvent) {
    if (!this.core) return
    e.preventDefault()
    const text = e.clipboardData?.getData('text/plain') || ''
    this.core.insertText(text)
  }
}
```

## API Reference

### NepaliConverterCore (Headless)

```typescript
const converter = new NepaliConverterCore({
  useDevanagariDigits: true,
  bidirectional: false,
  debounceMs: 300,
  onInput: (input, output) => {},
  onChange: (input, output) => {}
})

// Set input text
converter.setInput('namaste')

// Get output
const output = converter.getOutput()

// Direction control
converter.setDirection('toNepali')  // or 'toRoman'
converter.toggleDirection()
converter.getDirection()

// Settings
converter.setUseDevanagariDigits(false)
converter.getUseDevanagariDigits()

// Clear
converter.clear()
```

### NepaliIMECore (Headless)

```typescript
const core = new NepaliIMECore({
  useDevanagariDigits: true,
  onStateChange: (state) => {
    // state: { romanBuffer, currentWord, output, cursorPosition }
  }
})

// Handle keyboard input
const handled = core.handleKey('a', { ctrl: false, alt: false, meta: false })

// Insert text (paste)
core.insertText('namaste')

// Get current value
const value = core.getValue()

// Set value
core.setValue('नमस्ते')

// Clear
core.clear()

// Toggle digits
core.setUseDevanagariDigits(false)
```

### DOM Adapters

```typescript
// IME Input/Textarea
const input = createNepaliInput(element, {
  useDevanagariDigits: true,
  autoConvert: true,
  onInput: (value) => {},
  onChange: (value) => {}
})

// Access headless core
const core = input.getCore()

// Control methods
input.enable()
input.disable()
input.clear()
input.setValue('text')
input.getValue()
input.destroy()

// Converter
const converter = createNepaliConverter(
  inputElement,
  outputElement,
  copyButton,
  {
    useDevanagariDigits: true,
    bidirectional: false,
    debounceMs: 300,
    onInput: (input, output) => {},
    onChange: (input, output) => {}
  }
)

// Access headless core
const converterCore = converter.getCore()

// Control methods
converter.setDirection('toNepali')
converter.toggleDirection()
converter.clear()
converter.getOutput()
converter.destroy()
```
