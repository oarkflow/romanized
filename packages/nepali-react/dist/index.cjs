"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const nepaliInput = require("@oarkflow/nepali-input");
const NepaliInput = react.forwardRef(
  ({ value, onChange, onInput, useDevanagariDigits = true, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = react.useState(value || "");
    const coreRef = react.useRef(null);
    const inputRef = react.useRef(null);
    react.useEffect(() => {
      coreRef.current = new nepaliInput.NepaliIMECore({
        useDevanagariDigits,
        onStateChange: (state) => {
          setInternalValue(state.output);
          onInput?.(state.output);
          onChange?.(state.output);
        }
      });
      return () => {
        coreRef.current = null;
      };
    }, [useDevanagariDigits]);
    react.useEffect(() => {
      if (value !== void 0 && value !== internalValue) {
        coreRef.current?.setValue(value);
        setInternalValue(value);
      }
    }, [value]);
    react.useImperativeHandle(ref, () => ({
      clear: () => coreRef.current?.clear(),
      setValue: (val) => coreRef.current?.setValue(val),
      getValue: () => coreRef.current?.getValue() || "",
      getCore: () => coreRef.current
    }));
    const handleKeyDown = (e) => {
      if (!coreRef.current) return;
      const hasSelection = inputRef.current.selectionStart !== inputRef.current.selectionEnd;
      if (hasSelection && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
        coreRef.current.clear();
        return;
      }
      const handled = coreRef.current.handleKey(e.key, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey
      });
      if (handled) e.preventDefault();
    };
    const handlePaste = (e) => {
      if (!coreRef.current) return;
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      coreRef.current.insertText(text);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ...props,
        ref: inputRef,
        type: "text",
        value: internalValue,
        onKeyDown: handleKeyDown,
        onPaste: handlePaste,
        onChange: (e) => {
          if (e.target.value === "") {
            coreRef.current?.clear();
          }
        },
        className,
        lang: "ne",
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: false
      }
    );
  }
);
NepaliInput.displayName = "NepaliInput";
const NepaliTextarea = react.forwardRef(
  ({ value, onChange, onInput, useDevanagariDigits = true, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = react.useState(value || "");
    const coreRef = react.useRef(null);
    const textareaRef = react.useRef(null);
    react.useEffect(() => {
      coreRef.current = new nepaliInput.NepaliIMECore({
        useDevanagariDigits,
        onStateChange: (state) => {
          setInternalValue(state.output);
          onInput?.(state.output);
          onChange?.(state.output);
        }
      });
      return () => {
        coreRef.current = null;
      };
    }, [useDevanagariDigits]);
    react.useEffect(() => {
      if (value !== void 0 && value !== internalValue) {
        coreRef.current?.setValue(value);
        setInternalValue(value);
      }
    }, [value]);
    react.useImperativeHandle(ref, () => ({
      clear: () => coreRef.current?.clear(),
      setValue: (val) => coreRef.current?.setValue(val),
      getValue: () => coreRef.current?.getValue() || "",
      getCore: () => coreRef.current
    }));
    const handleKeyDown = (e) => {
      if (!coreRef.current) return;
      const hasSelection = textareaRef.current.selectionStart !== textareaRef.current.selectionEnd;
      if (hasSelection && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
        coreRef.current.clear();
        return;
      }
      const handled = coreRef.current.handleKey(e.key, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey
      });
      if (handled) e.preventDefault();
    };
    const handlePaste = (e) => {
      if (!coreRef.current) return;
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      coreRef.current.insertText(text);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "textarea",
      {
        ...props,
        ref: textareaRef,
        value: internalValue,
        onKeyDown: handleKeyDown,
        onPaste: handlePaste,
        onChange: (e) => {
          if (e.target.value === "") {
            coreRef.current?.clear();
          }
        },
        className,
        lang: "ne",
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: false
      }
    );
  }
);
NepaliTextarea.displayName = "NepaliTextarea";
const NepaliConverter = react.forwardRef(
  ({
    value,
    onChange,
    onInput,
    useDevanagariDigits = true,
    debounceMs = 300,
    showCopyButton = true,
    direction = "toNepali",
    inputProps = {},
    outputProps = {},
    className = ""
  }, ref) => {
    const [input, setInput] = react.useState(value || "");
    const [output, setOutput] = react.useState("");
    const [copied, setCopied] = react.useState(false);
    const coreRef = react.useRef(null);
    react.useEffect(() => {
      coreRef.current = new nepaliInput.NepaliConverterCore({
        useDevanagariDigits,
        debounceMs,
        bidirectional: true,
        onInput: (inputText, outputText) => {
          setOutput(outputText);
          onInput?.(inputText, outputText);
        },
        onChange: (inputText, outputText) => {
          onChange?.(inputText, outputText);
        }
      });
      coreRef.current.setDirection(direction);
      return () => {
        coreRef.current = null;
      };
    }, [useDevanagariDigits, debounceMs]);
    react.useEffect(() => {
      if (value !== void 0 && value !== input) {
        setInput(value);
        coreRef.current?.setInput(value);
      }
    }, [value]);
    react.useImperativeHandle(ref, () => ({
      clear: () => {
        coreRef.current?.clear();
        setInput("");
        setOutput("");
      },
      getOutput: () => coreRef.current?.getOutput() || "",
      setDirection: (dir) => coreRef.current?.setDirection(dir),
      toggleDirection: () => coreRef.current?.toggleDirection(),
      getCore: () => coreRef.current
    }));
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInput(newValue);
      coreRef.current?.setInput(newValue);
    };
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `nepali-converter ${className}`, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "input-section", children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { children: "Romanized Input" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "textarea",
          {
            ...inputProps,
            value: input,
            onChange: handleInputChange,
            placeholder: "Type in romanized Nepali...",
            rows: 6
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "output-section", children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { children: "Nepali Output" }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { ...outputProps, className: `output-display ${outputProps.className || ""}`, lang: "ne", children: output || "देवनागरी परिणाम यहाँ देखिन्छ" }),
        showCopyButton && /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: handleCopy, disabled: !output, children: copied ? "✓ Copied!" : "Copy" })
      ] })
    ] });
  }
);
NepaliConverter.displayName = "NepaliConverter";
exports.NepaliConverter = NepaliConverter;
exports.NepaliInput = NepaliInput;
exports.NepaliTextarea = NepaliTextarea;
//# sourceMappingURL=index.cjs.map
