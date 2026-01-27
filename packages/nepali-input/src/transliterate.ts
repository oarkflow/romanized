import { LEXICON_ENTRIES } from './lexicon'

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

const normalizeLexicalKey = (value: string) => value.toLowerCase().replace(/[^a-z]/g, '')

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
	{ keys: ['rri', 'R'], value: { independent: 'ॠ', matra: 'ॄ' } },
	{ keys: ['lri'], value: { independent: 'ऌ', matra: 'ॢ' } },
	{ keys: ['lree'], value: { independent: 'ॡ', matra: 'ॣ' } },
	{ keys: ['e^', 'eN'], value: { independent: 'ऍ', matra: 'ॅ' } },
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
	{ keys: ['gha'], value: 'ग़' },
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
])

const diacriticMapping = buildMapping<string>([
	{ keys: ['m~', '~m', 'm`'], value: 'ं' },
	{ keys: ['n~', '~n'], value: 'ँ' },
	{ keys: ['h~', '~h'], value: 'ः' },
	{ keys: ['.a', "'"], value: 'ऽ' },
	{ keys: ['om'], value: 'ॐ' },
])

const symbolMapping = buildMapping<string>([
	{ keys: ['||'], value: '॥' },
	{ keys: ['|'], value: '।' },
	{ keys: ['.'], value: '।' },
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
		const replacement = lexicalWordMap.get(normalized)
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
		if (vowelMatch) {
			const { config, raw } = vowelMatch
			if (pending) {
				pending = commitPending(pending, output, tokens, {
					suffix: config.matra,
					sourceExtension: raw,
				})
			} else {
				output.push(config.independent)
				tokens.push({ source: raw, translated: config.independent, type: 'vowel' })
			}
			index += raw.length
			continue
		}

		const diacriticMatch = matchFromMapping(input, lowerInput, index, diacriticMapping)
		if (diacriticMatch) {
			pending = commitPending(pending, output, tokens)
			output.push(diacriticMatch.config)
			tokens.push({ source: diacriticMatch.raw, translated: diacriticMatch.config, type: 'diacritic' })
			index += diacriticMatch.raw.length
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
	return code >= 0x0900 && code <= 0x097F
}

export interface ReverseTransliterationOptions {
	useLatinDigits?: boolean
}

export const reverseTransliterate = (
	input: string,
	options: ReverseTransliterationOptions = {}
): string => {
	const useLatinDigits = options.useLatinDigits ?? true
	const output: string[] = []
	let index = 0

	// Build reverse lexicon (Nepali → Roman)
	const nepaliToRoman = new Map<string, string>()
	for (const entry of LEXICON_ENTRIES) {
		nepaliToRoman.set(entry.nepali, entry.roman)
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

		// Diacritic
		if (diacriticToRoman.has(char)) {
			output.push(diacriticToRoman.get(char)!)
			index += 1
			continue
		}

		// Independent vowel
		if (devanagariToRomanVowel.has(char)) {
			const vowel = devanagariToRomanVowel.get(char)!
			output.push(vowel.independent)
			index += 1
			continue
		}

		// Consonant cluster - try multi-char matches first
		let clusterMatched = false
		for (let len = 4; len >= 2; len--) {
			const cluster = input.slice(index, index + len)
			if (devanagariToRomanConsonant.has(cluster)) {
				output.push(devanagariToRomanConsonant.get(cluster)!)
				index += len
				clusterMatched = true
				break
			}
		}
		if (clusterMatched) {
			// Check for matra after consonant
			const nextChar = input[index]
			if (nextChar && devanagariToRomanVowel.has(nextChar)) {
				const vowel = devanagariToRomanVowel.get(nextChar)!
				output.push(vowel.matra)
				index += 1
			} else if (nextChar !== HALANT) {
				// Add inherent 'a' if no matra and not followed by halant
				output.push('a')
			}
			continue
		}

		// Single consonant
		if (devanagariToRomanConsonant.has(char)) {
			output.push(devanagariToRomanConsonant.get(char)!)
			index += 1

			// Check for matra
			const nextChar = input[index]
			if (nextChar && devanagariToRomanVowel.has(nextChar)) {
				const vowel = devanagariToRomanVowel.get(nextChar)!
				output.push(vowel.matra)
				index += 1
			} else if (nextChar === HALANT) {
				// Halant - consume it, no inherent 'a'
				index += 1
			} else if (nextChar && isDevanagariChar(nextChar) && !devanagariToRomanConsonant.has(nextChar)) {
				// Next char is not a consonant, add inherent 'a'
				output.push('a')
			} else if (!nextChar || !isDevanagariChar(nextChar)) {
				// End of Devanagari sequence, add inherent 'a'
				output.push('a')
			}
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
