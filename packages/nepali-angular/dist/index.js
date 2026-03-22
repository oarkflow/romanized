import { EventEmitter, Input, Output, Directive, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NepaliIMECore } from "@oarkflow/nepali-input";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let NepaliInputDirective = class {
  useDevanagariDigits = true;
  valueChange = new EventEmitter();
  core = null;
  onChange = (_value) => {
  };
  onTouched = () => {
  };
  elementRef;
  constructor(el) {
    this.elementRef = el;
  }
  ngOnInit() {
    this.core = new NepaliIMECore({
      useDevanagariDigits: this.useDevanagariDigits,
      onStateChange: (state) => {
        this.elementRef.nativeElement.value = state.output;
        this.onChange(state.output);
        this.onTouched();
        this.valueChange.emit(state.output);
      }
    });
    this.elementRef.nativeElement.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.elementRef.nativeElement.addEventListener("paste", this.handlePaste.bind(this));
    this.elementRef.nativeElement.setAttribute("lang", "ne");
    this.elementRef.nativeElement.setAttribute("autocomplete", "off");
    this.elementRef.nativeElement.setAttribute("spellcheck", "false");
  }
  ngOnDestroy() {
    this.core = null;
  }
  handleKeyDown(e) {
    if (!this.core) return;
    const input = this.elementRef.nativeElement;
    const hasSelection = input.selectionStart !== input.selectionEnd;
    if (hasSelection && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      this.core.clear();
      return;
    }
    const handled = this.core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    });
    if (handled) e.preventDefault();
  }
  handlePaste(e) {
    if (!this.core) return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") || "";
    this.core.insertText(text);
  }
  writeValue(value) {
    if (value !== void 0) {
      this.core?.setValue(value);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
};
__decorateClass([
  Input()
], NepaliInputDirective.prototype, "useDevanagariDigits", 2);
__decorateClass([
  Output()
], NepaliInputDirective.prototype, "valueChange", 2);
NepaliInputDirective = __decorateClass([
  Directive({
    selector: "input[nepaliInput]",
    standalone: true,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NepaliInputDirective),
        multi: true
      }
    ]
  })
], NepaliInputDirective);
let NepaliTextareaDirective = class {
  useDevanagariDigits = true;
  valueChange = new EventEmitter();
  core = null;
  onChange = (_value) => {
  };
  onTouched = () => {
  };
  elementRef;
  constructor(el) {
    this.elementRef = el;
  }
  ngOnInit() {
    this.core = new NepaliIMECore({
      useDevanagariDigits: this.useDevanagariDigits,
      onStateChange: (state) => {
        this.elementRef.nativeElement.value = state.output;
        this.onChange(state.output);
        this.onTouched();
        this.valueChange.emit(state.output);
      }
    });
    this.elementRef.nativeElement.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.elementRef.nativeElement.addEventListener("paste", this.handlePaste.bind(this));
    this.elementRef.nativeElement.setAttribute("lang", "ne");
    this.elementRef.nativeElement.setAttribute("autocomplete", "off");
    this.elementRef.nativeElement.setAttribute("spellcheck", "false");
  }
  ngOnDestroy() {
    this.core = null;
  }
  handleKeyDown(e) {
    if (!this.core) return;
    const textarea = this.elementRef.nativeElement;
    const hasSelection = textarea.selectionStart !== textarea.selectionEnd;
    if (hasSelection && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      this.core.clear();
      return;
    }
    const handled = this.core.handleKey(e.key, {
      ctrl: e.ctrlKey,
      alt: e.altKey,
      meta: e.metaKey
    });
    if (handled) e.preventDefault();
  }
  handlePaste(e) {
    if (!this.core) return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") || "";
    this.core.insertText(text);
  }
  writeValue(value) {
    if (value !== void 0) {
      this.core?.setValue(value);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
};
__decorateClass([
  Input()
], NepaliTextareaDirective.prototype, "useDevanagariDigits", 2);
__decorateClass([
  Output()
], NepaliTextareaDirective.prototype, "valueChange", 2);
NepaliTextareaDirective = __decorateClass([
  Directive({
    selector: "textarea[nepaliTextarea]",
    standalone: true,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NepaliTextareaDirective),
        multi: true
      }
    ]
  })
], NepaliTextareaDirective);
export {
  NepaliInputDirective,
  NepaliTextareaDirective
};
//# sourceMappingURL=index.js.map
