import { transliterate } from './transliterate'

export interface NepaliIMEOptions {
	useDevanagariDigits?: boolean
	onStateChange?: (state: NepaliIMEState) => void
}

export interface NepaliIMEState {
	romanBuffer: string[]
	currentWord: string
	output: string
	cursorPosition: number
}

const digitMap: Record<string, string> = {
	'0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
	'5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
}

/**
 * Headless Nepali IME Core
 * Framework-agnostic transliteration engine
 * Can be used with Vanilla JS, React, Vue, Svelte, etc.
 */
export class NepaliIMECore {
	private state: NepaliIMEState
	private options: Required<NepaliIMEOptions>

	constructor(options: NepaliIMEOptions = {}) {
		this.options = {
			useDevanagariDigits: options.useDevanagariDigits ?? true,
			onStateChange: options.onStateChange ?? (() => { }),
		}
		this.state = {
			romanBuffer: [],
			currentWord: '',
			output: '',
			cursorPosition: 0,
		}
	}

	/**
	 * Get current state
	 */
	public getState(): Readonly<NepaliIMEState> {
		return { ...this.state }
	}

	/**
	 * Handle keyboard input
	 * Returns true if the event was handled, false otherwise
	 */
	public handleKey(key: string, modifiers: { ctrl?: boolean; alt?: boolean; meta?: boolean } = {}): boolean {
		// Allow modifier key combinations (except Backspace/Delete)
		if (modifiers.ctrl || modifiers.meta || modifiers.alt) {
			if (key !== 'Backspace' && key !== 'Delete') {
				return false
			}
		}

		// Navigation keys - let browser handle
		const navigationKeys = [
			'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
			'Home', 'End', 'PageUp', 'PageDown',
			'Tab', 'Escape', 'Insert',
			'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
			'CapsLock', 'NumLock', 'ScrollLock', 'Pause', 'PrintScreen',
			'ContextMenu', 'Meta', 'Control', 'Alt', 'Shift'
		]

		if (navigationKeys.includes(key)) {
			return false
		}

		// Handle backspace and delete
		if (key === 'Backspace' || key === 'Delete') {
			this.deleteCharacter()
			this.updateOutput()
			return true
		}

		// Handle digits
		if (/^[0-9]$/.test(key)) {
			this.commitCurrentWord()
			const digit = this.options.useDevanagariDigits ? digitMap[key] : key
			this.state.romanBuffer.push(digit)
			this.updateOutput()
			return true
		}

		// Handle punctuation
		if (this.isPunctuation(key)) {
			this.commitCurrentWord()
			const punct = (key === '.' || key === '|') ? '।' : key
			this.state.romanBuffer.push(punct)
			this.updateOutput()
			return true
		}

		// Handle space
		if (key === ' ') {
			this.commitCurrentWord()
			this.state.romanBuffer.push(' ')
			this.updateOutput()
			return true
		}

		// Handle enter/newline
		if (key === 'Enter') {
			this.commitCurrentWord()
			this.state.romanBuffer.push('\n')
			this.updateOutput()
			return true
		}

		// Handle letter input
		if (/^[a-zA-Z~^`]$/.test(key)) {
			this.state.currentWord += key
			this.updateOutput()
			return true
		}

		return false
	}

	/**
	 * Insert text (e.g., from paste)
	 */
	public insertText(text: string): void {
		const converted = transliterate(text, {
			useDevanagariDigits: this.options.useDevanagariDigits
		})

		// Split converted text into segments and add to buffer
		this.commitCurrentWord()
		this.state.romanBuffer.push(converted)
		this.updateOutput()
	}

	/**
	 * Clear all content
	 */
	public clear(): void {
		this.state.romanBuffer = []
		this.state.currentWord = ''
		this.updateOutput()
	}

	/**
	 * Set content directly (useful for framework integration)
	 */
	public setValue(value: string): void {
		this.state.romanBuffer = value ? [value] : []
		this.state.currentWord = ''
		this.updateOutput()
	}

	/**
	 * Get current output value
	 */
	public getValue(): string {
		return this.state.output
	}

	/**
	 * Update digit conversion setting
	 */
	public setUseDevanagariDigits(value: boolean): void {
		this.options.useDevanagariDigits = value
		this.updateOutput()
	}

	/**
	 * Get digit conversion setting
	 */
	public getUseDevanagariDigits(): boolean {
		return this.options.useDevanagariDigits
	}

	// Private helper methods

	private commitCurrentWord(): void {
		if (this.state.currentWord) {
			this.state.romanBuffer.push(this.state.currentWord)
			this.state.currentWord = ''
		}
	}

	private deleteCharacter(): void {
		if (this.state.currentWord.length > 0) {
			this.state.currentWord = this.state.currentWord.slice(0, -1)
		} else if (this.state.romanBuffer.length > 0) {
			const lastSegment = this.state.romanBuffer.pop()!
			if (lastSegment.length > 1) {
				this.state.romanBuffer.push(lastSegment.slice(0, -1))
			}
		}
	}

	private isPunctuation(key: string): boolean {
		return key === '.' || key === '|' || key === '!' || key === '?' || key === ',' || key === ';' || key === ':'
	}

	private convertSegment(segment: string): string {
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

	private updateOutput(): void {
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

		this.state.output = output
		this.state.cursorPosition = output.length

		// Notify listeners
		this.options.onStateChange(this.getState())
	}
}
