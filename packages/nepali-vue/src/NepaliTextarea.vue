<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NepaliIMECore } from '@oarkflow/nepali-input'

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
