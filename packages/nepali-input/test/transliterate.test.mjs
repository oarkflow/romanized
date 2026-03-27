import test from 'node:test'
import assert from 'node:assert/strict'
import { FORWARD_FIXTURES } from './fixtures/forward-fixtures.mjs'
import { REVERSE_FIXTURES } from './fixtures/reverse-fixtures.mjs'
import { loadRuntime } from './runtime.mjs'

test('forward transliteration matches real-world language fixtures', () => {
	const { transliterate } = loadRuntime()

	for (const fixture of FORWARD_FIXTURES) {
		assert.equal(
			transliterate(fixture.input, { language: fixture.language }),
			fixture.expected,
			`${fixture.language}:${fixture.input}`
		)
	}
})

test('reverse transliteration matches real-world language fixtures', () => {
	const { reverseTransliterate } = loadRuntime()

	for (const fixture of REVERSE_FIXTURES) {
		assert.equal(
			reverseTransliterate(fixture.input, { language: fixture.language }),
			fixture.expected,
			`${fixture.language}:${fixture.input}`
		)
	}
})

test('reverse transliteration applies schwa deletion heuristics for Hindi-like profiles', () => {
	const { reverseTransliterate } = loadRuntime()

	assert.equal(reverseTransliterate('विकास', { language: 'hindi' }), 'vikaas')
	assert.equal(reverseTransliterate('विक्रम', { language: 'hindi' }), 'vikram')
	assert.equal(reverseTransliterate('कर्म', { language: 'hindi' }), 'karm')
	assert.equal(reverseTransliterate('कर्म', { language: 'sanskrit' }), 'karma')
})

test('custom word maps override default dictionaries in both directions', () => {
	const { transliterate, reverseTransliterate } = loadRuntime()

	assert.equal(
		transliterate('romanized rocks', {
			customWordMap: {
				romanized: 'रोमनाइज्ड',
				rocks: 'रक्स'
			}
		}),
		'रोमनाइज्ड रक्स'
	)

	assert.equal(
		reverseTransliterate('रोमनाइज्ड', {
			customWordMap: {
				romanized: 'रोमनाइज्ड'
			}
		}),
		'romanized'
	)
})

test('extended scholarly romanization stays opt-in', () => {
	const { transliterate } = loadRuntime()

	assert.equal(transliterate('va', { language: 'generic' }), 'व')
	assert.equal(transliterate('va', { language: 'generic', enableExtendedRomanization: true }), '᳚')
})
