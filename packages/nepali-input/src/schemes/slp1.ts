/**
 * SLP1 (Sanskrit Library Phonetic Basic)
 * One ASCII character per Devanagari character
 * Used in computational linguistics and text processing
 */

import { buildMapping, type CompiledMapping } from '../transliterate-utils'

export interface SLP1Mapping {
	vowels: CompiledMapping<{ independent: string; matra: string; inherent?: boolean }>
	consonants: CompiledMapping<string>
	diacritics: CompiledMapping<string>
}

/**
 * SLP1 vowel mappings
 * Simple single-character mapping where possible
 */
export const slp1VowelMapping = buildMapping<{ independent: string; matra: string; inherent?: boolean }>([
	// Long vowels
	{ keys: ['A'], value: { independent: 'आ', matra: 'ा' }, caseSensitive: true },
	{ keys: ['I'], value: { independent: 'ई', matra: 'ी' }, caseSensitive: true },
	{ keys: ['U'], value: { independent: 'ऊ', matra: 'ू' }, caseSensitive: true },

	// Vocalic vowels
	{ keys: ['f'], value: { independent: 'ऋ', matra: 'ृ' } },
	{ keys: ['F'], value: { independent: 'ॠ', matra: 'ॄ' }, caseSensitive: true },
	{ keys: ['x'], value: { independent: 'ऌ', matra: 'ॢ' } },
	{ keys: ['X'], value: { independent: 'ॡ', matra: 'ॣ' }, caseSensitive: true },

	// Short vowels
	{ keys: ['a'], value: { independent: 'अ', matra: '', inherent: true } },
	{ keys: ['i'], value: { independent: 'इ', matra: 'ि' } },
	{ keys: ['u'], value: { independent: 'उ', matra: 'ु' } },

	// Diphthongs
	{ keys: ['e'], value: { independent: 'ए', matra: 'े' } },
	{ keys: ['E'], value: { independent: 'ऐ', matra: 'ै' }, caseSensitive: true },
	{ keys: ['o'], value: { independent: 'ओ', matra: 'ो' } },
	{ keys: ['O'], value: { independent: 'औ', matra: 'ौ' }, caseSensitive: true },
])

/**
 * SLP1 consonant mappings
 * Single character for each consonant
 */
export const slp1ConsonantMapping = buildMapping<string>([
	// Velars
	{ keys: ['k'], value: 'क' },
	{ keys: ['K'], value: 'ख', caseSensitive: true },
	{ keys: ['g'], value: 'ग' },
	{ keys: ['G'], value: 'घ', caseSensitive: true },
	{ keys: ['N'], value: 'ङ', caseSensitive: true },

	// Palatals
	{ keys: ['c'], value: 'च' },
	{ keys: ['C'], value: 'छ', caseSensitive: true },
	{ keys: ['j'], value: 'ज' },
	{ keys: ['J'], value: 'झ', caseSensitive: true },
	{ keys: ['Y'], value: 'ञ', caseSensitive: true },

	// Retroflex
	{ keys: ['w'], value: 'ट' },
	{ keys: ['W'], value: 'ठ', caseSensitive: true },
	{ keys: ['q'], value: 'ड' },
	{ keys: ['Q'], value: 'ढ', caseSensitive: true },
	{ keys: ['R'], value: 'ण', caseSensitive: true },

	// Dentals
	{ keys: ['t'], value: 'त' },
	{ keys: ['T'], value: 'थ', caseSensitive: true },
	{ keys: ['d'], value: 'द' },
	{ keys: ['D'], value: 'ध', caseSensitive: true },
	{ keys: ['n'], value: 'न' },

	// Labials
	{ keys: ['p'], value: 'प' },
	{ keys: ['P'], value: 'फ', caseSensitive: true },
	{ keys: ['b'], value: 'ब' },
	{ keys: ['B'], value: 'भ', caseSensitive: true },
	{ keys: ['m'], value: 'म' },

	// Semivowels
	{ keys: ['y'], value: 'य' },
	{ keys: ['r'], value: 'र' },
	{ keys: ['l'], value: 'ल' },
	{ keys: ['v'], value: 'व' },

	// Sibilants
	{ keys: ['S'], value: 'श', caseSensitive: true },
	{ keys: ['z'], value: 'ष' },
	{ keys: ['s'], value: 'स' },
	{ keys: ['h'], value: 'ह' },
])

/**
 * SLP1 diacritic mappings
 */
export const slp1DiacriticMapping = buildMapping<string>([
	{ keys: ['M'], value: 'ं', caseSensitive: true }, // Anusvara
	{ keys: ['H'], value: 'ः', caseSensitive: true }, // Visarga
	{ keys: ['~'], value: 'ँ' }, // Chandrabindu
])

export const createSLP1Mappings = (): SLP1Mapping => ({
	vowels: slp1VowelMapping,
	consonants: slp1ConsonantMapping,
	diacritics: slp1DiacriticMapping,
})

export const SLP1_TO_DEVANAGARI: Record<string, string> = {
	// Vowels
	'A': 'आ', 'I': 'ई', 'U': 'ऊ',
	'f': 'ऋ', 'F': 'ॠ', 'x': 'ऌ', 'X': 'ॡ',
	'a': 'अ', 'i': 'इ', 'u': 'उ',
	'e': 'ए', 'E': 'ऐ', 'o': 'ओ', 'O': 'औ',
	// Consonants
	'k': 'क', 'K': 'ख', 'g': 'ग', 'G': 'घ', 'N': 'ङ',
	'c': 'च', 'C': 'छ', 'j': 'ज', 'J': 'झ', 'Y': 'ञ',
	'w': 'ट', 'W': 'ठ', 'q': 'ड', 'Q': 'ढ', 'R': 'ण',
	't': 'त', 'T': 'थ', 'd': 'द', 'D': 'ध', 'n': 'न',
	'p': 'प', 'P': 'फ', 'b': 'ब', 'B': 'भ', 'm': 'म',
	'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
	'S': 'श', 'z': 'ष', 's': 'स', 'h': 'ह',
	// Diacritics
	'M': 'ं', 'H': 'ः', '~': 'ँ',
}

export const slp1ToDevanagari = (text: string): string => {
	let result = ''
	let i = 0

	while (i < text.length) {
		const char = text[i]
		if (SLP1_TO_DEVANAGARI[char]) {
			result += SLP1_TO_DEVANAGARI[char]
		} else {
			result += char
		}
		i++
	}

	return result
}
