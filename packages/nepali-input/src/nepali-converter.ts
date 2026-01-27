import { transliterate, reverseTransliterate } from './transliterate'

export interface NepaliConverterOptions {
	useDevanagariDigits?: boolean
	bidirectional?: boolean
	debounceMs?: number
	onInput?: (romanized: string, converted: string) => void
	onChange?: (romanized: string, converted: string) => void
}

export interface NepaliConverterState {
	input: string
	output: string
	direction: 'toNepali' | 'toRoman'
}

/**
 * Headless Nepali Converter Core
 * Converts full text blocks (not character-by-character IME)
 */
export class NepaliConverterCore {
	private state: NepaliConverterState
	private options: Required<NepaliConverterOptions>
	private debounceTimer: number | null = null

	constructor(options: NepaliConverterOptions = {}) {
		this.options = {
			useDevanagariDigits: options.useDevanagariDigits ?? true,
			bidirectional: options.bidirectional ?? false,
			debounceMs: options.debounceMs ?? 300,
			onInput: options.onInput ?? (() => { }),
			onChange: options.onChange ?? (() => { }),
		}
		this.state = {
			input: '',
			output: '',
			direction: 'toNepali',
		}
	}

	public getState(): Readonly<NepaliConverterState> {
		return { ...this.state }
	}

	public setInput(text: string): void {
		this.state.input = text
		this.convert()

		// Debounced onChange
		if (this.debounceTimer !== null) {
			clearTimeout(this.debounceTimer)
		}
		this.debounceTimer = window.setTimeout(() => {
			this.options.onChange(this.state.input, this.state.output)
		}, this.options.debounceMs)
	}

	public getOutput(): string {
		return this.state.output
	}

	public getInput(): string {
		return this.state.input
	}

	public setDirection(direction: 'toNepali' | 'toRoman'): void {
		this.state.direction = direction
		this.convert()
	}

	public toggleDirection(): void {
		this.state.direction = this.state.direction === 'toNepali' ? 'toRoman' : 'toNepali'
		this.convert()
	}

	public getDirection(): 'toNepali' | 'toRoman' {
		return this.state.direction
	}

	public setUseDevanagariDigits(value: boolean): void {
		this.options.useDevanagariDigits = value
		this.convert()
	}

	public getUseDevanagariDigits(): boolean {
		return this.options.useDevanagariDigits
	}

	public clear(): void {
		this.state.input = ''
		this.state.output = ''
		this.options.onInput('', '')
		this.options.onChange('', '')
	}

	private convert(): void {
		if (!this.state.input) {
			this.state.output = ''
		} else if (this.state.direction === 'toNepali') {
			this.state.output = transliterate(this.state.input, {
				useDevanagariDigits: this.options.useDevanagariDigits
			})
		} else {
			this.state.output = reverseTransliterate(this.state.input, {
				useLatinDigits: !this.options.useDevanagariDigits
			})
		}

		this.options.onInput(this.state.input, this.state.output)
	}
}

/**
 * DOM Adapter for Nepali Converter
 * Manages input textarea, output display, and copy button
 */
export class NepaliConverter {
	private core: NepaliConverterCore
	private inputElement: HTMLTextAreaElement
	private outputElement: HTMLElement
	private copyButton: HTMLButtonElement | null

	constructor(
		inputElement: HTMLTextAreaElement,
		outputElement: HTMLElement,
		copyButton?: HTMLButtonElement,
		options: NepaliConverterOptions = {}
	) {
		this.inputElement = inputElement
		this.outputElement = outputElement
		this.copyButton = copyButton || null

		this.core = new NepaliConverterCore({
			...options,
			onInput: (input, output) => {
				this.updateOutput(output)
				options.onInput?.(input, output)
			},
			onChange: (input, output) => {
				options.onChange?.(input, output)
			}
		})

		this.init()
	}

	private init(): void {
		// Set input attributes
		this.inputElement.setAttribute('autocomplete', 'off')
		this.inputElement.setAttribute('autocorrect', 'off')
		this.inputElement.setAttribute('autocapitalize', 'off')
		this.inputElement.setAttribute('spellcheck', 'false')

		// Bind input handler
		this.inputElement.addEventListener('input', this.handleInput)

		// Bind copy button
		if (this.copyButton) {
			this.copyButton.addEventListener('click', this.handleCopy)
		}

		// Initial conversion if there's existing content
		if (this.inputElement.value) {
			this.core.setInput(this.inputElement.value)
		}
	}

	private handleInput = (): void => {
		this.core.setInput(this.inputElement.value)
	}

	private updateOutput(text: string): void {
		if (this.outputElement.tagName === 'TEXTAREA' || this.outputElement.tagName === 'INPUT') {
			(this.outputElement as HTMLTextAreaElement | HTMLInputElement).value = text
		} else {
			this.outputElement.textContent = text
		}
	}

	private handleCopy = async (): Promise<void> => {
		const output = this.core.getOutput()

		try {
			// Try modern clipboard API
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(output)
				this.showCopyFeedback()
				return
			}
		} catch (err) {
			// Fall through to fallback
		}

		// Fallback for older browsers
		const textarea = document.createElement('textarea')
		textarea.value = output
		textarea.style.position = 'fixed'
		textarea.style.opacity = '0'
		document.body.appendChild(textarea)
		textarea.select()

		try {
			document.execCommand('copy')
			this.showCopyFeedback()
		} catch (err) {
			console.error('Failed to copy:', err)
		} finally {
			document.body.removeChild(textarea)
		}
	}

	private showCopyFeedback(): void {
		if (!this.copyButton) return

		const originalText = this.copyButton.textContent
		this.copyButton.textContent = '✓ Copied!'
		this.copyButton.disabled = true

		setTimeout(() => {
			this.copyButton!.textContent = originalText
			this.copyButton!.disabled = false
		}, 2000)
	}

	// Public methods
	public getCore(): NepaliConverterCore {
		return this.core
	}

	public setInput(text: string): void {
		this.inputElement.value = text
		this.core.setInput(text)
	}

	public getOutput(): string {
		return this.core.getOutput()
	}

	public clear(): void {
		this.inputElement.value = ''
		this.core.clear()
	}

	public setDirection(direction: 'toNepali' | 'toRoman'): void {
		this.core.setDirection(direction)
	}

	public toggleDirection(): void {
		this.core.toggleDirection()
	}

	public destroy(): void {
		this.inputElement.removeEventListener('input', this.handleInput)
		if (this.copyButton) {
			this.copyButton.removeEventListener('click', this.handleCopy)
		}
	}
}

// Factory function
export function createNepaliConverter(
	inputSelector: string | HTMLTextAreaElement,
	outputSelector: string | HTMLElement,
	copyButtonSelector?: string | HTMLButtonElement,
	options?: NepaliConverterOptions
): NepaliConverter {
	const inputElement = typeof inputSelector === 'string'
		? document.querySelector<HTMLTextAreaElement>(inputSelector)
		: inputSelector

	const outputElement = typeof outputSelector === 'string'
		? document.querySelector<HTMLElement>(outputSelector)
		: outputSelector

	const copyButton = copyButtonSelector
		? typeof copyButtonSelector === 'string'
			? document.querySelector<HTMLButtonElement>(copyButtonSelector)
			: copyButtonSelector
		: null

	if (!inputElement) {
		throw new Error('Input element not found')
	}

	if (!outputElement) {
		throw new Error('Output element not found')
	}

	return new NepaliConverter(inputElement, outputElement, copyButton || undefined, options)
}
