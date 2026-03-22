# @oarkflow/nepali-svelte

Svelte components for Nepali input with instant romanized-to-Devanagari transliteration.

## Installation

```bash
npm install @oarkflow/nepali-svelte
# or
pnpm add @oarkflow/nepali-svelte
```

## Quick Start

```svelte
<script>
  import { NepaliInput, NepaliTextarea, NepaliConverter } from '@oarkflow/nepali-svelte'

  let value = ''
</script>

<NepaliInput bind:value placeholder="Type in Nepali..." />
<NepaliTextarea bind:value rows={5} />
<NepaliConverter showCopyButton={true} />
```

## Components

- **NepaliInput**: Single-line input with instant conversion
- **NepaliTextarea**: Multi-line textarea with instant conversion
- **NepaliConverter**: Input/output pair with copy button

See [full documentation](../../FRAMEWORK_INTEGRATION.md#svelte) for detailed API and examples.

## License

MIT © Oarkflow
