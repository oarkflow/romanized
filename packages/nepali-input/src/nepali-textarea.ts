import { NepaliInputBase } from './nepali-input-base'
import type { NepaliInputOptions } from './nepali-input-base'
import type { NepaliIMEState } from './nepali-ime-core'

export type NepaliTextareaOptions = NepaliInputOptions

/**
 * Nepali textarea component for multi-line text input
 * DOM adapter for textarea elements using the headless core
 */
export class NepaliTextarea extends NepaliInputBase<HTMLTextAreaElement> {
	protected updateCursor(state: NepaliIMEState): void {
		// Position cursor at end of output
		this.element.selectionStart = state.cursorPosition
		this.element.selectionEnd = state.cursorPosition
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
