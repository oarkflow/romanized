import { use, spread, mergeProps, template, insert, memo, effect, className, delegateEvents } from "solid-js/web";
import { splitProps, createSignal, createEffect, untrack, onCleanup, on } from "solid-js";
import { NepaliIMECore, NepaliConverterCore } from "@oarkflow/nepali-input";
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
  const className2 = values.filter(Boolean).join(" ").trim();
  return className2 || void 0;
}
function getKeyModifiers(event) {
  return {
    ctrl: event.ctrlKey,
    alt: event.altKey,
    meta: event.metaKey,
    shift: event.shiftKey
  };
}
var _tmpl$$2 = /* @__PURE__ */ template(`<input>`);
function NepaliInput(allProps) {
  const [props, rest] = splitProps(allProps, ["value", "onChange", "onInput", "useDevanagariDigits", "language", "enableExtendedRomanization", "customWordMap", "instanceRef", "inputRef", "onKeyDown", "onPaste", "class", "className"]);
  const [internalValue, setInternalValue] = createSignal(props.value ?? "");
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
  createEffect(() => {
    props.instanceRef?.(instance);
  });
  createEffect(() => {
    const nextCore = new NepaliIMECore({
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
    const initialValue = untrack(() => props.value ?? internalValue());
    core = nextCore;
    if (initialValue) {
      nextCore.setValue(initialValue);
    }
    onCleanup(() => {
      if (core === nextCore) {
        core = null;
      }
    });
  });
  createEffect(on(() => props.value, (externalValue) => {
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
    use((element) => {
      inputElement = element;
      assignRef(props.inputRef, element);
    }, _el$);
    spread(_el$, mergeProps(rest, {
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
var _tmpl$$1 = /* @__PURE__ */ template(`<textarea>`);
function NepaliTextarea(allProps) {
  const [props, rest] = splitProps(allProps, ["value", "onChange", "onInput", "useDevanagariDigits", "language", "enableExtendedRomanization", "customWordMap", "instanceRef", "textareaRef", "onKeyDown", "onPaste", "class", "className"]);
  const [internalValue, setInternalValue] = createSignal(props.value ?? "");
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
  createEffect(() => {
    props.instanceRef?.(instance);
  });
  createEffect(() => {
    const nextCore = new NepaliIMECore({
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
    const initialValue = untrack(() => props.value ?? internalValue());
    core = nextCore;
    if (initialValue) {
      nextCore.setValue(initialValue);
    }
    onCleanup(() => {
      if (core === nextCore) {
        core = null;
      }
    });
  });
  createEffect(on(() => props.value, (externalValue) => {
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
    use((element) => {
      textareaElement = element;
      assignRef(props.textareaRef, element);
    }, _el$);
    spread(_el$, mergeProps(rest, {
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
var _tmpl$ = /* @__PURE__ */ template(`<div><div class=input-section><label></label><textarea></textarea></div><div class=output-section><label></label><div>`), _tmpl$2 = /* @__PURE__ */ template(`<button>`);
function NepaliConverter(allProps) {
  const [props] = splitProps(allProps, ["value", "onChange", "onInput", "useDevanagariDigits", "language", "enableExtendedRomanization", "customWordMap", "debounceMs", "showCopyButton", "direction", "inputProps", "outputProps", "class", "className", "instanceRef"]);
  const [input, setInput] = createSignal(props.value ?? "");
  const [output, setOutput] = createSignal("");
  const [copied, setCopied] = createSignal(false);
  const [direction, setDirection] = createSignal(props.direction ?? "toNepali");
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
  createEffect(() => {
    props.instanceRef?.(instance);
  });
  createEffect(() => {
    const nextCore = new NepaliConverterCore({
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
    const initialDirection = untrack(() => direction());
    const initialInput = untrack(() => props.value ?? input());
    core = nextCore;
    nextCore.setDirection(initialDirection);
    if (initialInput) {
      nextCore.setInput(initialInput);
      setInput(initialInput);
    } else {
      setOutput("");
    }
    onCleanup(() => {
      if (core === nextCore) {
        core = null;
      }
    });
  });
  createEffect(on(() => props.value, (externalValue) => {
    if (externalValue !== void 0 && externalValue !== input()) {
      setInput(externalValue);
      core?.setInput(externalValue);
    }
  }));
  createEffect(on(() => props.direction, (externalDirection) => {
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
    insert(_el$3, inputLabel);
    spread(_el$4, mergeProps(() => props.inputProps ?? {}, {
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
    insert(_el$6, outputLabel);
    spread(_el$7, mergeProps(() => props.outputProps ?? {}, {
      get ["class"]() {
        return outputClass();
      },
      get lang() {
        return direction() === "toNepali" ? "ne" : void 0;
      }
    }), false, true);
    insert(_el$7, () => output() || (direction() === "toNepali" ? "देवनागरी परिणाम यहाँ देखिन्छ" : "Romanized output appears here"));
    insert(_el$5, (() => {
      var _c$ = memo(() => !!(props.showCopyButton ?? true));
      return () => _c$() && (() => {
        var _el$8 = _tmpl$2();
        _el$8.$$click = handleCopy;
        insert(_el$8, () => copied() ? "✓ Copied!" : "Copy");
        effect(() => _el$8.disabled = !output());
        return _el$8;
      })();
    })(), null);
    effect(() => className(_el$, mergeClassNames("nepali-converter", props.class, props.className)));
    return _el$;
  })();
}
delegateEvents(["click"]);
export {
  NepaliConverter,
  NepaliInput,
  NepaliTextarea
};
//# sourceMappingURL=index.js.map
