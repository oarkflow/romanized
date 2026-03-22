import './style.css'
import { iastToDevanagari, devanagariToIAST } from '@oarkflow/nepali-input'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
	throw new Error('Root container #app not found')
}

app.innerHTML = `
	<div class="container">
		<header>
			<h1>🕉️ IAST Transliteration</h1>
			<p class="subtitle">International Alphabet of Sanskrit Transliteration</p>
		</header>
		
		<div class="card">
			<div class="info-box">
				<h3>What is IAST? <span class="badge">Academic Standard</span></h3>
				<p>
					IAST (International Alphabet of Sanskrit Transliteration) is the academic standard for 
					romanizing Sanskrit and other Indic languages using diacritical marks. It provides precise, 
					unambiguous representation of Devanagari characters.
				</p>
				<ul>
					<li><strong>Diacritics:</strong> ā ī ū ṛ ṝ ḷ ḹ ṅ ñ ṭ ḍ ṇ ś ṣ ṃ ḥ</li>
					<li><strong>ASCII Alternatives:</strong> aa, ii, uu, .r, .rr, .l, .ll, .n, ~n, .t, .d, .s, s., .m, .h</li>
					<li><strong>Use Cases:</strong> Academic papers, scholarly editions, linguistic analysis</li>
				</ul>
			</div>
			
			<div class="demo-section">
				<h3>Interactive Converter</h3>
				
				<div class="input-group">
					<label for="iastInput">
						Enter IAST Text 
						<span style="color: #888; font-weight: normal;">(Use diacritics or ASCII alternatives)</span>
					</label>
					<input 
						type="text" 
						id="iastInput" 
						placeholder="Type: namaste, dhanyavād, or namaḥ..."
						autocomplete="off"
					/>
				</div>
				
				<div class="input-group">
					<label for="devanagariOutput">Devanagari Output</label>
					<div id="devanagariOutput" class="output-box"></div>
				</div>
				
				<div class="controls">
					<button id="clearBtn">Clear</button>
					<button id="reverseBtn" class="secondary">Reverse (Devanagari → IAST)</button>
				</div>
			</div>
		</div>
		
		<div class="card">
			<h3>Common Examples <span style="color: #888; font-weight: normal;">(Click to try)</span></h3>
			<div class="examples-grid" id="examplesGrid"></div>
		</div>
		
		<div class="card">
			<h3>Character Reference</h3>
			<table class="char-table">
				<thead>
					<tr>
						<th>IAST</th>
						<th>ASCII Alt</th>
						<th>Devanagari</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody id="charTableBody"></tbody>
			</table>
		</div>
	</div>
`

const iastInput = document.getElementById('iastInput') as HTMLInputElement
const devanagariOutput = document.getElementById('devanagariOutput') as HTMLDivElement
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement
const reverseBtn = document.getElementById('reverseBtn') as HTMLButtonElement
const examplesGrid = document.getElementById('examplesGrid') as HTMLDivElement
const charTableBody = document.getElementById('charTableBody') as HTMLTableSectionElement

// Common examples
const examples = [
	{ iast: 'namaste', deva: 'नमस्ते', desc: 'Hello/Greetings' },
	{ iast: 'namaḥ', deva: 'नमः', desc: 'Salutations' },
	{ iast: 'dhanyavāda', deva: 'धन्यवाद', desc: 'Thank you' },
	{ iast: 'śānti', deva: 'शान्ति', desc: 'Peace' },
	{ iast: 'yogaḥ', deva: 'योगः', desc: 'Yoga' },
	{ iast: 'mantraḥ', deva: 'मन्त्रः', desc: 'Mantra' },
	{ iast: 'kṛṣṇa', deva: 'कृष्ण', desc: 'Krishna' },
	{ iast: 'brahmā', deva: 'ब्रह्मा', desc: 'Brahma' },
	{ iast: 'gaṇeśa', deva: 'गणेश', desc: 'Ganesha' },
	{ iast: 'saṃskṛtam', deva: 'संस्कृतम्', desc: 'Sanskrit' },
	{ iast: 'bhagavān', deva: 'भगवान्', desc: 'God/Lord' },
	{ iast: 'dharmaḥ', deva: 'धर्मः', desc: 'Dharma' },
]

// Character reference data
const charReference = [
	{ iast: 'ā', ascii: 'aa', deva: 'आ/ा', desc: 'Long a' },
	{ iast: 'ī', ascii: 'ii', deva: 'ई/ी', desc: 'Long i' },
	{ iast: 'ū', ascii: 'uu', deva: 'ऊ/ू', desc: 'Long u' },
	{ iast: 'ṛ', ascii: '.r', deva: 'ऋ/ृ', desc: 'Vocalic r' },
	{ iast: 'ṝ', ascii: '.rr', deva: 'ॠ/ॄ', desc: 'Long vocalic r' },
	{ iast: 'ḷ', ascii: '.l', deva: 'ऌ/ॢ', desc: 'Vocalic l' },
	{ iast: 'ḹ', ascii: '.ll', deva: 'ॡ/ॣ', desc: 'Long vocalic l' },
	{ iast: 'ṅ', ascii: '.n', deva: 'ङ', desc: 'Velar nasal' },
	{ iast: 'ñ', ascii: '~n', deva: 'ञ', desc: 'Palatal nasal' },
	{ iast: 'ṭ', ascii: '.t', deva: 'ट', desc: 'Retroflex t' },
	{ iast: 'ḍ', ascii: '.d', deva: 'ड', desc: 'Retroflex d' },
	{ iast: 'ṇ', ascii: '.n', deva: 'ण', desc: 'Retroflex n' },
	{ iast: 'ś', ascii: '.s', deva: 'श', desc: 'Palatal s' },
	{ iast: 'ṣ', ascii: 's.', deva: 'ष', desc: 'Retroflex s' },
	{ iast: 'ṃ', ascii: '.m', deva: 'ं', desc: 'Anusvara' },
	{ iast: 'ḥ', ascii: '.h', deva: 'ः', desc: 'Visarga' },
]

// Render examples
examples.forEach(ex => {
	const card = document.createElement('div')
	card.className = 'example-card'
	card.innerHTML = `
		<div class="iast">${ex.iast}</div>
		<div class="devanagari">${ex.deva}</div>
		<div style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">${ex.desc}</div>
	`
	card.addEventListener('click', () => {
		iastInput.value = ex.iast
		updateOutput()
	})
	examplesGrid.appendChild(card)
})

// Render character table
charReference.forEach(char => {
	const row = document.createElement('tr')
	row.innerHTML = `
		<td class="iast-col">${char.iast}</td>
		<td style="font-family: monospace; color: #6b7280;">${char.ascii}</td>
		<td class="deva-col">${char.deva}</td>
		<td>${char.desc}</td>
	`
	charTableBody.appendChild(row)
})

// Update output
function updateOutput() {
	const input = iastInput.value
	const output = iastToDevanagari(input)
	devanagariOutput.textContent = output || '(Empty)'
}

// Event listeners
iastInput.addEventListener('input', updateOutput)

clearBtn.addEventListener('click', () => {
	iastInput.value = ''
	devanagariOutput.textContent = ''
	iastInput.focus()
})

reverseBtn.addEventListener('click', () => {
	const devaText = prompt('Enter Devanagari text to convert to IAST:')
	if (devaText) {
		const iastText = devanagariToIAST(devaText)
		alert(`IAST: ${iastText}`)
		iastInput.value = iastText
		updateOutput()
	}
})

// Initialize
iastInput.focus()
