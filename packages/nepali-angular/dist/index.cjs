"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const core = require("@angular/core");
const forms = require("@angular/forms");
const nepaliInput = require("@oarkflow/nepali-input");
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
exports.NepaliInputDirective = class NepaliInputDirective {
  useDevanagariDigits = true;
  valueChange = new core.EventEmitter();
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
    this.core = new nepaliInput.NepaliIMECore({
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
  core.Input()
], exports.NepaliInputDirective.prototype, "useDevanagariDigits", 2);
__decorateClass([
  core.Output()
], exports.NepaliInputDirective.prototype, "valueChange", 2);
exports.NepaliInputDirective = __decorateClass([
  core.Directive({
    selector: "input[nepaliInput]",
    standalone: true,
    providers: [
      {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(() => exports.NepaliInputDirective),
        multi: true
      }
    ]
  })
], exports.NepaliInputDirective);
exports.NepaliTextareaDirective = class NepaliTextareaDirective {
  useDevanagariDigits = true;
  valueChange = new core.EventEmitter();
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
    this.core = new nepaliInput.NepaliIMECore({
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
  core.Input()
], exports.NepaliTextareaDirective.prototype, "useDevanagariDigits", 2);
__decorateClass([
  core.Output()
], exports.NepaliTextareaDirective.prototype, "valueChange", 2);
exports.NepaliTextareaDirective = __decorateClass([
  core.Directive({
    selector: "textarea[nepaliTextarea]",
    standalone: true,
    providers: [
      {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(() => exports.NepaliTextareaDirective),
        multi: true
      }
    ]
  })
], exports.NepaliTextareaDirective);
//# sourceMappingURL=index.cjs.map
