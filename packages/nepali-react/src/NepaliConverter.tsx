import { useState, useEffect, useRef, forwardRef, useImperativeHandle, type HTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { NepaliConverterCore } from '@verishore/nepali-input'

export interface NepaliConverterProps {
	value?: string
	onChange?: (input: string, output: string) => void
	onInput?: (input: string, output: string) => void
	useDevanagariDigits?: boolean
	debounceMs?: number
	showCopyButton?: boolean
	direction?: 'toNepali' | 'toRoman'
	inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
	outputProps?: HTMLAttributes<HTMLDivElement>
	className?: string
}

export interface NepaliConverterRef {
	clear: () => void
	getOutput: () => string
	setDirection: (direction: 'toNepali' | 'toRoman') => void
	toggleDirection: () => void
	getCore: () => NepaliConverterCore | null
}

export const NepaliConverter = forwardRef<NepaliConverterRef, NepaliConverterProps>(
	({
		value,
		onChange,
		onInput,
		useDevanagariDigits = true,
		debounceMs = 300,
		showCopyButton = true,
		direction = 'toNepali',
		inputProps = {},
		outputProps = {},
		className = ''
	}, ref) => {
		const [input, setInput] = useState(value || '')
		const [output, setOutput] = useState('')
		const [copied, setCopied] = useState(false)
		const coreRef = useRef<NepaliConverterCore | null>(null)

		useEffect(() => {
			coreRef.current = new NepaliConverterCore({
				useDevanagariDigits,
				debounceMs,
				bidirectional: true,
				onInput: (inputText, outputText) => {
					setOutput(outputText)
					onInput?.(inputText, outputText)
				},
				onChange: (inputText, outputText) => {
					onChange?.(inputText, outputText)
				}
			})

			coreRef.current.setDirection(direction)

			return () => {
				coreRef.current = null
			}
		}, [useDevanagariDigits, debounceMs])

		useEffect(() => {
			if (value !== undefined && value !== input) {
				setInput(value)
				coreRef.current?.setInput(value)
			}
		}, [value])

		useImperativeHandle(ref, () => ({
			clear: () => {
				coreRef.current?.clear()
				setInput('')
				setOutput('')
			},
			getOutput: () => coreRef.current?.getOutput() || '',
			setDirection: (dir: 'toNepali' | 'toRoman') => coreRef.current?.setDirection(dir),
			toggleDirection: () => coreRef.current?.toggleDirection(),
			getCore: () => coreRef.current
		}))

		const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newValue = e.target.value
			setInput(newValue)
			coreRef.current?.setInput(newValue)
		}

		const handleCopy = async () => {
			try {
				await navigator.clipboard.writeText(output)
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			} catch (err) {
				console.error('Failed to copy:', err)
			}
		}

		return (
			<div className={`nepali-converter ${className}`}>
				<div className="input-section">
					<label>Romanized Input</label>
					<textarea
						{...inputProps}
						value={input}
						onChange={handleInputChange}
						placeholder="Type in romanized Nepali..."
						rows={6}
					/>
				</div>

				<div className="output-section">
					<label>Nepali Output</label>
					<div {...outputProps} className={`output-display ${outputProps.className || ''}`} lang="ne">
						{output || 'देवनागरी परिणाम यहाँ देखिन्छ'}
					</div>
					{showCopyButton && (
						<button onClick={handleCopy} disabled={!output}>
							{copied ? '✓ Copied!' : 'Copy'}
						</button>
					)}
				</div>
			</div>
		)
	}
)

NepaliConverter.displayName = 'NepaliConverter'
