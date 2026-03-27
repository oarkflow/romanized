import { DevanagariLanguage } from '@oarkflow/nepali-input';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { NepaliConverterCore } from '@oarkflow/nepali-input';
import { NepaliIMECore } from '@oarkflow/nepali-input';
import { RefAttributes } from 'react';
import { TextareaHTMLAttributes } from 'react';

export declare const NepaliConverter: ForwardRefExoticComponent<NepaliConverterProps & RefAttributes<NepaliConverterRef>>;

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
    inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
    outputProps?: HTMLAttributes<HTMLDivElement>;
    className?: string;
}

export declare interface NepaliConverterRef {
    clear: () => void;
    getOutput: () => string;
    setDirection: (direction: 'toNepali' | 'toRoman') => void;
    toggleDirection: () => void;
    getCore: () => NepaliConverterCore | null;
}

export declare const NepaliInput: ForwardRefExoticComponent<NepaliInputProps & RefAttributes<NepaliInputRef>>;

export declare interface NepaliInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onInput' | 'value'> {
    value?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    useDevanagariDigits?: boolean;
    language?: DevanagariLanguage;
    enableExtendedRomanization?: boolean;
    customWordMap?: Record<string, string>;
}

export declare interface NepaliInputRef {
    clear: () => void;
    setValue: (value: string) => void;
    getValue: () => string;
    getCore: () => NepaliIMECore | null;
}

export declare const NepaliTextarea: ForwardRefExoticComponent<NepaliTextareaProps & RefAttributes<NepaliTextareaRef>>;

export declare interface NepaliTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onInput' | 'value'> {
    value?: string;
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    useDevanagariDigits?: boolean;
    language?: DevanagariLanguage;
    enableExtendedRomanization?: boolean;
    customWordMap?: Record<string, string>;
}

export declare interface NepaliTextareaRef {
    clear: () => void;
    setValue: (value: string) => void;
    getValue: () => string;
    getCore: () => NepaliIMECore | null;
}

export { }
