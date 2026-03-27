import { COMMON_WORDS } from '../autocomplete'
import type { CommonWordEntry } from './types'

export const GENERIC_COMMON_WORDS: CommonWordEntry[] = [
	...COMMON_WORDS.map((entry) => ({
		roman: entry.roman,
		devanagari: entry.nepali
	})),
	{ roman: 'dhanyavaad', devanagari: 'धन्यवाद' },
	{ roman: 'nepal', devanagari: 'नेपाल' },
	{ roman: 'bharat', devanagari: 'भारत' },
	{ roman: 'maharashtra', devanagari: 'महाराष्ट्र' },
	{ roman: 'dharma', devanagari: 'धर्म' },
	{ roman: 'karma', devanagari: 'कर्म' },
	{ roman: 'kamara', devanagari: 'कमरा' },
	{ roman: 'vikram', devanagari: 'विक्रम' }
]
