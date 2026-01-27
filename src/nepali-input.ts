import { NepaliInputBase } from './nepali-input-base'
import type { NepaliInputOptions } from './nepali-input-base'
import type { NepaliIMEState } from './nepali-ime-core'

/**
 * Nepali input component for single-line text input
 * DOM adapter for input elements using the headless core
 */
export class NepaliInput extends NepaliInputBase<HTMLInputElement> {
	protected updateCursor(_state: NepaliIMEState): void {
		// Input elements don't need special cursor handling
		// Browser handles it automatically
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
