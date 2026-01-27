/**
 * Keyboard Shortcut Manager
 * Handles keyboard shortcuts for Nepali input applications
 */

export type ShortcutHandler = (event: KeyboardEvent) => boolean | void

export interface ShortcutDefinition {
	key: string
	ctrl?: boolean
	shift?: boolean
	alt?: boolean
	meta?: boolean
	description: string
	handler: ShortcutHandler
	category?: string
}

export interface ShortcutOptions {
	enabled?: boolean
	preventDefault?: boolean
}

export class KeyboardShortcutManager {
	private shortcuts = new Map<string, ShortcutDefinition>()
	private enabled = true
	private preventDefault = true

	constructor(options: ShortcutOptions = {}) {
		this.enabled = options.enabled ?? true
		this.preventDefault = options.preventDefault ?? true
	}

	/**
	 * Register a keyboard shortcut
	 */
	register(shortcut: ShortcutDefinition): void {
		const key = this.getShortcutKey(shortcut)
		this.shortcuts.set(key, shortcut)
	}

	/**
	 * Unregister a keyboard shortcut
	 */
	unregister(key: string, modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean }): void {
		const shortcutKey = this.getShortcutKey({ key, ...modifiers } as ShortcutDefinition)
		this.shortcuts.delete(shortcutKey)
	}

	/**
	 * Handle keyboard event
	 */
	handleEvent(event: KeyboardEvent): boolean {
		if (!this.enabled) return false

		const shortcutKey = this.getShortcutKeyFromEvent(event)
		const shortcut = this.shortcuts.get(shortcutKey)

		if (shortcut) {
			if (this.preventDefault) {
				event.preventDefault()
			}
			const result = shortcut.handler(event)
			return result !== false
		}

		return false
	}

	/**
	 * Get all registered shortcuts
	 */
	getShortcuts(): ShortcutDefinition[] {
		return Array.from(this.shortcuts.values())
	}

	/**
	 * Get shortcuts by category
	 */
	getShortcutsByCategory(category: string): ShortcutDefinition[] {
		return Array.from(this.shortcuts.values()).filter((s) => s.category === category)
	}

	/**
	 * Enable/disable shortcut manager
	 */
	setEnabled(enabled: boolean): void {
		this.enabled = enabled
	}

	/**
	 * Check if enabled
	 */
	isEnabled(): boolean {
		return this.enabled
	}

	/**
	 * Clear all shortcuts
	 */
	clear(): void {
		this.shortcuts.clear()
	}

	/**
	 * Get shortcut display string
	 */
	getShortcutDisplay(shortcut: ShortcutDefinition): string {
		const parts: string[] = []
		const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)

		if (shortcut.ctrl) parts.push(isMac ? '⌘' : 'Ctrl')
		if (shortcut.shift) parts.push(isMac ? '⇧' : 'Shift')
		if (shortcut.alt) parts.push(isMac ? '⌥' : 'Alt')
		if (shortcut.meta && !isMac) parts.push('Win')

		// Normalize key display
		let keyDisplay = shortcut.key
		if (keyDisplay.length === 1) {
			keyDisplay = keyDisplay.toUpperCase()
		} else if (keyDisplay === ' ') {
			keyDisplay = 'Space'
		}

		parts.push(keyDisplay)
		return parts.join('+')
	}

	// Private methods

	private getShortcutKey(shortcut: Pick<ShortcutDefinition, 'key' | 'ctrl' | 'shift' | 'alt' | 'meta'>): string {
		const parts = []
		if (shortcut.ctrl) parts.push('ctrl')
		if (shortcut.shift) parts.push('shift')
		if (shortcut.alt) parts.push('alt')
		if (shortcut.meta) parts.push('meta')
		parts.push(shortcut.key.toLowerCase())
		return parts.join('+')
	}

	private getShortcutKeyFromEvent(event: KeyboardEvent): string {
		const parts = []
		if (event.ctrlKey) parts.push('ctrl')
		if (event.shiftKey) parts.push('shift')
		if (event.altKey) parts.push('alt')
		if (event.metaKey) parts.push('meta')
		parts.push(event.key.toLowerCase())
		return parts.join('+')
	}
}

/**
 * Default shortcuts for Nepali input
 */
export const createDefaultShortcuts = (): ShortcutDefinition[] => [
	{
		key: 'z',
		ctrl: true,
		description: 'Undo last change',
		category: 'editing',
		handler: () => {
			// Handler will be set by consumer
			return true
		},
	},
	{
		key: 'y',
		ctrl: true,
		description: 'Redo last undone change',
		category: 'editing',
		handler: () => {
			return true
		},
	},
	{
		key: 'z',
		ctrl: true,
		shift: true,
		description: 'Redo last undone change',
		category: 'editing',
		handler: () => {
			return true
		},
	},
	{
		key: ' ',
		ctrl: true,
		description: 'Toggle conversion mode',
		category: 'conversion',
		handler: () => {
			return true
		},
	},
	{
		key: 'd',
		ctrl: true,
		description: 'Toggle Devanagari/Latin digits',
		category: 'conversion',
		handler: () => {
			return true
		},
	},
	{
		key: 'l',
		ctrl: true,
		description: 'Clear all content',
		category: 'editing',
		handler: () => {
			return true
		},
	},
	{
		key: 'f',
		ctrl: true,
		description: 'Find text',
		category: 'search',
		handler: () => {
			return true
		},
	},
	{
		key: 'h',
		ctrl: true,
		description: 'Replace text',
		category: 'search',
		handler: () => {
			return true
		},
	},
	{
		key: '/',
		ctrl: true,
		description: 'Show keyboard shortcuts',
		category: 'help',
		handler: () => {
			return true
		},
	},
	{
		key: 'F1',
		description: 'Show help',
		category: 'help',
		handler: () => {
			return true
		},
	},
	{
		key: 'ArrowLeft',
		alt: true,
		description: 'Switch to Roman → Nepali',
		category: 'conversion',
		handler: () => {
			return true
		},
	},
	{
		key: 'ArrowRight',
		alt: true,
		description: 'Switch to Nepali → Roman',
		category: 'conversion',
		handler: () => {
			return true
		},
	},
	{
		key: 'c',
		ctrl: true,
		shift: true,
		description: 'Copy output to clipboard',
		category: 'clipboard',
		handler: () => {
			return true
		},
	},
	{
		key: 's',
		ctrl: true,
		description: 'Save current work',
		category: 'file',
		handler: () => {
			return true
		},
	},
	{
		key: 'Escape',
		description: 'Close dialog or cancel',
		category: 'navigation',
		handler: () => {
			return true
		},
	},
]
