/**
 * Character Selector - Popover for choosing between multiple character mappings
 * Handles cases where one input can map to multiple Devanagari characters
 */

export interface CharacterAlternative {
    character: string
    description: string
    input: string
    unicode: string
    category: string
}

export interface CharacterSelectorOptions {
    onSelect: (character: string) => void
    onCancel: () => void
    position?: { x: number; y: number }
    theme?: 'light' | 'dark'
}

/**
 * Character Selector Popover
 * Shows alternatives when multiple characters match the same input
 */
export class CharacterSelector {
    private element: HTMLDivElement
    private alternatives: CharacterAlternative[] = []
    private selectedIndex = 0
    private options: Required<CharacterSelectorOptions>
    private isVisible = false

    constructor(options: CharacterSelectorOptions) {
        this.options = {
            onSelect: options.onSelect,
            onCancel: options.onCancel,
            position: options.position ?? { x: 0, y: 0 },
            theme: options.theme ?? 'light',
        }

        this.element = this.createPopoverElement()
        document.body.appendChild(this.element)
        this.attachEventListeners()
    }

    private createPopoverElement(): HTMLDivElement {
        const popover = document.createElement('div')
        popover.className = 'nepali-char-selector'
        popover.style.cssText = `
            position: fixed;
            background: white;
            border: 2px solid #667eea;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            padding: 8px 0;
            min-width: 300px;
            max-width: 400px;
            z-index: 10000;
            display: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `
        return popover
    }

    private attachEventListeners(): void {
        document.addEventListener('keydown', this.handleKeydown)
        document.addEventListener('click', this.handleClickOutside)
    }

    private handleKeydown = (e: KeyboardEvent): void => {
        if (!this.isVisible) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.alternatives.length - 1)
                this.updateSelection()
                break
            case 'ArrowUp':
                e.preventDefault()
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0)
                this.updateSelection()
                break
            case 'Enter':
            case 'Tab':
                e.preventDefault()
                this.selectCurrent()
                break
            case 'Escape':
                e.preventDefault()
                this.hide()
                this.options.onCancel()
                break
            default:
                // Number keys 1-9 for quick selection
                if (/^[1-9]$/.test(e.key)) {
                    const index = parseInt(e.key) - 1
                    if (index < this.alternatives.length) {
                        e.preventDefault()
                        this.selectedIndex = index
                        this.selectCurrent()
                    }
                }
                break
        }
    }

    private handleClickOutside = (e: MouseEvent): void => {
        if (!this.isVisible) return
        if (!this.element.contains(e.target as Node)) {
            this.hide()
            this.options.onCancel()
        }
    }

    private updateSelection(): void {
        const items = this.element.querySelectorAll('.char-item')
        items.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.classList.add('selected')
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            } else {
                item.classList.remove('selected')
            }
        })
    }

    private selectCurrent(): void {
        const selected = this.alternatives[this.selectedIndex]
        if (selected) {
            this.options.onSelect(selected.character)
            this.hide()
        }
    }

    /**
     * Show the character selector with alternatives
     */
    show(alternatives: CharacterAlternative[], position?: { x: number; y: number }): void {
        if (alternatives.length === 0) return
        if (alternatives.length === 1) {
            // Only one option, select it immediately
            this.options.onSelect(alternatives[0].character)
            return
        }

        this.alternatives = alternatives
        this.selectedIndex = 0
        this.isVisible = true

        // Build content
        this.element.innerHTML = `
            <div style="padding: 8px 12px; border-bottom: 1px solid #e0e0e0; background: #f8f9fa;">
                <strong style="color: #667eea; font-size: 12px;">Select Character (↑↓ or 1-9)</strong>
            </div>
            <div style="max-height: 300px; overflow-y: auto;">
                ${alternatives.map((alt, index) => this.renderAlternative(alt, index)).join('')}
            </div>
            <div style="padding: 6px 12px; border-top: 1px solid #e0e0e0; background: #f8f9fa; font-size: 11px; color: #666;">
                Press Enter or click to select • Esc to cancel
            </div>
        `

        // Position the popover
        const pos = position ?? this.options.position
        this.element.style.left = `${pos.x}px`
        this.element.style.top = `${pos.y}px`
        this.element.style.display = 'block'

        // Adjust position if off-screen
        setTimeout(() => this.adjustPosition(), 0)

        // Update initial selection
        this.updateSelection()
    }

    private renderAlternative(alt: CharacterAlternative, index: number): string {
        const categoryColors: Record<string, string> = {
            'nukta': '#e74c3c',
            'dravidian': '#3498db',
            'marathi': '#f39c12',
            'kashmiri': '#9b59b6',
            'vedic': '#2ecc71',
            'basic': '#34495e',
        }

        const color = categoryColors[alt.category.toLowerCase()] ?? categoryColors.basic

        return `
            <div class="char-item" data-index="${index}" style="
                padding: 10px 12px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                gap: 12px;
            " onmouseover="this.style.background='#f8f9ff'"
               onmouseout="this.classList.contains('selected') ? this.style.background='#e8ecff' : this.style.background='white'"
               onclick="window.nepaliCharSelector?.selectIndex(${index})">
                <div style="
                    font-size: 32px;
                    font-weight: bold;
                    color: #764ba2;
                    min-width: 40px;
                    text-align: center;
                ">${alt.character}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 2px;">
                        ${alt.description}
                    </div>
                    <div style="font-size: 11px; color: #666;">
                        <span style="background: ${color}; color: white; padding: 2px 6px; border-radius: 3px; margin-right: 6px; font-weight: 600;">
                            ${alt.category}
                        </span>
                        Input: <code style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${alt.input}</code>
                        <span style="margin-left: 8px; color: #999;">${alt.unicode}</span>
                    </div>
                </div>
                <div style="
                    background: #667eea;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                ">${index + 1}</div>
            </div>
        `
    }

    private adjustPosition(): void {
        const rect = this.element.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let left = parseFloat(this.element.style.left)
        let top = parseFloat(this.element.style.top)

        // Adjust horizontal position
        if (rect.right > viewportWidth) {
            left = viewportWidth - rect.width - 20
        }
        if (left < 10) {
            left = 10
        }

        // Adjust vertical position
        if (rect.bottom > viewportHeight) {
            top = viewportHeight - rect.height - 20
        }
        if (top < 10) {
            top = 10
        }

        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`
    }

    /**
     * Hide the popover
     */
    hide(): void {
        this.isVisible = false
        this.element.style.display = 'none'
        this.alternatives = []
        this.selectedIndex = 0
    }

    /**
     * Select an alternative by index (used by onclick handler)
     */
    selectIndex(index: number): void {
        if (index >= 0 && index < this.alternatives.length) {
            this.selectedIndex = index
            this.selectCurrent()
        }
    }

    /**
     * Check if the popover is currently visible
     */
    isOpen(): boolean {
        return this.isVisible
    }

    /**
     * Destroy the popover and clean up
     */
    destroy(): void {
        document.removeEventListener('keydown', this.handleKeydown)
        document.removeEventListener('click', this.handleClickOutside)
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element)
        }
    }
}

// Global instance for onclick handlers
declare global {
    interface Window {
        nepaliCharSelector?: CharacterSelector
    }
}

// CSS for selected state
const style = document.createElement('style')
style.textContent = `
    .char-item.selected {
        background: #e8ecff !important;
        border-left: 4px solid #667eea;
    }
`
document.head.appendChild(style)

/**
 * Get alternative characters for ambiguous inputs
 * Note: With the nukta fix, most conflicts have been removed.
 * This function is kept for future extensibility.
 */
export const getCharacterAlternatives = (input: string): CharacterAlternative[] => {
    const alternatives: CharacterAlternative[] = []
    const lowerInput = input.toLowerCase()

    // Define mapping alternatives
    // Most conflicting mappings have been removed, so this is now minimal
    const mappings: Record<string, CharacterAlternative[]> = {
        'o^': [
            { character: 'ओ', description: 'Long O', input: 'o', unicode: 'U+0913', category: 'Basic' },
            { character: 'ऑ', description: 'Candra O (English loanwords)', input: 'o^', unicode: 'U+0911', category: 'Basic' },
        ],
        'aw': [
            { character: 'औ', description: 'Au diphthong', input: 'au', unicode: 'U+0914', category: 'Basic' },
            { character: 'ऑ', description: 'Candra O', input: 'aw', unicode: 'U+0911', category: 'Basic' },
        ],
    }

    // Return alternatives if available
    if (mappings[lowerInput]) {
        return mappings[lowerInput]
    }

    return alternatives
}
