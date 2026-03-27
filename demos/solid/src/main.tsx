import { render } from 'solid-js/web'
import { createSignal } from 'solid-js'
import { NepaliConverter, NepaliInput, NepaliTextarea } from '@oarkflow/nepali-solid'
import type {
	NepaliConverterProps,
	NepaliConverterRef,
	NepaliInputProps,
	NepaliInputRef,
	NepaliTextareaProps,
	NepaliTextareaRef
} from '@oarkflow/nepali-solid'
import './style.css'

type DemoLanguage =
	| 'generic'
	| 'nepali'
	| 'hindi'
	| 'marathi'
	| 'sanskrit'
	| 'maithili'
	| 'newari'
	| 'dogri'
	| 'bodo'
	| 'konkani'
	| 'kashmiri'
	| 'sindhi'

const languageOptions: Array<{ value: DemoLanguage; label: string }> = [
	{ value: 'generic', label: 'Generic Devanagari' },
	{ value: 'nepali', label: 'Nepali' },
	{ value: 'hindi', label: 'Hindi' },
	{ value: 'marathi', label: 'Marathi' },
	{ value: 'sanskrit', label: 'Sanskrit' },
	{ value: 'maithili', label: 'Maithili' },
	{ value: 'newari', label: 'Newari' },
	{ value: 'dogri', label: 'Dogri' },
	{ value: 'bodo', label: 'Bodo' },
	{ value: 'konkani', label: 'Konkani' },
	{ value: 'kashmiri', label: 'Kashmiri' },
	{ value: 'sindhi', label: 'Sindhi' }
]

const demoSamples: Record<DemoLanguage, { single: string; multi: string; converter: string }> = {
	generic: {
		single: 'dhanyavaad',
		multi: 'namaste sathi\nbharat ra nepal',
		converter: 'namaste, yo generic devanagari profile ho.'
	},
	nepali: {
		single: 'tapai',
		multi: 'ma nepali bolchhu.\nmero desh nepal ho.',
		converter: 'namaste sathi, tapai lai kasto chha?'
	},
	hindi: {
		single: 'aap',
		multi: 'mera bharat mahaan.\nmain hindi bolta hoon.',
		converter: 'namaste, aap kaise hain? yah hindi profile hai.'
	},
	marathi: {
		single: 'tumhi',
		multi: 'mi marathi bolto.\nmaharashtra maza ghar aahe.',
		converter: 'namaskar, tumhi kase aahat?'
	},
	sanskrit: {
		single: 'namah',
		multi: 'samskritam sundaram asti.\nshantih shantih shantih.',
		converter: 'namah sarvebhyah. samskritam pavitram bhasha asti.'
	},
	maithili: {
		single: 'maithili',
		multi: 'ham maithili boli chhi.\nmithila sanskritik parampara samriddha chhai.',
		converter: 'maithili devanagari me likhal ja sakai chhai.'
	},
	newari: {
		single: 'newari',
		multi: 'newari bhasha nepal ko samriddha parampara ho.',
		converter: 'newari profile generic devanagari niyam sanga kaam garchha.'
	},
	dogri: {
		single: 'dogri',
		multi: 'asi dogri boli de aan.\ndogri vi devanagari vich likhi jandi ae.',
		converter: 'dogri te hindi de kai shabd ikko tarah romanized hunde ne.'
	},
	bodo: {
		single: 'bodo',
		multi: 'angni bodo rao.\nbodo gwdan devanagari dwisani.',
		converter: 'bodo words lai custom map sanga more precise banauna sakincha.'
	},
	konkani: {
		single: 'konkani',
		multi: 'hanv konkani uloita.\nkonkani bhashen vegveglya lipyo asat.',
		converter: 'devanagari profile konkani sathi pan upayogi cha.'
	},
	kashmiri: {
		single: 'kashmiri',
		multi: 'kashmiri bhasa kai roopan me mili chhi.',
		converter: 'kashmiri short vowels sathi extended mappings pani upalabdha chan.'
	},
	sindhi: {
		single: 'sindhi',
		multi: 'sindhi bhasa samriddha sahityik parampara rakhdi aahe.',
		converter: 'sindhi lai custom word map sanga more tailored transliteration milcha.'
	}
}

function App() {
	const [language, setLanguage] = createSignal<DemoLanguage>('generic')
	const [useExtendedRomanization, setUseExtendedRomanization] = createSignal(false)
	const [singleLine, setSingleLine] = createSignal('')
	const [multiLine, setMultiLine] = createSignal('')
	const [converterInput, setConverterInput] = createSignal('')
	const [converterStats, setConverterStats] = createSignal({ input: 0, output: 0, status: 'Waiting for input' })
	let inputApi: NepaliInputRef | undefined
	let textareaApi: NepaliTextareaRef | undefined
	let converterApi: NepaliConverterRef | undefined
	const currentLanguage = () => language() as NepaliInputProps['language']
	const currentTextareaLanguage = () => language() as NepaliTextareaProps['language']
	const currentConverterLanguage = () => language() as NepaliConverterProps['language']

	const loadSamples = () => {
		const sample = demoSamples[language()]
		setSingleLine(sample.single)
		setMultiLine(sample.multi)
		setConverterInput(sample.converter)
	}

	return (
		<main class="shell">
			<section class="hero">
				<p class="eyebrow">SolidJS Wrapper Demo</p>
				<h1>Romanized Devanagari for Solid</h1>
				<p class="lede">
					This demo exercises the Solid wrappers directly against the shared transliteration core. Switch between
					language profiles for Nepali, Hindi, Marathi, Sanskrit, and other Devanagari languages.
				</p>
				<div class="control-bar">
					<label class="control-group">
						<span>Language Profile</span>
						<select
							value={language()}
							onInput={(event) => {
								setLanguage(event.currentTarget.value as DemoLanguage)
							}}
						>
							{languageOptions.map((option) => (
								<option value={option.value}>{option.label}</option>
							))}
						</select>
					</label>
					<label class="toggle">
						<input
							type="checkbox"
							checked={useExtendedRomanization()}
							onChange={(event) => setUseExtendedRomanization(event.currentTarget.checked)}
						/>
						<span>Enable extended scholarly romanization</span>
					</label>
					<div class="button-row">
						<button type="button" onClick={loadSamples}>Load Language Samples</button>
					</div>
				</div>
				<p class="stat">
					Try <code>{demoSamples[language()].single}</code> or <code>{demoSamples[language()].converter}</code>
				</p>
			</section>

			<div class="demo-grid">
				<section class="panel">
					<div class="panel-head">
						<div>
							<p class="eyebrow">Component 1</p>
							<h2>NepaliInput</h2>
						</div>
						<div class="button-row">
							<button type="button" onClick={() => inputApi?.clear()}>Clear</button>
							<button type="button" onClick={() => setSingleLine(demoSamples[language()].single)}>Set Sample</button>
						</div>
					</div>

					<NepaliInput
						instanceRef={(api) => {
							inputApi = api
						}}
						value={singleLine()}
						onChange={setSingleLine}
						language={currentLanguage()}
						enableExtendedRomanization={useExtendedRomanization()}
						placeholder={`Type romanized ${language()} text here...`}
						class="demo-input"
					/>

					<p class="stat">Live value: {singleLine() || 'Nothing typed yet'}</p>
				</section>

				<section class="panel">
					<div class="panel-head">
						<div>
							<p class="eyebrow">Component 2</p>
							<h2>NepaliTextarea</h2>
						</div>
						<div class="button-row">
							<button type="button" onClick={() => textareaApi?.clear()}>Clear</button>
							<button type="button" onClick={() => setMultiLine(demoSamples[language()].multi)}>Load Sample</button>
						</div>
					</div>

					<NepaliTextarea
						instanceRef={(api) => {
							textareaApi = api
						}}
						value={multiLine()}
						onChange={setMultiLine}
						language={currentTextareaLanguage()}
						enableExtendedRomanization={useExtendedRomanization()}
						rows={6}
						placeholder={`Try longer ${language()} sentences and multiple lines...`}
						class="demo-textarea"
					/>

					<p class="stat">Characters: {multiLine().length}</p>
				</section>

				<section class="panel converter-panel">
					<div class="panel-head">
						<div>
							<p class="eyebrow">Component 3</p>
							<h2>NepaliConverter</h2>
						</div>
						<div class="button-row">
							<button type="button" onClick={() => converterApi?.toggleDirection()}>Toggle Direction</button>
							<button type="button" onClick={() => converterApi?.clear()}>Clear</button>
						</div>
					</div>

					<NepaliConverter
						instanceRef={(api) => {
							converterApi = api
						}}
						value={converterInput()}
						showCopyButton={true}
						debounceMs={250}
						language={currentConverterLanguage()}
						enableExtendedRomanization={useExtendedRomanization()}
						onInput={(input, output) => {
							setConverterInput(input)
							setConverterStats({
								input: input.length,
								output: output.length,
								status: input ? 'Converting...' : 'Waiting for input'
							})
						}}
						onChange={(input, output) => {
							setConverterStats({
								input: input.length,
								output: output.length,
								status: output ? 'Conversion complete' : 'Waiting for input'
							})
						}}
						inputProps={{
							rows: 8,
							class: 'demo-textarea',
							placeholder: `Paste or type romanized ${language()} text here...`
						}}
						outputProps={{
							class: 'converter-output'
						}}
						class="converter"
					/>

					<div class="stats-row">
						<p class="stat">Input: {converterStats().input} chars</p>
						<p class="stat">Output: {converterStats().output} chars</p>
						<p class="stat">{converterStats().status}</p>
					</div>
				</section>
			</div>
		</main>
	)
}

const root = document.getElementById('root')

if (!root) {
	throw new Error('Root container #root not found')
}

render(() => <App />, root)
