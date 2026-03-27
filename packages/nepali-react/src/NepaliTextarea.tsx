import { useState, useEffect, useRef, forwardRef, useImperativeHandle, type TextareaHTMLAttributes } from 'react'
import { NepaliIMECore, type DevanagariLanguage } from '@oarkflow/nepali-input'

export interface NepaliTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onInput' | 'value'> {
	value?: string
	onChange?: (value: string) => void
	onInput?: (value: string) => void
	useDevanagariDigits?: boolean
	language?: DevanagariLanguage
	enableExtendedRomanization?: boolean
	customWordMap?: Record<string, string>
}

export interface NepaliTextareaRef {
	clear: () => void
	setValue: (value: string) => void
	getValue: () => string
	getCore: () => NepaliIMECore | null
}

export const NepaliTextarea = forwardRef<NepaliTextareaRef, NepaliTextareaProps>(
	({ value, onChange, onInput, useDevanagariDigits = true, language = 'generic', enableExtendedRomanization = false, customWordMap, className, ...props }, ref) => {
		const [internalValue, setInternalValue] = useState(value || '')
		const coreRef = useRef<NepaliIMECore | null>(null)
		const textareaRef = useRef<HTMLTextAreaElement>(null)

		useEffect(() => {
			coreRef.current = new NepaliIMECore({
				useDevanagariDigits,
				language,
				enableExtendedRomanization,
				customWordMap,
				onStateChange: (state) => {
					setInternalValue(state.output)
					onInput?.(state.output)
					onChange?.(state.output)
				}
			})

			return () => {
				coreRef.current = null
			}
		}, [useDevanagariDigits, language, enableExtendedRomanization, customWordMap])

		useEffect(() => {
			if (value !== undefined && value !== internalValue) {
				coreRef.current?.setValue(value)
				setInternalValue(value)
			}
		}, [value])

		useImperativeHandle(ref, () => ({
			clear: () => coreRef.current?.clear(),
			setValue: (val: string) => coreRef.current?.setValue(val),
			getValue: () => coreRef.current?.getValue() || '',
			getCore: () => coreRef.current
		}))

		const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (!coreRef.current) return

			const hasSelection = textareaRef.current!.selectionStart !== textareaRef.current!.selectionEnd
			if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
				e.preventDefault()
				coreRef.current.clear()
				return
			}

			const handled = coreRef.current.handleKey(e.key, {
				ctrl: e.ctrlKey,
				alt: e.altKey,
				meta: e.metaKey
			})

			if (handled) e.preventDefault()
		}

		const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
			if (!coreRef.current) return
			e.preventDefault()
			const text = e.clipboardData.getData('text/plain')
			coreRef.current.insertText(text)
		}

		return (
			<textarea
				{...props}
				ref={textareaRef}
				value={internalValue}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
				onChange={(e) => {
					if (e.target.value === '') {
						coreRef.current?.clear()
					}
				}}
				className={className}
				lang="ne"
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck={false}
			/>
		)
	}
)

NepaliTextarea.displayName = 'NepaliTextarea'
