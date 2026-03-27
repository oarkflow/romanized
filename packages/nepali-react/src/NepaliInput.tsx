import { useState, useEffect, useRef, forwardRef, useImperativeHandle, type InputHTMLAttributes } from 'react'
import { NepaliIMECore, type DevanagariLanguage } from '@oarkflow/nepali-input'

export interface NepaliInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput' | 'value'> {
	value?: string
	onChange?: (value: string) => void
	onInput?: (value: string) => void
	useDevanagariDigits?: boolean
	language?: DevanagariLanguage
	enableExtendedRomanization?: boolean
	customWordMap?: Record<string, string>
}

export interface NepaliInputRef {
	clear: () => void
	setValue: (value: string) => void
	getValue: () => string
	getCore: () => NepaliIMECore | null
}

export const NepaliInput = forwardRef<NepaliInputRef, NepaliInputProps>(
	({ value, onChange, onInput, useDevanagariDigits = true, language = 'generic', enableExtendedRomanization = false, customWordMap, className, ...props }, ref) => {
		const [internalValue, setInternalValue] = useState(value || '')
		const coreRef = useRef<NepaliIMECore | null>(null)
		const inputRef = useRef<HTMLInputElement>(null)

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

		// Sync external value changes
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

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (!coreRef.current) return

			const hasSelection = inputRef.current!.selectionStart !== inputRef.current!.selectionEnd
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

		const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
			if (!coreRef.current) return
			e.preventDefault()
			const text = e.clipboardData.getData('text/plain')
			coreRef.current.insertText(text)
		}

		return (
			<input
				{...props}
				ref={inputRef}
				type="text"
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

NepaliInput.displayName = 'NepaliInput'
