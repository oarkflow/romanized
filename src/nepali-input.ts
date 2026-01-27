import { NepaliInputBase } from './nepali-input-base'
import type { NepaliInputOptions } from './nepali-input-base'

/**
 * Nepali input component for single-line text input
 * Extends the base class with input-specific behavior
 */
export class NepaliInput extends NepaliInputBase<HTMLInputElement> {
	// Input elements don't handle Enter - it submits forms
	protected shouldHandleEnter(): boolean {
		return false
	}

	protected render() {
		const output = this.buildOutput()
		this.element.value = output
		this.options.onInput(output)
	}
}

export type { NepaliInputOptions }

// Factory function for easy instantiation
export function createNepaliInput(
	selector: string | HTMLInputElement,
	options?: NepaliInputOptions
): NepaliInput {
	const element = typeof selector === 'string'
		? document.querySelector<HTMLInputElement>(selector)
		: selector

	if (!element) {
		throw new Error('Input element not found')
	}

	return new NepaliInput(element, options)
}
