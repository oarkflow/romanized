/**
 * Transliteration schemes
 * Exports all supported schemes for romanization to Devanagari
 */

export * from './iast'
export * from './iso15919'
export * from './harvard-kyoto'
export * from './velthuis'
export * from './slp1'
export { buildMapping, type MappingEntry, type CompiledMapping } from '../transliterate-utils'

/**
 * Supported transliteration scheme identifiers
 */
export type TransliterationScheme = 'default' | 'iast' | 'iso15919' | 'harvard-kyoto' | 'velthuis' | 'slp1'

/**
 * Scheme metadata
 */
export interface SchemeInfo {
	id: TransliterationScheme
	name: string
	description: string
	supportsUnicode: boolean
	supportsAscii: boolean
	caseSensitive: boolean
	commonUse: string
}

/**
 * Available transliteration schemes
 */
export const SCHEMES: SchemeInfo[] = [
	{
		id: 'default',
		name: 'Default (Nepali)',
		description: 'Simple romanization optimized for Nepali typing',
		supportsUnicode: false,
		supportsAscii: true,
		caseSensitive: false,
		commonUse: 'General typing',
	},
	{
		id: 'iast',
		name: 'IAST',
		description: 'International Alphabet of Sanskrit Transliteration with diacritical marks',
		supportsUnicode: true,
		supportsAscii: true,
		caseSensitive: false,
		commonUse: 'Academic publications, scholarly works',
	},
	{
		id: 'iso15919',
		name: 'ISO 15919',
		description: 'International standard for transliteration of Devanagari and related scripts',
		supportsUnicode: true,
		supportsAscii: true,
		caseSensitive: false,
		commonUse: 'International standards, official documents',
	},
	{
		id: 'harvard-kyoto',
		name: 'Harvard-Kyoto',
		description: 'ASCII-only, case-sensitive notation for academic texts and LaTeX',
		supportsUnicode: false,
		supportsAscii: true,
		caseSensitive: true,
		commonUse: 'LaTeX documents, plain text databases',
	},
	{
		id: 'velthuis',
		name: 'Velthuis',
		description: 'LaTeX-friendly notation using dot and quote prefixes',
		supportsUnicode: false,
		supportsAscii: true,
		caseSensitive: false,
		commonUse: 'LaTeX typesetting',
	},
	{
		id: 'slp1',
		name: 'SLP1',
		description: 'Sanskrit Library Phonetic Basic - one ASCII char per Devanagari char',
		supportsUnicode: false,
		supportsAscii: true,
		caseSensitive: true,
		commonUse: 'Computational linguistics, text processing',
	},
]

/**
 * Get scheme information by ID
 */
export const getSchemeInfo = (schemeId: TransliterationScheme): SchemeInfo | undefined => {
	return SCHEMES.find(s => s.id === schemeId)
}
