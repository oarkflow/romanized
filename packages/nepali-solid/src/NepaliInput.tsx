import { createEffect, createSignal, on, onCleanup, splitProps, untrack, type JSX } from 'solid-js'
import { NepaliIMECore, type NepaliIMEState, type DevanagariLanguage } from '@oarkflow/nepali-input'
import { assignRef, callEventHandler, getKeyModifiers, mergeClassNames } from './utils'

export interface NepaliInputRef {
	clear: () => void
	setValue: (value: string) => void
	getValue: () => string
	getCore: () => NepaliIMECore | null
}

export interface NepaliInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput' | 'value' | 'ref'> {
	value?: string
	onChange?: (value: string) => void
	onInput?: (value: string) => void
	useDevanagariDigits?: boolean
	language?: DevanagariLanguage
	enableExtendedRomanization?: boolean
	customWordMap?: Record<string, string>
	instanceRef?: (value: NepaliInputRef) => void
	inputRef?: (value: HTMLInputElement) => void
	className?: string
}

export function NepaliInput(allProps: NepaliInputProps) {
	const [props, rest] = splitProps(allProps, [
		'value',
		'onChange',
		'onInput',
		'useDevanagariDigits',
		'language',
		'enableExtendedRomanization',
		'customWordMap',
		'instanceRef',
		'inputRef',
		'onKeyDown',
		'onPaste',
		'class',
		'className'
	])
	const [internalValue, setInternalValue] = createSignal(props.value ?? '')
	let core: NepaliIMECore | null = null
	let inputElement: HTMLInputElement | undefined

	const instance: NepaliInputRef = {
		clear: () => {
			core?.clear()
			if (!core) {
				setInternalValue('')
			}
		},
		setValue: (value: string) => {
			core?.setValue(value)
			if (!core) {
				setInternalValue(value)
			}
		},
		getValue: () => core?.getValue() ?? internalValue(),
		getCore: () => core
	}

	createEffect(() => {
		props.instanceRef?.(instance)
	})

	createEffect(() => {
		const nextCore = new NepaliIMECore({
				useDevanagariDigits: props.useDevanagariDigits ?? true,
				language: props.language ?? 'generic',
				enableExtendedRomanization: props.enableExtendedRomanization ?? false,
				customWordMap: props.customWordMap,
				onStateChange: (state: NepaliIMEState) => {
					setInternalValue(state.output)
					props.onInput?.(state.output)
					props.onChange?.(state.output)
				}
			})
		const initialValue = untrack(() => props.value ?? internalValue())

		core = nextCore
		if (initialValue) {
			nextCore.setValue(initialValue)
		}

		onCleanup(() => {
			if (core === nextCore) {
				core = null
			}
		})
	})

	createEffect(
		on(
			() => props.value,
			(externalValue) => {
				if (externalValue !== undefined && externalValue !== internalValue()) {
					core?.setValue(externalValue)
					setInternalValue(externalValue)
				}
			}
		)
	)

	const handleKeyDown: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (event) => {
		callEventHandler(props.onKeyDown, event)
		if (event.defaultPrevented || !core) {
			return
		}

		const hasSelection =
			inputElement?.selectionStart !== inputElement?.selectionEnd

		if (hasSelection && (event.key === 'Backspace' || event.key === 'Delete')) {
			event.preventDefault()
			core.clear()
			return
		}

		const handled = core.handleKey(event.key, getKeyModifiers(event))
		if (handled) {
			event.preventDefault()
		}
	}

	const handlePaste: JSX.EventHandler<HTMLInputElement, ClipboardEvent> = (event) => {
		callEventHandler(props.onPaste, event)
		if (event.defaultPrevented || !core) {
			return
		}

		event.preventDefault()
		core.insertText(event.clipboardData?.getData('text/plain') ?? '')
	}

	const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
		if (event.currentTarget.value === '') {
			core?.clear()
		}
	}

	return (
		<input
			{...rest}
			ref={(element) => {
				inputElement = element
				assignRef(props.inputRef, element)
			}}
			type="text"
			value={internalValue()}
			onKeyDown={handleKeyDown}
			onPaste={handlePaste}
			onInput={handleInput}
			class={mergeClassNames(props.class, props.className)}
			lang="ne"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck={false}
		/>
	)
}
