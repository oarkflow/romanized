import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from "react";
import { NepaliIMECore, NepaliConverterCore } from "@oarkflow/nepali-input";
const NepaliInput = forwardRef(
  ({ value, onChange, onInput, useDevanagariDigits = true, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || "");
    const coreRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
      coreRef.current = new NepaliIMECore({
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
    useEffect(() => {
      if (value !== void 0 && value !== internalValue) {
        coreRef.current?.setValue(value);
        setInternalValue(value);
      }
    }, [value]);
    useImperativeHandle(ref, () => ({
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
    return /* @__PURE__ */ jsx(
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
const NepaliTextarea = forwardRef(
  ({ value, onChange, onInput, useDevanagariDigits = true, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || "");
    const coreRef = useRef(null);
    const textareaRef = useRef(null);
    useEffect(() => {
      coreRef.current = new NepaliIMECore({
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
    useEffect(() => {
      if (value !== void 0 && value !== internalValue) {
        coreRef.current?.setValue(value);
        setInternalValue(value);
      }
    }, [value]);
    useImperativeHandle(ref, () => ({
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
    return /* @__PURE__ */ jsx(
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
const NepaliConverter = forwardRef(
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
    const [input, setInput] = useState(value || "");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const coreRef = useRef(null);
    useEffect(() => {
      coreRef.current = new NepaliConverterCore({
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
    useEffect(() => {
      if (value !== void 0 && value !== input) {
        setInput(value);
        coreRef.current?.setInput(value);
      }
    }, [value]);
    useImperativeHandle(ref, () => ({
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
    return /* @__PURE__ */ jsxs("div", { className: `nepali-converter ${className}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "input-section", children: [
        /* @__PURE__ */ jsx("label", { children: "Romanized Input" }),
        /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsxs("div", { className: "output-section", children: [
        /* @__PURE__ */ jsx("label", { children: "Nepali Output" }),
        /* @__PURE__ */ jsx("div", { ...outputProps, className: `output-display ${outputProps.className || ""}`, lang: "ne", children: output || "देवनागरी परिणाम यहाँ देखिन्छ" }),
        showCopyButton && /* @__PURE__ */ jsx("button", { onClick: handleCopy, disabled: !output, children: copied ? "✓ Copied!" : "Copy" })
      ] })
    ] });
  }
);
NepaliConverter.displayName = "NepaliConverter";
export {
  NepaliConverter,
  NepaliInput,
  NepaliTextarea
};
//# sourceMappingURL=index.js.map
