/**
 * Autocomplete System for Nepali Input
 * Provides word suggestions based on prefix matching
 */

export interface AutocompleteEntry {
	roman: string
	nepali: string
	frequency: number
	category?: string
}

export interface AutocompleteSuggestion {
	roman: string
	nepali: string
	score: number
}

export interface AutocompleteOptions {
	maxSuggestions?: number
	minPrefixLength?: number
	useFrequency?: boolean
	caseSensitive?: boolean
}

/**
 * Trie Node for efficient prefix matching
 */
class TrieNode {
	children = new Map<string, TrieNode>()
	entries: AutocompleteEntry[] = []
	isEndOfWord = false
}

/**
 * Autocomplete Manager using Trie data structure
 */
export class AutocompleteManager {
	private root = new TrieNode()
	private options: Required<AutocompleteOptions>
	private userHistory = new Map<string, number>()

	constructor(options: AutocompleteOptions = {}) {
		this.options = {
			maxSuggestions: options.maxSuggestions ?? 5,
			minPrefixLength: options.minPrefixLength ?? 2,
			useFrequency: options.useFrequency ?? true,
			caseSensitive: options.caseSensitive ?? false,
		}
	}

	/**
	 * Add word to dictionary
	 */
	addWord(entry: AutocompleteEntry): void {
		const key = this.normalizeKey(entry.roman)
		let node = this.root

		for (const char of key) {
			if (!node.children.has(char)) {
				node.children.set(char, new TrieNode())
			}
			node = node.children.get(char)!
		}

		node.isEndOfWord = true
		node.entries.push(entry)
	}

	/**
	 * Add multiple words
	 */
	addWords(entries: AutocompleteEntry[]): void {
		for (const entry of entries) {
			this.addWord(entry)
		}
	}

	/**
	 * Get suggestions for prefix
	 */
	getSuggestions(prefix: string): AutocompleteSuggestion[] {
		if (prefix.length < this.options.minPrefixLength) {
			return []
		}

		const key = this.normalizeKey(prefix)
		let node = this.root

		// Navigate to prefix node
		for (const char of key) {
			if (!node.children.has(char)) {
				return []
			}
			node = node.children.get(char)!
		}

		// Collect all words with this prefix
		const suggestions: AutocompleteSuggestion[] = []
		this.collectSuggestions(node, suggestions)

		// Sort by score (frequency + user history)
		suggestions.sort((a, b) => b.score - a.score)

		return suggestions.slice(0, this.options.maxSuggestions)
	}

	/**
	 * Record user selection to improve future suggestions
	 */
	recordSelection(roman: string): void {
		const key = this.normalizeKey(roman)
		const count = this.userHistory.get(key) || 0
		this.userHistory.set(key, count + 1)
	}

	/**
	 * Clear user history
	 */
	clearHistory(): void {
		this.userHistory.clear()
	}

	/**
	 * Get dictionary size
	 */
	size(): number {
		return this.countNodes(this.root)
	}

	/**
	 * Export user history for persistence
	 */
	exportHistory(): Record<string, number> {
		return Object.fromEntries(this.userHistory)
	}

	/**
	 * Import user history from storage
	 */
	importHistory(history: Record<string, number>): void {
		this.userHistory = new Map(Object.entries(history))
	}

	// Private methods

	private normalizeKey(text: string): string {
		return this.options.caseSensitive ? text : text.toLowerCase()
	}

	private collectSuggestions(node: TrieNode, suggestions: AutocompleteSuggestion[]): void {
		if (node.isEndOfWord) {
			for (const entry of node.entries) {
				const userScore = this.userHistory.get(this.normalizeKey(entry.roman)) || 0
				const frequencyScore = this.options.useFrequency ? entry.frequency : 1
				const score = frequencyScore + userScore * 10 // User history weighted 10x

				suggestions.push({
					roman: entry.roman,
					nepali: entry.nepali,
					score,
				})
			}
		}

		// Recursively collect from children (limited depth to prevent stack overflow)
		for (const child of node.children.values()) {
			this.collectSuggestions(child, suggestions)
		}
	}

	private countNodes(node: TrieNode): number {
		let count = node.isEndOfWord ? node.entries.length : 0
		for (const child of node.children.values()) {
			count += this.countNodes(child)
		}
		return count
	}
}

/**
 * Common Nepali words for autocomplete
 */
export const COMMON_WORDS: AutocompleteEntry[] = [
	// Greetings & Common Phrases (High frequency)
	{ roman: 'namaste', nepali: 'नमस्ते', frequency: 100 },
	{ roman: 'namaskar', nepali: 'नमस्कार', frequency: 95 },
	{ roman: 'dhanyabad', nepali: 'धन्यवाद', frequency: 90 },
	{ roman: 'shukriya', nepali: 'शुक्रिया', frequency: 85 },
	{ roman: 'tapai', nepali: 'तपाई', frequency: 80 },
	{ roman: 'hajur', nepali: 'हजुर', frequency: 75 },

	// Pronouns (High frequency)
	{ roman: 'ma', nepali: 'म', frequency: 100 },
	{ roman: 'hami', nepali: 'हामी', frequency: 90 },
	{ roman: 'timro', nepali: 'तिम्रो', frequency: 85 },
	{ roman: 'mero', nepali: 'मेरो', frequency: 95 },
	{ roman: 'timi', nepali: 'तिमी', frequency: 88 },
	{ roman: 'yo', nepali: 'यो', frequency: 92 },
	{ roman: 'tyo', nepali: 'त्यो', frequency: 87 },

	// Common Verbs
	{ roman: 'garnu', nepali: 'गर्नु', frequency: 85 },
	{ roman: 'huncha', nepali: 'हुन्छ', frequency: 90 },
	{ roman: 'cha', nepali: 'छ', frequency: 95 },
	{ roman: 'chaina', nepali: 'छैन', frequency: 88 },
	{ roman: 'janchu', nepali: 'जान्छु', frequency: 75 },
	{ roman: 'aunu', nepali: 'आउनु', frequency: 80 },
	{ roman: 'khanu', nepali: 'खानु', frequency: 78 },
	{ roman: 'bolnu', nepali: 'बोल्नु', frequency: 76 },

	// Common Adjectives
	{ roman: 'ramro', nepali: 'राम्रो', frequency: 85 },
	{ roman: 'thulo', nepali: 'ठुलो', frequency: 75 },
	{ roman: 'sano', nepali: 'सानो', frequency: 74 },
	{ roman: 'mitho', nepali: 'मिठो', frequency: 72 },
	{ roman: 'naya', nepali: 'नयाँ', frequency: 78 },

	// Family Relations
	{ roman: 'aama', nepali: 'आमा', frequency: 90 },
	{ roman: 'buwa', nepali: 'बुवा', frequency: 88 },
	{ roman: 'didi', nepali: 'दिदी', frequency: 82 },
	{ roman: 'bhai', nepali: 'भाइ', frequency: 84 },
	{ roman: 'bahini', nepali: 'बहिनी', frequency: 80 },
	{ roman: 'daai', nepali: 'दाइ', frequency: 81 },

	// Common Nouns
	{ roman: 'ghar', nepali: 'घर', frequency: 85 },
	{ roman: 'paani', nepali: 'पानी', frequency: 80 },
	{ roman: 'khana', nepali: 'खाना', frequency: 82 },
	{ roman: 'kitab', nepali: 'किताब', frequency: 70 },
	{ roman: 'skul', nepali: 'स्कूल', frequency: 75 },
	{ roman: 'kaam', nepali: 'काम', frequency: 78 },
	{ roman: 'samaya', nepali: 'समय', frequency: 76 },

	// Question Words
	{ roman: 'kasto', nepali: 'कस्तो', frequency: 80 },
	{ roman: 'kasari', nepali: 'कसरी', frequency: 78 },
	{ roman: 'kahile', nepali: 'कहिले', frequency: 79 },
	{ roman: 'kaha', nepali: 'कहाँ', frequency: 81 },
	{ roman: 'kun', nepali: 'कुन', frequency: 77 },
	{ roman: 'ko', nepali: 'को', frequency: 90 },

	// Time & Date
	{ roman: 'aaja', nepali: 'आज', frequency: 85 },
	{ roman: 'bholi', nepali: 'भोली', frequency: 82 },
	{ roman: 'hijo', nepali: 'हिजो', frequency: 80 },
	{ roman: 'bihana', nepali: 'बिहान', frequency: 75 },
	{ roman: 'beluka', nepali: 'बेलुका', frequency: 74 },

	// Common Phrases
	{ roman: 'kripaya', nepali: 'कृपया', frequency: 70 },
	{ roman: 'maaf', nepali: 'माफ', frequency: 72 },
	{ roman: 'thik', nepali: 'ठिक', frequency: 80 },
	{ roman: 'asti', nepali: 'अस्ति', frequency: 68 },

	// Cities (Medium frequency)
	{ roman: 'Kathmandu', nepali: 'काठमाडौं', frequency: 85 },
	{ roman: 'Pokhara', nepali: 'पोखरा', frequency: 75 },
	{ roman: 'Biratnagar', nepali: 'विराटनगर', frequency: 60 },
	{ roman: 'Lalitpur', nepali: 'ललितपुर', frequency: 65 },
	{ roman: 'Bhaktapur', nepali: 'भक्तपुर', frequency: 63 },

	// Countries
	{ roman: 'Nepal', nepali: 'नेपाल', frequency: 95 },
	{ roman: 'Bharat', nepali: 'भारत', frequency: 70 },
	{ roman: 'America', nepali: 'अमेरिका', frequency: 65 },
	{ roman: 'China', nepali: 'चीन', frequency: 62 },

	// Numbers in words
	{ roman: 'ek', nepali: 'एक', frequency: 75 },
	{ roman: 'dui', nepali: 'दुई', frequency: 72 },
	{ roman: 'tin', nepali: 'तीन', frequency: 70 },
	{ roman: 'char', nepali: 'चार', frequency: 68 },
	{ roman: 'panch', nepali: 'पाँच', frequency: 67 },
]
