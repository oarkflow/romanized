/**
 * Undo/Redo History Manager
 * Manages state history for undo/redo functionality
 */

export interface HistoryState {
	value: string
	cursorPosition?: number
	timestamp: number
}

export interface HistoryOptions {
	maxHistory?: number
	mergeDelay?: number
}

export class HistoryManager {
	private history: HistoryState[] = []
	private currentIndex = -1
	private maxHistory: number
	private mergeDelay: number
	private lastTimestamp = 0

	constructor(options: HistoryOptions = {}) {
		this.maxHistory = options.maxHistory ?? 100
		this.mergeDelay = options.mergeDelay ?? 300 // ms
	}

	/**
	 * Push a new state to history
	 */
	push(value: string, cursorPosition?: number): void {
		const now = Date.now()
		const shouldMerge = now - this.lastTimestamp < this.mergeDelay && this.history.length > 0

		// If we're not at the end, remove everything after current index
		if (this.currentIndex < this.history.length - 1) {
			this.history = this.history.slice(0, this.currentIndex + 1)
		}

		if (shouldMerge && this.history.length > 0) {
			// Merge with last state if within merge delay
			this.history[this.history.length - 1] = {
				value,
				cursorPosition,
				timestamp: now,
			}
		} else {
			// Add new state
			this.history.push({
				value,
				cursorPosition,
				timestamp: now,
			})

			// Limit history size
			if (this.history.length > this.maxHistory) {
				this.history.shift()
			} else {
				this.currentIndex++
			}
		}

		this.lastTimestamp = now
	}

	/**
	 * Undo to previous state
	 */
	undo(): HistoryState | null {
		if (!this.canUndo()) return null

		this.currentIndex--
		return this.history[this.currentIndex]
	}

	/**
	 * Redo to next state
	 */
	redo(): HistoryState | null {
		if (!this.canRedo()) return null

		this.currentIndex++
		return this.history[this.currentIndex]
	}

	/**
	 * Check if undo is available
	 */
	canUndo(): boolean {
		return this.currentIndex > 0
	}

	/**
	 * Check if redo is available
	 */
	canRedo(): boolean {
		return this.currentIndex < this.history.length - 1
	}

	/**
	 * Get current state
	 */
	current(): HistoryState | null {
		if (this.currentIndex < 0 || this.currentIndex >= this.history.length) {
			return null
		}
		return this.history[this.currentIndex]
	}

	/**
	 * Clear all history
	 */
	clear(): void {
		this.history = []
		this.currentIndex = -1
		this.lastTimestamp = 0
	}

	/**
	 * Get history size
	 */
	size(): number {
		return this.history.length
	}

	/**
	 * Get current index
	 */
	getCurrentIndex(): number {
		return this.currentIndex
	}

	/**
	 * Reset to a specific state without affecting history
	 */
	jumpTo(index: number): HistoryState | null {
		if (index < 0 || index >= this.history.length) return null
		this.currentIndex = index
		return this.history[index]
	}
}
