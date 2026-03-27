// Main transliteration engine
export { transliterate, reverseTransliterate } from './transliterate'
export type { TransliterationOptions, ReverseTransliterationOptions, DevanagariLanguage } from './transliterate'

// Headless IME Core (framework-agnostic)
export { NepaliIMECore } from './nepali-ime-core'
export type { NepaliIMEOptions, NepaliIMEState } from './nepali-ime-core'

// History Manager
export { HistoryManager } from './history'
export type { HistoryState, HistoryOptions } from './history'

// Keyboard Shortcuts
export { KeyboardShortcutManager, createDefaultShortcuts } from './keyboard-shortcuts'
export type { ShortcutHandler, ShortcutDefinition, ShortcutOptions } from './keyboard-shortcuts'

// Autocomplete
export { AutocompleteManager, COMMON_WORDS } from './autocomplete'
export type { AutocompleteEntry, AutocompleteSuggestion, AutocompleteOptions } from './autocomplete'

// Character Selector (for multiple mapping choices)
export { CharacterSelector, getCharacterAlternatives } from './character-selector'
export type { CharacterAlternative, CharacterSelectorOptions } from './character-selector'

// Transliteration Schemes
export {
    // IAST
    createIASTMappings,
    iastToDevanagari,
    devanagariToIAST,
    iastVowelMapping,
    iastConsonantMapping,
    iastDiacriticMapping,
    IAST_TO_DEVANAGARI,
    DEVANAGARI_TO_IAST,
    // ISO 15919
    createISO15919Mappings,
    iso15919ToDevanagari,
    iso15919VowelMapping,
    iso15919ConsonantMapping,
    iso15919DiacriticMapping,
    ISO15919_TO_DEVANAGARI,
    // Harvard-Kyoto
    createHarvardKyotoMappings,
    harvardKyotoToDevanagari,
    harvardKyotoVowelMapping,
    harvardKyotoConsonantMapping,
    harvardKyotoDiacriticMapping,
    HARVARD_KYOTO_TO_DEVANAGARI,
    // Velthuis
    createVelthuisMappings,
    velthuisToDevanagari,
    velthuisVowelMapping,
    velthuisConsonantMapping,
    velthuisDiacriticMapping,
    VELTHUIS_TO_DEVANAGARI,
    // SLP1
    createSLP1Mappings,
    slp1ToDevanagari,
    slp1VowelMapping,
    slp1ConsonantMapping,
    slp1DiacriticMapping,
    SLP1_TO_DEVANAGARI,
    // Utilities
    buildMapping,
    SCHEMES,
    getSchemeInfo,
} from './schemes'
export type {
    IASTMapping,
    ISO15919Mapping,
    HarvardKyotoMapping,
    VelthuisMapping,
    SLP1Mapping,
    MappingEntry,
    CompiledMapping,
    TransliterationScheme,
    SchemeInfo
} from './schemes'

// Character Palette
export { CharacterPaletteManager, CHARACTER_CATEGORIES } from './character-palette'
export type { CharacterCategory, CharacterInfo, CharacterPaletteOptions } from './character-palette'

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
