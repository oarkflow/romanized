"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const web = require("solid-js/web");
const solidJs = require("solid-js");
const nepaliInput = require("@oarkflow/nepali-input");
function assignRef(ref, value) {
  ref?.(value);
}
function callEventHandler(handler, event) {
  if (!handler) {
    return;
  }
  if (Array.isArray(handler)) {
    const [fn, data] = handler;
    fn(data, event);
    return;
  }
  handler(event);
}
function mergeClassNames(...values) {
  const className = values.filter(Boolean).join(" ").trim();
  return className || void 0;
}
function getKeyModifiers(event) {
  return {
    ctrl: event.ctrlKey,
    alt: event.altKey,
    meta: event.metaKey,
    shift: event.shiftKey
  };
}
var _tmpl$$2 = /* @__PURE__ */ web.template(`<input>`);
function NepaliInput(allProps) {
  const [props, rest] = solidJs.splitProps(allProps, ["value", "onChange", "onInput", "useDevanagariDigits", "language", "enableExtendedRomanization", "customWordMap", "instanceRef", "inputRef", "onKeyDown", "onPaste", "class", "className"]);
  const [internalValue, setInternalValue] = solidJs.createSignal(props.value ?? "");
  let core = null;
  let inputElement;
  const instance = {
    clear: () => {
      core?.clear();
      if (!core) {
        setInternalValue("");
      }
    },
    setValue: (value) => {
      core?.setValue(value);
      if (!core) {
        setInternalValue(value);
      }
    },
    getValue: () => core?.getValue() ?? internalValue(),
    getCore: () => core
  };
  solidJs.createEffect(() => {
    props.instanceRef?.(instance);
  });
  solidJs.createEffect(() => {
    const nextCore = new nepaliInput.NepaliIMECore({
      useDevanagariDigits: props.useDevanagariDigits ?? true,
      language: props.language ?? "generic",
      enableExtendedRomanization: props.enableExtendedRomanization ?? false,
      customWordMap: props.customWordMap,
      onStateChange: (state) => {
        setInternalValue(state.output);
        props.onInput?.(state.output);
        props.onChange?.(state.output);
      }
    });
    const initialValue = solidJs.untrack(() => props.value ?? internalValue());
    core = nextCore;
    if (initialValue) {
      nextCore.setValue(initialValue);
    }
    solidJs.onCleanup(() => {
      if (core === nextCore) {
        core = null;
      }
    });
  });
  solidJs.createEffect(solidJs.on(() => props.value, (externalValue) => {
    if (externalValue !== void 0 && externalValue !== internalValue()) {
      core?.setValue(externalValue);
      setInternalValue(externalValue);
    }
  }));
  const handleKeyDown = (event) => {
    callEventHandler(props.onKeyDown, event);
    if (event.defaultPrevented || !core) {
      return;
    }
    const hasSelection = inputElement?.selectionStart !== inputElement?.selectionEnd;
    if (hasSelection && (event.key === "Backspace" || event.key === "Delete")) {
      event.preventDefault();
      core.clear();
      return;
    }
    const handled = core.handleKey(event.key, getKeyModifiers(event));
    if (handled) {
      event.preventDefault();
    }
  };
  const handlePaste = (event) => {
    callEventHandler(props.onPaste, event);
    if (event.defaultPrevented || !core) {
      return;
    }
    event.preventDefault();
    core.insertText(event.clipboardData?.getData("text/plain") ?? "");
  };
  const handleInput = (event) => {
    if (event.currentTarget.value === "") {
      core?.clear();
    }
  };
  return (() => {
    var _el$ = _tmpl$$2();
    web.use((element) => {
      inputElement = element;
      assignRef(props.inputRef, element);
    }, _el$);
    web.spread(_el$, web.mergeProps(rest, {
      "type": "text",
      get value() {
        return internalValue();
      },
      "onKeyDown": handleKeyDown,
      "onPaste": handlePaste,
      "onInput": handleInput,
      get ["class"]() {
        return mergeClassNames(props.class, props.className);
      },
      "lang": "ne",
      "autocomplete": "off",
      "autocorrect": "off",
      "autocapitalize": "off",
      "spellcheck": false
    }), false, false);
    return _el$;
  })();
}
var _tmpl$$1 = /* @__PURE__ */ web.template(`<textarea>`);
function NepaliTextarea(allProps) {
  const [props, rest] = solidJs.splitProps(allProps, ["value", "onChange", "onInput", "useDevanagariDigits", "language", "enableExtendedRomanization", "customWordMap", "instanceRef", "textareaRef", "onKeyDown", "onPaste", "class", "className"]);
  const [internalValue, setInternalValue] = solidJs.createSignal(props.value ?? "");
  let core = null;
  let textareaElement;
  const instance = {
    clear: () => {
      core?.clear();
      if (!core) {
        setInternalValue("");
      }
    },
    setValue: (value) => {
      core?.setValue(value);
      if (!core) {
        setInternalValue(value);
      }
    },
    getValue: () => core?.getValue() ?? internalValue(),
    getCore: () => core
  };
  solidJs.createEffect(() => {
    props.instanceRef?.(instance);
  });
  solidJs.createEffect(() => {
    const nextCore = new nepaliInput.NepaliIMECore({
      useDevanagariDigits: props.useDevanagariDigits ?? true,
      language: props.language ?? "generic",
      enableExtendedRomanization: props.enableExtendedRomanization ?? false,
      customWordMap: props.customWordMap,
      onStateChange: (state) => {
        setInternalValue(state.output);
        props.onInput?.(state.output);
        props.onChange?.(state.output);
      }
    });
    const initialValue = solidJs.untrack(() => props.value ?? internalValue());
    core = nextCore;
    if (initialValue) {
      nextCore.setValue(initialValue);
    }
    solidJs.onCleanup(() => {
      if (core === nextCore) {
        core = null;
      }
    });
  });
  solidJs.createEffect(solidJs.on(() => props.value, (externalValue) => {
    if (externalValue !== void 0 && externalValue !== internalValue()) {
      core?.setValue(externalValue);
      setInternalValue(externalValue);
    }
  }));
  const handleKeyDown = (event) => {
    callEventHandler(props.onKeyDown, event);
    if (event.defaultPrevented || !core) {
      return;
    }
    const hasSelection = textareaElement?.selectionStart !== textareaElement?.selectionEnd;
    if (hasSelection && (event.key === "Backspace" || event.key === "Delete")) {
      event.preventDefault();
      core.clear();
      return;
    }
    const handled = core.handleKey(event.key, getKeyModifiers(event));
    if (handled) {
      event.preventDefault();
    }
  };
  const handlePaste = (event) => {
    callEventHandler(props.onPaste, event);
    if (event.defaultPrevented || !core) {
      return;
    }
    event.preventDefault();
    core.insertText(event.clipboardData?.getData("text/plain") ?? "");
  };
  const handleInput = (event) => {
    if (event.currentTarget.value === "") {
      core?.clear();
    }
  };
  return (() => {
    var _el$ = _tmpl$$1();
    web.use((element) => {
      textareaElement = element;
      assignRef(props.textareaRef, element);
    }, _el$);
    web.spread(_el$, web.mergeProps(rest, {
      get value() {
        return internalValue();
      },
      "onKeyDown": handleKeyDown,
      "onPaste": handlePaste,
      "onInput": handleInput,
      get ["class"]() {
        return mergeClassNames(props.class, props.className);
      },
      "lang": "ne",
      "autocomplete": "off",
      "autocorrect": "off",
      "autocapitalize": "off",
      "spellcheck": false
    }), false, false);
    return _el$;
  })();
}
var _tmpl$ = /* @__PURE__ */ web.template(`<div><div class=input-section><label></label><textarea></textarea></div><div class=output-section><label></label><div>`), _tmpl$2 = /* @__PURE__ */ web.template(`<button>`);
function NepaliConverter(allProps) {
  const [props] = solidJs.splitProps(allProps, ["value", "onChange", "onInput", "useDevanagariDigits", "language", "enableExtendedRomanization", "customWordMap", "debounceMs", "showCopyButton", "direction", "inputProps", "outputProps", "class", "className", "instanceRef"]);
  const [input, setInput] = solidJs.createSignal(props.value ?? "");
  const [output, setOutput] = solidJs.createSignal("");
  const [copied, setCopied] = solidJs.createSignal(false);
  const [direction, setDirection] = solidJs.createSignal(props.direction ?? "toNepali");
  let core = null;
  const syncOutputFromCore = () => {
    setOutput(core?.getOutput() ?? "");
  };
  const instance = {
    clear: () => {
      core?.clear();
      setInput("");
      setOutput("");
      setCopied(false);
    },
    getOutput: () => core?.getOutput() ?? output(),
    setDirection: (value) => {
      setDirection(value);
      core?.setDirection(value);
      syncOutputFromCore();
    },
    toggleDirection: () => {
      const nextDirection = direction() === "toNepali" ? "toRoman" : "toNepali";
      setDirection(nextDirection);
      core?.setDirection(nextDirection);
      syncOutputFromCore();
    },
    getCore: () => core
  };
  solidJs.createEffect(() => {
    props.instanceRef?.(instance);
  });
  solidJs.createEffect(() => {
    const nextCore = new nepaliInput.NepaliConverterCore({
      useDevanagariDigits: props.useDevanagariDigits ?? true,
      language: props.language ?? "generic",
      enableExtendedRomanization: props.enableExtendedRomanization ?? false,
      customWordMap: props.customWordMap,
      debounceMs: props.debounceMs ?? 300,
      bidirectional: true,
      onInput: (inputText, outputText) => {
        setOutput(outputText);
        props.onInput?.(inputText, outputText);
      },
      onChange: (inputText, outputText) => {
        props.onChange?.(inputText, outputText);
      }
    });
    const initialDirection = solidJs.untrack(() => direction());
    const initialInput = solidJs.untrack(() => props.value ?? input());
    core = nextCore;
    nextCore.setDirection(initialDirection);
    if (initialInput) {
      nextCore.setInput(initialInput);
      setInput(initialInput);
    } else {
      setOutput("");
    }
    solidJs.onCleanup(() => {
      if (core === nextCore) {
        core = null;
      }
    });
  });
  solidJs.createEffect(solidJs.on(() => props.value, (externalValue) => {
    if (externalValue !== void 0 && externalValue !== input()) {
      setInput(externalValue);
      core?.setInput(externalValue);
    }
  }));
  solidJs.createEffect(solidJs.on(() => props.direction, (externalDirection) => {
    if (externalDirection && externalDirection !== direction()) {
      setDirection(externalDirection);
      core?.setDirection(externalDirection);
      syncOutputFromCore();
    }
  }));
  const handleInput = (event) => {
    const inputHandler = props.inputProps?.onInput;
    if (inputHandler) {
      const normalizedEvent = event;
      if (Array.isArray(inputHandler)) {
        const [fn, data] = inputHandler;
        fn(data, normalizedEvent);
      } else {
        inputHandler(normalizedEvent);
      }
    }
    if (event.defaultPrevented) {
      return;
    }
    const nextValue = event.currentTarget.value;
    setInput(nextValue);
    core?.setInput(nextValue);
  };
  const handleCopy = async (event) => {
    if (event.defaultPrevented) {
      return;
    }
    const value = output();
    if (!value) {
      return;
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const fallback = document.createElement("textarea");
        fallback.value = value;
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand("copy");
        document.body.removeChild(fallback);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2e3);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  const inputLabel = () => direction() === "toNepali" ? "Romanized Input" : "Nepali Input";
  const outputLabel = () => direction() === "toNepali" ? "Nepali Output" : "Roman Output";
  const inputClass = () => mergeClassNames(props.inputProps?.class, props.inputProps?.className);
  const outputClass = () => mergeClassNames("output-display", props.outputProps?.class, props.outputProps?.className);
  const placeholder = () => props.inputProps?.placeholder ?? (direction() === "toNepali" ? "Type in romanized Nepali..." : "Paste Nepali text...");
  return (() => {
    var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$2.nextSibling, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling;
    web.insert(_el$3, inputLabel);
    web.spread(_el$4, web.mergeProps(() => props.inputProps ?? {}, {
      get value() {
        return input();
      },
      "onInput": handleInput,
      get placeholder() {
        return placeholder();
      },
      get rows() {
        return props.inputProps?.rows ?? 6;
      },
      get ["class"]() {
        return inputClass();
      }
    }), false, false);
    web.insert(_el$6, outputLabel);
    web.spread(_el$7, web.mergeProps(() => props.outputProps ?? {}, {
      get ["class"]() {
        return outputClass();
      },
      get lang() {
        return direction() === "toNepali" ? "ne" : void 0;
      }
    }), false, true);
    web.insert(_el$7, () => output() || (direction() === "toNepali" ? "देवनागरी परिणाम यहाँ देखिन्छ" : "Romanized output appears here"));
    web.insert(_el$5, (() => {
      var _c$ = web.memo(() => !!(props.showCopyButton ?? true));
      return () => _c$() && (() => {
        var _el$8 = _tmpl$2();
        _el$8.$$click = handleCopy;
        web.insert(_el$8, () => copied() ? "✓ Copied!" : "Copy");
        web.effect(() => _el$8.disabled = !output());
        return _el$8;
      })();
    })(), null);
    web.effect(() => web.className(_el$, mergeClassNames("nepali-converter", props.class, props.className)));
    return _el$;
  })();
}
web.delegateEvents(["click"]);
exports.NepaliConverter = NepaliConverter;
exports.NepaliInput = NepaliInput;
exports.NepaliTextarea = NepaliTextarea;
//# sourceMappingURL=index.cjs.map
