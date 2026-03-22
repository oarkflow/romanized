# @oarkflow/nepali-vue

Vue 3 components for Nepali input with instant romanized-to-Devanagari transliteration.

## Installation

```bash
npm install @oarkflow/nepali-vue
# or
pnpm add @oarkflow/nepali-vue
```

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { NepaliInput, NepaliTextarea, NepaliConverter } from '@oarkflow/nepali-vue'

const value = ref('')
</script>

<template>
  <NepaliInput v-model="value" placeholder="Type in Nepali..." />
  <NepaliTextarea v-model="value" :rows="5" />
  <NepaliConverter :show-copy-button="true" />
</template>
```

## Components

- **NepaliInput**: Single-line input with instant conversion
- **NepaliTextarea**: Multi-line textarea with instant conversion
- **NepaliConverter**: Input/output pair with copy button

See [full documentation](../../FRAMEWORK_INTEGRATION.md#vue-3) for detailed API and examples.

## License

MIT © Oarkflow
