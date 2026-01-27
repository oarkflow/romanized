import './style.css'
import { transliterate, reverseTransliterate } from './transliterate'
import { createNepaliInput } from './nepali-input'
import { createNepaliTextarea } from './nepali-textarea'

const STORAGE_KEY = 'romanized-nepali::draft'
const SAMPLE_TEXT = 'Mero naam Sujit ho.'

const getStoredDraft = (): string => {
	try {
		return localStorage.getItem(STORAGE_KEY) ?? SAMPLE_TEXT
	} catch (error) {
		console.warn('Unable to read saved draft', error)
		return SAMPLE_TEXT
	}
}

const persistDraft = (value: string) => {
	try {
		localStorage.setItem(STORAGE_KEY, value)
	} catch (error) {
		console.warn('Draft could not be saved', error)
	}
}

const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay = 220) => {
	let handle: number | undefined
	return (...args: T) => {
		if (handle) window.clearTimeout(handle)
		handle = window.setTimeout(() => fn(...args), delay)
	}
}

const copyToClipboard = async (value: string): Promise<boolean> => {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(value)
		return true
	}

	const helper = document.createElement('textarea')
	helper.value = value
	helper.setAttribute('readonly', '')
	helper.style.position = 'absolute'
	helper.style.left = '-9999px'
	document.body.appendChild(helper)
	helper.select()
	const success = document.execCommand('copy')
	document.body.removeChild(helper)
	return success
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
	throw new Error('Root container #app not found')
}

app.innerHTML = `
  <main class="shell">

    <section class="ime-section">
      <div class="panel ime-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Component Demo</p>
            <h2>Nepali Input Components</h2>
          </div>
          <label class="toggle">
            <input id="component-digit-toggle" type="checkbox" checked />
            <span>Use Nepali digits ०-९</span>
          </label>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--fg-default);">
              NepaliInput Component:
            </label>
            <input
              id="nepali-input-demo"
              type="text"
              placeholder="Type in romanized Nepali..."
              style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-default); border-radius: 0.5rem; font-family: 'Space Grotesk', 'Noto Sans Devanagari', sans-serif; font-size: 1rem; background: var(--bg-input); color: var(--fg-default);"
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--fg-default);">
              NepaliTextarea Component:
            </label>
            <textarea
              id="nepali-textarea-demo"
              placeholder="Type longer text in romanized Nepali..."
              rows="4"
              style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-default); border-radius: 0.5rem; font-family: 'Space Grotesk', 'Noto Sans Devanagari', sans-serif; font-size: 1rem; background: var(--bg-input); color: var(--fg-default); resize: vertical;"
            ></textarea>
          </div>
        </div>

        <div class="panel-foot">
          <p class="stat ime-hint">These components auto-convert as you type • Try: namaste, swagatam, dhanyabad</p>
        </div>
      </div>
    </section>

    <section class="ime-section">
      <div class="panel ime-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">ContentEditable Demo</p>
            <h2>Inline Nepali Typing</h2>
          </div>
          <label class="toggle">
            <input id="ime-digit-toggle" type="checkbox" checked />
            <span>Use Nepali digits ०-९</span>
          </label>
        </div>
        <div
          id="ime-input"
          class="ime-input"
          contenteditable="true"
          spellcheck="false"
          data-placeholder="Start typing in romanized Nepali..."
        ></div>
        <div class="panel-foot">
          <p class="stat ime-hint">Type romanized text with instant conversion</p>
        </div>
        <div class="chip-row" role="list">
          <button class="chip" type="button" data-ime-sample="Mero naam Sujit ho.">Greeting</button>
          <button class="chip" type="button" data-ime-sample="Tapai lai kasto chha?">Check-in</button>
          <button class="chip" type="button" data-ime-sample="Namaste. Ma aaja khushi chu.">Simple</button>
        </div>
      </div>
    </section>

    <section class="workspace">
      <div class="panel" aria-live="polite">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Input</p>
            <h2 id="input-label">Romanized Text</h2>
          </div>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <label class="toggle">
              <input id="direction-toggle" type="checkbox" />
              <span id="direction-label">→ Nepali to Roman</span>
            </label>
            <label class="toggle">
              <input id="digit-toggle" type="checkbox" checked />
              <span>Use Nepali digits ०-९</span>
            </label>
          </div>
        </div>
        <textarea
          id="roman-input"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          placeholder="Type romanized Nepali..."
        ></textarea>
        <div class="panel-foot">
          <p data-latin-count class="stat">0 characters</p>
          <p data-status role="status">Waiting for input</p>
        </div>
        <div class="chip-row" role="list" id="sample-chips">
          <button class="chip" type="button" data-sample="Mero naam Sujit ho.">Greeting</button>
          <button class="chip" type="button" data-sample="Tapai lai kasto chha?">Check-in</button>
          <button class="chip" type="button" data-sample="Yo saadhan le romanized Nepali lai devanagari ma pariwartan garcha.">Explain</button>
        </div>
      </div>

      <div class="panel output-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Output</p>
            <h2 id="output-label">Nepali Script</h2>
          </div>
          <button id="copy-btn" type="button">Copy result</button>
        </div>
        <textarea
          id="nepali-output"
          lang="ne"
          dir="ltr"
          readonly
          aria-live="polite"
          placeholder="देवनागरी परिणाम यहाँ देखिन्छ"
        ></textarea>
        <div class="panel-foot">
          <p data-devanagari-count class="stat">0 characters</p>
        </div>
      </div>
    </section>
  </main>
`

const romanInput = app.querySelector<HTMLTextAreaElement>('#roman-input')
const nepaliOutput = app.querySelector<HTMLTextAreaElement>('#nepali-output')
const statusLine = app.querySelector<HTMLElement>('[data-status]')
const latinCount = app.querySelector<HTMLElement>('[data-latin-count]')
const devanagariCount = app.querySelector<HTMLElement>('[data-devanagari-count]')
const digitToggle = app.querySelector<HTMLInputElement>('#digit-toggle')
const directionToggle = app.querySelector<HTMLInputElement>('#direction-toggle')
const copyButton = app.querySelector<HTMLButtonElement>('#copy-btn')
const sampleButtons = app.querySelectorAll<HTMLButtonElement>('.chip[data-sample]')
const inputLabel = app.querySelector<HTMLHeadingElement>('#input-label')
const outputLabel = app.querySelector<HTMLHeadingElement>('#output-label')
const directionLabel = app.querySelector<HTMLSpanElement>('#direction-label')
const sampleChips = app.querySelector<HTMLDivElement>('#sample-chips')

// IME input elements
const imeInput = app.querySelector<HTMLDivElement>('#ime-input')
const imeDigitToggle = app.querySelector<HTMLInputElement>('#ime-digit-toggle')
const imeSampleButtons = app.querySelectorAll<HTMLButtonElement>('.chip[data-ime-sample]')

// Component demo elements
const componentDigitToggle = app.querySelector<HTMLInputElement>('#component-digit-toggle')
const nepaliInputDemo = app.querySelector<HTMLInputElement>('#nepali-input-demo')
const nepaliTextareaDemo = app.querySelector<HTMLTextAreaElement>('#nepali-textarea-demo')

if (!romanInput || !nepaliOutput || !statusLine || !latinCount || !devanagariCount || !digitToggle || !directionToggle || !copyButton || !inputLabel || !outputLabel || !directionLabel || !sampleChips || !imeInput || !imeDigitToggle || !componentDigitToggle || !nepaliInputDemo || !nepaliTextareaDemo) {
	throw new Error('Transliteration UI failed to initialize')
}

// ============================================================================
// INITIALIZE NEPALI INPUT/TEXTAREA COMPONENTS
// ============================================================================

const nepaliInput = createNepaliInput(nepaliInputDemo, {
	useDevanagariDigits: true,
	autoConvert: true,
	onInput: (value) => {
		// Optional: do something on input
	}
})

const nepaliTextarea = createNepaliTextarea(nepaliTextareaDemo, {
	useDevanagariDigits: true,
	autoConvert: true,
	onInput: (value) => {
		// Optional: do something on input
	}
})

// Sync digit toggle with components
componentDigitToggle.addEventListener('change', () => {
	const useDevanagariDigits = componentDigitToggle.checked
	nepaliInput.setOptions({ useDevanagariDigits })
	nepaliTextarea.setOptions({ useDevanagariDigits })
})

const setStatus = (message: string) => {
	statusLine.textContent = message
}

const formatCharCount = (value: number, suffix: string) => `${value.toLocaleString('en-US')} ${suffix}`

const applyTransliteration = () => {
	const isReverse = directionToggle.checked
	const source = romanInput.value
	let output: string

	if (isReverse) {
		// Nepali to Roman
		const options = { useLatinDigits: digitToggle.checked }
		output = reverseTransliterate(source, options)
	} else {
		// Roman to Nepali
		const options = { useDevanagariDigits: digitToggle.checked }
		output = transliterate(source, options)
	}

	nepaliOutput.value = output
	latinCount.textContent = formatCharCount(source.length, 'characters')
	devanagariCount.textContent = formatCharCount(output.length, 'characters')
	setStatus(
		source
			? `Updated ${new Intl.DateTimeFormat('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}).format(new Date())}`
			: 'Waiting for input'
	)
}

const updateUILabels = () => {
	const isReverse = directionToggle.checked

	if (isReverse) {
		// Nepali to Roman mode
		inputLabel.textContent = 'Nepali Script'
		outputLabel.textContent = 'Romanized Text'
		romanInput.placeholder = 'देवनागरी पाठ लेख्नुहोस्...'
		nepaliOutput.placeholder = 'Romanized output here...'
		digitToggle.nextElementSibling!.textContent = 'Use Latin digits 0-9'
		directionLabel.textContent = '← Roman to Nepali'

		// Update sample chips for reverse
		sampleChips.innerHTML = `
			<button class="chip" type="button" data-sample="मेरो नाम सुजित हो।">Greeting</button>
			<button class="chip" type="button" data-sample="तपाईं लाई कस्तो छ?">Check-in</button>
			<button class="chip" type="button" data-sample="यो साधनले देवनागरी नेपाली लाई रोमानाइज्ड मा परिवर्तन गर्छ।">Explain</button>
		`

		// Update tips for reverse
		tipsList.innerHTML = `
			<li>Paste Nepali text to see its romanized form.</li>
			<li>Consonant clusters are decomposed (क्ष -> ksh).</li>
			<li>Diacritics are preserved (ं -> m~, ँ -> n~, ः -> h~).</li>
			<li>Works with the 1,225+ proper noun lexicon for accurate city/district names.</li>
		`
	} else {
		// Roman to Nepali mode
		inputLabel.textContent = 'Romanized Text'
		outputLabel.textContent = 'Nepali Script'
		romanInput.placeholder = 'Type romanized Nepali...'
		nepaliOutput.placeholder = 'देवनागरी परिणाम यहाँ देखिन्छ'
		digitToggle.nextElementSibling!.textContent = 'Use Nepali digits ०-९'
		directionLabel.textContent = '→ Nepali to Roman'

		// Restore original samples
		sampleChips.innerHTML = `
			<button class="chip" type="button" data-sample="Mero naam Sujit ho.">Greeting</button>
			<button class="chip" type="button" data-sample="Tapai lai kasto chha?">Check-in</button>
			<button class="chip" type="button" data-sample="Yo saadhan le romanized Nepali lai devanagari ma pariwartan garcha.">Explain</button>
		`

		// Restore original tips
		tipsList.innerHTML = `
			<li>Double vowels for long sounds (aa -> ा, ee -> ी, oo -> ू).</li>
			<li>Type <code>ri</code> for ऋ, <code>sh</code> for श, <code>Sh</code> for ष.</li>
			<li>Add <code>^</code> after a consonant to drop the inherent vowel (क^sha -> क्ष).</li>
			<li>Use <code>m~</code> for ं, <code>n~</code> for ँ, <code>h~</code> for ः.</li>
		`
	}

	// Re-attach event listeners to new sample buttons
	const newSampleButtons = sampleChips.querySelectorAll<HTMLButtonElement>('.chip[data-sample]')
	newSampleButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const sample = button.dataset.sample ?? ''
			romanInput.value = sample
			persistDraft(sample)
			applyTransliteration()
			romanInput.focus()
		})
	})
}

// ============================================================================
// IME INPUT LOGIC - Instant real-time conversion as you type
// ============================================================================

const imeDigitMap: Record<string, string> = {
	'0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
	'5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
}

// Track what the user is typing in romanized form
let imeRomanBuffer: string[] = [] // Array of romanized words/segments
let currentRomanWord = '' // Current word being typed

const renderImeContent = () => {
	const options = { useDevanagariDigits: imeDigitToggle.checked }

	// Convert all completed words/segments
	let output = ''
	for (const segment of imeRomanBuffer) {
		if (/^[\s।॥!?,;:\n]+$/.test(segment)) {
			// Whitespace/punctuation - keep as is
			output += segment
		} else if (/^[०-९]+$/.test(segment)) {
			// Already Nepali digits - keep as is
			output += segment
		} else {
			// Romanized word - convert it
			output += transliterate(segment, options)
		}
	}

	// Add the current word being typed (convert it live)
	if (currentRomanWord) {
		output += transliterate(currentRomanWord, options)
	}

	// Update the display - use innerHTML with non-breaking spaces to preserve trailing spaces
	// Replace regular spaces with &nbsp; to make them visible
	const htmlOutput = output
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/ /g, '\u00A0') // Non-breaking space
		.replace(/\n/g, '<br>')

	imeInput.innerHTML = htmlOutput

	// Move cursor to end
	const range = document.createRange()
	const selection = window.getSelection()

	// Find the last text node or element
	const walker = document.createTreeWalker(imeInput, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
	let lastNode: Node | null = null
	let lastOffset = 0

	while (walker.nextNode()) {
		const node = walker.currentNode
		if (node.nodeType === Node.TEXT_NODE) {
			lastNode = node
			lastOffset = (node as Text).length
		} else if (node.nodeName === 'BR') {
			lastNode = node.parentNode
			lastOffset = Array.from(node.parentNode!.childNodes).indexOf(node as ChildNode) + 1
		}
	}

	if (lastNode) {
		range.setStart(lastNode, lastOffset)
		range.setEnd(lastNode, lastOffset)
	} else {
		range.setStart(imeInput, 0)
		range.setEnd(imeInput, 0)
	}

	if (selection) {
		selection.removeAllRanges()
		selection.addRange(range)
	}
}

const handleImeKeydown = (e: KeyboardEvent) => {
	const key = e.key

	// Allow control key combinations (Ctrl+A, Ctrl+C, Ctrl+V, etc.)
	if (e.ctrlKey || e.metaKey || e.altKey) {
		return // Let browser handle it
	}

	// Handle backspace
	if (key === 'Backspace') {
		e.preventDefault()
		if (currentRomanWord.length > 0) {
			// Remove last character from current word
			currentRomanWord = currentRomanWord.slice(0, -1)
		} else if (imeRomanBuffer.length > 0) {
			// Remove from buffer
			const lastSegment = imeRomanBuffer.pop()!
			if (lastSegment.length > 1) {
				// Put back without last char
				imeRomanBuffer.push(lastSegment.slice(0, -1))
			}
			// If it was a single char, it's just removed
		}
		renderImeContent()
		return
	}

	// Handle digits
	if (/^[0-9]$/.test(key)) {
		e.preventDefault()
		// Commit current word first
		if (currentRomanWord) {
			imeRomanBuffer.push(currentRomanWord)
			currentRomanWord = ''
		}
		// Add Nepali digit
		const digit = imeDigitToggle.checked ? imeDigitMap[key] : key
		imeRomanBuffer.push(digit)
		renderImeContent()
		return
	}

	// Handle punctuation
	if (key === '.' || key === '|' || key === '!' || key === '?' || key === ',' || key === ';' || key === ':') {
		e.preventDefault()
		// Commit current word first
		if (currentRomanWord) {
			imeRomanBuffer.push(currentRomanWord)
			currentRomanWord = ''
		}
		// Add punctuation (convert . and | to danda)
		const punct = (key === '.' || key === '|') ? '।' : key
		imeRomanBuffer.push(punct)
		renderImeContent()
		return
	}

	// Handle space
	if (key === ' ') {
		e.preventDefault()
		// Commit current word
		if (currentRomanWord) {
			imeRomanBuffer.push(currentRomanWord)
			currentRomanWord = ''
		}
		// Add space
		imeRomanBuffer.push(' ')
		renderImeContent()
		return
	}

	// Handle enter
	if (key === 'Enter') {
		e.preventDefault()
		// Commit current word
		if (currentRomanWord) {
			imeRomanBuffer.push(currentRomanWord)
			currentRomanWord = ''
		}
		// Add newline
		imeRomanBuffer.push('\n')
		renderImeContent()
		return
	}

	// Handle letter input
	if (/^[a-zA-Z~^`]$/.test(key)) {
		e.preventDefault()
		currentRomanWord += key
		renderImeContent()
		return
	}
}

// Clear IME on focus
imeInput.addEventListener('focus', () => {
	// Keep existing content
})

imeInput.addEventListener('keydown', handleImeKeydown)

// Prevent default input behavior since we handle everything in keydown
imeInput.addEventListener('beforeinput', (e) => {
	e.preventDefault()
})

imeDigitToggle.addEventListener('change', () => {
	// Re-render with new digit setting
	renderImeContent()
})

imeSampleButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const sample = button.dataset.imeSample ?? ''
		// Convert the whole sample text at once
		const options = { useDevanagariDigits: imeDigitToggle.checked }
		const converted = transliterate(sample, options)
		imeInput.innerText = converted
		imeInput.focus()
	})
})

const debouncedUpdate = debounce(() => {
	persistDraft(romanInput.value)
	applyTransliteration()
}, 180)

romanInput.value = getStoredDraft()
applyTransliteration()

romanInput.addEventListener('input', () => {
	setStatus('Listening...')
	debouncedUpdate()
})

digitToggle.addEventListener('change', () => {
	applyTransliteration()
})

directionToggle.addEventListener('change', () => {
	updateUILabels()
	applyTransliteration()
})

copyButton.addEventListener('click', async () => {
	if (!nepaliOutput.value) return
	try {
		const copied = await copyToClipboard(nepaliOutput.value)
		copyButton.dataset.feedback = copied ? 'copied' : 'error'
		setStatus(copied ? 'Copied to clipboard' : 'Clipboard blocked')
	} catch (error) {
		console.warn('Copy failed', error)
		copyButton.dataset.feedback = 'error'
		setStatus('Clipboard blocked')
	}
	window.setTimeout(() => {
		delete copyButton.dataset.feedback
		applyTransliteration()
	}, 1200)
})

sampleButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const sample = button.dataset.sample ?? ''
		romanInput.value = sample
		persistDraft(sample)
		applyTransliteration()
		romanInput.focus()
	})
})

// ============================================================================
// FLOATING TIPS BUTTON AND MODAL
// ============================================================================

const createTipsButton = (): HTMLButtonElement => {
	const button = document.createElement('button')
	button.className = 'tips-fab'
	button.setAttribute('aria-label', 'Open typing tips')
	button.setAttribute('aria-expanded', 'false')
	button.textContent = '?'
	return button
}

const createTipsModal = (): HTMLDivElement => {
	const modal = document.createElement('div')
	modal.className = 'tips-modal'
	modal.setAttribute('role', 'dialog')
	modal.setAttribute('aria-modal', 'true')
	modal.setAttribute('aria-labelledby', 'tips-modal-title')
	modal.setAttribute('aria-hidden', 'true')

	modal.innerHTML = `
		<div class="tips-modal-content">
			<div class="tips-modal-header">
				<h2 id="tips-modal-title" class="tips-modal-title">Typing Tips</h2>
				<button class="tips-modal-close" aria-label="Close tips">&times;</button>
			</div>
			<div class="tips-modal-body">
				<h4>Vowels</h4>
				<ul>
					<li>Double vowels for long sounds: <code>aa</code> → ा, <code>ee</code> → ी, <code>oo</code> → ू</li>
					<li>Single vowels: <code>a</code> → अ, <code>i</code> → इ, <code>u</code> → उ</li>
					<li>Combined: <code>ai</code> → ऐ, <code>au</code> → औ</li>
				</ul>

				<h4>Consonants</h4>
				<ul>
					<li>Standard: <code>k</code> → क, <code>g</code> → ग, <code>ch</code> → च, <code>j</code> → ज</li>
					<li>Special: <code>sh</code> → श, <code>Sh</code> → ष, <code>ri</code> → ऋ</li>
					<li>Aspirated: <code>kh</code> → ख, <code>gh</code> → घ, <code>chh</code> → छ</li>
				</ul>

				<h4>Dropping Inherent Vowels</h4>
				<ul>
					<li>Add <code>^</code> after a consonant to drop the inherent vowel</li>
					<div class="example"><strong>Example:</strong> <code>k^sha</code> → क्ष, <code>g^ya</code> → ग्य</div>
				</ul>

				<h4>Special Characters</h4>
				<ul>
					<li><code>m~</code> → ं (anusvara)</li>
					<li><code>n~</code> → ँ (chandrabindu)</li>
					<li><code>h~</code> → ः (visarga)</li>
					<li><code>.</code> → । (danda)</li>
				</ul>

				<h4>Digits</h4>
				<ul>
					<li>Toggle "Use Nepali digits" to convert 0-9 to ०-९</li>
					<div class="example"><strong>Example:</strong> <code>2024</code> → २०२४</div>
				</ul>

				<h4>Reverse Transliteration</h4>
				<ul>
					<li>Toggle "Nepali to Roman" to convert Devanagari back to romanized text</li>
					<li>Consonant clusters are decomposed: क्ष → ksh</li>
					<li>Diacritics are preserved: ं → m~, ँ → n~, ः → h~</li>
				</ul>

				<h4>Proper Nouns</h4>
				<ul>
					<li>Includes 1,225+ proper noun lexicon for accurate city/district names</li>
					<div class="example"><strong>Example:</strong> <code>Kathmandu</code> → काठमाडौँ, <code>Pokhara</code> → पोखरा</div>
				</ul>
			</div>
		</div>
	`

	return modal
}

// Create and append tips button and modal
const tipsButton = createTipsButton()
const tipsModal = createTipsModal()

document.body.appendChild(tipsButton)
document.body.appendChild(tipsModal)

// Tips modal functionality
const openTipsModal = () => {
	tipsModal.classList.add('open')
	tipsModal.setAttribute('aria-hidden', 'false')
	document.body.style.overflow = 'hidden'
	tipsButton.setAttribute('aria-expanded', 'true')
}

const closeTipsModal = () => {
	tipsModal.classList.remove('open')
	tipsModal.setAttribute('aria-hidden', 'true')
	document.body.style.overflow = ''
	tipsButton.setAttribute('aria-expanded', 'false')
}

// Event listeners
tipsButton.addEventListener('click', openTipsModal)

const closeButton = tipsModal.querySelector('.tips-modal-close')
closeButton?.addEventListener('click', closeTipsModal)

// Close on overlay click
tipsModal.addEventListener('click', (e) => {
	if (e.target === tipsModal) {
		closeTipsModal()
	}
})

// Close on Escape key
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && tipsModal.classList.contains('open')) {
		closeTipsModal()
	}
})
