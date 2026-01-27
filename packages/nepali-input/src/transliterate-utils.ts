/**
 * Transliteration utilities
 * Shared functions for building character mappings
 */

export interface MappingEntry<T> {
    keys: string[]
    value: T
    caseSensitive?: boolean
}

export interface CompiledMapping<T> {
    sensitive: Array<{ key: string; value: T }>
    insensitive: Array<{ key: string; value: T }>
}

export const buildMapping = <T>(entries: MappingEntry<T>[]): CompiledMapping<T> => {
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

/**
 * Configuration for scheme-to-Devanagari conversion
 */
export interface SchemeConverterConfig {
    consonants: Record<string, string>
    vowelMatras: Record<string, string>
    independentVowels: Record<string, string>
    diacritics: Record<string, string>
    maxKeyLength?: number
    caseSensitive?: boolean
}

const HALANT = '्'

/**
 * Create a proper romanized-to-Devanagari converter that handles:
 * - Consonant clusters with halants
 * - Vowel matras after consonants
 * - Independent vowels at word start
 * - Diacritics (anusvara, visarga, chandrabindu)
 */
export const createSchemeConverter = (config: SchemeConverterConfig) => {
    const {
        consonants,
        vowelMatras,
        independentVowels,
        diacritics,
        maxKeyLength = 4,
        caseSensitive = false,
    } = config

    const tryMatch = (
        text: string,
        pos: number,
        map: Record<string, string>,
        isCaseSensitive: boolean
    ): { key: string; value: string } | null => {
        for (let len = maxKeyLength; len >= 1; len--) {
            const substr = text.slice(pos, pos + len)
            const lookupKey = isCaseSensitive ? substr : substr.toLowerCase()

            // For case-sensitive lookups, check exact match
            if (isCaseSensitive) {
                if (map[substr]) {
                    return { key: substr, value: map[substr] }
                }
            } else {
                // For case-insensitive, check lowercase version
                if (map[lookupKey]) {
                    return { key: substr, value: map[lookupKey] }
                }
            }
        }
        return null
    }

    return (text: string): string => {
        let result = ''
        let i = 0
        let pendingConsonant: string | null = null

        const flushPendingConsonant = (addInherentA: boolean = true) => {
            if (pendingConsonant) {
                result += pendingConsonant
                if (!addInherentA) {
                    result += HALANT
                }
                pendingConsonant = null
            }
        }

        while (i < text.length) {
            // Try diacritics first (anusvara, visarga, etc.)
            const diacriticMatch = tryMatch(text, i, diacritics, caseSensitive)
            if (diacriticMatch) {
                flushPendingConsonant(true)
                result += diacriticMatch.value
                i += diacriticMatch.key.length
                continue
            }

            // Try consonants
            const consonantMatch = tryMatch(text, i, consonants, caseSensitive)
            if (consonantMatch) {
                if (pendingConsonant) {
                    // There's a pending consonant - add halant before the new consonant
                    result += pendingConsonant + HALANT
                }
                pendingConsonant = consonantMatch.value
                i += consonantMatch.key.length
                continue
            }

            // Try vowels
            const vowelMatch = tryMatch(text, i, independentVowels, caseSensitive)
            if (vowelMatch) {
                if (pendingConsonant) {
                    // Vowel after consonant - use matra
                    result += pendingConsonant
                    const matraKey = caseSensitive ? vowelMatch.key : vowelMatch.key.toLowerCase()
                    const matra = vowelMatras[matraKey] || vowelMatras[vowelMatch.key]
                    if (matra && vowelMatch.key.toLowerCase() !== 'a') {
                        result += matra
                    }
                    // 'a' is inherent, no matra needed
                    pendingConsonant = null
                } else {
                    // Independent vowel
                    result += vowelMatch.value
                }
                i += vowelMatch.key.length
                continue
            }

            // No match - flush pending and output character as-is
            flushPendingConsonant(true)
            result += text[i]
            i++
        }

        // Flush any remaining pending consonant
        flushPendingConsonant(true)

        return result
    }
}
