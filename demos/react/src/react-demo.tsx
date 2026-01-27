import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { NepaliInput, NepaliTextarea, NepaliConverter } from '@verishore/nepali-react'
import type { NepaliInputRef, NepaliConverterRef } from '@verishore/nepali-react'

function ReactDemo() {
	const [inputValue, setInputValue] = useState('')
	const [textareaValue, setTextareaValue] = useState('')
	const inputRef = useRef<NepaliInputRef>(null)
	const converterRef = useRef<NepaliConverterRef>(null)

	return (
		<div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
			<h1 style={{ marginBottom: '2rem' }}>🧪 React Wrapper Test</h1>

			{/* Test 1: NepaliInput */}
			<section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #3dd2c7', borderRadius: '8px' }}>
				<h2>Test 1: NepaliInput Component</h2>
				<NepaliInput
					ref={inputRef}
					value={inputValue}
					onChange={setInputValue}
					placeholder="Type: namaste, dhanyabad..."
					style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
				/>
				<p style={{ marginTop: '0.5rem', color: '#888' }}>Value: {inputValue}</p>
				<button onClick={() => inputRef.current?.clear()} style={{ marginRight: '0.5rem' }}>Clear</button>
				<button onClick={() => inputRef.current?.setValue('namaste')}>Set "namaste"</button>
			</section>

			{/* Test 2: NepaliTextarea */}
			<section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #ffb703', borderRadius: '8px' }}>
				<h2>Test 2: NepaliTextarea Component</h2>
				<NepaliTextarea
					value={textareaValue}
					onChange={setTextareaValue}
					placeholder="Type longer text...&#10;Multiple lines supported"
					rows={5}
					style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
				/>
				<p style={{ marginTop: '0.5rem', color: '#888' }}>Characters: {textareaValue.length}</p>
			</section>

			{/* Test 3: NepaliConverter */}
			<section style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #67f5e2', borderRadius: '8px' }}>
				<h2>Test 3: NepaliConverter Component</h2>
				<NepaliConverter
					ref={converterRef}
					onChange={(input, output) => console.log('Converted:', { input, output })}
					showCopyButton={true}
					debounceMs={300}
					style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
				/>
				<button onClick={() => converterRef.current?.toggleDirection()} style={{ marginTop: '0.5rem' }}>
					Toggle Direction
				</button>
			</section>
		</div>
	)
}

// Mount React demo
const reactRoot = document.getElementById('react-root')
if (reactRoot) {
	createRoot(reactRoot).render(<ReactDemo />)
}
