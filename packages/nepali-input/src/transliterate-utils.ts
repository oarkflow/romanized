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
