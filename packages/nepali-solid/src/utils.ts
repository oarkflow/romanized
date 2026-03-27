import type { JSX } from 'solid-js'

export function assignRef<T>(ref: ((value: T) => void) | undefined, value: T): void {
	ref?.(value)
}

export function callEventHandler<T extends Element, E extends Event>(
	handler: JSX.EventHandlerUnion<T, E> | undefined,
	event: E & { currentTarget: T; target: Element }
): void {
	if (!handler) {
		return
	}

	if (Array.isArray(handler)) {
		const [fn, data] = handler as [(data: unknown, event: E & { currentTarget: T; target: Element }) => void, unknown]
		fn(data, event)
		return
	}

	;(handler as (event: E & { currentTarget: T; target: Element }) => void)(event)
}

export function mergeClassNames(...values: Array<string | undefined>): string | undefined {
	const className = values.filter(Boolean).join(' ').trim()
	return className || undefined
}

export function getKeyModifiers(event: KeyboardEvent) {
	return {
		ctrl: event.ctrlKey,
		alt: event.altKey,
		meta: event.metaKey,
		shift: event.shiftKey
	}
}
