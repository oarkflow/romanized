/**
 * Character Palette Manager
 * Provides organized access to Devanagari characters
 */

export interface CharacterCategory {
	id: string
	name: string
	description: string
	characters: CharacterInfo[]
}

export interface CharacterInfo {
	char: string
	name: string
	romanization?: string
	unicode: string
	category?: string
}

export interface CharacterPaletteOptions {
	/**
	 * Show romanization hints
	 */
	showRomanization?: boolean
	/**
	 * Show Unicode codepoints
	 */
	showUnicode?: boolean
	/**
	 * Maximum recent characters to track
	 */
	maxRecent?: number
	/**
	 * Callback when character is selected
	 */
	onSelect?: (char: CharacterInfo) => void
}

/**
 * Devanagari character categories
 */
export const CHARACTER_CATEGORIES: CharacterCategory[] = [
	{
		id: 'vowels',
		name: 'Vowels (स्वर)',
		description: 'Independent vowel characters',
		characters: [
			{ char: 'अ', name: 'a', romanization: 'a', unicode: 'U+0905' },
			{ char: 'आ', name: 'ā', romanization: 'aa/ā', unicode: 'U+0906' },
			{ char: 'इ', name: 'i', romanization: 'i', unicode: 'U+0907' },
			{ char: 'ई', name: 'ī', romanization: 'ii/ī', unicode: 'U+0908' },
			{ char: 'उ', name: 'u', romanization: 'u', unicode: 'U+0909' },
			{ char: 'ऊ', name: 'ū', romanization: 'uu/ū', unicode: 'U+090A' },
			{ char: 'ऋ', name: 'ṛ', romanization: 'ri/ṛ', unicode: 'U+090B' },
			{ char: 'ॠ', name: 'ṝ', romanization: 'rri/ṝ', unicode: 'U+0960' },
			{ char: 'ऌ', name: 'ḷ', romanization: 'lri/ḷ', unicode: 'U+090C' },
			{ char: 'ॡ', name: 'ḹ', romanization: 'lree/ḹ', unicode: 'U+0961' },
			{ char: 'ए', name: 'e', romanization: 'e', unicode: 'U+090F' },
			{ char: 'ऐ', name: 'ai', romanization: 'ai', unicode: 'U+0910' },
			{ char: 'ओ', name: 'o', romanization: 'o', unicode: 'U+0913' },
			{ char: 'औ', name: 'au', romanization: 'au', unicode: 'U+0914' },
			{ char: 'ऍ', name: 'ê', romanization: 'e^/eN', unicode: 'U+090D' },
		],
	},
	{
		id: 'consonants',
		name: 'Consonants (व्यञ्जन)',
		description: 'Consonant characters',
		characters: [
			// Velars (ka-varga)
			{ char: 'क', name: 'ka', romanization: 'ka', unicode: 'U+0915', category: 'Velar' },
			{ char: 'ख', name: 'kha', romanization: 'kha', unicode: 'U+0916', category: 'Velar' },
			{ char: 'ग', name: 'ga', romanization: 'ga', unicode: 'U+0917', category: 'Velar' },
			{ char: 'घ', name: 'gha', romanization: 'gha', unicode: 'U+0918', category: 'Velar' },
			{ char: 'ङ', name: 'ṅa', romanization: 'nga', unicode: 'U+0919', category: 'Velar' },

			// Palatals (cha-varga)
			{ char: 'च', name: 'ca', romanization: 'cha', unicode: 'U+091A', category: 'Palatal' },
			{ char: 'छ', name: 'cha', romanization: 'chha', unicode: 'U+091B', category: 'Palatal' },
			{ char: 'ज', name: 'ja', romanization: 'ja', unicode: 'U+091C', category: 'Palatal' },
			{ char: 'झ', name: 'jha', romanization: 'jha', unicode: 'U+091D', category: 'Palatal' },
			{ char: 'ञ', name: 'ña', romanization: 'nya', unicode: 'U+091E', category: 'Palatal' },

			// Retroflex (ta-varga)
			{ char: 'ट', name: 'ṭa', romanization: 'Ta', unicode: 'U+091F', category: 'Retroflex' },
			{ char: 'ठ', name: 'ṭha', romanization: 'Tha', unicode: 'U+0920', category: 'Retroflex' },
			{ char: 'ड', name: 'ḍa', romanization: 'Da', unicode: 'U+0921', category: 'Retroflex' },
			{ char: 'ढ', name: 'ḍha', romanization: 'Dha', unicode: 'U+0922', category: 'Retroflex' },
			{ char: 'ण', name: 'ṇa', romanization: 'Na', unicode: 'U+0923', category: 'Retroflex' },

			// Dentals (ta-varga)
			{ char: 'त', name: 'ta', romanization: 'ta', unicode: 'U+0924', category: 'Dental' },
			{ char: 'थ', name: 'tha', romanization: 'tha', unicode: 'U+0925', category: 'Dental' },
			{ char: 'द', name: 'da', romanization: 'da', unicode: 'U+0926', category: 'Dental' },
			{ char: 'ध', name: 'dha', romanization: 'dha', unicode: 'U+0927', category: 'Dental' },
			{ char: 'न', name: 'na', romanization: 'na', unicode: 'U+0928', category: 'Dental' },

			// Labials (pa-varga)
			{ char: 'प', name: 'pa', romanization: 'pa', unicode: 'U+092A', category: 'Labial' },
			{ char: 'फ', name: 'pha', romanization: 'pha', unicode: 'U+092B', category: 'Labial' },
			{ char: 'ब', name: 'ba', romanization: 'ba', unicode: 'U+092C', category: 'Labial' },
			{ char: 'भ', name: 'bha', romanization: 'bha', unicode: 'U+092D', category: 'Labial' },
			{ char: 'म', name: 'ma', romanization: 'ma', unicode: 'U+092E', category: 'Labial' },

			// Semivowels (antaḥstha)
			{ char: 'य', name: 'ya', romanization: 'ya', unicode: 'U+092F', category: 'Semivowel' },
			{ char: 'र', name: 'ra', romanization: 'ra', unicode: 'U+0930', category: 'Semivowel' },
			{ char: 'ल', name: 'la', romanization: 'la', unicode: 'U+0932', category: 'Semivowel' },
			{ char: 'व', name: 'va', romanization: 'va/wa', unicode: 'U+0935', category: 'Semivowel' },

			// Sibilants (ūṣman)
			{ char: 'श', name: 'śa', romanization: 'sha', unicode: 'U+0936', category: 'Sibilant' },
			{ char: 'ष', name: 'ṣa', romanization: 'Sha', unicode: 'U+0937', category: 'Sibilant' },
			{ char: 'स', name: 'sa', romanization: 'sa', unicode: 'U+0938', category: 'Sibilant' },
			{ char: 'ह', name: 'ha', romanization: 'ha', unicode: 'U+0939', category: 'Sibilant' },
		],
	},
	{
		id: 'matras',
		name: 'Vowel Diacritics (मात्रा)',
		description: 'Dependent vowel signs',
		characters: [
			{ char: 'ा', name: 'ā matra', romanization: 'aa', unicode: 'U+093E' },
			{ char: 'ि', name: 'i matra', romanization: 'i', unicode: 'U+093F' },
			{ char: 'ी', name: 'ī matra', romanization: 'ii', unicode: 'U+0940' },
			{ char: 'ु', name: 'u matra', romanization: 'u', unicode: 'U+0941' },
			{ char: 'ू', name: 'ū matra', romanization: 'uu', unicode: 'U+0942' },
			{ char: 'ृ', name: 'ṛ matra', romanization: 'ri', unicode: 'U+0943' },
			{ char: 'ॄ', name: 'ṝ matra', romanization: 'rri', unicode: 'U+0944' },
			{ char: 'ॢ', name: 'ḷ matra', romanization: 'lri', unicode: 'U+0962' },
			{ char: 'ॣ', name: 'ḹ matra', romanization: 'lree', unicode: 'U+0963' },
			{ char: 'े', name: 'e matra', romanization: 'e', unicode: 'U+0947' },
			{ char: 'ै', name: 'ai matra', romanization: 'ai', unicode: 'U+0948' },
			{ char: 'ो', name: 'o matra', romanization: 'o', unicode: 'U+094B' },
			{ char: 'ौ', name: 'au matra', romanization: 'au', unicode: 'U+094C' },
		],
	},
	{
		id: 'diacritics',
		name: 'Diacritical Marks',
		description: 'Anusvara, Visarga, Chandrabindu, Halant',
		characters: [
			{ char: 'ं', name: 'Anusvara', romanization: 'M', unicode: 'U+0902' },
			{ char: 'ः', name: 'Visarga', romanization: 'H', unicode: 'U+0903' },
			{ char: 'ँ', name: 'Chandrabindu', romanization: '~', unicode: 'U+0901' },
			{ char: '्', name: 'Halant/Virama', romanization: '', unicode: 'U+094D' },
			{ char: '़', name: 'Nukta', romanization: '', unicode: 'U+093C' },
		],
	},
	{
		id: 'nukta',
		name: 'Nukta Characters',
		description: 'Persian/Urdu characters with nukta dot',
		characters: [
			{ char: 'क़', name: 'qa', romanization: 'qa', unicode: 'U+0958' },
			{ char: 'ख़', name: 'x̱a', romanization: 'kha', unicode: 'U+0959' },
			{ char: 'ग़', name: 'ġa', romanization: 'gha', unicode: 'U+095A' },
			{ char: 'ज़', name: 'za', romanization: 'za', unicode: 'U+095B' },
			{ char: 'ड़', name: 'ṛa', romanization: 'Ra', unicode: 'U+095C' },
			{ char: 'ढ़', name: 'ṛha', romanization: 'Rha', unicode: 'U+095D' },
			{ char: 'फ़', name: 'fa', romanization: 'fa', unicode: 'U+095E' },
			{ char: 'य़', name: 'ẏa', romanization: 'ya', unicode: 'U+095F' },
		],
	},
	{
		id: 'digits',
		name: 'Devanagari Digits',
		description: 'Numerals 0-9',
		characters: [
			{ char: '०', name: 'Zero', romanization: '0', unicode: 'U+0966' },
			{ char: '१', name: 'One', romanization: '1', unicode: 'U+0967' },
			{ char: '२', name: 'Two', romanization: '2', unicode: 'U+0968' },
			{ char: '३', name: 'Three', romanization: '3', unicode: 'U+0969' },
			{ char: '४', name: 'Four', romanization: '4', unicode: 'U+096A' },
			{ char: '५', name: 'Five', romanization: '5', unicode: 'U+096B' },
			{ char: '६', name: 'Six', romanization: '6', unicode: 'U+096C' },
			{ char: '७', name: 'Seven', romanization: '7', unicode: 'U+096D' },
			{ char: '८', name: 'Eight', romanization: '8', unicode: 'U+096E' },
			{ char: '९', name: 'Nine', romanization: '9', unicode: 'U+096F' },
		],
	},
	{
		id: 'symbols',
		name: 'Special Symbols',
		description: 'Punctuation and special characters',
		characters: [
			{ char: '।', name: 'Danda', romanization: '.', unicode: 'U+0964' },
			{ char: '॥', name: 'Double Danda', romanization: '..', unicode: 'U+0965' },
			{ char: 'ॐ', name: 'Om', romanization: 'om', unicode: 'U+0950' },
			{ char: 'ऽ', name: 'Avagraha', romanization: '.a', unicode: 'U+093D' },
			{ char: '॰', name: 'Abbreviation Sign', romanization: '', unicode: 'U+0970' },
		],
	},
]

/**
 * Character Palette Manager
 */
export class CharacterPaletteManager {
	private options: Required<CharacterPaletteOptions>
	private recentCharacters: CharacterInfo[] = []
	private searchIndex: Map<string, CharacterInfo[]> = new Map()

	constructor(options: CharacterPaletteOptions = {}) {
		this.options = {
			showRomanization: options.showRomanization ?? true,
			showUnicode: options.showUnicode ?? false,
			maxRecent: options.maxRecent ?? 20,
			onSelect: options.onSelect ?? (() => { }),
		}

		this.buildSearchIndex()
	}

	/**
	 * Build search index for fast lookups
	 */
	private buildSearchIndex(): void {
		for (const category of CHARACTER_CATEGORIES) {
			for (const char of category.characters) {
				// Index by character
				const charKey = char.char.toLowerCase()
				if (!this.searchIndex.has(charKey)) {
					this.searchIndex.set(charKey, [])
				}
				this.searchIndex.get(charKey)!.push(char)

				// Index by name
				const nameKey = char.name.toLowerCase()
				if (!this.searchIndex.has(nameKey)) {
					this.searchIndex.set(nameKey, [])
				}
				this.searchIndex.get(nameKey)!.push(char)

				// Index by romanization
				if (char.romanization) {
					const romKey = char.romanization.toLowerCase()
					if (!this.searchIndex.has(romKey)) {
						this.searchIndex.set(romKey, [])
					}
					this.searchIndex.get(romKey)!.push(char)
				}
			}
		}
	}

	/**
	 * Get all categories
	 */
	public getCategories(): CharacterCategory[] {
		return CHARACTER_CATEGORIES
	}

	/**
	 * Get characters by category ID
	 */
	public getCategoryCharacters(categoryId: string): CharacterInfo[] {
		const category = CHARACTER_CATEGORIES.find(c => c.id === categoryId)
		return category ? category.characters : []
	}

	/**
	 * Search characters by query
	 */
	public search(query: string): CharacterInfo[] {
		const q = query.toLowerCase().trim()
		if (!q) return []

		const results = new Set<CharacterInfo>()

		// Exact matches
		if (this.searchIndex.has(q)) {
			this.searchIndex.get(q)!.forEach(char => results.add(char))
		}

		// Partial matches
		for (const [key, chars] of this.searchIndex.entries()) {
			if (key.includes(q)) {
				chars.forEach(char => results.add(char))
			}
		}

		return Array.from(results)
	}

	/**
	 * Record character selection
	 */
	public selectCharacter(char: CharacterInfo): void {
		// Add to recent
		this.recentCharacters = [
			char,
			...this.recentCharacters.filter(c => c.char !== char.char),
		].slice(0, this.options.maxRecent)

		// Trigger callback
		this.options.onSelect(char)
	}

	/**
	 * Get recent characters
	 */
	public getRecentCharacters(): CharacterInfo[] {
		return [...this.recentCharacters]
	}

	/**
	 * Clear recent characters
	 */
	public clearRecent(): void {
		this.recentCharacters = []
	}

	/**
	 * Get character info by character
	 */
	public getCharacterInfo(char: string): CharacterInfo | undefined {
		const results = this.search(char)
		return results.find(c => c.char === char)
	}
}
