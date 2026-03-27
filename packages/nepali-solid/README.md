# @oarkflow/nepali-solid

SolidJS components for Devanagari input with instant romanized transliteration for Nepali, Hindi, Marathi, Sanskrit, and other Devanagari languages.

## Installation

```bash
npm install @oarkflow/nepali-solid solid-js
# or
pnpm add @oarkflow/nepali-solid solid-js
```

## Quick Start

```tsx
import { createSignal } from 'solid-js'
import { NepaliInput, NepaliTextarea, NepaliConverter } from '@oarkflow/nepali-solid'

export default function App() {
	const [value, setValue] = createSignal('')

	return (
		<>
			<NepaliInput value={value()} onChange={setValue} language="nepali" placeholder="Type in romanized Nepali..." />
			<NepaliTextarea value={value()} onChange={setValue} language="hindi" rows={5} />
			<NepaliConverter language="generic" showCopyButton={true} />
		</>
	)
}
```

## Components

- **NepaliInput**: Single-line input with instant conversion
- **NepaliTextarea**: Multi-line textarea with instant conversion
- **NepaliConverter**: Input/output pair with copy button

## Language Support

All Solid components accept these transliteration props:

```ts
language?: 'generic' | 'nepali' | 'hindi' | 'marathi' | 'sanskrit' | 'maithili' | 'newari' | 'dogri' | 'bodo' | 'konkani' | 'kashmiri' | 'sindhi'
enableExtendedRomanization?: boolean
customWordMap?: Record<string, string>
```

Examples:

```tsx
<NepaliInput language="hindi" placeholder="aap kaise hain" />
<NepaliTextarea language="marathi" placeholder="tumhi kase aahat" />
<NepaliConverter
	language="sanskrit"
	enableExtendedRomanization={true}
	customWordMap={{ romanized: 'रोमनाइज्ड' }}
/>
```

## Imperative Access

Solid components do not use React-style forwarded refs, so the package exposes an `instanceRef` callback for imperative APIs.

```tsx
import { NepaliInput } from '@oarkflow/nepali-solid'
import type { NepaliInputRef } from '@oarkflow/nepali-solid'

let inputApi: NepaliInputRef | undefined

<NepaliInput instanceRef={(api) => (inputApi = api)} />
```

## License

MIT © Oarkflow
