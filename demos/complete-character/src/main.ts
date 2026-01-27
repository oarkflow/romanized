import './style.css'
import { transliterate } from '@verishore/nepali-input'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
    throw new Error('Root container #app not found')
}

app.innerHTML = `
	<div class="container">
		<header>
			<h1>✅ Phase 1: Complete Character Testing</h1>
			<p class="subtitle">Comprehensive test of all Devanagari characters including missing ones</p>
		</header>

		<div class="card">
			<div class="stats" id="stats"></div>
		</div>

		<div class="card">
			<h2>Vowels Test</h2>
			<div class="test-grid" id="vowelsTest"></div>
		</div>

		<div class="card">
			<h2>Consonants Test</h2>
			<div class="test-grid" id="consonantsTest"></div>
		</div>

		<div class="card">
			<h2>Nukta Characters Test (NEW)</h2>
			<div class="test-grid" id="nuktaTest"></div>
		</div>

		<div class="card">
			<h2>Special Characters Test (NEW)</h2>
			<div class="test-grid" id="specialTest"></div>
		</div>

		<div class="card">
			<h2>Digits Test</h2>
			<div class="test-grid" id="digitsTest"></div>
		</div>
	</div>
`

interface TestCase {
    input: string
    expected: string
    name: string
}

const testCases: Record<string, TestCase[]> = {
    vowels: [
        { input: 'a', expected: 'अ', name: 'Short a' },
        { input: 'aa', expected: 'आ', name: 'Long aa' },
        { input: 'i', expected: 'इ', name: 'Short i' },
        { input: 'ii', expected: 'ई', name: 'Long ii' },
        { input: 'u', expected: 'उ', name: 'Short u' },
        { input: 'uu', expected: 'ऊ', name: 'Long uu' },
        { input: 'ri', expected: 'ऋ', name: 'Vocalic ri' },
        { input: 'rri', expected: 'ॠ', name: 'Long vocalic rri (NEW)' },
        { input: 'R', expected: 'ॠ', name: 'Long vocalic R (NEW)' },
        { input: 'lri', expected: 'ऌ', name: 'Vocalic lri (NEW)' },
        { input: 'lree', expected: 'ॡ', name: 'Long vocalic lree (NEW)' },
        { input: 'e', expected: 'ए', name: 'e' },
        { input: 'ai', expected: 'ऐ', name: 'ai' },
        { input: 'o', expected: 'ओ', name: 'o' },
        { input: 'au', expected: 'औ', name: 'au' },
        { input: 'e^', expected: 'ऍ', name: 'Candra e (NEW)' },
        { input: 'eN', expected: 'ऍ', name: 'Candra eN (NEW)' },
    ],
    consonants: [
        { input: 'ka', expected: 'क', name: 'ka' },
        { input: 'kha', expected: 'ख', name: 'kha' },
        { input: 'ga', expected: 'ग', name: 'ga' },
        { input: 'gha', expected: 'घ', name: 'gha' },
        { input: 'nga', expected: 'ङ', name: 'nga' },
        { input: 'cha', expected: 'च', name: 'cha' },
        { input: 'chha', expected: 'छ', name: 'chha' },
        { input: 'ja', expected: 'ज', name: 'ja' },
        { input: 'jha', expected: 'झ', name: 'jha' },
        { input: 'nya', expected: 'ञ', name: 'nya' },
        { input: 'Ta', expected: 'ट', name: 'Ta' },
        { input: 'Tha', expected: 'ठ', name: 'Tha' },
        { input: 'Da', expected: 'ड', name: 'Da' },
        { input: 'Dha', expected: 'ढ', name: 'Dha' },
        { input: 'Na', expected: 'ण', name: 'Na' },
        { input: 'ta', expected: 'त', name: 'ta' },
        { input: 'tha', expected: 'थ', name: 'tha' },
        { input: 'da', expected: 'द', name: 'da' },
        { input: 'dha', expected: 'ध', name: 'dha' },
        { input: 'na', expected: 'न', name: 'na' },
        { input: 'pa', expected: 'प', name: 'pa' },
        { input: 'pha', expected: 'फ', name: 'pha' },
        { input: 'ba', expected: 'ब', name: 'ba' },
        { input: 'bha', expected: 'भ', name: 'bha' },
        { input: 'ma', expected: 'म', name: 'ma' },
        { input: 'ya', expected: 'य', name: 'ya' },
        { input: 'ra', expected: 'र', name: 'ra' },
        { input: 'la', expected: 'ल', name: 'la' },
        { input: 'va', expected: 'व', name: 'va' },
        { input: 'sha', expected: 'श', name: 'sha' },
        { input: 'Sha', expected: 'ष', name: 'Sha' },
        { input: 'sa', expected: 'स', name: 'sa' },
        { input: 'ha', expected: 'ह', name: 'ha' },
    ],
    nukta: [
        { input: 'qa', expected: 'क़', name: 'qa (NEW)' },
        { input: 'za', expected: 'ज़', name: 'za (NEW)' },
        { input: 'fa', expected: 'फ़', name: 'fa (NEW)' },
    ],
    special: [
        { input: 'om', expected: 'ॐ', name: 'Om (NEW)' },
        { input: '.a', expected: 'ऽ', name: 'Avagraha .a (NEW)' },
        { input: "'", expected: 'ऽ', name: "Avagraha ' (NEW)" },
        { input: 'M', expected: 'ं', name: 'Anusvara' },
        { input: 'H', expected: 'ः', name: 'Visarga' },
        { input: '~', expected: 'ँ', name: 'Chandrabindu' },
    ],
    digits: [
        { input: '0', expected: '०', name: '0 → ०' },
        { input: '1', expected: '१', name: '1 → १' },
        { input: '2', expected: '२', name: '2 → २' },
        { input: '3', expected: '३', name: '3 → ३' },
        { input: '4', expected: '४', name: '4 → ४' },
        { input: '5', expected: '५', name: '5 → ५' },
        { input: '6', expected: '६', name: '6 → ६' },
        { input: '7', expected: '७', name: '7 → ७' },
        { input: '8', expected: '८', name: '8 → ८' },
        { input: '9', expected: '९', name: '9 → ९' },
    ],
}

function runTests() {
    let totalTests = 0
    let passedTests = 0
    let failedTests = 0

    Object.keys(testCases).forEach(category => {
        const container = document.getElementById(category + 'Test') as HTMLDivElement
        const tests = testCases[category]

        tests.forEach(test => {
            totalTests++
            const output = transliterate(test.input)
            const passed = output === test.expected

            if (passed) passedTests++
            else failedTests++

            const testItem = document.createElement('div')
            testItem.className = `test-item ${passed ? 'pass' : 'fail'}`
            testItem.innerHTML = `
				<div class="test-label">${test.name}</div>
				<div class="test-input">Input: ${test.input}</div>
				<div class="test-output">${output}</div>
				<div class="test-expected">Expected: ${test.expected} ${passed ? '✅' : '❌'}</div>
			`
            container.appendChild(testItem)
        })
    })

    // Update stats
    const stats = document.getElementById('stats') as HTMLDivElement
    const passRate = ((passedTests / totalTests) * 100).toFixed(1)
    stats.innerHTML = `
		<div class="stat-card">
			<div class="stat-value">${totalTests}</div>
			<div class="stat-label">Total Tests</div>
		</div>
		<div class="stat-card" style="border: 2px solid #10b981;">
			<div class="stat-value" style="color: #10b981;">${passedTests}</div>
			<div class="stat-label">Passed</div>
		</div>
		<div class="stat-card" style="border: 2px solid #ef4444;">
			<div class="stat-value" style="color: #ef4444;">${failedTests}</div>
			<div class="stat-label">Failed</div>
		</div>
		<div class="stat-card" style="border: 2px solid #667eea;">
			<div class="stat-value">${passRate}%</div>
			<div class="stat-label">Pass Rate</div>
		</div>
	`
}

// Run tests on load
runTests()
