import { NepaliIMECore } from '@verishore/nepali-input';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const NepaliTextarea: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    value?: string | undefined;
    useDevanagariDigits?: boolean | undefined;
    placeholder?: string | undefined;
    rows?: number | undefined;
    disabled?: boolean | undefined;
    clear?: (() => void) | undefined;
    setValue?: ((val: string) => void) | undefined;
    getValue?: (() => string) | undefined;
    getCore?: (() => NepaliIMECore | null) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    clear: () => void;
    setValue: (val: string) => void;
    getValue: () => string;
    getCore: () => NepaliIMECore | null;
}, string>;
type NepaliTextarea = InstanceType<typeof NepaliTextarea>;
export default NepaliTextarea;
//# sourceMappingURL=NepaliTextarea.svelte.d.ts.map