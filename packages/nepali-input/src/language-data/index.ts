import { BODO_COMMON_WORDS } from './bodo'
import { DOGRI_COMMON_WORDS } from './dogri'
import { GENERIC_COMMON_WORDS } from './generic'
import { HINDI_COMMON_WORDS } from './hindi'
import { KASHMIRI_COMMON_WORDS } from './kashmiri'
import { KONKANI_COMMON_WORDS } from './konkani'
import { MAITHILI_COMMON_WORDS } from './maithili'
import { MARATHI_COMMON_WORDS } from './marathi'
import { NEPALI_COMMON_WORDS } from './nepali'
import { NEWARI_COMMON_WORDS } from './newari'
import { SANSKRIT_COMMON_WORDS } from './sanskrit'
import { SINDHI_COMMON_WORDS } from './sindhi'
import type { CommonWordEntry, DevanagariLanguage } from './types'

export type { CommonWordEntry, DevanagariLanguage } from './types'

export const normalizeLexicalKey = (value: string) => value.toLowerCase().replace(/[^a-z]/g, '')

const COMMON_WORDS_BY_LANGUAGE: Record<DevanagariLanguage, CommonWordEntry[]> = {
	generic: GENERIC_COMMON_WORDS,
	nepali: NEPALI_COMMON_WORDS,
	hindi: HINDI_COMMON_WORDS,
	marathi: MARATHI_COMMON_WORDS,
	sanskrit: SANSKRIT_COMMON_WORDS,
	maithili: MAITHILI_COMMON_WORDS,
	newari: NEWARI_COMMON_WORDS,
	dogri: DOGRI_COMMON_WORDS,
	bodo: BODO_COMMON_WORDS,
	konkani: KONKANI_COMMON_WORDS,
	kashmiri: KASHMIRI_COMMON_WORDS,
	sindhi: SINDHI_COMMON_WORDS
}

const commonWordMaps = new Map<DevanagariLanguage, Map<string, string>>()

export const getCommonWordsForLanguage = (language: DevanagariLanguage): CommonWordEntry[] => {
	if (language === 'generic') {
		return COMMON_WORDS_BY_LANGUAGE.generic
	}

	return [
		...COMMON_WORDS_BY_LANGUAGE.generic,
		...COMMON_WORDS_BY_LANGUAGE[language]
	]
}

export const getCommonWordMap = (language: DevanagariLanguage): Map<string, string> => {
	const cached = commonWordMaps.get(language)
	if (cached) return cached

	const map = new Map<string, string>()
	for (const entry of getCommonWordsForLanguage(language)) {
		const key = normalizeLexicalKey(entry.roman)
		if (!key) continue
		map.set(key, entry.devanagari)
	}

	commonWordMaps.set(language, map)
	return map
}
