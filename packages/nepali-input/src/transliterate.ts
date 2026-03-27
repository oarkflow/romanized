import { LEXICON_ENTRIES } from './lexicon'
import {
    getCommonWordMap,
    getCommonWordsForLanguage,
    normalizeLexicalKey,
    type DevanagariLanguage,
} from './language-data'

export type { DevanagariLanguage } from './language-data'

interface MappingEntry<T> {
    keys: string[]
    value: T
    caseSensitive?: boolean
}

interface CompiledMapping<T> {
    sensitive: Array<{ key: string; value: T }>
    insensitive: Array<{ key: string; value: T }>
}

const buildMapping = <T>(entries: MappingEntry<T>[]): CompiledMapping<T> => {
    const sensitive: Array<{ key: string; value: T }> = []
    const insensitive: Array<{ key: string; value: T }> = []

    for (const entry of entries) {
        for (const key of entry.keys) {
            if (!key) continue
            if (entry.caseSensitive) {
                sensitive.push({ key, value: entry.value })
            } else {
                insensitive.push({ key: key.toLowerCase(), value: entry.value })
            }
        }
    }

    sensitive.sort((a, b) => b.key.length - a.key.length)
    insensitive.sort((a, b) => b.key.length - a.key.length)

    return { sensitive, insensitive }
}

interface MappingMatch<T> {
    config: T
    raw: string
    key: string
}

const matchFromMapping = <T>(
    source: string,
    lowerSource: string,
    index: number,
    mapping: CompiledMapping<T>
): MappingMatch<T> | null => {
    for (const candidate of mapping.sensitive) {
        if (source.startsWith(candidate.key, index)) {
            return {
                config: candidate.value,
                raw: source.slice(index, index + candidate.key.length),
                key: candidate.key,
            }
        }
    }

    for (const candidate of mapping.insensitive) {
        if (lowerSource.startsWith(candidate.key, index)) {
            return {
                config: candidate.value,
                raw: source.slice(index, index + candidate.key.length),
                key: candidate.key,
            }
        }
    }

    return null
}

const HALANT = '्'
const DEFAULT_HALANT_TRIGGERS = ['^']

const shouldIndexLexiconEntry = (roman: string) => {
    const trimmed = roman.trim()
    if (trimmed.length >= 5) return true
    if (/[A-Z]/.test(trimmed)) return true
    if (/[\s\-\.\u2013\u2014'’]/.test(trimmed)) return true
    return false
}

const lexicalWordMap = new Map<string, string>()
for (const entry of LEXICON_ENTRIES) {
    if (!shouldIndexLexiconEntry(entry.roman)) continue
    const key = normalizeLexicalKey(entry.roman)
    if (!key || lexicalWordMap.has(key)) continue
    lexicalWordMap.set(key, entry.nepali)
}

const digitMap: Record<string, string> = {
    '0': '०',
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
}

const vowelMapping = buildMapping<{ independent: string; matra: string; inherent?: boolean }>([
    { keys: ['aa', 'a:'], value: { independent: 'आ', matra: 'ा' } },
    { keys: ['a'], value: { independent: 'अ', matra: '', inherent: true } },
    { keys: ['ai'], value: { independent: 'ऐ', matra: 'ै' } },
    { keys: ['au'], value: { independent: 'औ', matra: 'ौ' } },
    { keys: ['ee', 'ii'], value: { independent: 'ई', matra: 'ी' } },
    { keys: ['ei', 'e'], value: { independent: 'ए', matra: 'े' } },
    { keys: ['oo', 'uu'], value: { independent: 'ऊ', matra: 'ू' } },
    { keys: ['oi', 'o'], value: { independent: 'ओ', matra: 'ो' } },
    { keys: ['ri'], value: { independent: 'ऋ', matra: 'ृ' } },
    { keys: ['rri'], value: { independent: 'ॠ', matra: 'ॄ' } },
    { keys: ['R'], value: { independent: 'ॠ', matra: 'ॄ' }, caseSensitive: true },
    { keys: ['lri'], value: { independent: 'ऌ', matra: 'ॢ' } },
    { keys: ['lree'], value: { independent: 'ॡ', matra: 'ॣ' } },
    { keys: ['L'], value: { independent: 'ॡ', matra: 'ॣ' }, caseSensitive: true },
    { keys: ['e^'], value: { independent: 'ऍ', matra: 'ॅ' } },
    { keys: ['eN'], value: { independent: 'ऍ', matra: 'ॅ' }, caseSensitive: true },
    // Dravidian short vowels
    { keys: ['e.'], value: { independent: 'ऎ', matra: 'ॆ' } },
    { keys: ['o.'], value: { independent: 'ऒ', matra: 'ॊ' } },
    // Candra o (for English loanwords like "coffee" -> कॉफ़ी)
    { keys: ['aw', 'o^'], value: { independent: 'ऑ', matra: 'ॉ' } },
    // Marathi special vowels
    { keys: ['.a'], value: { independent: 'ॲ', matra: '' } },
    { keys: ['oe'], value: { independent: 'ॳ', matra: '' } },
    { keys: ['ooe'], value: { independent: 'ॴ', matra: '' } },
    // Rare dependent vowel signs and archaic matras
    { keys: ['oe~'], value: { independent: 'ॳ', matra: 'ऺ' } },      // U+093A - Vowel Sign OE
    { keys: ['ooe~'], value: { independent: 'ॴ', matra: 'ऻ' } },     // U+093B - Vowel Sign OOE
    { keys: ['eP'], value: { independent: 'ए', matra: 'ॎ' }, caseSensitive: true },       // U+094E - Vowel Sign Prishthamatra E
    { keys: ['awP'], value: { independent: 'ऑ', matra: 'ॏ' }, caseSensitive: true },      // U+094F - Vowel Sign Aw
    { keys: ['eL'], value: { independent: 'ऍ', matra: 'ॕ' }, caseSensitive: true },       // U+0955 - Vowel Sign Candra Long E
    { keys: ['uL'], value: { independent: 'उ', matra: 'ॖ' }, caseSensitive: true },       // U+0956 - Vowel Sign Ue
    { keys: ['uuL'], value: { independent: 'ऊ', matra: 'ॗ' }, caseSensitive: true },      // U+0957 - Vowel Sign Uue
    // Kashmiri vowels
    { keys: ['aw.'], value: { independent: 'ॵ', matra: '' } },
    { keys: ['ue'], value: { independent: 'ॶ', matra: '' } },
    { keys: ['uue'], value: { independent: 'ॷ', matra: '' } },
    // Additional archaic vowels (U+0904, U+0960, U+0961)
    { keys: ['a4'], value: { independent: '\u0904', matra: '' } },  // U+0904 - Short A (historical)
    { keys: ['RR'], value: { independent: '\u0960', matra: 'ॄ' }, caseSensitive: true },  // U+0960 - Vocalic RR (alternate)
    { keys: ['LL'], value: { independent: '\u0961', matra: 'ॣ' }, caseSensitive: true },  // U+0961 - Vocalic LL (alternate)
    { keys: ['i'], value: { independent: 'इ', matra: 'ि' } },
    { keys: ['u'], value: { independent: 'उ', matra: 'ु' } },
    { keys: ['eei'], value: { independent: 'ए', matra: 'े' } },
    { keys: ['auu'], value: { independent: 'औ', matra: 'ौ' } },
    { keys: ['A'], value: { independent: 'आ', matra: 'ा' }, caseSensitive: true },
    { keys: ['I'], value: { independent: 'ई', matra: 'ी' }, caseSensitive: true },
    { keys: ['U'], value: { independent: 'ऊ', matra: 'ू' }, caseSensitive: true },
    { keys: ['E'], value: { independent: 'ए', matra: 'े' }, caseSensitive: true },
    { keys: ['O'], value: { independent: 'ओ', matra: 'ो' }, caseSensitive: true },
])

const consonantMapping = buildMapping<string>([
    { keys: ['ksh', 'kṣ', 'x'], value: 'क्ष' },
    { keys: ['gy', 'gny', 'dny'], value: 'ज्ञ' },
    { keys: ['shr', 'shra'], value: 'श्र' },
    { keys: ['tth'], value: 'त्थ' },
    { keys: ['ddh'], value: 'द्ध' },
    { keys: ['ntr'], value: 'न्त्र' },
    { keys: ['khy'], value: 'ख्य' },
    { keys: ['kh'], value: 'ख' },
    { keys: ['gh'], value: 'घ' },
    { keys: ['chh'], value: 'छ' },
    { keys: ['ch'], value: 'च' },
    { keys: ['jh'], value: 'झ' },
    { keys: ['th'], value: 'थ' },
    { keys: ['dh'], value: 'ध' },
    { keys: ['ph', 'fh'], value: 'फ' },
    { keys: ['bh'], value: 'भ' },
    { keys: ['sh'], value: 'श' },
    { keys: ['ng'], value: 'ङ' },
    { keys: ['ny'], value: 'ञ' },
    { keys: ['tr'], value: 'त्र' },
    { keys: ['qa'], value: 'क़' },
    { keys: ['k', 'q'], value: 'क' },
    { keys: ['g'], value: 'ग' },
    { keys: ['c'], value: 'क' },
    { keys: ['za'], value: 'ज़' },
    { keys: ['j', 'z'], value: 'ज' },
    { keys: ['fa'], value: 'फ़' },
    { keys: ['t'], value: 'त' },
    { keys: ['d'], value: 'द' },
    { keys: ['n'], value: 'न' },
    { keys: ['p'], value: 'प' },
    { keys: ['b'], value: 'ब' },
    { keys: ['m'], value: 'म' },
    { keys: ['y'], value: 'य' },
    { keys: ['r'], value: 'र' },
    { keys: ['l'], value: 'ल' },
    { keys: ['v', 'w'], value: 'व' },
    { keys: ['sw'], value: 'स्व' },
    { keys: ['s'], value: 'स' },
    { keys: ['h'], value: 'ह' },
    { keys: ['f'], value: 'फ' },
    { keys: ['T'], value: 'ट', caseSensitive: true },
    { keys: ['Th'], value: 'ठ', caseSensitive: true },
    { keys: ['D'], value: 'ड', caseSensitive: true },
    { keys: ['Dh'], value: 'ढ', caseSensitive: true },
    { keys: ['N'], value: 'ण', caseSensitive: true },
    { keys: ['Sh'], value: 'ष', caseSensitive: true },

    // Nukta consonants (Urdu/Persian sounds) - Use dot notation to avoid conflicts
    { keys: ['kh.'], value: 'ख़' },   // U+0959 - Urdu khe (kh + nukta)
    { keys: ['gh.'], value: 'ग़' },   // U+095A - Urdu ghain (gh + nukta)
    { keys: ['D.'], value: 'ड़' },    // U+095C - Hindi Ra (flap, D + nukta)
    { keys: ['Dh.'], value: 'ढ़' },   // U+095D - Hindi Rha (aspirated flap, Dh + nukta)
    { keys: ['y.'], value: 'य़' },    // U+095F - Bengali Ya (y + nukta)

    // Additional nukta variants for complete coverage
    { keys: ['q.'], value: 'क़' },    // U+0958 - Urdu qaf
    { keys: ['z.'], value: 'ज़' },    // U+095B - Urdu ze
    { keys: ['f.'], value: 'फ़' },    // U+095E - Urdu fe

    // Dravidian consonants - Use dot notation
    { keys: ['.r'], value: 'ऱ' },     // U+0931 - Tamil/Malayalam ra
    { keys: ['.n'], value: 'ऩ' },     // U+0929 - Dravidian na
    { keys: ['.l'], value: 'ळ' },     // U+0933 - Marathi/Kannada lla
    { keys: ['.zh'], value: 'ऴ' },    // U+0934 - Malayalam/Tamil zha

    // Archaic/historical consonants
    { keys: ['jj'], value: 'ज्ज' },   // Historical archaic letter JJA
    { keys: ['GG'], value: 'ॻ', caseSensitive: true },     // U+097B - Letter GGA (historical)
    { keys: ['JJ'], value: 'ॼ', caseSensitive: true },     // U+097C - Letter JA (historical)
    { keys: ['DD'], value: 'ॾ', caseSensitive: true },     // U+097E - Letter DDDA (historical)
    { keys: ['BH'], value: 'ॿ', caseSensitive: true },     // U+097F - Letter BBA (historical)
])

const diacriticMapping = buildMapping<string>([
    { keys: ['M'], value: 'ं', caseSensitive: true },       // U+0902 - Anusvara
    { keys: ['H'], value: 'ः', caseSensitive: true },       // U+0903 - Visarga
    { keys: ['~'], value: 'ँ' },                            // U+0901 - Candrabindu
    { keys: ['m~', '~m', 'm`'], value: 'ं' },
    { keys: ['n~', '~n'], value: 'ँ' },
    { keys: ['h~', '~h'], value: 'ः' },
    { keys: ['.a', "'"], value: 'ऽ' },                     // U+093D - Avagraha
    { keys: ['om'], value: 'ॐ' },                           // U+0950 - Om
    { keys: ['A~'], value: 'ऀ', caseSensitive: true },                           // U+0900 - Sign Inverted Candrabindu (Kashmiri)
    { keys: ['H.'], value: 'ᳲ', caseSensitive: true },                           // U+1CF2 - Sign Ardhavisarga
    { keys: ['H:'], value: 'ᳵ', caseSensitive: true },                           // U+1CF5 - Sign Jihvamuliya
    { keys: ['h:'], value: 'ᳶ' },                           // U+1CF6 - Sign Upadhmaniya
])

const symbolMapping = buildMapping<string>([
    { keys: ['||'], value: '॥' },           // U+0965 - Double Danda
    { keys: ['|'], value: '।' },            // U+0964 - Danda
    // Note: Single dot "." is NOT mapped to allow nukta/special char sequences like kh., .r, etc.

    // Priority 2: Additional punctuation and special characters
    { keys: ['..'], value: '॰' },           // U+0970 - Abbreviation mark (requires double dot)
    { keys: ['.^'], value: 'ॱ' },           // U+0971 - High spacing dot
    { keys: ['A^'], value: 'ऀ', caseSensitive: true },           // U+0900 - Inverted Candrabindu (Kashmiri)
    { keys: ['^~'], value: 'ँ' },           // U+0901 - Candrabindu (already in diacritics, but can be typed independently)
    { keys: ['^.'], value: '़' },           // U+093C - Nukta (standalone, for manual composition)
    { keys: ['.oe~'], value: 'ऺ' },         // U+093A - Vowel Sign OE (standalone)
    { keys: ['.ooe~'], value: 'ऻ' },        // U+093B - Vowel Sign OOE (standalone)
    { keys: ['.eP'], value: 'ॎ', caseSensitive: true },          // U+094E - Vowel Sign Prishthamatra E (standalone)
    { keys: ['.awP'], value: 'ॏ', caseSensitive: true },         // U+094F - Vowel Sign Aw (standalone)
    { keys: ['.eL'], value: 'ॕ', caseSensitive: true },          // U+0955 - Vowel Sign Candra Long E (standalone)
    { keys: ['.uL'], value: 'ॖ', caseSensitive: true },          // U+0956 - Vowel Sign Ue (standalone)
    { keys: ['.uuL'], value: 'ॗ', caseSensitive: true },         // U+0957 - Vowel Sign Uue (standalone)
    { keys: ['.av'], value: 'ऽ' },          // U+093D - Avagraha (alternate input)
    { keys: ['om', 'OM'], value: 'ॐ' },    // U+0950 - Om (already handled but added for completeness)

    // Historical/archaic letters U+0978-U+097D for complete Unicode coverage
    { keys: ['@ma'], value: 'ॸ' },          // U+0978 - Marwari Dda
    { keys: ['@zh'], value: 'ॹ' },          // U+0979 - Zha
    { keys: ['@hy'], value: 'ॺ' },          // U+097A - Heavy Ya
    // U+097B-U+097F already covered in consonantMapping as GG, JJ, DD, BH
    { keys: ['@DD3'], value: 'ॽ', caseSensitive: true },         // U+097D - Glottal Stop

    // Zero-width characters for ligature control
    { keys: ['ZWJ'], value: '‍', caseSensitive: true },          // U+200D - Zero Width Joiner (for ligature control)
    { keys: ['ZWNJ'], value: '‌', caseSensitive: true },         // U+200C - Zero Width Non-Joiner (for ligature breaking)
])

// Priority 2: Vedic accent marks - Complete Unicode coverage (40+ marks)
// U+0951-U+0954: Main Devanagari Vedic marks
// U+1CD0-U+1CDA: Vedic Extensions for tone marks
// U+A8E0-U+A8F7: Combining Devanagari marks
const vedicAccentMapping = buildMapping<string>([
    // Main Vedic accents (U+0951-U+0954)
    { keys: ['\'1', '^1'], value: '\u0951' },   // U+0951 - Udatta (high pitch)
    { keys: ['\'2', '_1'], value: '\u0952' },   // U+0952 - Anudatta (low pitch)
    { keys: ['\'3', '`1'], value: '\u0953' },   // U+0953 - Grave accent
    { keys: ['\'4', "'1"], value: '\u0954' },   // U+0954 - Acute accent

    // Vedic Tone Marks (U+1CD0-U+1CDA)
    { keys: ['\'5', 'v1'], value: '\u1cd0' },   // U+1CD0 - Tone Karshana
    { keys: ['\'6', 'v2'], value: '\u1cd1' },   // U+1CD1 - Tone Shara
    { keys: ['\'7', 'v3'], value: '\u1cd2' },   // U+1CD2 - Tone Prenkha
    { keys: ['\'8', 'v4'], value: '\u1cd3' },   // U+1CD3 - Sign Nihshvasa
    { keys: ['\'9', 'v5'], value: '\u1cd4' },   // U+1CD4 - Tone Midline Svarita
    { keys: ['\'0', 'v6'], value: '\u1cd5' },   // U+1CD5 - Tone Aggravated Independent Svarita
    { keys: ['\'a', 'v7'], value: '\u1cd6' },   // U+1CD6 - Tone Independent Svarita
    { keys: ['\'b', 'v8'], value: '\u1cd7' },   // U+1CD7 - Tone Kathaka Independent Svarita
    { keys: ['\'c', 'v9'], value: '\u1cd8' },   // U+1CD8 - Tone Candra Below
    { keys: ['\'d', 'v0'], value: '\u1cd9' },   // U+1CD9 - Tone Kathaka Independent Svarita Schroeder
    { keys: ['\'e', 'va'], value: '\u1cda' },   // U+1CDA - Tone Double Svarita

    // Additional Vedic Extensions (U+1CDB-U+1CDC)
    { keys: ['\'f', 'vb'], value: '\u1cdb' },   // U+1CDB - Tone Triple Svarita
    { keys: ['\'g', 'vc'], value: '\u1cdc' },   // U+1CDC - Tone Kathaka Anudatta
    { keys: ['\'h', 'vd'], value: '\u1cdd' },   // U+1CDD - Tone Dot Below

    // Combining Devanagari Digits and Signs (U+A8E0-U+A8F7)
    { keys: ['c0'], value: '\ua8e0' },          // U+A8E0 - Combining Digit Zero
    { keys: ['c1'], value: '\ua8e1' },          // U+A8E1 - Combining Digit One
    { keys: ['c2'], value: '\ua8e2' },          // U+A8E2 - Combining Digit Two
    { keys: ['c3'], value: '\ua8e3' },          // U+A8E3 - Combining Digit Three
    { keys: ['c4'], value: '\ua8e4' },          // U+A8E4 - Combining Digit Four
    { keys: ['c5'], value: '\ua8e5' },          // U+A8E5 - Combining Digit Five
    { keys: ['c6'], value: '\ua8e6' },          // U+A8E6 - Combining Digit Six
    { keys: ['c7'], value: '\ua8e7' },          // U+A8E7 - Combining Digit Seven
    { keys: ['c8'], value: '\ua8e8' },          // U+A8E8 - Combining Digit Eight
    { keys: ['c9'], value: '\ua8e9' },          // U+A8E9 - Combining Digit Nine
    { keys: ['c.'], value: '\ua8ea' },          // U+A8EA - Combining Letter A
    { keys: ['cu'], value: '\ua8eb' },          // U+A8EB - Combining Letter U
    { keys: ['ck'], value: '\ua8ec' },          // U+A8EC - Combining Letter Ka
    { keys: ['cn'], value: '\ua8ed' },          // U+A8ED - Combining Letter Na
    { keys: ['cp'], value: '\ua8ee' },          // U+A8EE - Combining Letter Pa
    { keys: ['cr'], value: '\ua8ef' },          // U+A8EF - Combining Letter Ra
    { keys: ['cv'], value: '\ua8f0' },          // U+A8F0 - Combining Letter Vi
    { keys: ['cs'], value: '\ua8f1' },          // U+A8F1 - Combining Letter Anusvara
    { keys: ['c~'], value: '\ua8f2' },          // U+A8F2 - Combining Sign Anusvara
    { keys: ['c^'], value: '\ua8f3' },          // U+A8F3 - Combining Sign Visarga

    // Additional marks for complete coverage
    { keys: ['\'_'], value: '\u1cd6' },         // Alternate input for tone ardhavisarga
    { keys: ['\'='], value: '\u1cd7' },         // Alternate input for tone pluta
    { keys: ['\']'], value: '\u1cd8' },         // Stress sign anudatta
    { keys: ['\'\\\\'], value: '\u1cd9' },      // Stress sign udatta
    { keys: ['\'/'], value: '\u1cda' },         // Stress sign kampa
    { keys: ['\'|'], value: '\u1cdb' },         // Grave accent below

    // Om variations and special signs
    { keys: ['.om'], value: '\u1cf4' },         // U+1CF4 - Tone Candra Above
    { keys: ['om.'], value: '\u1cf8' },         // U+1CF8 - Tone Ring Above
    { keys: ['om:'], value: '\u1cf9' },         // U+1CF9 - Tone Double Ring Above
])

export type TransliterationTokenType =
    | 'syllable'
    | 'vowel'
    | 'digit'
    | 'punctuation'
    | 'whitespace'
    | 'diacritic'
    | 'halant'
    | 'other'

export interface TransliterationToken {
    source: string
    translated: string
    type: TransliterationTokenType
}

export interface TransliterationResult {
    output: string
    tokens: TransliterationToken[]
}

export interface TransliterationOptions {
    useDevanagariDigits?: boolean
    halantTriggers?: string[]
    language?: DevanagariLanguage
    enableExtendedRomanization?: boolean
    customWordMap?: Record<string, string>
}

interface PendingConsonant {
    glyph: string
    source: string
}

const isWhitespace = (char: string) => /\s/.test(char)
const isPunctuation = (char: string) => /[\p{P}\p{S}]/u.test(char)
const isRomanLetter = (char: string) => /[a-z]/i.test(char)

const commitPending = (
    pending: PendingConsonant | null,
    output: string[],
    tokens: TransliterationToken[],
    extra: { suffix?: string; tokenType?: TransliterationTokenType; sourceExtension?: string } = {}
): PendingConsonant | null => {
    if (!pending) return null
    const suffix = extra.suffix ?? ''
    const syllable = `${pending.glyph}${suffix}`
    output.push(syllable)
    tokens.push({
        source: `${pending.source}${extra.sourceExtension ?? ''}`,
        translated: syllable,
        type: extra.tokenType ?? 'syllable',
    })
    return null
}

export const transliterateDetailed = (
    rawInput: string,
    options: TransliterationOptions = {}
): TransliterationResult => {
    const input = rawInput.normalize('NFC')
    const lowerInput = input.toLowerCase()
    const output: string[] = []
    const tokens: TransliterationToken[] = []
    const halantTriggers = options.halantTriggers ?? DEFAULT_HALANT_TRIGGERS
    const useDevanagariDigits = options.useDevanagariDigits ?? true
    const language = options.language ?? 'generic'
    const enableExtendedRomanization = options.enableExtendedRomanization ?? false
    const commonWordMap = getCommonWordMap(language)
    const customWordMap = options.customWordMap

    let pending: PendingConsonant | null = null
    let index = 0

    const tryConsumeLexicalWord = (start: number): number | null => {
        if (!isRomanLetter(input[start])) return null
        const prev = start === 0 ? '' : input[start - 1]
        if (isRomanLetter(prev)) return null
        let cursor = start
        while (cursor < input.length && isRomanLetter(input[cursor])) {
            cursor += 1
        }
        if (cursor === start) return null
        const rawWord = input.slice(start, cursor)
        const normalized = normalizeLexicalKey(rawWord)
        if (!normalized) return null
        const replacement =
            customWordMap?.[rawWord] ??
            customWordMap?.[normalized] ??
            commonWordMap.get(normalized) ??
            lexicalWordMap.get(normalized)
        if (!replacement) return null
        pending = commitPending(pending, output, tokens)
        output.push(replacement)
        tokens.push({ source: rawWord, translated: replacement, type: 'syllable' })
        return cursor
    }

    while (index < input.length) {
        const halantTrigger = halantTriggers.find((trigger) =>
            input.startsWith(trigger, index)
        )

        if (halantTrigger) {
            if (pending) {
                pending = commitPending(pending, output, tokens, {
                    suffix: HALANT,
                    tokenType: 'halant',
                    sourceExtension: halantTrigger,
                })
            } else {
                output.push(HALANT)
                tokens.push({ source: halantTrigger, translated: HALANT, type: 'halant' })
            }
            index += halantTrigger.length
            continue
        }

        const lexicalEnd = tryConsumeLexicalWord(index)
        if (lexicalEnd) {
            index = lexicalEnd
            continue
        }

        const prevChar = index === 0 ? '' : input[index - 1]
        const nextChar = index + 2 >= input.length ? '' : input[index + 2]

        const omIsIsolated =
            (!prevChar || isWhitespace(prevChar) || isPunctuation(prevChar)) &&
            (!nextChar || isWhitespace(nextChar) || isPunctuation(nextChar))

        if (!pending && omIsIsolated && lowerInput.startsWith('om', index)) {
            const source = input.slice(index, index + 2)
            output.push('ॐ')
            tokens.push({ source, translated: 'ॐ', type: 'punctuation' })
            index += 2
            continue
        }

        // Check Vedic accents first (Priority 2 feature)
        if (enableExtendedRomanization) {
            const vedicMatch = matchFromMapping(input, lowerInput, index, vedicAccentMapping)
            if (vedicMatch) {
                output.push(vedicMatch.config)
                tokens.push({ source: vedicMatch.raw, translated: vedicMatch.config, type: 'diacritic' })
                index += vedicMatch.raw.length
                continue
            }
        }

        // Check diacritics before consonants to handle case-sensitive M, H correctly
        const diacriticMatch = matchFromMapping(input, lowerInput, index, diacriticMapping)
        if (diacriticMatch) {
            pending = commitPending(pending, output, tokens)
            output.push(diacriticMatch.config)
            tokens.push({ source: diacriticMatch.raw, translated: diacriticMatch.config, type: 'diacritic' })
            index += diacriticMatch.raw.length
            continue
        }

        // Check vowels BEFORE consonants when there's no pending consonant
        // This handles vocalic vowels like ri, rri, lri, lree, R which should
        // not be parsed as r+i or l+ri but as independent vowels
        if (!pending) {
            const vowelMatch = matchFromMapping(input, lowerInput, index, vowelMapping)
            if (vowelMatch) {
                const { config, raw } = vowelMatch
                output.push(config.independent)
                tokens.push({ source: raw, translated: config.independent, type: 'vowel' })
                index += raw.length
                continue
            }
        }

        const consonantMatch = matchFromMapping(input, lowerInput, index, consonantMapping)
        if (consonantMatch) {
            let glyph = consonantMatch.config
            if (consonantMatch.raw.toLowerCase() === 'dh') {
                const afterDh = lowerInput.slice(index + consonantMatch.raw.length)
                if (afterDh.startsWith('chh') || afterDh.startsWith('ch')) {
                    glyph = 'ढ'
                }
            }
            if (pending) {
                pending = commitPending(pending, output, tokens, { suffix: HALANT, tokenType: 'halant' })
            }
            pending = {
                glyph,
                source: consonantMatch.raw,
            }
            index += consonantMatch.raw.length
            continue
        }

        const vowelMatch = matchFromMapping(input, lowerInput, index, vowelMapping)
        if (vowelMatch && pending) {
            const { config, raw } = vowelMatch
            pending = commitPending(pending, output, tokens, {
                suffix: config.matra,
                sourceExtension: raw,
            })
            index += raw.length
            continue
        }

        const symbolMatch = matchFromMapping(input, lowerInput, index, symbolMapping)
        if (symbolMatch) {
            pending = commitPending(pending, output, tokens)
            output.push(symbolMatch.config)
            tokens.push({ source: symbolMatch.raw, translated: symbolMatch.config, type: 'punctuation' })
            index += symbolMatch.raw.length
            continue
        }

        const currentChar = input[index]

        if (digitMap[currentChar] && useDevanagariDigits) {
            pending = commitPending(pending, output, tokens)
            output.push(digitMap[currentChar])
            tokens.push({ source: currentChar, translated: digitMap[currentChar], type: 'digit' })
            index += 1
            continue
        }

        if (isWhitespace(currentChar)) {
            pending = commitPending(pending, output, tokens)
            output.push(currentChar)
            tokens.push({ source: currentChar, translated: currentChar, type: 'whitespace' })
            index += 1
            continue
        }

        if (isPunctuation(currentChar)) {
            pending = commitPending(pending, output, tokens)
            output.push(currentChar)
            tokens.push({ source: currentChar, translated: currentChar, type: 'punctuation' })
            index += 1
            continue
        }

        pending = commitPending(pending, output, tokens)
        output.push(currentChar)
        tokens.push({ source: currentChar, translated: currentChar, type: 'other' })
        index += 1
    }

    pending = commitPending(pending, output, tokens)

    return {
        output: output.join(''),
        tokens,
    }
}

export const transliterate = (
    input: string,
    options?: TransliterationOptions
): string => transliterateDetailed(input, options).output

// ============================================================================
// REVERSE TRANSLITERATION (Devanagari → Romanized)
// ============================================================================

// Build reverse mappings
const devanagariToRomanConsonant = new Map<string, string>()
const devanagariToRomanVowel = new Map<string, { independent: string; matra: string }>()

// Populate consonant reverse map
const consonantEntries: Array<[string, string]> = [
    ['क्ष', 'ksh'], ['ज्ञ', 'gy'], ['श्र', 'shr'],
    ['न्त्र', 'ntr'], ['ख्य', 'khy'],
    ['त्थ', 'tth'], ['द्ध', 'ddh'],
    ['ङ्ग', 'ng'], ['त्र', 'tr'], ['स्व', 'sw'],
    ['ख', 'kh'], ['घ', 'gh'], ['छ', 'chh'], ['च', 'ch'], ['झ', 'jh'],
    ['थ', 'th'], ['ध', 'dh'], ['फ', 'ph'], ['भ', 'bh'], ['श', 'sh'],
    ['ञ', 'ny'],
    ['ट', 'T'], ['ठ', 'Th'], ['ड', 'D'], ['ढ', 'Dh'], ['ण', 'N'], ['ष', 'Sh'],
    ['क', 'k'], ['ग', 'g'], ['ज', 'j'], ['त', 't'], ['द', 'd'], ['न', 'n'],
    ['प', 'p'], ['ब', 'b'], ['म', 'm'], ['य', 'y'], ['र', 'r'], ['ल', 'l'],
    ['व', 'v'], ['स', 's'], ['ह', 'h'], ['फ', 'f'],
]
for (const [dev, rom] of consonantEntries) {
    devanagariToRomanConsonant.set(dev, rom)
}

// Populate vowel reverse map
const vowelEntries: Array<[string, string, string]> = [
    ['आ', 'ा', 'aa'], ['अ', '', 'a'],
    ['ऐ', 'ै', 'ai'], ['औ', 'ौ', 'au'],
    ['ई', 'ी', 'ee'], ['ए', 'े', 'e'],
    ['ऊ', 'ू', 'oo'], ['ओ', 'ो', 'o'],
    ['ऋ', 'ृ', 'ri'],
    ['इ', 'ि', 'i'], ['उ', 'ु', 'u'],
]
for (const [independent, matra, roman] of vowelEntries) {
    devanagariToRomanVowel.set(independent, { independent: roman, matra: roman })
    if (matra) {
        devanagariToRomanVowel.set(matra, { independent: roman, matra: roman })
    }
}

// Diacritic reverse map
const diacriticToRoman = new Map<string, string>([
    ['ं', 'm~'],
    ['ँ', 'n~'],
    ['ः', 'h~'],
])

// Symbol reverse map
const symbolToRoman = new Map<string, string>([
    ['॥', '||'],
    ['।', '|'],
])

// Digit reverse map
const nepaliDigitToRoman = new Map<string, string>([
    ['०', '0'], ['१', '1'], ['२', '2'], ['३', '3'], ['४', '4'],
    ['५', '5'], ['६', '6'], ['७', '7'], ['८', '8'], ['९', '9'],
])

const isDevanagariChar = (char: string) => {
    const code = char.charCodeAt(0)
    return code >= 0x0900 && code <= 0x097f
}

const isDevanagariWordChar = (char: string) =>
    isDevanagariChar(char) &&
    !nepaliDigitToRoman.has(char) &&
    !symbolToRoman.has(char)

const normalizeReverseRoman = (value: string) => value.toLowerCase()

const SCHWA_DELETION_LANGUAGES = new Set<DevanagariLanguage>(['hindi', 'dogri'])
const LIGHT_SCHWA_DELETION_LANGUAGES = new Set<DevanagariLanguage>(['marathi', 'konkani'])
const CLUSTER_SCHWA_PATTERN = /([kgcjtdnpbmyrlvshfzTDN])a([rlvy])a(?=[kgcjtdnpbmyrlvshfzTDN])/g

const applyReversePhonology = (
    rawRoman: string,
    word: string,
    language: DevanagariLanguage
): string => {
    if (!rawRoman) return rawRoman

    let roman = rawRoman

    if (SCHWA_DELETION_LANGUAGES.has(language)) {
        roman = roman.replace(CLUSTER_SCHWA_PATTERN, '$1$2a')
    }

    const usesTerminalSchwaDeletion =
        SCHWA_DELETION_LANGUAGES.has(language) || LIGHT_SCHWA_DELETION_LANGUAGES.has(language)

    if (usesTerminalSchwaDeletion && roman.endsWith('a')) {
        const lastChar = word[word.length - 1]
        if (lastChar && devanagariToRomanConsonant.has(lastChar)) {
            roman = roman.slice(0, -1)
        }
    }

    return roman
}

const reverseTransliterateWord = (
    word: string,
    nepaliToRoman: Map<string, string>,
    language: DevanagariLanguage
): string => {
    const exact = nepaliToRoman.get(word)
    if (exact) {
        return exact
    }

    const output: string[] = []
    let index = 0

    while (index < word.length) {
        const char = word[index]

        if (diacriticToRoman.has(char)) {
            output.push(diacriticToRoman.get(char)!)
            index += 1
            continue
        }

        if (devanagariToRomanVowel.has(char)) {
            output.push(devanagariToRomanVowel.get(char)!.independent)
            index += 1
            continue
        }

        let clusterMatched = false
        for (let len = 4; len >= 2; len--) {
            const cluster = word.slice(index, index + len)
            if (devanagariToRomanConsonant.has(cluster)) {
                output.push(devanagariToRomanConsonant.get(cluster)!)
                index += len
                clusterMatched = true
                break
            }
        }

        if (clusterMatched) {
            const nextChar = word[index]
            if (nextChar && devanagariToRomanVowel.has(nextChar)) {
                output.push(devanagariToRomanVowel.get(nextChar)!.matra)
                index += 1
            } else if (nextChar === HALANT) {
                index += 1
            } else {
                output.push('a')
            }
            continue
        }

        if (devanagariToRomanConsonant.has(char)) {
            output.push(devanagariToRomanConsonant.get(char)!)
            index += 1

            const nextChar = word[index]
            if (nextChar && devanagariToRomanVowel.has(nextChar)) {
                output.push(devanagariToRomanVowel.get(nextChar)!.matra)
                index += 1
            } else if (nextChar === HALANT) {
                index += 1
            } else {
                output.push('a')
            }
            continue
        }

        if (char === 'ॐ') {
            output.push('om')
            index += 1
            continue
        }

        output.push(char)
        index += 1
    }

    return applyReversePhonology(output.join(''), word, language)
}

export interface ReverseTransliterationOptions {
    useLatinDigits?: boolean
    language?: DevanagariLanguage
    customWordMap?: Record<string, string>
}

export const reverseTransliterate = (
    input: string,
    options: ReverseTransliterationOptions = {}
): string => {
    const useLatinDigits = options.useLatinDigits ?? true
    const language = options.language ?? 'generic'
    const output: string[] = []
    let index = 0

    // Build reverse lexicon (Nepali → Roman)
    const nepaliToRoman = new Map<string, string>()
    const commonReverseOverrides = new Map<string, string>()
    for (const entry of getCommonWordsForLanguage(language)) {
        commonReverseOverrides.set(entry.devanagari, entry.roman)
    }
    for (const entry of LEXICON_ENTRIES) {
        if (!commonReverseOverrides.has(entry.nepali)) {
            nepaliToRoman.set(entry.nepali, normalizeReverseRoman(entry.roman))
        }
    }
    for (const [devanagari, roman] of commonReverseOverrides) {
        nepaliToRoman.set(devanagari, roman)
    }
    if (options.customWordMap) {
        for (const [roman, devanagari] of Object.entries(options.customWordMap)) {
            nepaliToRoman.set(devanagari, roman)
        }
    }

    while (index < input.length) {
        const char = input[index]

        // Try to match multi-character proper nouns from lexicon
        let matched = false
        for (let len = Math.min(20, input.length - index); len >= 3; len--) {
            const substr = input.slice(index, index + len)
            const romanEquiv = nepaliToRoman.get(substr)
            if (romanEquiv) {
                output.push(romanEquiv)
                index += len
                matched = true
                break
            }
        }
        if (matched) continue

        if (isDevanagariWordChar(char)) {
            let end = index + 1
            while (end < input.length && isDevanagariWordChar(input[end])) {
                end += 1
            }

            const word = input.slice(index, end)
            output.push(reverseTransliterateWord(word, nepaliToRoman, language))
            index = end
            continue
        }

        // Nepali digit
        if (nepaliDigitToRoman.has(char) && useLatinDigits) {
            output.push(nepaliDigitToRoman.get(char)!)
            index += 1
            continue
        }

        // Symbol
        if (symbolToRoman.has(char)) {
            output.push(symbolToRoman.get(char)!)
            index += 1
            continue
        }

        // Special: ॐ
        if (char === 'ॐ') {
            output.push('om')
            index += 1
            continue
        }

        // Pass through non-Devanagari
        output.push(char)
        index += 1
    }

    return output.join('')
}
