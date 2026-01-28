import { NepaliIMECore } from './nepali-ime-core'
import type { NepaliIMEState } from './nepali-ime-core'
import { CharacterSelector, getCharacterAlternatives, type CharacterAlternative } from './character-selector'

export interface NepaliInputOptions {
    useDevanagariDigits?: boolean
    autoConvert?: boolean
    enableCharacterSelector?: boolean
    onInput?: (value: string) => void
    onChange?: (value: string) => void
}

/**
 * Base class for Nepali input components
 * DOM adapter that wraps the headless NepaliIMECore
 */
export abstract class NepaliInputBase<T extends HTMLInputElement | HTMLTextAreaElement> {
    protected element: T
    protected options: Required<NepaliInputOptions>
    protected core: NepaliIMECore
    protected enabled: boolean = true
    protected characterSelector: CharacterSelector | null = null
    protected pendingInput: string = ''

    constructor(element: T, options: NepaliInputOptions = {}) {
        this.element = element
        this.options = {
            useDevanagariDigits: options.useDevanagariDigits ?? true,
            autoConvert: options.autoConvert ?? true,
            enableCharacterSelector: options.enableCharacterSelector ?? true,
            onInput: options.onInput ?? (() => { }),
            onChange: options.onChange ?? (() => { }),
        }

        // Initialize headless core
        this.core = new NepaliIMECore({
            useDevanagariDigits: this.options.useDevanagariDigits,
            onStateChange: (state) => this.onCoreStateChange(state)
        })

        // Initialize character selector if enabled
        if (this.options.enableCharacterSelector) {
            this.characterSelector = new CharacterSelector({
                onSelect: (character) => this.handleCharacterSelect(character),
                onCancel: () => this.handleCharacterCancel(),
            })
            // Make it globally accessible for onclick handlers
            if (typeof window !== 'undefined') {
                window.nepaliCharSelector = this.characterSelector
            }
        }

        this.init()
    }

    protected init() {
        // Set common attributes
        this.element.setAttribute('lang', 'ne')
        this.element.setAttribute('autocomplete', 'off')
        this.element.setAttribute('autocorrect', 'off')
        this.element.setAttribute('autocapitalize', 'off')
        this.element.setAttribute('spellcheck', 'false')

        // Bind event handlers
        this.element.addEventListener('keydown', this.handleKeydown as EventListener)
        this.element.addEventListener('paste', this.handlePaste as EventListener)
        this.element.addEventListener('blur', this.handleBlur)
    }

    protected onCoreStateChange(state: NepaliIMEState) {
        // Update DOM element with new output
        this.element.value = state.output
        this.updateCursor(state)
        this.options.onInput(state.output)
    }

    protected abstract updateCursor(state: NepaliIMEState): void

    protected handleKeydown = (e: KeyboardEvent) => {
        if (!this.enabled || !this.options.autoConvert) return

        // If character selector is open, let it handle the key
        if (this.characterSelector?.isOpen()) {
            return
        }

        const key = e.key

        // Check for alternative character trigger (dot key after certain letters)
        if (key === '.' && this.options.enableCharacterSelector) {
            const currentValue = this.core.getValue()
            const lastChars = currentValue.slice(-3) // Get last few characters

            // Check if this could trigger alternatives
            const potentialInput = lastChars + key
            const alternatives = getCharacterAlternatives(potentialInput.slice(-3))

            if (alternatives.length > 0) {
                e.preventDefault()
                this.showCharacterSelector(alternatives, potentialInput.slice(-2, -1))
                return
            }
        }

        // Check if there's a text selection before delegating to core
        const hasSelection = this.element.selectionStart !== this.element.selectionEnd

        // If there's a selection and user presses Backspace/Delete, clear everything
        if (hasSelection && (key === 'Backspace' || key === 'Delete')) {
            e.preventDefault()
            this.core.clear()
            return
        }

        // Delegate to headless core
        const handled = this.core.handleKey(key, {
            ctrl: e.ctrlKey,
            alt: e.altKey,
            meta: e.metaKey
        })

        if (handled) {
            e.preventDefault()
        }
    }

    protected handlePaste = (e: ClipboardEvent) => {
        if (!this.enabled || !this.options.autoConvert) return

        e.preventDefault()
        const text = e.clipboardData?.getData('text/plain') || ''
        this.core.insertText(text)
        this.options.onChange(this.core.getValue())
    }

    protected handleBlur = () => {
        // Notify onChange on blur
        this.options.onChange(this.core.getValue())
    }

    private showCharacterSelector(alternatives: CharacterAlternative[], baseInput: string): void {
        if (!this.characterSelector) return

        this.pendingInput = baseInput

        // Get cursor position to position the popover
        const rect = this.element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        this.characterSelector.show(alternatives, {
            x: rect.left + scrollLeft + 20,
            y: rect.top + scrollTop + rect.height + 5,
        })
    }

    private handleCharacterSelect(character: string): void {
        // Remove the pending input and add the selected character
        const currentValue = this.core.getValue()
        const withoutPending = currentValue.slice(0, -this.pendingInput.length - 1) // -1 for the dot
        this.core.setValue(withoutPending + character)
        this.pendingInput = ''
        this.options.onChange(this.core.getValue())
    }

    private handleCharacterCancel(): void {
        // Just clear the pending input
        this.pendingInput = ''
    }

    public disable() {
        this.enabled = false
    }

    public isEnabled(): boolean {
        return this.enabled
    }

    public setValue(value: string) {
        this.core.setValue(value)
    }

    public getValue(): string {
        return this.core.getValue()
    }

    public clear() {
        this.core.clear()
    }

    public setOptions(options: Partial<NepaliInputOptions>) {
        this.options = { ...this.options, ...options }
        if (options.useDevanagariDigits !== undefined) {
            this.core.setUseDevanagariDigits(options.useDevanagariDigits)
        }
    }

    public getCore(): NepaliIMECore {
        return this.core
    }

    public destroy() {
        this.element.removeEventListener('keydown', this.handleKeydown as EventListener)
        this.element.removeEventListener('paste', this.handlePaste as EventListener)
        this.element.removeEventListener('blur', this.handleBlur)

        if (this.characterSelector) {
            this.characterSelector.destroy()
            this.characterSelector = null
            if (typeof window !== 'undefined') {
                window.nepaliCharSelector = undefined
            }
        }
    }
}
