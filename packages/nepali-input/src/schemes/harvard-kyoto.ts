/**
 * Harvard-Kyoto Transliteration
 * ASCII-only, case-sensitive notation used in academic texts and LaTeX
 */

import { buildMapping, type CompiledMapping } from '../transliterate-utils'

export interface HarvardKyotoMapping {
	vowels: CompiledMapping<{ independent: string; matra: string; inherent?: boolean }>
	consonants: CompiledMapping<string>
	diacritics: CompiledMapping<string>
}

/**
 * Harvard-Kyoto vowel mappings
 * Case-sensitive: A=आ, a=अ
 */
export const harvardKyotoVowelMapping = buildMapping<{ independent: string; matra: string; inherent?: boolean }>([
	// Long vowels (uppercase)
	{ keys: ['A'], value: { independent: 'आ', matra: 'ा' }, caseSensitive: true },
	{ keys: ['I'], value: { independent: 'ई', matra: 'ी' }, caseSensitive: true },
	{ keys: ['U'], value: { independent: 'ऊ', matra: 'ू' }, caseSensitive: true },
	
	// Vocalic vowels
	{ keys: ['R'], value: { independent: 'ऋ', matra: 'ृ' }, caseSensitive: true },
	{ keys: ['RR'], value: { independent: 'ॠ', matra: 'ॄ' }, caseSensitive: true },
	{ keys: ['lR'], value: { independent: 'ऌ', matra: 'ॢ' }, caseSensitive: true },
	{ keys: ['lRR'], value: { independent: 'ॡ', matra: 'ॣ' }, caseSensitive: true },
	
	// Short vowels (lowercase)
	{ keys: ['a'], value: { independent: 'अ', matra: '', inherent: true } },
	{ keys: ['i'], value: { independent: 'इ', matra: 'ि' } },
	{ keys: ['u'], value: { independent: 'उ', matra: 'ु' } },
	
	// Diphthongs
	{ keys: ['e'], value: { independent: 'ए', matra: 'े' } },
	{ keys: ['ai'], value: { independent: 'ऐ', matra: 'ै' } },
	{ keys: ['o'], value: { independent: 'ओ', matra: 'ो' } },
	{ keys: ['au'], value: { independent: 'औ', matra: 'ौ' } },
])

/**
 * Harvard-Kyoto consonant mappings
 * Uses uppercase for aspirated/retroflex: T=ट, Th=ठ, N=ण, S=ष
 */
export const harvardKyotoConsonantMapping = buildMapping<string>([
	// Velars
	{ keys: ['k'], value: 'क' },
	{ keys: ['kh'], value: 'ख' },
	{ keys: ['g'], value: 'ग' },
	{ keys: ['gh'], value: 'घ' },
	{ keys: ['G'], value: 'ङ', caseSensitive: true }, // velar nasal
	
	// Palatals
	{ keys: ['c'], value: 'च' },
	{ keys: ['ch'], value: 'छ' },
	{ keys: ['j'], value: 'ज' },
	{ keys: ['jh'], value: 'झ' },
	{ keys: ['J'], value: 'ञ', caseSensitive: true }, // palatal nasal
	
	// Retroflex (uppercase)
	{ keys: ['T'], value: 'ट', caseSensitive: true },
	{ keys: ['Th'], value: 'ठ', caseSensitive: true },
	{ keys: ['D'], value: 'ड', caseSensitive: true },
	{ keys: ['Dh'], value: 'ढ', caseSensitive: true },
	{ keys: ['N'], value: 'ण', caseSensitive: true }, // retroflex nasal
	
	// Dentals (lowercase)
	{ keys: ['t'], value: 'त' },
	{ keys: ['th'], value: 'थ' },
	{ keys: ['d'], value: 'द' },
	{ keys: ['dh'], value: 'ध' },
	{ keys: ['n'], value: 'न' },
	
	// Labials
	{ keys: ['p'], value: 'प' },
	{ keys: ['ph'], value: 'फ' },
	{ keys: ['b'], value: 'ब' },
	{ keys: ['bh'], value: 'भ' },
	{ keys: ['m'], value: 'म' },
	
	// Semivowels
	{ keys: ['y'], value: 'य' },
	{ keys: ['r'], value: 'र' },
	{ keys: ['l'], value: 'ल' },
	{ keys: ['v'], value: 'व' },
	
	// Sibilants
	{ keys: ['z'], value: 'श', caseSensitive: true }, // palatal (lowercase z)
	{ keys: ['S'], value: 'ष', caseSensitive: true }, // retroflex (uppercase)
	{ keys: ['s'], value: 'स' }, // dental
	{ keys: ['h'], value: 'ह' },
	
	// Compounds
	{ keys: ['kS'], value: 'क्ष', caseSensitive: true },
	{ keys: ['jJ'], value: 'ज्ञ', caseSensitive: true },
])

/**
 * Harvard-Kyoto diacritic mappings
 */
export const harvardKyotoDiacriticMapping = buildMapping<string>([
	{ keys: ['M'], value: 'ं', caseSensitive: true }, // Anusvara (uppercase)
	{ keys: ['H'], value: 'ः', caseSensitive: true }, // Visarga (uppercase)
	{ keys: ['~M'], value: 'ँ' }, // Chandrabindu
])

export const createHarvardKyotoMappings = (): HarvardKyotoMapping => ({
	vowels: harvardKyotoVowelMapping,
	consonants: harvardKyotoConsonantMapping,
	diacritics: harvardKyotoDiacriticMapping,
})

export const HARVARD_KYOTO_TO_DEVANAGARI: Record<string, string> = {
	// Vowels (case-sensitive)
	'A': 'आ', 'I': 'ई', 'U': 'ऊ',
	'R': 'ऋ', 'RR': 'ॠ', 'lR': 'ऌ', 'lRR': 'ॡ',
	'a': 'अ', 'i': 'इ', 'u': 'उ',
	'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
	// Consonants
	'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'G': 'ङ',
	'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'J': 'ञ',
	'T': 'ट', 'Th': 'ठ', 'D': 'ड', 'Dh': 'ढ', 'N': 'ण',
	't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
	'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
	'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
	'z': 'श', 'S': 'ष', 's': 'स', 'h': 'ह',
	// Diacritics
	'M': 'ं', 'H': 'ः', '~M': 'ँ',
	// Compounds
	'kS': 'क्ष', 'jJ': 'ज्ञ',
}

export const harvardKyotoToDevanagari = (text: string): string => {
	let result = ''
	let i = 0
	
	while (i < text.length) {
		let matched = false
		
		// Try longer sequences first
		for (let len = 4; len >= 1; len--) {
			const substr = text.slice(i, i + len)
			if (HARVARD_KYOTO_TO_DEVANAGARI[substr]) {
				result += HARVARD_KYOTO_TO_DEVANAGARI[substr]
				i += len
				matched = true
				break
			}
		}
		
		if (!matched) {
			result += text[i]
			i++
		}
	}
	
	return result
}
