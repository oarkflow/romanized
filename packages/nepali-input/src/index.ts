// Main transliteration engine
export { transliterate, reverseTransliterate } from './transliterate'
export type { TransliterationOptions } from './transliterate'

// Headless IME Core (framework-agnostic)
export { NepaliIMECore } from './nepali-ime-core'
export type { NepaliIMEOptions, NepaliIMEState } from './nepali-ime-core'

// Headless Converter Core (framework-agnostic)
export { NepaliConverterCore } from './nepali-converter'
export type { NepaliConverterOptions, NepaliConverterState } from './nepali-converter'

// DOM Adapters (Vanilla JS components)
export { NepaliInput, createNepaliInput } from './nepali-input'
export type { NepaliInputOptions } from './nepali-input'

export { NepaliTextarea, createNepaliTextarea } from './nepali-textarea'
export type { NepaliTextareaOptions } from './nepali-textarea'

export { NepaliConverter, createNepaliConverter } from './nepali-converter'

// Base class for custom adapters
export { NepaliInputBase } from './nepali-input-base'

// Lexicon data
export { LEXICON_ENTRIES } from './lexicon'
