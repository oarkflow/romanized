"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vue = require("vue");
const nepaliInput = require("@oarkflow/nepali-input");
const _hoisted_1$2 = ["placeholder", "disabled"];
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __name: "NepaliInput",
  props: {
    modelValue: { default: "" },
    useDevanagariDigits: { type: Boolean, default: true },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputRef = vue.ref(null);
    const internalValue = vue.ref(props.modelValue);
    let core = null;
    vue.onMounted(() => {
      core = new nepaliInput.NepaliIMECore({
        useDevanagariDigits: props.useDevanagariDigits,
        onStateChange: (state) => {
          internalValue.value = state.output;
          emit("update:modelValue", state.output);
          emit("input", state.output);
          emit("change", state.output);
        }
      });
    });
    vue.onUnmounted(() => {
      core = null;
    });
    vue.watch(() => props.modelValue, (newValue) => {
      if (newValue !== internalValue.value) {
        core?.setValue(newValue);
        internalValue.value = newValue;
      }
    });
    const handleKeyDown = (e) => {
      if (!core) return;
      const hasSelection = inputRef.value.selectionStart !== inputRef.value.selectionEnd;
      if (hasSelection && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
        core.clear();
        return;
      }
      const handled = core.handleKey(e.key, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey
      });
      if (handled) e.preventDefault();
    };
    const handlePaste = (e) => {
      if (!core) return;
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain") || "";
      core.insertText(text);
    };
    const clear = () => core?.clear();
    const setValue = (value) => core?.setValue(value);
    const getValue = () => core?.getValue() || "";
    __expose({
      clear,
      setValue,
      getValue,
      getCore: () => core
    });
    return (_ctx, _cache) => {
      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
        ref_key: "inputRef",
        ref: inputRef,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => internalValue.value = $event),
        type: "text",
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        onKeydown: handleKeyDown,
        onPaste: handlePaste,
        lang: "ne",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false"
      }, null, 40, _hoisted_1$2)), [
        [vue.vModelText, internalValue.value]
      ]);
    };
  }
});
const _hoisted_1$1 = ["placeholder", "rows", "disabled"];
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  __name: "NepaliTextarea",
  props: {
    modelValue: { default: "" },
    useDevanagariDigits: { type: Boolean, default: true },
    placeholder: { default: "" },
    rows: { default: 4 },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const textareaRef = vue.ref(null);
    const internalValue = vue.ref(props.modelValue);
    let core = null;
    vue.onMounted(() => {
      core = new nepaliInput.NepaliIMECore({
        useDevanagariDigits: props.useDevanagariDigits,
        onStateChange: (state) => {
          internalValue.value = state.output;
          emit("update:modelValue", state.output);
          emit("input", state.output);
          emit("change", state.output);
        }
      });
    });
    vue.onUnmounted(() => {
      core = null;
    });
    vue.watch(() => props.modelValue, (newValue) => {
      if (newValue !== internalValue.value) {
        core?.setValue(newValue);
        internalValue.value = newValue;
      }
    });
    const handleKeyDown = (e) => {
      if (!core) return;
      const hasSelection = textareaRef.value.selectionStart !== textareaRef.value.selectionEnd;
      if (hasSelection && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
        core.clear();
        return;
      }
      const handled = core.handleKey(e.key, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey
      });
      if (handled) e.preventDefault();
    };
    const handlePaste = (e) => {
      if (!core) return;
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain") || "";
      core.insertText(text);
    };
    const clear = () => core?.clear();
    const setValue = (value) => core?.setValue(value);
    const getValue = () => core?.getValue() || "";
    __expose({
      clear,
      setValue,
      getValue,
      getCore: () => core
    });
    return (_ctx, _cache) => {
      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
        ref_key: "textareaRef",
        ref: textareaRef,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => internalValue.value = $event),
        placeholder: __props.placeholder,
        rows: __props.rows,
        disabled: __props.disabled,
        onKeydown: handleKeyDown,
        onPaste: handlePaste,
        lang: "ne",
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false"
      }, null, 40, _hoisted_1$1)), [
        [vue.vModelText, internalValue.value]
      ]);
    };
  }
});
const _hoisted_1 = { class: "nepali-converter" };
const _hoisted_2 = { class: "input-section" };
const _hoisted_3 = { class: "output-section" };
const _hoisted_4 = {
  class: "output-display",
  lang: "ne"
};
const _hoisted_5 = ["disabled"];
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "NepaliConverter",
  props: {
    modelValue: { default: "" },
    useDevanagariDigits: { type: Boolean, default: true },
    debounceMs: { default: 300 },
    showCopyButton: { type: Boolean, default: true },
    direction: { default: "toNepali" }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const input = vue.ref(props.modelValue);
    const output = vue.ref("");
    const copied = vue.ref(false);
    let core = null;
    vue.onMounted(() => {
      core = new nepaliInput.NepaliConverterCore({
        useDevanagariDigits: props.useDevanagariDigits,
        debounceMs: props.debounceMs,
        bidirectional: true,
        onInput: (inputText, outputText) => {
          output.value = outputText;
          emit("input", inputText, outputText);
        },
        onChange: (inputText, outputText) => {
          emit("change", inputText, outputText);
          emit("update:modelValue", inputText, outputText);
        }
      });
      core.setDirection(props.direction);
    });
    vue.onUnmounted(() => {
      core = null;
    });
    vue.watch(() => props.modelValue, (newValue) => {
      if (newValue !== input.value) {
        input.value = newValue;
        core?.setInput(newValue);
      }
    });
    const handleInput = () => {
      core?.setInput(input.value);
    };
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(output.value);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };
    const clear = () => {
      core?.clear();
      input.value = "";
      output.value = "";
    };
    const setDirection = (dir) => core?.setDirection(dir);
    const toggleDirection = () => core?.toggleDirection();
    __expose({
      clear,
      setDirection,
      toggleDirection,
      getOutput: () => output.value,
      getCore: () => core
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode("div", _hoisted_2, [
          _cache[1] || (_cache[1] = vue.createElementVNode("label", null, "Romanized Input", -1)),
          vue.withDirectives(vue.createElementVNode("textarea", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.value = $event),
            onInput: handleInput,
            placeholder: "Type in romanized Nepali...",
            rows: "6"
          }, null, 544), [
            [vue.vModelText, input.value]
          ])
        ]),
        vue.createElementVNode("div", _hoisted_3, [
          _cache[2] || (_cache[2] = vue.createElementVNode("label", null, "Nepali Output", -1)),
          vue.createElementVNode("div", _hoisted_4, vue.toDisplayString(output.value || "देवनागरी परिणाम यहाँ देखिन्छ"), 1),
          __props.showCopyButton ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            onClick: handleCopy,
            disabled: !output.value
          }, vue.toDisplayString(copied.value ? "✓ Copied!" : "Copy"), 9, _hoisted_5)) : vue.createCommentVNode("", true)
        ])
      ]);
    };
  }
});
exports.NepaliConverter = _sfc_main;
exports.NepaliInput = _sfc_main$2;
exports.NepaliTextarea = _sfc_main$1;
//# sourceMappingURL=index.cjs.map
