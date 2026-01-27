import { transliterate } from './transliterate'

export interface NepaliInputOptions {
	useDevanagariDigits?: boolean
	autoConvert?: boolean
	onInput?: (value: string) => void
	onChange?: (value: string) => void
}

interface ImeState {
	romanBuffer: string[]
	currentWord: string
}

const digitMap: Record<string, string> = {
	'0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
	'5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
}

/**
 * Base class for Nepali input components
 * Provides shared IME logic for both input and textarea elements
 */
export abstract class NepaliInputBase<T extends HTMLInputElement | HTMLTextAreaElement> {
	protected element: T
	protected options: Required<NepaliInputOptions>
	protected state: ImeState
	protected enabled: boolean = true

	constructor(element: T, options: NepaliInputOptions = {}) {
		this.element = element
		this.options = {
			useDevanagariDigits: options.useDevanagariDigits ?? true,
			autoConvert: options.autoConvert ?? true,
			onInput: options.onInput ?? (() => { }),
			onChange: options.onChange ?? (() => { }),
		}
		this.state = {
			romanBuffer: [],
			currentWord: '',
		}

		this.init()
	}

	protected init() {
		// Set common attributes
		this.element.setAttribute('lang', 'ne')
		this.element.setAttribute('autocomplete', 'off')
		this.element.setAttribute('autocorrect', 'off')
		this.element.setAttribute('autocapitalize', 'off')
		this.element.setAttribute('spellcheck', 'false')

		// Bind event handlers
		this.element.addEventListener('keydown', this.handleKeydown)
		this.element.addEventListener('paste', this.handlePaste)
		this.element.addEventListener('blur', this.handleBlur)
	}

	protected handleKeydown = (e: KeyboardEvent) => {
		if (!this.enabled || !this.options.autoConvert) return

		const key = e.key

		// Allow control key combinations (except Backspace/Delete with Ctrl)
		if (e.ctrlKey || e.metaKey || e.altKey) {
			// But allow Ctrl+A followed by Backspace/Delete to work
			if (key !== 'Backspace' && key !== 'Delete') {
				return
			}
		}

		// Allow navigation and system keys - don't intercept them
		const navigationKeys = [
			'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
			'Home', 'End', 'PageUp', 'PageDown',
			'Tab', 'Escape', 'Insert',
			'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
			'CapsLock', 'NumLock', 'ScrollLock', 'Pause', 'PrintScreen',
			'ContextMenu', 'Meta', 'Control', 'Alt', 'Shift'
		]

		if (navigationKeys.includes(key)) {
			return
		}

		// Check if there's a text selection
		const hasSelection = this.element.selectionStart !== this.element.selectionEnd

		// Handle backspace and delete
		if (key === 'Backspace' || key === 'Delete') {
			e.preventDefault()

			// If there's a selection, clear everything and start fresh
			if (hasSelection) {
				this.state.romanBuffer = []
				this.state.currentWord = ''
				this.element.value = ''
				this.options.onInput('')
				return
			}

			// No selection - remove last character from buffer
			if (this.state.currentWord.length > 0) {
				this.state.currentWord = this.state.currentWord.slice(0, -1)
			} else if (this.state.romanBuffer.length > 0) {
				const lastSegment = this.state.romanBuffer.pop()!
				if (lastSegment.length > 1) {
					this.state.romanBuffer.push(lastSegment.slice(0, -1))
				}
			}
			this.render()
			return
		}

		// Handle digits
		if (/^[0-9]$/.test(key)) {
			e.preventDefault()
			this.commitCurrentWord()
			const digit = this.options.useDevanagariDigits ? digitMap[key] : key
			this.state.romanBuffer.push(digit)
			this.render()
			return
		}

		// Handle punctuation
		if (this.isPunctuation(key)) {
			e.preventDefault()
			this.commitCurrentWord()
			const punct = (key === '.' || key === '|') ? '।' : key
			this.state.romanBuffer.push(punct)
			this.render()
			return
		}

		// Handle space
		if (key === ' ') {
			e.preventDefault()
			this.commitCurrentWord()
			this.state.romanBuffer.push(' ')
			this.render()
			return
		}

		// Handle enter - subclasses can override
		if (key === 'Enter' && this.shouldHandleEnter()) {
			e.preventDefault()
			this.commitCurrentWord()
			this.state.romanBuffer.push('\n')
			this.render()
			return
		}

		// Handle letter input
		if (/^[a-zA-Z~^`]$/.test(key)) {
			e.preventDefault()
			this.state.currentWord += key
			this.render()
			return
		}
	}

	protected handlePaste = (e: ClipboardEvent) => {
		if (!this.enabled || !this.options.autoConvert) return

		e.preventDefault()
		const text = e.clipboardData?.getData('text/plain') || ''

		// Convert pasted text
		const converted = transliterate(text, {
			useDevanagariDigits: this.options.useDevanagariDigits
		})

		// Insert at cursor or replace selection
		const start = this.element.selectionStart || 0
		const end = this.element.selectionEnd || 0
		const currentValue = this.element.value

		this.element.value = currentValue.substring(0, start) + converted + currentValue.substring(end)
		this.element.selectionStart = this.element.selectionEnd = start + converted.length

		this.options.onInput(this.element.value)
		this.options.onChange(this.element.value)
	}

	protected handleBlur = () => {
		// Commit any pending word on blur
		if (this.state.currentWord) {
			this.commitCurrentWord()
			this.render()
		}
	}

	protected commitCurrentWord() {
		if (this.state.currentWord) {
			this.state.romanBuffer.push(this.state.currentWord)
			this.state.currentWord = ''
		}
	}

	protected isPunctuation(key: string): boolean {
		return key === '.' || key === '|' || key === '!' || key === '?' || key === ',' || key === ';' || key === ':'
	}

	protected convertSegment(segment: string): string {
		// Whitespace/punctuation - keep as is
		if (/^[\s।॥!?,;:\n]+$/.test(segment)) {
			return segment
		}
		// Already Nepali digits - keep as is
		if (/^[०-९]+$/.test(segment)) {
			return segment
		}
		// Romanized word - convert it
		return transliterate(segment, { useDevanagariDigits: this.options.useDevanagariDigits })
	}

	protected buildOutput(): string {
		let output = ''

		// Convert all completed segments
		for (const segment of this.state.romanBuffer) {
			output += this.convertSegment(segment)
		}

		// Add current word being typed
		if (this.state.currentWord) {
			output += transliterate(this.state.currentWord, {
				useDevanagariDigits: this.options.useDevanagariDigits
			})
		}

		return output
	}

	// Abstract method - subclasses must implement cursor behavior
	protected abstract shouldHandleEnter(): boolean
	protected abstract render(): void

	// Public methods
	public enable() {
		this.enabled = true
	}

	public disable() {
		this.enabled = false
	}

	public isEnabled(): boolean {
		return this.enabled
	}

	public setValue(value: string) {
		this.element.value = value
		this.state.romanBuffer = []
		this.state.currentWord = ''
	}

	public getValue(): string {
		return this.element.value
	}

	public clear() {
		this.element.value = ''
		this.state.romanBuffer = []
		this.state.currentWord = ''
	}

	public setOptions(options: Partial<NepaliInputOptions>) {
		this.options = { ...this.options, ...options }
	}

	public destroy() {
		this.element.removeEventListener('keydown', this.handleKeydown)
		this.element.removeEventListener('paste', this.handlePaste)
		this.element.removeEventListener('blur', this.handleBlur)
	}
}
