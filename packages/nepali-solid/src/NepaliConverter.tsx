import { createEffect, createSignal, on, onCleanup, splitProps, untrack, type JSX } from 'solid-js'
import { NepaliConverterCore, type DevanagariLanguage } from '@oarkflow/nepali-input'
import { mergeClassNames } from './utils'

type SolidTextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }
type SolidOutputProps = JSX.HTMLAttributes<HTMLDivElement> & { className?: string }
type ButtonMouseEvent = MouseEvent & { currentTarget: HTMLButtonElement; target: Element }

export interface NepaliConverterRef {
	clear: () => void
	getOutput: () => string
	setDirection: (direction: 'toNepali' | 'toRoman') => void
	toggleDirection: () => void
	getCore: () => NepaliConverterCore | null
}

export interface NepaliConverterProps {
	value?: string
	onChange?: (input: string, output: string) => void
	onInput?: (input: string, output: string) => void
	useDevanagariDigits?: boolean
	language?: DevanagariLanguage
	enableExtendedRomanization?: boolean
	customWordMap?: Record<string, string>
	debounceMs?: number
	showCopyButton?: boolean
	direction?: 'toNepali' | 'toRoman'
	inputProps?: SolidTextareaProps
	outputProps?: SolidOutputProps
	class?: string
	className?: string
	instanceRef?: (value: NepaliConverterRef) => void
}

export function NepaliConverter(allProps: NepaliConverterProps) {
	const [props] = splitProps(allProps, [
		'value',
		'onChange',
		'onInput',
		'useDevanagariDigits',
		'language',
		'enableExtendedRomanization',
		'customWordMap',
		'debounceMs',
		'showCopyButton',
		'direction',
		'inputProps',
		'outputProps',
		'class',
		'className',
		'instanceRef'
	])
	const [input, setInput] = createSignal(props.value ?? '')
	const [output, setOutput] = createSignal('')
	const [copied, setCopied] = createSignal(false)
	const [direction, setDirection] = createSignal<'toNepali' | 'toRoman'>(props.direction ?? 'toNepali')
	let core: NepaliConverterCore | null = null

	const syncOutputFromCore = () => {
		setOutput(core?.getOutput() ?? '')
	}

	const instance: NepaliConverterRef = {
		clear: () => {
			core?.clear()
			setInput('')
			setOutput('')
			setCopied(false)
		},
		getOutput: () => core?.getOutput() ?? output(),
		setDirection: (value) => {
			setDirection(value)
			core?.setDirection(value)
			syncOutputFromCore()
		},
		toggleDirection: () => {
			const nextDirection = direction() === 'toNepali' ? 'toRoman' : 'toNepali'
			setDirection(nextDirection)
			core?.setDirection(nextDirection)
			syncOutputFromCore()
		},
		getCore: () => core
	}

	createEffect(() => {
		props.instanceRef?.(instance)
	})

	createEffect(() => {
		const nextCore = new NepaliConverterCore({
			useDevanagariDigits: props.useDevanagariDigits ?? true,
			language: props.language ?? 'generic',
			enableExtendedRomanization: props.enableExtendedRomanization ?? false,
			customWordMap: props.customWordMap,
			debounceMs: props.debounceMs ?? 300,
			bidirectional: true,
			onInput: (inputText: string, outputText: string) => {
				setOutput(outputText)
				props.onInput?.(inputText, outputText)
			},
			onChange: (inputText: string, outputText: string) => {
				props.onChange?.(inputText, outputText)
			}
		})
		const initialDirection = untrack(() => direction())
		const initialInput = untrack(() => props.value ?? input())

		core = nextCore
		nextCore.setDirection(initialDirection)
		if (initialInput) {
			nextCore.setInput(initialInput)
			setInput(initialInput)
		} else {
			setOutput('')
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
				if (externalValue !== undefined && externalValue !== input()) {
					setInput(externalValue)
					core?.setInput(externalValue)
				}
			}
		)
	)

	createEffect(
		on(
			() => props.direction,
			(externalDirection) => {
				if (externalDirection && externalDirection !== direction()) {
					setDirection(externalDirection)
					core?.setDirection(externalDirection)
					syncOutputFromCore()
				}
			}
		)
	)

	const handleInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (event) => {
		const inputHandler = props.inputProps?.onInput
		if (inputHandler) {
			const normalizedEvent = event as InputEvent & {
				currentTarget: HTMLTextAreaElement
				target: HTMLTextAreaElement
			}

			if (Array.isArray(inputHandler)) {
				const [fn, data] = inputHandler as [
					(data: unknown, event: InputEvent & { currentTarget: HTMLTextAreaElement; target: HTMLTextAreaElement }) => void,
					unknown
				]
				fn(data, normalizedEvent)
			} else {
				;(inputHandler as (event: InputEvent & { currentTarget: HTMLTextAreaElement; target: HTMLTextAreaElement }) => void)(
					normalizedEvent
				)
			}
		}

		if (event.defaultPrevented) {
			return
		}

		const nextValue = event.currentTarget.value
		setInput(nextValue)
		core?.setInput(nextValue)
	}

	const handleCopy = async (event: ButtonMouseEvent) => {
		if (event.defaultPrevented) {
			return
		}

		const value = output()
		if (!value) {
			return
		}

		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(value)
			} else {
				const fallback = document.createElement('textarea')
				fallback.value = value
				fallback.style.position = 'fixed'
				fallback.style.opacity = '0'
				document.body.appendChild(fallback)
				fallback.select()
				document.execCommand('copy')
				document.body.removeChild(fallback)
			}

			setCopied(true)
			window.setTimeout(() => setCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy:', error)
		}
	}

	const inputLabel = () => direction() === 'toNepali' ? 'Romanized Input' : 'Nepali Input'
	const outputLabel = () => direction() === 'toNepali' ? 'Nepali Output' : 'Roman Output'
	const inputClass = () => mergeClassNames(props.inputProps?.class as string | undefined, props.inputProps?.className)
	const outputClass = () => mergeClassNames('output-display', props.outputProps?.class as string | undefined, props.outputProps?.className)
	const placeholder = () =>
		props.inputProps?.placeholder ??
		(direction() === 'toNepali' ? 'Type in romanized Nepali...' : 'Paste Nepali text...')

	return (
		<div class={mergeClassNames('nepali-converter', props.class, props.className)}>
			<div class="input-section">
				<label>{inputLabel()}</label>
				<textarea
					{...(props.inputProps ?? {})}
					value={input()}
					onInput={handleInput}
					placeholder={placeholder()}
					rows={props.inputProps?.rows ?? 6}
					class={inputClass()}
				/>
			</div>

			<div class="output-section">
				<label>{outputLabel()}</label>
				<div
					{...(props.outputProps ?? {})}
					class={outputClass()}
					lang={direction() === 'toNepali' ? 'ne' : undefined}
				>
					{output() || (direction() === 'toNepali' ? 'देवनागरी परिणाम यहाँ देखिन्छ' : 'Romanized output appears here')}
				</div>
				{(props.showCopyButton ?? true) && (
					<button onClick={handleCopy} disabled={!output()}>
						{copied() ? '✓ Copied!' : 'Copy'}
					</button>
				)}
			</div>
		</div>
	)
}
