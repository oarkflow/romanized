// Quick test to verify character mappings
import { transliterate } from '../packages/nepali-input/src/transliterate.js'

const testCases = [
	// Vowels
	{ input: 'a', expected: 'अ', name: 'Short a' },
	{ input: 'aa', expected: 'आ', name: 'Long aa' },
	{ input: 'i', expected: 'इ', name: 'Short i' },
	{ input: 'ii', expected: 'ई', name: 'Long ii' },
	{ input: 'u', expected: 'उ', name: 'Short u' },
	{ input: 'uu', expected: 'ऊ', name: 'Long uu' },
	{ input: 'ri', expected: 'ऋ', name: 'Vocalic ri' },
	{ input: 'rri', expected: 'ॠ', name: 'Long vocalic rri' },
	{ input: 'R', expected: 'ॠ', name: 'Long vocalic R' },
	{ input: 'lri', expected: 'ऌ', name: 'Vocalic lri' },
	{ input: 'lree', expected: 'ॡ', name: 'Long vocalic lree' },
	{ input: 'e', expected: 'ए', name: 'e' },
	{ input: 'ai', expected: 'ऐ', name: 'ai' },
	{ input: 'o', expected: 'ओ', name: 'o' },
	{ input: 'au', expected: 'औ', name: 'au' },
	{ input: 'e^', expected: 'ॅ', name: 'Candra e' },
	{ input: 'eN', expected: 'ॅ', name: 'Candra eN' },
	// Consonants
	{ input: 'ka', expected: 'क', name: 'ka' },
	{ input: 'kha', expected: 'ख', name: 'kha' },
	{ input: 'ga', expected: 'ग', name: 'ga' },
	{ input: 'gha', expected: 'घ', name: 'gha' },
	{ input: 'nga', expected: 'ङ', name: 'nga' },
	// Nukta
	{ input: 'qa', expected: 'क़', name: 'qa' },
	{ input: 'za', expected: 'ज़', name: 'za' },
	{ input: 'fa', expected: 'फ़', name: 'fa' },
	// Special
	{ input: 'om', expected: 'ॐ', name: 'Om' },
	{ input: '.a', expected: 'ऽ', name: 'Avagraha .a' },
	{ input: "'", expected: 'ऽ', name: "Avagraha '" },
	{ input: 'M', expected: 'ं', name: 'Anusvara M' },
	{ input: 'H', expected: 'ः', name: 'Visarga H' },
	{ input: '~', expected: 'ँ', name: 'Chandrabindu ~' },
]

let passed = 0
let failed = 0

console.log('Testing character mappings...\n')

testCases.forEach(test => {
	const output = transliterate(test.input)
	const pass = output === test.expected
	if (pass) {
		passed++
		console.log(`✅ ${test.name}: '${test.input}' → '${output}'`)
	} else {
		failed++
		console.log(`❌ ${test.name}: '${test.input}' → '${output}' (expected '${test.expected}')`)
	}
})

console.log(`\nResults: ${passed} passed, ${failed} failed`)
