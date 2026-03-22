<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NepaliConverterCore } from '@oarkflow/nepali-input'

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
