/**
 * Velthuis Transliteration
 * LaTeX-friendly notation using dot prefixes
 */

import { buildMapping, type CompiledMapping, createSchemeConverter } from '../transliterate-utils'

export interface VelthuisMapping {
    vowels: CompiledMapping<{ independent: string; matra: string; inherent?: boolean }>
    consonants: CompiledMapping<string>
    diacritics: CompiledMapping<string>
}

/**
 * Velthuis vowel mappings
 * Uses "a for आ, .r for ऋ
 */
export const velthuisVowelMapping = buildMapping<{ independent: string; matra: string; inherent?: boolean }>([
    // Long vowels with quote
    { keys: ['"a'], value: { independent: 'आ', matra: 'ा' } },
    { keys: ['"i'], value: { independent: 'ई', matra: 'ी' } },
    { keys: ['"u'], value: { independent: 'ऊ', matra: 'ू' } },

    // Vocalic vowels (dot prefix)
    { keys: ['.r'], value: { independent: 'ऋ', matra: 'ृ' } },
    { keys: ['.rr'], value: { independent: 'ॠ', matra: 'ॄ' } },
    { keys: ['.l'], value: { independent: 'ऌ', matra: 'ॢ' } },
    { keys: ['.ll'], value: { independent: 'ॡ', matra: 'ॣ' } },

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
 * Velthuis consonant mappings
 * Uses dot prefix for retroflex: .t=ट, .d=ड, .n=ण
 */
export const velthuisConsonantMapping = buildMapping<string>([
    // Velars
    { keys: ['k'], value: 'क' },
    { keys: ['kh'], value: 'ख' },
    { keys: ['g'], value: 'ग' },
    { keys: ['gh'], value: 'घ' },
    { keys: ['"n'], value: 'ङ' }, // velar nasal (quote)

    // Palatals
    { keys: ['c'], value: 'च' },
    { keys: ['ch'], value: 'छ' },
    { keys: ['j'], value: 'ज' },
    { keys: ['jh'], value: 'झ' },
    { keys: ['~n'], value: 'ञ' }, // palatal nasal (tilde)

    // Retroflex (dot prefix)
    { keys: ['.t'], value: 'ट' },
    { keys: ['.th'], value: 'ठ' },
    { keys: ['.d'], value: 'ड' },
    { keys: ['.dh'], value: 'ढ' },
    { keys: ['.n'], value: 'ण' },

    // Dentals
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
    { keys: ['"s'], value: 'श' }, // palatal (quote)
    { keys: ['.s'], value: 'ष' }, // retroflex (dot)
    { keys: ['s'], value: 'स' }, // dental
    { keys: ['h'], value: 'ह' },

    // Compounds
    { keys: ['k.s'], value: 'क्ष' },
    { keys: ['j~n'], value: 'ज्ञ' },
])

/**
 * Velthuis diacritic mappings
 */
export const velthuisDiacriticMapping = buildMapping<string>([
    { keys: ['.m'], value: 'ं' }, // Anusvara
    { keys: ['.h'], value: 'ः' }, // Visarga
    { keys: ['.n'], value: 'ँ' }, // Chandrabindu (alternative)
])

export const createVelthuisMappings = (): VelthuisMapping => ({
    vowels: velthuisVowelMapping,
    consonants: velthuisConsonantMapping,
    diacritics: velthuisDiacriticMapping,
})

export const VELTHUIS_TO_DEVANAGARI: Record<string, string> = {
    // Vowels
    '"a': 'आ', '"i': 'ई', '"u': 'ऊ',
    '.r': 'ऋ', '.rr': 'ॠ', '.l': 'ऌ', '.ll': 'ॡ',
    'a': 'अ', 'i': 'इ', 'u': 'उ',
    'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
    // Consonants
    'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', '"n': 'ङ',
    'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', '~n': 'ञ',
    '.t': 'ट', '.th': 'ठ', '.d': 'ड', '.dh': 'ढ', '.n': 'ण',
    't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
    'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
    '"s': 'श', '.s': 'ष', 's': 'स', 'h': 'ह',
    // Diacritics
    '.m': 'ं', '.h': 'ः',
    // Compounds
    'k.s': 'क्ष', 'j~n': 'ज्ञ',
}

export const velthuisToDevanagari = createSchemeConverter({
    consonants: {
        'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', '"n': 'ङ',
        'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', '~n': 'ञ',
        '.t': 'ट', '.th': 'ठ', '.d': 'ड', '.dh': 'ढ', '.n': 'ण',
        't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
        'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
        'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
        '"s': 'श', '.s': 'ष', 's': 'स', 'h': 'ह',
    },
    vowelMatras: {
        '"a': 'ा',
        'i': 'ि',
        '"i': 'ी',
        'u': 'ु',
        '"u': 'ू',
        '.r': 'ृ',
        '.rr': 'ॄ',
        '.l': 'ॢ',
        '.ll': 'ॣ',
        'e': 'े',
        'ai': 'ै',
        'o': 'ो',
        'au': 'ौ',
    },
    independentVowels: {
        'a': 'अ',
        '"a': 'आ',
        'i': 'इ',
        '"i': 'ई',
        'u': 'उ',
        '"u': 'ऊ',
        '.r': 'ऋ',
        '.rr': 'ॠ',
        '.l': 'ऌ',
        '.ll': 'ॡ',
        'e': 'ए',
        'ai': 'ऐ',
        'o': 'ओ',
        'au': 'औ',
    },
    diacritics: {
        '.m': 'ं',
        '.h': 'ः',
        '~m': 'ँ',
    },
    caseSensitive: false,
})
