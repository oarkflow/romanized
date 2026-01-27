import { NepaliInputBase } from './nepali-input-base'
import type { NepaliInputOptions } from './nepali-input-base'

export type NepaliTextareaOptions = NepaliInputOptions

/**
 * Nepali textarea component for multi-line text input
 * Extends the base class with textarea-specific behavior (handles Enter for newlines)
 */
export class NepaliTextarea extends NepaliInputBase<HTMLTextAreaElement> {
	// Textarea elements handle Enter for newlines
	protected shouldHandleEnter(): boolean {
		return true
	}

	protected render() {
		const output = this.buildOutput()
		const cursorPos = output.length

		this.element.value = output
		this.element.selectionStart = this.element.selectionEnd = cursorPos
		this.options.onInput(output)
	}
}

// Factory function for easy instantiation
export function createNepaliTextarea(
	selector: string | HTMLTextAreaElement,
	options?: NepaliTextareaOptions
): NepaliTextarea {
	const element = typeof selector === 'string'
		? document.querySelector<HTMLTextAreaElement>(selector)
		: selector

	if (!element) {
		throw new Error('Textarea element not found')
	}

	return new NepaliTextarea(element, options)
}
