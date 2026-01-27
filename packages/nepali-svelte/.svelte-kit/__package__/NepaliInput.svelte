<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { NepaliIMECore } from '@verishore/nepali-input'

  export let value = ''
  export let useDevanagariDigits = true
  export let placeholder = ''
  export let disabled = false

  let inputElement: HTMLInputElement
  let internalValue = value
  let core: NepaliIMECore | null = null

  onMount(() => {
    core = new NepaliIMECore({
      useDevanagariDigits,
      onStateChange: (state) => {
        internalValue = state.output
        value = state.output
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

  function handleKeyDown(e: KeyboardEvent) {
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

  function handlePaste(e: ClipboardEvent) {
    if (!core) return
    e.preventDefault()
    const text = e.clipboardData?.getData('text/plain') || ''
    core.insertText(text)
  }

  export function clear() {
    core?.clear()
  }

  export function setValue(val: string) {
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
