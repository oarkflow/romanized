/**
 * IAST (International Alphabet of Sanskrit Transliteration) Scheme
 * Standard romanization used in academic and scholarly works
 */

import { buildMapping, type CompiledMapping } from '../transliterate-utils'

// IAST uses diacritical marks: ā ī ū ṛ ṝ ḷ ḹ ṅ ñ ṭ ḍ ṇ ś ṣ ṃ ḥ

export interface IASTMapping {
	vowels: CompiledMapping<{ independent: string; matra: string; inherent?: boolean }>
	consonants: CompiledMapping<string>
	diacritics: CompiledMapping<string>
}

/**
 * IAST vowel mappings with both Unicode diacritics and ASCII alternatives
 */
export const iastVowelMapping = buildMapping<{ independent: string; matra: string; inherent?: boolean }>([
	// Long vowels with diacritics
	{ keys: ['ā', 'aa'], value: { independent: 'आ', matra: 'ा' } },
	{ keys: ['ī', 'ii'], value: { independent: 'ई', matra: 'ी' } },
	{ keys: ['ū', 'uu'], value: { independent: 'ऊ', matra: 'ू' } },
	
	// Vocalic vowels
	{ keys: ['ṛ', '.r', 'r.'], value: { independent: 'ऋ', matra: 'ृ' } },
	{ keys: ['ṝ', '.rr', 'rr.'], value: { independent: 'ॠ', matra: 'ॄ' } },
	{ keys: ['ḷ', '.l', 'l.'], value: { independent: 'ऌ', matra: 'ॢ' } },
	{ keys: ['ḹ', '.ll', 'll.'], value: { independent: 'ॡ', matra: 'ॣ' } },
	
	// Short vowels
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
 * IAST consonant mappings
 */
export const iastConsonantMapping = buildMapping<string>([
	// Velars (ka-varga)
	{ keys: ['k'], value: 'क' },
	{ keys: ['kh'], value: 'ख' },
	{ keys: ['g'], value: 'ग' },
	{ keys: ['gh'], value: 'घ' },
	{ keys: ['ṅ', '.n'], value: 'ङ' },
	
	// Palatals (cha-varga)
	{ keys: ['c'], value: 'च' },
	{ keys: ['ch'], value: 'छ' },
	{ keys: ['j'], value: 'ज' },
	{ keys: ['jh'], value: 'झ' },
	{ keys: ['ñ', '~n'], value: 'ञ' },
	
	// Retroflex (ta-varga)
	{ keys: ['ṭ', '.t'], value: 'ट' },
	{ keys: ['ṭh', '.th'], value: 'ठ' },
	{ keys: ['ḍ', '.d'], value: 'ड' },
	{ keys: ['ḍh', '.dh'], value: 'ढ' },
	{ keys: ['ṇ', '.n'], value: 'ण' },
	
	// Dentals (ta-varga)
	{ keys: ['t'], value: 'त' },
	{ keys: ['th'], value: 'थ' },
	{ keys: ['d'], value: 'द' },
	{ keys: ['dh'], value: 'ध' },
	{ keys: ['n'], value: 'न' },
	
	// Labials (pa-varga)
	{ keys: ['p'], value: 'प' },
	{ keys: ['ph'], value: 'फ' },
	{ keys: ['b'], value: 'ब' },
	{ keys: ['bh'], value: 'भ' },
	{ keys: ['m'], value: 'म' },
	
	// Semivowels (ya-varga)
	{ keys: ['y'], value: 'य' },
	{ keys: ['r'], value: 'र' },
	{ keys: ['l'], value: 'ल' },
	{ keys: ['v'], value: 'व' },
	
	// Sibilants (sha-varga)
	{ keys: ['ś', '.s'], value: 'श' },
	{ keys: ['ṣ', 's.'], value: 'ष' },
	{ keys: ['s'], value: 'स' },
	{ keys: ['h'], value: 'ह' },
	
	// Compound consonants
	{ keys: ['kṣ', 'k.s'], value: 'क्ष' },
	{ keys: ['jñ', 'j~n'], value: 'ज्ञ' },
	{ keys: ['tr'], value: 'त्र' },
	{ keys: ['śr', '.sr'], value: 'श्र' },
])

/**
 * IAST diacritic mappings
 */
export const iastDiacriticMapping = buildMapping<string>([
	{ keys: ['ṃ', '.m', 'm.'], value: 'ं' }, // Anusvara
	{ keys: ['ḥ', '.h', 'h.'], value: 'ः' }, // Visarga
	{ keys: ['m̐', '~m'], value: 'ँ' }, // Chandrabindu (rare in IAST)
])

/**
 * Create IAST mappings
 */
export const createIASTMappings = (): IASTMapping => ({
	vowels: iastVowelMapping,
	consonants: iastConsonantMapping,
	diacritics: iastDiacriticMapping,
})

/**
 * IAST to Devanagari character map for reverse transliteration
 */
export const IAST_TO_DEVANAGARI: Record<string, string> = {
	// Vowels
	'ā': 'आ', 'ī': 'ई', 'ū': 'ऊ',
	'ṛ': 'ऋ', 'ṝ': 'ॠ', 'ḷ': 'ऌ', 'ḹ': 'ॡ',
	'a': 'अ', 'i': 'इ', 'u': 'उ',
	'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
	
	// Consonants
	'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ',
	'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
	'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
	't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
	'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
	'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
	'ś': 'श', 'ṣ': 'ष', 's': 'स', 'h': 'ह',
	
	// Diacritics
	'ṃ': 'ं', 'ḥ': 'ः', 'm̐': 'ँ',
	
	// Compounds
	'kṣ': 'क्ष', 'jñ': 'ज्ञ', 'tr': 'त्र', 'śr': 'श्र',
}

/**
 * Devanagari to IAST character map
 */
export const DEVANAGARI_TO_IAST: Record<string, string> = {
	// Vowels
	'आ': 'ā', 'ई': 'ī', 'ऊ': 'ū',
	'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ',
	'अ': 'a', 'इ': 'i', 'उ': 'u',
	'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
	
	// Vowel matras
	'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū',
	'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
	'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
	
	// Consonants
	'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'ṅa',
	'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
	'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': 'ḍha', 'ण': 'ṇa',
	'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
	'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
	'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
	'श': 'śa', 'ष': 'ṣa', 'स': 'sa', 'ह': 'ha',
	
	// Diacritics
	'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐',
	'्': '', // Halant
	
	// Compounds
	'क्ष': 'kṣa', 'ज्ञ': 'jña', 'त्र': 'tra', 'श्र': 'śra',
}

/**
 * Convert text from IAST to Devanagari
 */
export const iastToDevanagari = (text: string): string => {
	let result = ''
	let i = 0
	
	while (i < text.length) {
		let matched = false
		
		// Try matching longest sequences first (3, 2, 1 characters)
		for (let len = 3; len >= 1; len--) {
			const substr = text.slice(i, i + len)
			if (IAST_TO_DEVANAGARI[substr]) {
				result += IAST_TO_DEVANAGARI[substr]
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

/**
 * Convert text from Devanagari to IAST
 */
export const devanagariToIAST = (text: string): string => {
	let result = ''
	let i = 0
	
	while (i < text.length) {
		let matched = false
		
		// Try matching longest sequences first
		for (let len = 3; len >= 1; len--) {
			const substr = text.slice(i, i + len)
			if (DEVANAGARI_TO_IAST[substr]) {
				result += DEVANAGARI_TO_IAST[substr]
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
