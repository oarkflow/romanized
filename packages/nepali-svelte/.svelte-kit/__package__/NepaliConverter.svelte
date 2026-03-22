<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { NepaliConverterCore } from '@oarkflow/nepali-input'

  export let value = ''
  export let useDevanagariDigits = true
  export let debounceMs = 300
  export let showCopyButton = true
  export let direction: 'toNepali' | 'toRoman' = 'toNepali'

  let input = value
  let output = ''
  let copied = false
  let core: NepaliConverterCore | null = null

  onMount(() => {
    core = new NepaliConverterCore({
      useDevanagariDigits,
      debounceMs,
      bidirectional: true,
      onInput: (inputText, outputText) => {
        output = outputText
      },
      onChange: (inputText, outputText) => {
        value = inputText
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

  export function setDirection(dir: 'toNepali' | 'toRoman') {
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
