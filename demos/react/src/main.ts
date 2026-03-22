import './style.css'
import { createNepaliInput, createNepaliTextarea, createNepaliConverter } from '@oarkflow/nepali-input'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
	throw new Error('Root container #app not found')
}

app.innerHTML = `
  <main class="shell">
    <div class="two-col">
      <div class="left-col">

        <!-- Component 1: NepaliInput (single-line) -->
        <section class="ime-section">
          <div class="panel ime-panel">
            <div class="panel-head">
              <div>
                <p class="eyebrow">Component 1</p>
                <h2>Nepali Input (Single-line)</h2>
              </div>
            </div>

            <div style="margin-bottom: 0.5rem;">
              <input
                id="nepali-input-demo"
                type="text"
                placeholder="Type: namaste, swagatam, dhanyabad..."
                style="width: 100%; padding: 0.6rem; border: 2px solid var(--border-default); border-radius: 0.5rem; font-family: 'Space Grotesk', 'Noto Sans Devanagari', sans-serif; font-size: 1rem; background: var(--bg-input); color: var(--fg-default); transition: border-color 0.2s;"
              />
            </div>
          </div>
        </section>

        <!-- Component 2: NepaliTextarea (multi-line) -->
        <section class="ime-section">
          <div class="panel ime-panel">
            <div class="panel-head">
              <div>
                <p class="eyebrow">Component 2</p>
                <h2>Nepali Textarea (Multi-line)</h2>
              </div>
            </div>

            <div style="margin-bottom: 0.5rem;">
              <textarea
                id="nepali-textarea-demo"
                placeholder="Type longer text here...&#10;Press Enter for new lines&#10;Try: Ma Nepal bata hu. Ma Nepali bolchhu."
                rows="5"
                style="width: 100%; padding: 0.6rem; border: 2px solid var(--border-default); border-radius: 0.5rem; font-family: 'Space Grotesk', 'Noto Sans Devanagari', sans-serif; font-size: 0.95rem; background: var(--bg-input); color: var(--fg-default); resize: vertical;"
              ></textarea>
            </div>
          </div>
        </section>

      </div>

      <div class="right-col">

        <!-- Component 3: NepaliConverter (Input/Output with Copy) -->
        <section class="workspace">
          <div style="margin-bottom: 1rem;">
            <p class="eyebrow">Component 3</p>
            <h2 style="font-size: 1.2rem; margin-bottom: 0.25rem;">Nepali Converter (Block Text)</h2>
          </div>

          <div class="panel" aria-live="polite">
            <div class="panel-head">
              <div>
                <p class="eyebrow">Input</p>
                <h2>Romanized Text</h2>
              </div>
            </div>
            <textarea
              id="converter-input"
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              placeholder="Paste or type romanized Nepali text here...&#10;&#10;This component is optimized for converting larger blocks of text."
              rows="8"
            ></textarea>
            <div class="panel-foot">
              <p id="converter-input-count" class="stat">0 characters</p>
              <p id="converter-status" class="stat" role="status">Waiting for input</p>
            </div>
          </div>

          <div class="panel output-panel">
            <div class="panel-head">
              <div>
                <p class="eyebrow">Output</p>
                <h2>Nepali Script</h2>
              </div>
              <button id="converter-copy-btn" type="button">Copy result</button>
            </div>
            <textarea
              id="converter-output"
              lang="ne"
              dir="ltr"
              readonly
              aria-live="polite"
              placeholder="देवनागरी परिणाम यहाँ देखिन्छ"
              rows="8"
            ></textarea>
            <div class="panel-foot">
              <p id="converter-output-count" class="stat">0 characters</p>
            </div>
          </div>

        </section>

      </div>
    </div>
  </main>
`

// ============================================================================
// COMPONENT 1: NepaliInput (Single-line)
// ============================================================================

const nepaliInputDemo = app.querySelector<HTMLInputElement>('#nepali-input-demo')

if (!nepaliInputDemo) {
	throw new Error('NepaliInput demo elements not found')
}

const nepaliInput = createNepaliInput(nepaliInputDemo, {
	useDevanagariDigits: true,
	autoConvert: true
})

// ============================================================================
// COMPONENT 2: NepaliTextarea (Multi-line)
// ============================================================================

const nepaliTextareaDemo = app.querySelector<HTMLTextAreaElement>('#nepali-textarea-demo')

if (!nepaliTextareaDemo) {
	throw new Error('NepaliTextarea demo elements not found')
}

const nepaliTextarea = createNepaliTextarea(nepaliTextareaDemo, {
	useDevanagariDigits: true,
	autoConvert: true
})

// ============================================================================
// COMPONENT 3: NepaliConverter (Input/Output with Copy)
// ============================================================================

const converterInput = app.querySelector<HTMLTextAreaElement>('#converter-input')
const converterOutput = app.querySelector<HTMLTextAreaElement>('#converter-output')
const converterCopyBtn = app.querySelector<HTMLButtonElement>('#converter-copy-btn')
const converterInputCount = app.querySelector<HTMLElement>('#converter-input-count')
const converterOutputCount = app.querySelector<HTMLElement>('#converter-output-count')
const converterStatus = app.querySelector<HTMLElement>('#converter-status')

if (!converterInput || !converterOutput || !converterCopyBtn || !converterInputCount || !converterOutputCount || !converterStatus) {
	throw new Error('NepaliConverter demo elements not found')
}

const nepaliConverter = createNepaliConverter(
	converterInput,
	converterOutput,
	converterCopyBtn,
	{
		useDevanagariDigits: true,
		debounceMs: 300,
		onInput: (input, output) => {
			converterInputCount.textContent = `${input.length} characters`
			converterOutputCount.textContent = `${output.length} characters`
			converterStatus.textContent = input ? 'Converting...' : 'Waiting for input'
			converterCopyBtn.disabled = !output
		},
		onChange: (input, output) => {
			converterStatus.textContent = output ? 'Conversion complete' : 'Waiting for input'
		}
	}
)
