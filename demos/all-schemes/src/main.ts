import './style.css'
import {
	iastToDevanagari,
	iso15919ToDevanagari,
	harvardKyotoToDevanagari,
	velthuisToDevanagari,
	slp1ToDevanagari,
	SCHEMES,
} from '@oarkflow/nepali-input'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
	throw new Error('Root container #app not found')
}

app.innerHTML = `
	<div class="container">
		<header>
			<h1>🔤 Phase 2: All Transliteration Schemes</h1>
			<p class="subtitle">Complete implementation of IAST, ISO 15919, Harvard-Kyoto, Velthuis, and SLP1</p>
		</header>

		<div class="card">
			<h2>Select Transliteration Scheme</h2>
			<div class="scheme-selector" id="schemeSelector"></div>

			<div id="schemeInfo" class="scheme-info"></div>

			<div class="converter">
				<div class="input-area">
					<label for="input">Input Text (Romanized)</label>
					<textarea id="input" placeholder="Type here using the selected scheme..."></textarea>
				</div>

				<div class="input-area">
					<label for="output">Output (Devanagari)</label>
					<div id="output" class="output-area">(Type above to see output)</div>
				</div>

				<div class="controls">
					<button id="copyBtn">📋 Copy Output</button>
					<button id="clearBtn" class="secondary">🗑️ Clear</button>
				</div>
			</div>
		</div>

		<div class="card">
			<h3>Example Texts <span style="color: #888; font-weight: normal;">(Click to try)</span></h3>
			<div class="examples-grid" id="examples"></div>
		</div>

		<div class="card">
			<h3>Character Comparison Across Schemes</h3>
			<table class="comparison-table" id="comparisonTable"></table>
		</div>
	</div>
`

interface Example {
	title: string
	text: string
}

interface SchemeConfig {
	convert: (input: string) => string
	examples: Example[]
}

const schemes: Record<string, SchemeConfig> = {
	iast: {
		convert: iastToDevanagari,
		examples: [
			{ title: 'Greeting', text: 'namaḥ' },
			{ title: 'Sanskrit Word', text: 'saṃskṛtam' },
			{ title: 'Peace', text: 'śānti' },
			{ title: 'Yoga', text: 'yogaḥ' },
			{ title: 'Dharma', text: 'dharmaḥ' },
			{ title: 'Krishna', text: 'kṛṣṇa' },
		],
	},
	iso15919: {
		convert: iso15919ToDevanagari,
		examples: [
			{ title: 'Greeting', text: 'namaḥ' },
			{ title: 'Sanskrit Word', text: 'saṁskr̥tam' },
			{ title: 'Peace', text: 'śānti' },
			{ title: 'Yoga', text: 'yogaḥ' },
			{ title: 'Dharma', text: 'dharmaḥ' },
			{ title: 'Krishna', text: 'kr̥ṣṇa' },
		],
	},
	'harvard-kyoto': {
		convert: harvardKyotoToDevanagari,
		examples: [
			{ title: 'Greeting', text: 'namaH' },
			{ title: 'Sanskrit Word', text: 'saMskRtam' },
			{ title: 'Peace', text: 'zAnti' },
			{ title: 'Yoga', text: 'yogaH' },
			{ title: 'Dharma', text: 'dharmaH' },
			{ title: 'Krishna', text: 'kRSNa' },
		],
	},
	velthuis: {
		convert: velthuisToDevanagari,
		examples: [
			{ title: 'Greeting', text: 'nama.h' },
			{ title: 'Sanskrit Word', text: 'sa.msk.rtam' },
			{ title: 'Peace', text: '"s"anti' },
			{ title: 'Yoga', text: 'yoga.h' },
			{ title: 'Dharma', text: 'dharma.h' },
			{ title: 'Krishna', text: 'k.r.s.na' },
		],
	},
	slp1: {
		convert: slp1ToDevanagari,
		examples: [
			{ title: 'Greeting', text: 'namaH' },
			{ title: 'Sanskrit Word', text: 'saMskftam' },
			{ title: 'Peace', text: 'SAnti' },
			{ title: 'Yoga', text: 'yogaH' },
			{ title: 'Dharma', text: 'DarmaH' },
			{ title: 'Krishna', text: 'kfzRa' },
		],
	},
}

let currentScheme = 'iast'

const schemesInfo = SCHEMES.filter(s => s.id !== 'default')

// Create scheme selector
const selector = document.getElementById('schemeSelector') as HTMLDivElement
schemesInfo.forEach(scheme => {
	const btn = document.createElement('button')
	btn.className = 'scheme-btn'
	btn.textContent = scheme.name
	btn.dataset.scheme = scheme.id
	if (scheme.id === currentScheme) btn.classList.add('active')
	btn.addEventListener('click', () => switchScheme(scheme.id))
	selector.appendChild(btn)
})

function switchScheme(schemeId: string) {
	currentScheme = schemeId
	document.querySelectorAll('.scheme-btn').forEach(btn => {
		const element = btn as HTMLButtonElement
		element.classList.toggle('active', element.dataset.scheme === schemeId)
	})
	updateSchemeInfo()
	updateExamples()
	updateOutput()
}

function updateSchemeInfo() {
	const info = schemesInfo.find(s => s.id === currentScheme)
	if (!info) return
	
	const infoDiv = document.getElementById('schemeInfo') as HTMLDivElement
	infoDiv.innerHTML = `
		<h3>${info.name}</h3>
		<p>${info.description}</p>
		<ul>
			<li><strong>Unicode Support:</strong> ${info.supportsUnicode ? 'Yes' : 'No'}</li>
			<li><strong>ASCII Support:</strong> ${info.supportsAscii ? 'Yes' : 'No'}</li>
			<li><strong>Case Sensitive:</strong> ${info.caseSensitive ? 'Yes' : 'No'}</li>
			<li><strong>Common Use:</strong> ${info.commonUse}</li>
		</ul>
	`
}

function updateExamples() {
	const examplesDiv = document.getElementById('examples') as HTMLDivElement
	examplesDiv.innerHTML = ''
	const examplesList = schemes[currentScheme].examples

	examplesList.forEach(ex => {
		const card = document.createElement('div')
		card.className = 'example-card'
		card.innerHTML = `
			<div class="example-title">${ex.title}</div>
			<div class="example-input">${ex.text}</div>
		`
		card.addEventListener('click', () => {
			const input = document.getElementById('input') as HTMLTextAreaElement
			input.value = ex.text
			updateOutput()
		})
		examplesDiv.appendChild(card)
	})
}

function updateOutput() {
	const input = (document.getElementById('input') as HTMLTextAreaElement).value
	const output = document.getElementById('output') as HTMLDivElement
	if (!input) {
		output.textContent = '(Type above to see output)'
		return
	}
	const converted = schemes[currentScheme].convert(input)
	output.textContent = converted
}

// Create comparison table
const comparisonData = [
	{ char: 'आ', iast: 'ā', iso: 'ā', hk: 'A', velthuis: '"a', slp1: 'A', name: 'Long a' },
	{ char: 'ॠ', iast: 'ṝ', iso: 'r̥̄', hk: 'RR', velthuis: '.rr', slp1: 'F', name: 'Long vocalic r' },
	{ char: 'ऌ', iast: 'ḷ', iso: 'l̥', hk: 'lR', velthuis: '.l', slp1: 'x', name: 'Vocalic l' },
	{ char: 'ङ', iast: 'ṅ', iso: 'ṅ', hk: 'G', velthuis: '"n', slp1: 'N', name: 'Velar nasal' },
	{ char: 'ञ', iast: 'ñ', iso: 'ñ', hk: 'J', velthuis: '~n', slp1: 'Y', name: 'Palatal nasal' },
	{ char: 'ट', iast: 'ṭ', iso: 'ṭ', hk: 'T', velthuis: '.t', slp1: 'w', name: 'Retroflex t' },
	{ char: 'ड', iast: 'ḍ', iso: 'ḍ', hk: 'D', velthuis: '.d', slp1: 'q', name: 'Retroflex d' },
	{ char: 'ण', iast: 'ṇ', iso: 'ṇ', hk: 'N', velthuis: '.n', slp1: 'R', name: 'Retroflex n' },
	{ char: 'श', iast: 'ś', iso: 'ś', hk: 'z', velthuis: '"s', slp1: 'S', name: 'Palatal s' },
	{ char: 'ष', iast: 'ṣ', iso: 'ṣ', hk: 'S', velthuis: '.s', slp1: 'z', name: 'Retroflex s' },
	{ char: 'ं', iast: 'ṃ', iso: 'ṁ', hk: 'M', velthuis: '.m', slp1: 'M', name: 'Anusvara' },
	{ char: 'ः', iast: 'ḥ', iso: 'ḥ', hk: 'H', velthuis: '.h', slp1: 'H', name: 'Visarga' },
]

const table = document.getElementById('comparisonTable') as HTMLTableElement
table.innerHTML = `
	<thead>
		<tr>
			<th>Devanagari</th>
			<th>IAST</th>
			<th>ISO 15919</th>
			<th>Harvard-Kyoto</th>
			<th>Velthuis</th>
			<th>SLP1</th>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		${comparisonData.map(row => `
			<tr>
				<td class="devanagari">${row.char}</td>
				<td class="scheme-col" style="color: #059669;">${row.iast}</td>
				<td class="scheme-col" style="color: #dc2626;">${row.iso}</td>
				<td class="scheme-col" style="color: #7c3aed;">${row.hk}</td>
				<td class="scheme-col" style="color: #ea580c;">${row.velthuis}</td>
				<td class="scheme-col" style="color: #0891b2;">${row.slp1}</td>
				<td>${row.name}</td>
			</tr>
		`).join('')}
	</tbody>
`

// Event listeners
const inputElement = document.getElementById('input') as HTMLTextAreaElement
inputElement.addEventListener('input', updateOutput)

const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement
copyBtn.addEventListener('click', async () => {
	const text = (document.getElementById('output') as HTMLDivElement).textContent || ''
	await navigator.clipboard.writeText(text)
	copyBtn.textContent = '✅ Copied!'
	setTimeout(() => copyBtn.textContent = '📋 Copy Output', 2000)
})

const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement
clearBtn.addEventListener('click', () => {
	inputElement.value = ''
	const output = document.getElementById('output') as HTMLDivElement
	output.textContent = '(Type above to see output)'
})

// Initialize
updateSchemeInfo()
updateExamples()
