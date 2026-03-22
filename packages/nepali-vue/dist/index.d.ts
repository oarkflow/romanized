import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { NepaliConverterCore } from '@oarkflow/nepali-input';
import { NepaliIMECore } from '@oarkflow/nepali-input';
import { PublicProps } from 'vue';

export declare const NepaliConverter: DefineComponent<Props_3, {
clear: () => void;
setDirection: (dir: "toNepali" | "toRoman") => void | undefined;
toggleDirection: () => void | undefined;
getOutput: () => string;
getCore: () => NepaliConverterCore | null;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (input: string, output: string) => any;
input: (input: string, output: string) => any;
change: (input: string, output: string) => any;
}, string, PublicProps, Readonly<Props_3> & Readonly<{
"onUpdate:modelValue"?: ((input: string, output: string) => any) | undefined;
onInput?: ((input: string, output: string) => any) | undefined;
onChange?: ((input: string, output: string) => any) | undefined;
}>, {
modelValue: string;
useDevanagariDigits: boolean;
debounceMs: number;
showCopyButton: boolean;
direction: "toNepali" | "toRoman";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const NepaliInput: DefineComponent<Props, {
clear: () => void | undefined;
setValue: (value: string) => void | undefined;
getValue: () => string;
getCore: () => NepaliIMECore | null;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
input: (value: string) => any;
change: (value: string) => any;
}, string, PublicProps, Readonly<Props> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
onInput?: ((value: string) => any) | undefined;
onChange?: ((value: string) => any) | undefined;
}>, {
modelValue: string;
useDevanagariDigits: boolean;
placeholder: string;
disabled: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
inputRef: HTMLInputElement;
}, HTMLInputElement>;

export declare const NepaliTextarea: DefineComponent<Props_2, {
clear: () => void | undefined;
setValue: (value: string) => void | undefined;
getValue: () => string;
getCore: () => NepaliIMECore | null;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
input: (value: string) => any;
change: (value: string) => any;
}, string, PublicProps, Readonly<Props_2> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
onInput?: ((value: string) => any) | undefined;
onChange?: ((value: string) => any) | undefined;
}>, {
modelValue: string;
useDevanagariDigits: boolean;
placeholder: string;
disabled: boolean;
rows: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
textareaRef: HTMLTextAreaElement;
}, HTMLTextAreaElement>;

declare interface Props {
    modelValue?: string;
    useDevanagariDigits?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

declare interface Props_2 {
    modelValue?: string;
    useDevanagariDigits?: boolean;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
}

declare interface Props_3 {
    modelValue?: string;
    useDevanagariDigits?: boolean;
    debounceMs?: number;
    showCopyButton?: boolean;
    direction?: 'toNepali' | 'toRoman';
}

export { }
