/**
 * ISO 15919 (International Standard for Transliteration of Devanagari)
 * Standard romanization for Indic scripts
 */

import { buildMapping, type CompiledMapping, createSchemeConverter } from '../transliterate-utils'

export interface ISO15919Mapping {
    vowels: CompiledMapping<{ independent: string; matra: string; inherent?: boolean }>
    consonants: CompiledMapping<string>
    diacritics: CompiledMapping<string>
}

/**
 * ISO 15919 vowel mappings
 * Very similar to IAST with minor differences
 */
export const iso15919VowelMapping = buildMapping<{ independent: string; matra: string; inherent?: boolean }>([
    // Long vowels with macron
    { keys: ['ā', 'aa'], value: { independent: 'आ', matra: 'ा' } },
    { keys: ['ī', 'ii'], value: { independent: 'ई', matra: 'ी' } },
    { keys: ['ū', 'uu'], value: { independent: 'ऊ', matra: 'ू' } },

    // Vocalic vowels
    { keys: ['r̥', '.r', 'r.'], value: { independent: 'ऋ', matra: 'ृ' } },
    { keys: ['r̥̄', '.rr', 'rr.'], value: { independent: 'ॠ', matra: 'ॄ' } },
    { keys: ['l̥', '.l', 'l.'], value: { independent: 'ऌ', matra: 'ॢ' } },
    { keys: ['l̥̄', '.ll', 'll.'], value: { independent: 'ॡ', matra: 'ॣ' } },

    // Short vowels
    { keys: ['a'], value: { independent: 'अ', matra: '', inherent: true } },
    { keys: ['i'], value: { independent: 'इ', matra: 'ि' } },
    { keys: ['u'], value: { independent: 'उ', matra: 'ु' } },

    // Diphthongs (no diacritics - key difference from IAST)
    { keys: ['e'], value: { independent: 'ए', matra: 'े' } },
    { keys: ['ai'], value: { independent: 'ऐ', matra: 'ै' } },
    { keys: ['o'], value: { independent: 'ओ', matra: 'ो' } },
    { keys: ['au'], value: { independent: 'औ', matra: 'ौ' } },
])

/**
 * ISO 15919 consonant mappings
 */
export const iso15919ConsonantMapping = buildMapping<string>([
    // Velars
    { keys: ['k'], value: 'क' },
    { keys: ['kh'], value: 'ख' },
    { keys: ['g'], value: 'ग' },
    { keys: ['gh'], value: 'घ' },
    { keys: ['ṅ', '.n'], value: 'ङ' },

    // Palatals
    { keys: ['c'], value: 'च' },
    { keys: ['ch'], value: 'छ' },
    { keys: ['j'], value: 'ज' },
    { keys: ['jh'], value: 'झ' },
    { keys: ['ñ', '~n'], value: 'ञ' },

    // Retroflex
    { keys: ['ṭ', '.t'], value: 'ट' },
    { keys: ['ṭh', '.th'], value: 'ठ' },
    { keys: ['ḍ', '.d'], value: 'ड' },
    { keys: ['ḍh', '.dh'], value: 'ढ' },
    { keys: ['ṇ', '.n'], value: 'ण' },

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
    { keys: ['ś', '.s'], value: 'श' },
    { keys: ['ṣ', 's.'], value: 'ष' },
    { keys: ['s'], value: 'स' },
    { keys: ['h'], value: 'ह' },

    // Compounds
    { keys: ['kṣ', 'k.s'], value: 'क्ष' },
    { keys: ['jñ', 'j~n'], value: 'ज्ञ' },
])

/**
 * ISO 15919 diacritic mappings
 */
export const iso15919DiacriticMapping = buildMapping<string>([
    { keys: ['ṁ', '.m', 'm.'], value: 'ं' }, // Anusvara (different from IAST ṃ)
    { keys: ['ḥ', '.h', 'h.'], value: 'ः' }, // Visarga
    { keys: ['m̐', '~m'], value: 'ँ' }, // Chandrabindu
])

export const createISO15919Mappings = (): ISO15919Mapping => ({
    vowels: iso15919VowelMapping,
    consonants: iso15919ConsonantMapping,
    diacritics: iso15919DiacriticMapping,
})

export const ISO15919_TO_DEVANAGARI: Record<string, string> = {
    // Vowels
    'ā': 'आ', 'ī': 'ई', 'ū': 'ऊ',
    'r̥': 'ऋ', 'r̥̄': 'ॠ', 'l̥': 'ऌ', 'l̥̄': 'ॡ',
    'a': 'अ', 'i': 'इ', 'u': 'उ',
    'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
    // Consonants (same as IAST)
    'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ',
    'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
    'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
    't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
    'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
    'ś': 'श', 'ṣ': 'ष', 's': 'स', 'h': 'ह',
    // Diacritics
    'ṁ': 'ं', 'ḥ': 'ः', 'm̐': 'ँ',
}

export const iso15919ToDevanagari = createSchemeConverter({
    consonants: {
        'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ', '.n': 'ङ',
        'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ', '~n': 'ञ',
        'ṭ': 'ट', '.t': 'ट', 'ṭh': 'ठ', '.th': 'ठ',
        'ḍ': 'ड', '.d': 'ड', 'ḍh': 'ढ', '.dh': 'ढ',
        'ṇ': 'ण',
        't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
        'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
        'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
        'ś': 'श', '.s': 'श', 'ṣ': 'ष', 's.': 'ष', 's': 'स', 'h': 'ह',
    },
    vowelMatras: {
        'ā': 'ा', 'aa': 'ा',
        'i': 'ि',
        'ī': 'ी', 'ii': 'ी',
        'u': 'ु',
        'ū': 'ू', 'uu': 'ू',
        'r̥': 'ृ', '.r': 'ृ',
        'r̥̄': 'ॄ', '.rr': 'ॄ',
        'l̥': 'ॢ', '.l': 'ॢ',
        'l̥̄': 'ॣ', '.ll': 'ॣ',
        'e': 'े',
        'ai': 'ै',
        'o': 'ो',
        'au': 'ौ',
    },
    independentVowels: {
        'a': 'अ',
        'ā': 'आ', 'aa': 'आ',
        'i': 'इ',
        'ī': 'ई', 'ii': 'ई',
        'u': 'उ',
        'ū': 'ऊ', 'uu': 'ऊ',
        'r̥': 'ऋ', '.r': 'ऋ',
        'r̥̄': 'ॠ', '.rr': 'ॠ',
        'l̥': 'ऌ', '.l': 'ऌ',
        'l̥̄': 'ॡ', '.ll': 'ॡ',
        'e': 'ए',
        'ai': 'ऐ',
        'o': 'ओ',
        'au': 'औ',
    },
    diacritics: {
        'ṁ': 'ं', '.m': 'ं', 'm.': 'ं',
        'ḥ': 'ः', '.h': 'ः', 'h.': 'ः',
        'm̐': 'ँ', '~m': 'ँ',
    },
    caseSensitive: false,
})
