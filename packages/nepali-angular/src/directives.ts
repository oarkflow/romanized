import { Directive, ElementRef, forwardRef, Input, Output, EventEmitter } from '@angular/core'
import type { OnInit, OnDestroy } from '@angular/core'
import type { ControlValueAccessor } from '@angular/forms'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { NepaliIMECore } from '@verishore/nepali-input'

@Directive({
	selector: 'input[nepaliInput]',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NepaliInputDirective),
			multi: true
		}
	]
})
export class NepaliInputDirective implements OnInit, OnDestroy, ControlValueAccessor {
	@Input() useDevanagariDigits = true
	@Output() valueChange = new EventEmitter<string>()

	private core: NepaliIMECore | null = null
	private onChange = (_value: string) => { }
	private onTouched = () => { }
	private elementRef: ElementRef<HTMLInputElement>

	constructor(el: ElementRef<HTMLInputElement>) {
		this.elementRef = el
	}

	ngOnInit() {
		this.core = new NepaliIMECore({
			useDevanagariDigits: this.useDevanagariDigits,
			onStateChange: (state) => {
				this.elementRef.nativeElement.value = state.output
				this.onChange(state.output)
				this.onTouched()
				this.valueChange.emit(state.output)
			}
		})

		this.elementRef.nativeElement.addEventListener('keydown', this.handleKeyDown.bind(this))
		this.elementRef.nativeElement.addEventListener('paste', this.handlePaste.bind(this))
		this.elementRef.nativeElement.setAttribute('lang', 'ne')
		this.elementRef.nativeElement.setAttribute('autocomplete', 'off')
		this.elementRef.nativeElement.setAttribute('spellcheck', 'false')
	}

	ngOnDestroy() {
		this.core = null
	}

	private handleKeyDown(e: KeyboardEvent) {
		if (!this.core) return

		const input = this.elementRef.nativeElement
		const hasSelection = input.selectionStart !== input.selectionEnd

		if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
			e.preventDefault()
			this.core.clear()
			return
		}

		const handled = this.core.handleKey(e.key, {
			ctrl: e.ctrlKey,
			alt: e.altKey,
			meta: e.metaKey
		})

		if (handled) e.preventDefault()
	}

	private handlePaste(e: ClipboardEvent) {
		if (!this.core) return
		e.preventDefault()
		const text = e.clipboardData?.getData('text/plain') || ''
		this.core.insertText(text)
	}

	writeValue(value: string): void {
		if (value !== undefined) {
			this.core?.setValue(value)
		}
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		this.elementRef.nativeElement.disabled = isDisabled
	}
}

@Directive({
	selector: 'textarea[nepaliTextarea]',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NepaliTextareaDirective),
			multi: true
		}
	]
})
export class NepaliTextareaDirective implements OnInit, OnDestroy, ControlValueAccessor {
	@Input() useDevanagariDigits = true
	@Output() valueChange = new EventEmitter<string>()

	private core: NepaliIMECore | null = null
	private onChange = (_value: string) => { }
	private onTouched = () => { }
	private elementRef: ElementRef<HTMLTextAreaElement>

	constructor(el: ElementRef<HTMLTextAreaElement>) {
		this.elementRef = el
	}

	ngOnInit() {
		this.core = new NepaliIMECore({
			useDevanagariDigits: this.useDevanagariDigits,
			onStateChange: (state) => {
				this.elementRef.nativeElement.value = state.output
				this.onChange(state.output)
				this.onTouched()
				this.valueChange.emit(state.output)
			}
		})

		this.elementRef.nativeElement.addEventListener('keydown', this.handleKeyDown.bind(this))
		this.elementRef.nativeElement.addEventListener('paste', this.handlePaste.bind(this))
		this.elementRef.nativeElement.setAttribute('lang', 'ne')
		this.elementRef.nativeElement.setAttribute('autocomplete', 'off')
		this.elementRef.nativeElement.setAttribute('spellcheck', 'false')
	}

	ngOnDestroy() {
		this.core = null
	}

	private handleKeyDown(e: KeyboardEvent) {
		if (!this.core) return

		const textarea = this.elementRef.nativeElement
		const hasSelection = textarea.selectionStart !== textarea.selectionEnd

		if (hasSelection && (e.key === 'Backspace' || e.key === 'Delete')) {
			e.preventDefault()
			this.core.clear()
			return
		}

		const handled = this.core.handleKey(e.key, {
			ctrl: e.ctrlKey,
			alt: e.altKey,
			meta: e.metaKey
		})

		if (handled) e.preventDefault()
	}

	private handlePaste(e: ClipboardEvent) {
		if (!this.core) return
		e.preventDefault()
		const text = e.clipboardData?.getData('text/plain') || ''
		this.core.insertText(text)
	}

	writeValue(value: string): void {
		if (value !== undefined) {
			this.core?.setValue(value)
		}
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		this.elementRef.nativeElement.disabled = isDisabled
	}
}
