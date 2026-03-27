import { DevanagariLanguage } from '@oarkflow/nepali-input';
import { JSX } from 'solid-js';
import { NepaliConverterCore } from '@oarkflow/nepali-input';
import { NepaliIMECore } from '@oarkflow/nepali-input';

export declare function NepaliConverter(allProps: NepaliConverterProps): JSX.Element;

export declare interface NepaliConverterProps {
    value?: string;
    onChange?: (input: string, output: string) => void;
    onInput?: (input: string, output: string) => void;
    useDevanagariDigits?: boolean;
    language?: DevanagariLanguage;
    enableExtendedRomanization?: boolean;
    customWordMap?: Record<string, string>;
    debounceMs?: number;
    showCopyButton?: boolean;
    direction?: 'toNepali' | 'toRoman';
    inputProps?: SolidTextareaProps;
    outputProps?: SolidOutputProps;
    class?: string;
    className?: string;
    instanceRef?: (value: NepaliConverterRef) => void;
}

export declare interface NepaliConverterRef {
    clear: () => void;
    getOutput: () => string;
    setDirection: (direction: 'toNepali' | 'toRoman') => void;
    toggleDirection: () => void;
    getCore: () => NepaliConverterCore | null;
}

export declare function NepaliInput(allProps: NepaliInputProps): JSX.Element;

export declare interface NepaliInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput' | 'value' | 'ref'> {
    value?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    useDevanagariDigits?: boolean;
    language?: DevanagariLanguage;
    enableExtendedRomanization?: boolean;
    customWordMap?: Record<string, string>;
    instanceRef?: (value: NepaliInputRef) => void;
    inputRef?: (value: HTMLInputElement) => void;
    className?: string;
}

export declare interface NepaliInputRef {
    clear: () => void;
    setValue: (value: string) => void;
    getValue: () => string;
    getCore: () => NepaliIMECore | null;
}

export declare function NepaliTextarea(allProps: NepaliTextareaProps): JSX.Element;

export declare interface NepaliTextareaProps extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onInput' | 'value' | 'ref'> {
    value?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    useDevanagariDigits?: boolean;
    language?: DevanagariLanguage;
    enableExtendedRomanization?: boolean;
    customWordMap?: Record<string, string>;
    instanceRef?: (value: NepaliTextareaRef) => void;
    textareaRef?: (value: HTMLTextAreaElement) => void;
    className?: string;
}

export declare interface NepaliTextareaRef {
    clear: () => void;
    setValue: (value: string) => void;
    getValue: () => string;
    getCore: () => NepaliIMECore | null;
}

declare type SolidOutputProps = JSX.HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

declare type SolidTextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
};

export { }
