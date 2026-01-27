import './style.css'
import { CharacterPaletteManager, CHARACTER_CATEGORIES } from '@verishore/nepali-input'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
	throw new Error('Root container #app not found')
}

app.innerHTML = `
	<div class="container">
		<header>
			<h1>🎨 Devanagari Character Palette</h1>
			<p class="subtitle">Click any character to insert • Search by name or romanization</p>
		</header>
		
		<div class="palette-container">
			<div class="search-bar">
				<input 
					type="text" 
					class="search-input" 
					id="searchInput" 
					placeholder="Search characters by name or romanization (e.g., 'ka', 'namaste', 'nukta')..."
				/>
			</div>
			
			<div class="stats" id="stats"></div>
			
			<div class="tabs" id="tabs"></div>
			
			<div class="char-grid" id="charGrid"></div>
			
			<div class="output-panel">
				<div class="output-label">Composed Text:</div>
				<div class="output-text" id="outputText"></div>
				<div class="controls" style="margin-top: 1rem;">
					<button id="copyBtn">📋 Copy Text</button>
					<button id="clearBtn" class="secondary">🗑️ Clear</button>
					<button id="clearRecentBtn" class="secondary">Clear Recent</button>
				</div>
			</div>
		</div>
	</div>
`

const searchInput = document.getElementById('searchInput') as HTMLInputElement
const tabsContainer = document.getElementById('tabs') as HTMLDivElement
const charGrid = document.getElementById('charGrid') as HTMLDivElement
const outputText = document.getElementById('outputText') as HTMLDivElement
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement
const clearRecentBtn = document.getElementById('clearRecentBtn') as HTMLButtonElement
const statsContainer = document.getElementById('stats') as HTMLDivElement

let composedText = ''
let activeCategory = 'recent'
let selectedChar: string | null = null

// Initialize palette manager
const palette = new CharacterPaletteManager({
	showRomanization: true,
	showUnicode: false,
	maxRecent: 30,
	onSelect: (char) => {
		composedText += char.char
		updateOutput()
		updateStats()
		
		// Visual feedback
		selectedChar = char.char
		renderCharacters()
		setTimeout(() => {
			selectedChar = null
			renderCharacters()
		}, 300)
	}
})

// Create tabs
function createTabs() {
	tabsContainer.innerHTML = ''
	
	// Recent tab
	const recentTab = document.createElement('button')
	recentTab.className = 'tab'
	recentTab.textContent = '⏱️ Recent'
	recentTab.addEventListener('click', () => {
		activeCategory = 'recent'
		updateTabs()
		renderCharacters()
	})
	tabsContainer.appendChild(recentTab)
	
	// Category tabs
	CHARACTER_CATEGORIES.forEach(cat => {
		const tab = document.createElement('button')
		tab.className = 'tab'
		tab.textContent = cat.name
		tab.addEventListener('click', () => {
			activeCategory = cat.id
			searchInput.value = ''
			updateTabs()
			renderCharacters()
		})
		tabsContainer.appendChild(tab)
	})
	
	updateTabs()
}

function updateTabs() {
	const tabs = tabsContainer.querySelectorAll('.tab')
	tabs.forEach((tab, i) => {
		const isRecent = i === 0 && activeCategory === 'recent'
		const isCat = i > 0 && CHARACTER_CATEGORIES[i - 1].id === activeCategory
		tab.classList.toggle('active', isRecent || isCat)
	})
}

function renderCharacters() {
	charGrid.innerHTML = ''
	
	const query = searchInput.value.trim()
	let characters: any[] = []
	
	if (query) {
		// Search mode
		characters = palette.search(query)
		if (characters.length === 0) {
			showEmptyState('No characters found')
			return
		}
	} else if (activeCategory === 'recent') {
		// Recent mode
		characters = palette.getRecentCharacters()
		if (characters.length === 0) {
			showEmptyState('No recent characters yet')
			return
		}
	} else {
		// Category mode
		characters = palette.getCategoryCharacters(activeCategory)
	}
	
	// Render character cards
	characters.forEach(char => {
		const card = document.createElement('div')
		card.className = 'char-card'
		if (char.char === selectedChar) {
			card.classList.add('selected')
		}
		
		card.innerHTML = `
			<div class="char-main">${char.char}</div>
			<div class="char-name">${char.name}</div>
			${char.romanization ? `<div class="char-rom">${char.romanization}</div>` : ''}
		`
		
		card.addEventListener('click', () => {
			palette.selectCharacter(char)
		})
		
		charGrid.appendChild(card)
	})
}

function showEmptyState(message: string) {
	charGrid.innerHTML = `
		<div class="empty-state" style="grid-column: 1 / -1;">
			<div class="empty-state-icon">🔍</div>
			<div>${message}</div>
		</div>
	`
}

function updateOutput() {
	outputText.textContent = composedText || '(Click characters to compose text)'
}

function updateStats() {
	const recent = palette.getRecentCharacters().length
	const allChars = CHARACTER_CATEGORIES.reduce((sum, cat) => sum + cat.characters.length, 0)
	
	statsContainer.innerHTML = `
		<div class="stat-card">
			<div class="stat-value">${composedText.length}</div>
			<div class="stat-label">Characters Composed</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">${recent}</div>
			<div class="stat-label">Recent Characters</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">${allChars}</div>
			<div class="stat-label">Total Available</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">${CHARACTER_CATEGORIES.length}</div>
			<div class="stat-label">Categories</div>
		</div>
	`
}

// Event listeners
searchInput.addEventListener('input', () => {
	renderCharacters()
})

copyBtn.addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(composedText)
		copyBtn.textContent = '✅ Copied!'
		setTimeout(() => {
			copyBtn.textContent = '📋 Copy Text'
		}, 2000)
	} catch (err) {
		alert('Failed to copy text')
	}
})

clearBtn.addEventListener('click', () => {
	if (confirm('Clear all composed text?')) {
		composedText = ''
		updateOutput()
		updateStats()
	}
})

clearRecentBtn.addEventListener('click', () => {
	if (confirm('Clear recent characters history?')) {
		palette.clearRecent()
		if (activeCategory === 'recent') {
			renderCharacters()
		}
		updateStats()
	}
})

// Initialize
createTabs()
renderCharacters()
updateOutput()
updateStats()
