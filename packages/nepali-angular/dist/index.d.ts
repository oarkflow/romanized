import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

export declare class NepaliInputDirective implements OnInit, OnDestroy, ControlValueAccessor {
    useDevanagariDigits: boolean;
    valueChange: EventEmitter<string>;
    private core;
    private onChange;
    private onTouched;
    private elementRef;
    constructor(el: ElementRef<HTMLInputElement>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleKeyDown;
    private handlePaste;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
}

export declare class NepaliTextareaDirective implements OnInit, OnDestroy, ControlValueAccessor {
    useDevanagariDigits: boolean;
    valueChange: EventEmitter<string>;
    private core;
    private onChange;
    private onTouched;
    private elementRef;
    constructor(el: ElementRef<HTMLTextAreaElement>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleKeyDown;
    private handlePaste;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
}

export { }
