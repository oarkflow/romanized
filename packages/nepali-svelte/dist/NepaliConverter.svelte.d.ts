import { NepaliConverterCore } from '@oarkflow/nepali-input';
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
declare const NepaliConverter: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    value?: string | undefined;
    useDevanagariDigits?: boolean | undefined;
    debounceMs?: number | undefined;
    showCopyButton?: boolean | undefined;
    direction?: "toNepali" | "toRoman" | undefined;
    clear?: (() => void) | undefined;
    setDirection?: ((dir: "toNepali" | "toRoman") => void) | undefined;
    toggleDirection?: (() => void) | undefined;
    getOutput?: (() => string) | undefined;
    getCore?: (() => NepaliConverterCore | null) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    clear: () => void;
    setDirection: (dir: "toNepali" | "toRoman") => void;
    toggleDirection: () => void;
    getOutput: () => string;
    getCore: () => NepaliConverterCore | null;
}, string>;
type NepaliConverter = InstanceType<typeof NepaliConverter>;
export default NepaliConverter;
//# sourceMappingURL=NepaliConverter.svelte.d.ts.map