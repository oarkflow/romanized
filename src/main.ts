import './style.css'
import { transliterate, reverseTransliterate } from './transliterate'

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
    <header class="hero">
      <p class="eyebrow">Romanized Nepali</p>
      <h1>Inline IME-style Nepali Typing</h1>
      <p class="lede">
        Type romanized text and watch it convert to देवनागरी as you type, word by word.
      </p>
    </header>

    <section class="ime-section">
      <div class="panel ime-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">IME Mode</p>
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
          data-placeholder="Start typing in romanized Nepali... Press Space to convert word"
        ></div>
        <div class="panel-foot">
          <p class="stat ime-hint">Type romanized text, press <kbd>Space</kbd> or <kbd>Enter</kbd> to convert current word</p>
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

    <section class="tips">
      <h3>Power tips</h3>
      <ul id="tips-list">
        <li>Double vowels for long sounds (aa -> ा, ee -> ी, oo -> ू).</li>
        <li>Type <code>ri</code> for ऋ, <code>sh</code> for श, <code>Sh</code> for ष.</li>
        <li>Add <code>^</code> after a consonant to drop the inherent vowel (क^sha -> क्ष).</li>
        <li>Use <code>m~</code> for ं, <code>n~</code> for ँ, <code>h~</code> for ः.</li>
      </ul>
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
const tipsList = app.querySelector<HTMLUListElement>('#tips-list')
const sampleChips = app.querySelector<HTMLDivElement>('#sample-chips')

// IME input elements
const imeInput = app.querySelector<HTMLDivElement>('#ime-input')
const imeDigitToggle = app.querySelector<HTMLInputElement>('#ime-digit-toggle')
const imeSampleButtons = app.querySelectorAll<HTMLButtonElement>('.chip[data-ime-sample]')

if (!romanInput || !nepaliOutput || !statusLine || !latinCount || !devanagariCount || !digitToggle || !directionToggle || !copyButton || !inputLabel || !outputLabel || !directionLabel || !tipsList || !sampleChips || !imeInput || !imeDigitToggle) {
	throw new Error('Transliteration UI failed to initialize')
}

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
// IME INPUT LOGIC - Simple approach using full text replacement
// ============================================================================

const imeDigitMap: Record<string, string> = {
	'0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
	'5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
}

const convertAndInsert = (textBefore: string, converted: string, separator: string) => {
	const newText = textBefore + converted + separator
	// Use textContent instead of innerText to avoid <br> issues
	imeInput.textContent = newText

	// Move cursor to end precisely
	const range = document.createRange()
	const selection = window.getSelection()

	if (imeInput.firstChild) {
		range.setStart(imeInput.firstChild, newText.length)
		range.setEnd(imeInput.firstChild, newText.length)
	}

	if (selection) {
		selection.removeAllRanges()
		selection.addRange(range)
	}

	imeInput.focus()
}

const handleImeKeydown = (e: KeyboardEvent) => {
	// Get text content, trimming any initial whitespace/newlines from empty div
	let text = imeInput.innerText || ''
	// Fix: remove leading newline that contenteditable adds when empty
	if (text === '\n' || text === '\r\n') {
		text = ''
	}
	const options = { useDevanagariDigits: imeDigitToggle.checked }
	const key = e.key

	// Handle digits
	if (/^[0-9]$/.test(key) && imeDigitToggle.checked) {
		e.preventDefault()

		// First convert any pending romanized word
		const lastWordMatch = text.match(/([a-zA-Z~^`]+)$/)
		if (lastWordMatch) {
			const romanWord = lastWordMatch[1]
			const converted = transliterate(romanWord, options)
			const beforeWord = text.slice(0, text.length - romanWord.length)
			convertAndInsert(beforeWord, converted, imeDigitMap[key])
		} else {
			// Just insert the Nepali digit - use textContent to avoid <br> issues
			const newText = text + imeDigitMap[key]
			imeInput.textContent = newText
			const range = document.createRange()
			const selection = window.getSelection()
			if (imeInput.firstChild) {
				range.setStart(imeInput.firstChild, newText.length)
				range.setEnd(imeInput.firstChild, newText.length)
			}
			if (selection) {
				selection.removeAllRanges()
				selection.addRange(range)
			}
		}
		return
	}

	// Handle punctuation that should trigger conversion
	if (key === '.' || key === '|' || key === '!' || key === '?' || key === ',' || key === ';' || key === ':') {
		e.preventDefault()

		const punctuation = key === '.' ? '।' : key === '|' ? '।' : key
		const lastWordMatch = text.match(/([a-zA-Z~^`]+)$/)

		if (lastWordMatch) {
			const romanWord = lastWordMatch[1]
			const converted = transliterate(romanWord, options)
			const beforeWord = text.slice(0, text.length - romanWord.length)
			convertAndInsert(beforeWord, converted, punctuation)
		} else {
			// Just insert the punctuation - use textContent to avoid <br> issues
			const newText = text + punctuation
			imeInput.textContent = newText
			const range = document.createRange()
			const selection = window.getSelection()
			if (imeInput.firstChild) {
				range.setStart(imeInput.firstChild, newText.length)
				range.setEnd(imeInput.firstChild, newText.length)
			}
			if (selection) {
				selection.removeAllRanges()
				selection.addRange(range)
			}
		}
		return
	}

	// Convert on space or enter
	if (key === ' ' || key === 'Enter') {
		// Find and convert the last romanized word
		const lastWordMatch = text.match(/([a-zA-Z~^`]+)$/)

		if (lastWordMatch) {
			e.preventDefault()

			const romanWord = lastWordMatch[1]
			const converted = transliterate(romanWord, options)
			const separator = key === ' ' ? ' ' : '\n'
			const beforeWord = text.slice(0, text.length - romanWord.length)

			convertAndInsert(beforeWord, converted, separator)
		}
		// If no romanized word found, let space/enter work normally
	}
}

const handleImeInputEvent = () => {
	// This runs after input - we don't need to do anything special here
	// The keydown handler takes care of conversion
}

imeInput.addEventListener('keydown', handleImeKeydown)
imeInput.addEventListener('input', handleImeInputEvent)

imeDigitToggle.addEventListener('change', () => {
	// Re-convert existing text with new digit setting
	// (optional enhancement)
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
