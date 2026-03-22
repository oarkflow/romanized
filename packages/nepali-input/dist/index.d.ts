/**
 * Autocomplete System for Nepali Input
 * Provides word suggestions based on prefix matching
 */
export declare interface AutocompleteEntry {
    roman: string;
    nepali: string;
    frequency: number;
    category?: string;
}

/**
 * Autocomplete Manager using Trie data structure
 */
export declare class AutocompleteManager {
    private root;
    private options;
    private userHistory;
    constructor(options?: AutocompleteOptions);
    /**
     * Add word to dictionary
     */
    addWord(entry: AutocompleteEntry): void;
    /**
     * Add multiple words
     */
    addWords(entries: AutocompleteEntry[]): void;
    /**
     * Get suggestions for prefix
     */
    getSuggestions(prefix: string): AutocompleteSuggestion[];
    /**
     * Record user selection to improve future suggestions
     */
    recordSelection(roman: string): void;
    /**
     * Clear user history
     */
    clearHistory(): void;
    /**
     * Get dictionary size
     */
    size(): number;
    /**
     * Export user history for persistence
     */
    exportHistory(): Record<string, number>;
    /**
     * Import user history from storage
     */
    importHistory(history: Record<string, number>): void;
    private normalizeKey;
    private collectSuggestions;
    private countNodes;
}

export declare interface AutocompleteOptions {
    maxSuggestions?: number;
    minPrefixLength?: number;
    useFrequency?: boolean;
    caseSensitive?: boolean;
}

export declare interface AutocompleteSuggestion {
    roman: string;
    nepali: string;
    score: number;
}

export declare const buildMapping: <T>(entries: MappingEntry<T>[]) => CompiledMapping<T>;

/**
 * Devanagari character categories
 */
export declare const CHARACTER_CATEGORIES: CharacterCategory[];

/**
 * Character Selector - Popover for choosing between multiple character mappings
 * Handles cases where one input can map to multiple Devanagari characters
 */
export declare interface CharacterAlternative {
    character: string;
    description: string;
    input: string;
    unicode: string;
    category: string;
}

/**
 * Character Palette Manager
 * Provides organized access to Devanagari characters
 */
export declare interface CharacterCategory {
    id: string;
    name: string;
    description: string;
    characters: CharacterInfo[];
}

export declare interface CharacterInfo {
    char: string;
    name: string;
    romanization?: string;
    unicode: string;
    category?: string;
}

/**
 * Character Palette Manager
 */
export declare class CharacterPaletteManager {
    private options;
    private recentCharacters;
    private searchIndex;
    constructor(options?: CharacterPaletteOptions);
    /**
     * Build search index for fast lookups
     */
    private buildSearchIndex;
    /**
     * Get all categories
     */
    getCategories(): CharacterCategory[];
    /**
     * Get characters by category ID
     */
    getCategoryCharacters(categoryId: string): CharacterInfo[];
    /**
     * Search characters by query
     */
    search(query: string): CharacterInfo[];
    /**
     * Record character selection
     */
    selectCharacter(char: CharacterInfo): void;
    /**
     * Get recent characters
     */
    getRecentCharacters(): CharacterInfo[];
    /**
     * Clear recent characters
     */
    clearRecent(): void;
    /**
     * Get character info by character
     */
    getCharacterInfo(char: string): CharacterInfo | undefined;
}

export declare interface CharacterPaletteOptions {
    /**
     * Show romanization hints
     */
    showRomanization?: boolean;
    /**
     * Show Unicode codepoints
     */
    showUnicode?: boolean;
    /**
     * Maximum recent characters to track
     */
    maxRecent?: number;
    /**
     * Callback when character is selected
     */
    onSelect?: (char: CharacterInfo) => void;
}

/**
 * Character Selector Popover
 * Shows alternatives when multiple characters match the same input
 */
export declare class CharacterSelector {
    private element;
    private alternatives;
    private selectedIndex;
    private options;
    private isVisible;
    constructor(options: CharacterSelectorOptions);
    private createPopoverElement;
    private attachEventListeners;
    private handleKeydown;
    private handleClickOutside;
    private updateSelection;
    private selectCurrent;
    /**
     * Show the character selector with alternatives
     */
    show(alternatives: CharacterAlternative[], position?: {
        x: number;
        y: number;
    }): void;
    private renderAlternative;
    private adjustPosition;
    /**
     * Hide the popover
     */
    hide(): void;
    /**
     * Select an alternative by index (used by onclick handler)
     */
    selectIndex(index: number): void;
    /**
     * Check if the popover is currently visible
     */
    isOpen(): boolean;
    /**
     * Destroy the popover and clean up
     */
    destroy(): void;
}

export declare interface CharacterSelectorOptions {
    onSelect: (character: string) => void;
    onCancel: () => void;
    position?: {
        x: number;
        y: number;
    };
    theme?: 'light' | 'dark';
}

/**
 * Common Nepali words for autocomplete
 */
export declare const COMMON_WORDS: AutocompleteEntry[];

export declare interface CompiledMapping<T> {
    sensitive: Array<{
        key: string;
        value: T;
    }>;
    insensitive: Array<{
        key: string;
        value: T;
    }>;
}

/**
 * Default shortcuts for Nepali input
 */
export declare const createDefaultShortcuts: () => ShortcutDefinition[];

export declare const createHarvardKyotoMappings: () => HarvardKyotoMapping;

/**
 * Create IAST mappings
 */
export declare const createIASTMappings: () => IASTMapping;

export declare const createISO15919Mappings: () => ISO15919Mapping;

export declare function createNepaliConverter(inputSelector: string | HTMLTextAreaElement, outputSelector: string | HTMLElement, copyButtonSelector?: string | HTMLButtonElement, options?: NepaliConverterOptions): NepaliConverter;

export declare function createNepaliInput(selector: string | HTMLInputElement, options?: NepaliInputOptions): NepaliInput;

export declare function createNepaliTextarea(selector: string | HTMLTextAreaElement, options?: NepaliTextareaOptions): NepaliTextarea;

export declare const createSLP1Mappings: () => SLP1Mapping;

export declare const createVelthuisMappings: () => VelthuisMapping;

/**
 * Devanagari to IAST character map
 */
export declare const DEVANAGARI_TO_IAST: Record<string, string>;

/**
 * Convert text from Devanagari to IAST
 */
export declare const devanagariToIAST: (text: string) => string;

/**
 * Get alternative characters for ambiguous inputs
 * Note: With the nukta fix, most conflicts have been removed.
 * This function is kept for future extensibility.
 */
export declare const getCharacterAlternatives: (input: string) => CharacterAlternative[];

/**
 * Get scheme information by ID
 */
export declare const getSchemeInfo: (schemeId: TransliterationScheme) => SchemeInfo | undefined;

export declare const HARVARD_KYOTO_TO_DEVANAGARI: Record<string, string>;

/**
 * Harvard-Kyoto consonant mappings
 * Uses uppercase for aspirated/retroflex: T=ट, Th=ठ, N=ण, S=ष
 */
export declare const harvardKyotoConsonantMapping: CompiledMapping<string>;

/**
 * Harvard-Kyoto diacritic mappings
 */
export declare const harvardKyotoDiacriticMapping: CompiledMapping<string>;

export declare interface HarvardKyotoMapping {
    vowels: CompiledMapping<{
        independent: string;
        matra: string;
        inherent?: boolean;
    }>;
    consonants: CompiledMapping<string>;
    diacritics: CompiledMapping<string>;
}

export declare const harvardKyotoToDevanagari: (text: string) => string;

/**
 * Harvard-Kyoto vowel mappings
 * Case-sensitive: A=आ, a=अ
 */
export declare const harvardKyotoVowelMapping: CompiledMapping<{
    independent: string;
    matra: string;
    inherent?: boolean;
}>;

export declare class HistoryManager {
    private history;
    private currentIndex;
    private maxHistory;
    private mergeDelay;
    private lastTimestamp;
    constructor(options?: HistoryOptions);
    /**
     * Push a new state to history
     */
    push(value: string, cursorPosition?: number): void;
    /**
     * Undo to previous state
     */
    undo(): HistoryState | null;
    /**
     * Redo to next state
     */
    redo(): HistoryState | null;
    /**
     * Check if undo is available
     */
    canUndo(): boolean;
    /**
     * Check if redo is available
     */
    canRedo(): boolean;
    /**
     * Get current state
     */
    current(): HistoryState | null;
    /**
     * Clear all history
     */
    clear(): void;
    /**
     * Get history size
     */
    size(): number;
    /**
     * Get current index
     */
    getCurrentIndex(): number;
    /**
     * Reset to a specific state without affecting history
     */
    jumpTo(index: number): HistoryState | null;
}

export declare interface HistoryOptions {
    maxHistory?: number;
    mergeDelay?: number;
}

/**
 * Undo/Redo History Manager
 * Manages state history for undo/redo functionality
 */
export declare interface HistoryState {
    value: string;
    cursorPosition?: number;
    timestamp: number;
}

/**
 * IAST to Devanagari character map for reverse transliteration
 */
export declare const IAST_TO_DEVANAGARI: Record<string, string>;

/**
 * IAST consonant mappings
 */
export declare const iastConsonantMapping: CompiledMapping<string>;

/**
 * IAST diacritic mappings
 */
export declare const iastDiacriticMapping: CompiledMapping<string>;

export declare interface IASTMapping {
    vowels: CompiledMapping<{
        independent: string;
        matra: string;
        inherent?: boolean;
    }>;
    consonants: CompiledMapping<string>;
    diacritics: CompiledMapping<string>;
}

/**
 * Convert text from IAST to Devanagari
 * Properly handles consonant clusters, vowel matras, and halants
 */
export declare const iastToDevanagari: (text: string) => string;

/**
 * IAST vowel mappings with both Unicode diacritics and ASCII alternatives
 */
export declare const iastVowelMapping: CompiledMapping<{
    independent: string;
    matra: string;
    inherent?: boolean;
}>;

export declare const ISO15919_TO_DEVANAGARI: Record<string, string>;

/**
 * ISO 15919 consonant mappings
 */
export declare const iso15919ConsonantMapping: CompiledMapping<string>;

/**
 * ISO 15919 diacritic mappings
 */
export declare const iso15919DiacriticMapping: CompiledMapping<string>;

export declare interface ISO15919Mapping {
    vowels: CompiledMapping<{
        independent: string;
        matra: string;
        inherent?: boolean;
    }>;
    consonants: CompiledMapping<string>;
    diacritics: CompiledMapping<string>;
}

export declare const iso15919ToDevanagari: (text: string) => string;

/**
 * ISO 15919 vowel mappings
 * Very similar to IAST with minor differences
 */
export declare const iso15919VowelMapping: CompiledMapping<{
    independent: string;
    matra: string;
    inherent?: boolean;
}>;

export declare class KeyboardShortcutManager {
    private shortcuts;
    private enabled;
    private preventDefault;
    constructor(options?: ShortcutOptions);
    /**
     * Register a keyboard shortcut
     */
    register(shortcut: ShortcutDefinition): void;
    /**
     * Unregister a keyboard shortcut
     */
    unregister(key: string, modifiers?: {
        ctrl?: boolean;
        shift?: boolean;
        alt?: boolean;
        meta?: boolean;
    }): void;
    /**
     * Handle keyboard event
     */
    handleEvent(event: KeyboardEvent): boolean;
    /**
     * Get all registered shortcuts
     */
    getShortcuts(): ShortcutDefinition[];
    /**
     * Get shortcuts by category
     */
    getShortcutsByCategory(category: string): ShortcutDefinition[];
    /**
     * Enable/disable shortcut manager
     */
    setEnabled(enabled: boolean): void;
    /**
     * Check if enabled
     */
    isEnabled(): boolean;
    /**
     * Clear all shortcuts
     */
    clear(): void;
    /**
     * Get shortcut display string
     */
    getShortcutDisplay(shortcut: ShortcutDefinition): string;
    private getShortcutKey;
    private getShortcutKeyFromEvent;
}

export declare const LEXICON_ENTRIES: readonly [{
    readonly roman: "sa";
    readonly nepali: "सा";
}, {
    readonly roman: "si";
    readonly nepali: "सि";
}, {
    readonly roman: "si";
    readonly nepali: "सी";
}, {
    readonly roman: "su";
    readonly nepali: "सु";
}, {
    readonly roman: "su";
    readonly nepali: "सू";
}, {
    readonly roman: "se";
    readonly nepali: "से";
}, {
    readonly roman: "sai";
    readonly nepali: "सै";
}, {
    readonly roman: "so";
    readonly nepali: "सो";
}, {
    readonly roman: "sau";
    readonly nepali: "सौ";
}, {
    readonly roman: "sam";
    readonly nepali: "सं";
}, {
    readonly roman: "Bhojpur";
    readonly nepali: "भोजपुर";
}, {
    readonly roman: "Dhankuta";
    readonly nepali: "धनकुटा";
}, {
    readonly roman: "Ilam";
    readonly nepali: "इलाम";
}, {
    readonly roman: "Jhapa";
    readonly nepali: "झापा";
}, {
    readonly roman: "Khotang";
    readonly nepali: "खोटाङ";
}, {
    readonly roman: "Morang";
    readonly nepali: "मोरङ";
}, {
    readonly roman: "Okhaldhunga";
    readonly nepali: "ओखलढुंगा";
}, {
    readonly roman: "Panchthar";
    readonly nepali: "पाँचथर";
}, {
    readonly roman: "Sankhuwasabha";
    readonly nepali: "संखुवासभा";
}, {
    readonly roman: "Solukhumbu";
    readonly nepali: "सोलुखुम्बु";
}, {
    readonly roman: "Sunsari";
    readonly nepali: "सुनसरी";
}, {
    readonly roman: "Taplejung";
    readonly nepali: "ताप्लेजुङ";
}, {
    readonly roman: "Terhathum";
    readonly nepali: "तेह्रथुम";
}, {
    readonly roman: "Udayapur";
    readonly nepali: "उदयपुर";
}, {
    readonly roman: "Bara";
    readonly nepali: "बारा";
}, {
    readonly roman: "Dhanusa";
    readonly nepali: "धनुषा";
}, {
    readonly roman: "Mahottari";
    readonly nepali: "महोत्तरी";
}, {
    readonly roman: "Parsa";
    readonly nepali: "पर्सा";
}, {
    readonly roman: "aaja";
    readonly nepali: "आज";
}, {
    readonly roman: "Rautahat";
    readonly nepali: "रौतहट";
}, {
    readonly roman: "Saptari";
    readonly nepali: "सप्तरी";
}, {
    readonly roman: "Sarlahi";
    readonly nepali: "सर्लाही";
}, {
    readonly roman: "Siraha";
    readonly nepali: "सिरहा";
}, {
    readonly roman: "Bhaktapur";
    readonly nepali: "भक्तपुर";
}, {
    readonly roman: "Chitwan";
    readonly nepali: "चितवन";
}, {
    readonly roman: "Dhading";
    readonly nepali: "धादिङ";
}, {
    readonly roman: "Dolakha";
    readonly nepali: "दोलखा";
}, {
    readonly roman: "Kathmandu";
    readonly nepali: "काठमाडौं";
}, {
    readonly roman: "Kavrepalanchok";
    readonly nepali: "काभ्रेपलाञ्चोक";
}, {
    readonly roman: "Lalitpur";
    readonly nepali: "ललितपुर";
}, {
    readonly roman: "Makawanpur";
    readonly nepali: "मकवानपुर";
}, {
    readonly roman: "Nuwakot";
    readonly nepali: "नुवाकोट";
}, {
    readonly roman: "Ramechhap";
    readonly nepali: "रामेछाप";
}, {
    readonly roman: "Rasuwa";
    readonly nepali: "रसुवा";
}, {
    readonly roman: "Sindhuli";
    readonly nepali: "सिन्धुली";
}, {
    readonly roman: "Sindhupalchok";
    readonly nepali: "सिन्धुपाल्चोक";
}, {
    readonly roman: "Baglung";
    readonly nepali: "बाग्लुङ";
}, {
    readonly roman: "Gorkha";
    readonly nepali: "गोरखा";
}, {
    readonly roman: "Kaski";
    readonly nepali: "कास्की";
}, {
    readonly roman: "Lamjung";
    readonly nepali: "लमजुङ";
}, {
    readonly roman: "Manang";
    readonly nepali: "मनाङ";
}, {
    readonly roman: "Mustang";
    readonly nepali: "मुस्ताङ";
}, {
    readonly roman: "Myagdi";
    readonly nepali: "म्याग्दी";
}, {
    readonly roman: "Nawalpur";
    readonly nepali: "नवलपुर";
}, {
    readonly roman: "Parbat";
    readonly nepali: "पर्वत";
}, {
    readonly roman: "Syangja";
    readonly nepali: "स्याङ्जा";
}, {
    readonly roman: "Tanahu";
    readonly nepali: "तनहुँ";
}, {
    readonly roman: "Arghakhanchi";
    readonly nepali: "अर्घाखाँची";
}, {
    readonly roman: "Banke";
    readonly nepali: "बाँके";
}, {
    readonly roman: "Bardiya";
    readonly nepali: "बर्दिया";
}, {
    readonly roman: "Dang";
    readonly nepali: "दाङ";
}, {
    readonly roman: "Gulmi";
    readonly nepali: "गुल्मी";
}, {
    readonly roman: "Kapilvastu";
    readonly nepali: "कपिलवस्तु";
}, {
    readonly roman: "Parasi";
    readonly nepali: "परासी";
}, {
    readonly roman: "Palpa";
    readonly nepali: "पाल्पा";
}, {
    readonly roman: "Pyuthan";
    readonly nepali: "प्युठान";
}, {
    readonly roman: "Rolpa";
    readonly nepali: "रोल्पा";
}, {
    readonly roman: "Rukum";
    readonly nepali: "रुकुम";
}, {
    readonly roman: "Rupandehi";
    readonly nepali: "रुपन्देही";
}, {
    readonly roman: "Dailekh";
    readonly nepali: "दैलेख";
}, {
    readonly roman: "Dolpa";
    readonly nepali: "डोल्पा";
}, {
    readonly roman: "Humla";
    readonly nepali: "हुम्ला";
}, {
    readonly roman: "Jajarkot";
    readonly nepali: "जाजरकोट";
}, {
    readonly roman: "Jumla";
    readonly nepali: "जुम्ला";
}, {
    readonly roman: "Kalikot";
    readonly nepali: "कालिकोट";
}, {
    readonly roman: "Mugu";
    readonly nepali: "मुगु";
}, {
    readonly roman: "Rukum Paschim";
    readonly nepali: "रुकुम पश्चिम";
}, {
    readonly roman: "Salyan";
    readonly nepali: "सल्यान";
}, {
    readonly roman: "Surkhet";
    readonly nepali: "सुर्खेत";
}, {
    readonly roman: "Achham";
    readonly nepali: "अछाम";
}, {
    readonly roman: "Baitadi";
    readonly nepali: "बैतडी";
}, {
    readonly roman: "Bajhang";
    readonly nepali: "बझाङ";
}, {
    readonly roman: "Bajura";
    readonly nepali: "बाजुरा";
}, {
    readonly roman: "Dadeldhura";
    readonly nepali: "डडेल्धुरा";
}, {
    readonly roman: "Darchula";
    readonly nepali: "दार्चुला";
}, {
    readonly roman: "Doti";
    readonly nepali: "डोटी";
}, {
    readonly roman: "Kailali";
    readonly nepali: "कैलाली";
}, {
    readonly roman: "Kanchanpur";
    readonly nepali: "कञ्चनपुर";
}, {
    readonly roman: "Bhojpur";
    readonly nepali: "भोजपुर";
}, {
    readonly roman: "Sadananda";
    readonly nepali: "षडानन्द";
}, {
    readonly roman: "Tyamkemaiyum";
    readonly nepali: "टेम्केमैयुङ";
}, {
    readonly roman: "Ramprasadrai";
    readonly nepali: "रामप्रसाद राई";
}, {
    readonly roman: "Arun";
    readonly nepali: "अरुण";
}, {
    readonly roman: "Pauwadungma";
    readonly nepali: "पौवादुङ्मा";
}, {
    readonly roman: "Salpasilichho";
    readonly nepali: "साल्पासिलिछो";
}, {
    readonly roman: "Aamchowk";
    readonly nepali: "आमचोक";
}, {
    readonly roman: "Hatuwagadhi";
    readonly nepali: "हतुवागढी";
}, {
    readonly roman: "Pakhribaas";
    readonly nepali: "पाख्रिवास";
}, {
    readonly roman: "Dhankuta";
    readonly nepali: "धनकुटा";
}, {
    readonly roman: "Mahalaxmi";
    readonly nepali: "महालक्ष्मी";
}, {
    readonly roman: "Sagurigadhi";
    readonly nepali: "साँगुरीगढी";
}, {
    readonly roman: "Khalsa Chhintang Sahidbhumi";
    readonly nepali: "सहिदभुमि";
}, {
    readonly roman: "Chhathar Jorpati";
    readonly nepali: "छथर जोरपाटी";
}, {
    readonly roman: "Chaubise";
    readonly nepali: "चौबिसे";
}, {
    readonly roman: "Illam";
    readonly nepali: "ईलाम";
}, {
    readonly roman: "Deumai";
    readonly nepali: "देउमाई";
}, {
    readonly roman: "Mai";
    readonly nepali: "माई";
}, {
    readonly roman: "Suryodaya";
    readonly nepali: "सुर्योदय";
}, {
    readonly roman: "Fakfokthum";
    readonly nepali: "फाकफोकथुम";
}, {
    readonly roman: "Chulachuli";
    readonly nepali: "चुलाचुली";
}, {
    readonly roman: "Maijogmai";
    readonly nepali: "माईजोगमाई";
}, {
    readonly roman: "Mangsebung";
    readonly nepali: "माङसेबुङ";
}, {
    readonly roman: "Rong";
    readonly nepali: "रोङ";
}, {
    readonly roman: "Sandakpur";
    readonly nepali: "सन्दकपुर";
}, {
    readonly roman: "Mechinagar";
    readonly nepali: "मेचीनगर";
}, {
    readonly roman: "Damak";
    readonly nepali: "दमक";
}, {
    readonly roman: "Kankai";
    readonly nepali: "कन्काई";
}, {
    readonly roman: "Bhadrapur";
    readonly nepali: "भद्रपुर";
}, {
    readonly roman: "Arjundhara";
    readonly nepali: "अर्जुनधारा";
}, {
    readonly roman: "Shivasatakshi";
    readonly nepali: "शिवसताक्षी";
}, {
    readonly roman: "Gauradaha";
    readonly nepali: "गौरादह";
}, {
    readonly roman: "Birtamod";
    readonly nepali: "विर्तामोड";
}, {
    readonly roman: "Kamal";
    readonly nepali: "कमल";
}, {
    readonly roman: "Gaurigunj";
    readonly nepali: "गौरिगंज";
}, {
    readonly roman: "Barhadashi";
    readonly nepali: "बाह्रदशी";
}, {
    readonly roman: "Jhapa";
    readonly nepali: "झापा";
}, {
    readonly roman: "Buddhasanti";
    readonly nepali: "बुद्धशान्ति";
}, {
    readonly roman: "Haldibari";
    readonly nepali: "हल्दिबारी";
}, {
    readonly roman: "Kachankawal";
    readonly nepali: "कचनकवल";
}, {
    readonly roman: "Halesituwachung";
    readonly nepali: "हलेसी तुवाचुङ";
}, {
    readonly roman: "Rupakot Majhuwagadhi";
    readonly nepali: "दिक्तेल रुपाकोट मझुवागढी";
}, {
    readonly roman: "Aiselukharka";
    readonly nepali: "ऐसेलुखर्क";
}, {
    readonly roman: "Lamidada";
    readonly nepali: "लामिडाडा";
}, {
    readonly roman: "Jantedhunga";
    readonly nepali: "जन्तेढुंगा";
}, {
    readonly roman: "Khotehang";
    readonly nepali: "खोटेहाङ";
}, {
    readonly roman: "Kepilasgadhi";
    readonly nepali: "केपिलासगढी";
}, {
    readonly roman: "Diprung";
    readonly nepali: "दिप्रुङ";
}, {
    readonly roman: "Sakela";
    readonly nepali: "साकेला";
}, {
    readonly roman: "Barahpokhari";
    readonly nepali: "वराहपोखरी";
}, {
    readonly roman: "Biratnagar";
    readonly nepali: "विराटनगर";
}, {
    readonly roman: "Belbaari";
    readonly nepali: "बेलवारी";
}, {
    readonly roman: "Letang";
    readonly nepali: "लेटाङ";
}, {
    readonly roman: "Pathari Sanischare";
    readonly nepali: "पथरी शनिश्चरे";
}, {
    readonly roman: "Rangeli";
    readonly nepali: "रंगेली";
}, {
    readonly roman: "Ratuwamai";
    readonly nepali: "रतुवामाई";
}, {
    readonly roman: "Sunawarsi";
    readonly nepali: "सुनवर्षी";
}, {
    readonly roman: "Urlabaari";
    readonly nepali: "उर्लाबारी";
}, {
    readonly roman: "Sundarharaincha";
    readonly nepali: "सुन्दर हरैचा";
}, {
    readonly roman: "Budhiganga";
    readonly nepali: "बुढीगंगा";
}, {
    readonly roman: "Dhanpalthan";
    readonly nepali: "धनपालथान";
}, {
    readonly roman: "Gramthan";
    readonly nepali: "ग्रामथान";
}, {
    readonly roman: "Jahada";
    readonly nepali: "जहदा";
}, {
    readonly roman: "Kanepokhari";
    readonly nepali: "कानेपोखरी";
}, {
    readonly roman: "Katahari";
    readonly nepali: "कटहरी";
}, {
    readonly roman: "Kerabaari";
    readonly nepali: "केराबारी";
}, {
    readonly roman: "Miklajung";
    readonly nepali: "मिक्लाजुङ";
}, {
    readonly roman: "Siddhicharan";
    readonly nepali: "सिद्धिचरण";
}, {
    readonly roman: "Khijidemwa";
    readonly nepali: "खिजीदेम्वा";
}, {
    readonly roman: "Champadevi";
    readonly nepali: "चम्पादेवी";
}, {
    readonly roman: "Chisankhugadhi";
    readonly nepali: "चिशंखुगढी";
}, {
    readonly roman: "Manebhanjyang";
    readonly nepali: "मानेभञ्याङ";
}, {
    readonly roman: "Molung";
    readonly nepali: "मोलुङ";
}, {
    readonly roman: "Likhu";
    readonly nepali: "लिखु";
}, {
    readonly roman: "Sunkoshi";
    readonly nepali: "सुनकोशी";
}, {
    readonly roman: "Fidim";
    readonly nepali: "फिदिम";
}, {
    readonly roman: "Falelung";
    readonly nepali: "फालेलुङ";
}, {
    readonly roman: "Falgunanda";
    readonly nepali: "फाल्गुनन्द";
}, {
    readonly roman: "Hilihang";
    readonly nepali: "हिलिहाङ";
}, {
    readonly roman: "Kummayek";
    readonly nepali: "कुम्मायक";
}, {
    readonly roman: "Miklajung";
    readonly nepali: "मिक्लाजुङ";
}, {
    readonly roman: "Tumwewa";
    readonly nepali: "तुम्वेवा";
}, {
    readonly roman: "Yangwarak";
    readonly nepali: "याङवरक";
}, {
    readonly roman: "Chainpur";
    readonly nepali: "चैनपुर";
}, {
    readonly roman: "Dharmadevi";
    readonly nepali: "धर्मदेवी";
}, {
    readonly roman: "Khaadbaari";
    readonly nepali: "खाँदवारी";
}, {
    readonly roman: "Madi";
    readonly nepali: "मादी";
}, {
    readonly roman: "Paanchkhapan";
    readonly nepali: "पाँचखपन";
}, {
    readonly roman: "Bhotkhola";
    readonly nepali: "भोटखोला";
}, {
    readonly roman: "Chichila";
    readonly nepali: "चिचिला";
}, {
    readonly roman: "Makalu";
    readonly nepali: "मकालु";
}, {
    readonly roman: "Sabhapokhari";
    readonly nepali: "सभापोखरी";
}, {
    readonly roman: "Silichong";
    readonly nepali: "सिलीचोङ";
}, {
    readonly roman: "Solududhkunda";
    readonly nepali: "सोलुदुधकुण्ड";
}, {
    readonly roman: "Dudhkoshi";
    readonly nepali: "दुधकोशी";
}, {
    readonly roman: "Khumbu Pasang Lhamu";
    readonly nepali: "खुम्वु पासाङल्हामु";
}, {
    readonly roman: "Dudhkausika";
    readonly nepali: "दुधकौसिका";
}, {
    readonly roman: "Nechasalyan";
    readonly nepali: "नेचासल्यान";
}, {
    readonly roman: "Mahakulung";
    readonly nepali: "माहाकुलुङ";
}, {
    readonly roman: "Likhu Pike";
    readonly nepali: "लिखु पिके";
}, {
    readonly roman: "Sotang";
    readonly nepali: "सोताङ";
}, {
    readonly roman: "Itahari";
    readonly nepali: "इटहरी";
}, {
    readonly roman: "Dharan";
    readonly nepali: "धरान";
}, {
    readonly roman: "Inaruwa";
    readonly nepali: "इनरुवा";
}, {
    readonly roman: "Duhabi";
    readonly nepali: "दुहवी";
}, {
    readonly roman: "Ramdhuni";
    readonly nepali: "रामधुनी";
}, {
    readonly roman: "Barah";
    readonly nepali: "बराह";
}, {
    readonly roman: "Dewangunj";
    readonly nepali: "देवानगञ्ज";
}, {
    readonly roman: "Koshi";
    readonly nepali: "कोशी";
}, {
    readonly roman: "Gadhi";
    readonly nepali: "गढी";
}, {
    readonly roman: "Barju";
    readonly nepali: "बर्जु";
}, {
    readonly roman: "Bhokraha";
    readonly nepali: "भोक्राहा";
}, {
    readonly roman: "Harinagara";
    readonly nepali: "हरिनगर";
}, {
    readonly roman: "Fungling";
    readonly nepali: "फुङलिङ";
}, {
    readonly roman: "Athrai Tribeni";
    readonly nepali: "आठराई त्रिवेणी";
}, {
    readonly roman: "Sidingwa";
    readonly nepali: "सिदिङ्वा";
}, {
    readonly roman: "Faktanglung";
    readonly nepali: "फक्ताङलुङ";
}, {
    readonly roman: "Mikhwakhola";
    readonly nepali: "मिक्वाखोला";
}, {
    readonly roman: "Meringden";
    readonly nepali: "मेरिङदेन";
}, {
    readonly roman: "Maiwakhola";
    readonly nepali: "मैवाखोला";
}, {
    readonly roman: "Yangwarak";
    readonly nepali: "याङ्वरक";
}, {
    readonly roman: "Sirijunga";
    readonly nepali: "सिरीजङ्घा";
}, {
    readonly roman: "Myanglung";
    readonly nepali: "म्याङलुङ";
}, {
    readonly roman: "Laligurans";
    readonly nepali: "लालीगुराँस";
}, {
    readonly roman: "Athrai";
    readonly nepali: "आठराई";
}, {
    readonly roman: "Chhathar";
    readonly nepali: "छथर";
}, {
    readonly roman: "Fedaap";
    readonly nepali: "फेदाप";
}, {
    readonly roman: "Menchhayayem";
    readonly nepali: "मेन्छयायेम";
}, {
    readonly roman: "Katari";
    readonly nepali: "कटारी";
}, {
    readonly roman: "Chaudandagadhi";
    readonly nepali: "चौदण्डीगढी";
}, {
    readonly roman: "Triyuga";
    readonly nepali: "त्रियुगा";
}, {
    readonly roman: "Belaka";
    readonly nepali: "वेलका";
}, {
    readonly roman: "Udaypurgadhi";
    readonly nepali: "उदयपुरगढी";
}, {
    readonly roman: "Tapli";
    readonly nepali: "ताप्ली";
}, {
    readonly roman: "Rautamai";
    readonly nepali: "रौतामाई";
}, {
    readonly roman: "Sunkoshi";
    readonly nepali: "सुनकोशी";
}, {
    readonly roman: "Newar";
    readonly nepali: "नेवार";
}, {
    readonly roman: "ram";
    readonly nepali: "राम";
}, {
    readonly roman: "Kalaiya";
    readonly nepali: "कलैया";
}, {
    readonly roman: "Jitpursimara";
    readonly nepali: "जितपुर-सिमरा";
}, {
    readonly roman: "Kolhawi";
    readonly nepali: "कोल्हवी";
}, {
    readonly roman: "Nijgadh";
    readonly nepali: "निजगढ";
}, {
    readonly roman: "Mahagadimai";
    readonly nepali: "महागढीमाई";
}, {
    readonly roman: "Simraungadh";
    readonly nepali: "सیم्रौनगढ";
}, {
    readonly roman: "Adarsha Kotwal";
    readonly nepali: "आदर्श कोतवाल";
}, {
    readonly roman: "Adarsha";
    readonly nepali: "आदर्श";
}, {
    readonly roman: "Karaiyamai";
    readonly nepali: "करैयामाई";
}, {
    readonly roman: "Devtaal";
    readonly nepali: "देवताल";
}, {
    readonly roman: "Pachrauta";
    readonly nepali: "पचरौता";
}, {
    readonly roman: "Parwanipur";
    readonly nepali: "परवानीपुर";
}, {
    readonly roman: "Prasauni";
    readonly nepali: "प्रसौनी";
}, {
    readonly roman: "Pheta";
    readonly nepali: "फेटा";
}, {
    readonly roman: "Baragadhi";
    readonly nepali: "बारागढी";
}, {
    readonly roman: "Subarna";
    readonly nepali: "सुवर्ण";
}, {
    readonly roman: "bishrampur";
    readonly nepali: "विश्रामपुर";
}, {
    readonly roman: "Janakpur";
    readonly nepali: "जनकपुर";
}, {
    readonly roman: "Chhireshwor";
    readonly nepali: "क्षिरेश्वरनाथ";
}, {
    readonly roman: "Ganeshman Charnath";
    readonly nepali: "गणेशमान–चारनाथ";
}, {
    readonly roman: "Dhanusadham";
    readonly nepali: "धनुषाधाम";
}, {
    readonly roman: "Nagarain";
    readonly nepali: "नगराइन";
}, {
    readonly roman: "Videha";
    readonly nepali: "विदेह";
}, {
    readonly roman: "Mithila";
    readonly nepali: "मिथिला";
}, {
    readonly roman: "Sahidnagar";
    readonly nepali: "शहिदनगर";
}, {
    readonly roman: "Sabaila";
    readonly nepali: "सबैला";
}, {
    readonly roman: "Siddidatri";
    readonly nepali: "सिद्धिदात्री";
}, {
    readonly roman: "Janaknandini";
    readonly nepali: "जनकनन्दिनी";
}, {
    readonly roman: "Bateshwor";
    readonly nepali: "बटेश्वर";
}, {
    readonly roman: "Mithila Bihari";
    readonly nepali: "मिथिला विहारी";
}, {
    readonly roman: "Mukhiyapatti musaharmiya";
    readonly nepali: "मुखियापट्टि मुसहरमिया";
}, {
    readonly roman: "Laxminiya";
    readonly nepali: "लक्ष्मीनिया";
}, {
    readonly roman: "Hansapur";
    readonly nepali: "हंसपुर";
}, {
    readonly roman: "kamala";
    readonly nepali: "कमला";
}, {
    readonly roman: "Aurahi";
    readonly nepali: "औरही";
}, {
    readonly roman: "Jaleshwor";
    readonly nepali: "जलेश्वर";
}, {
    readonly roman: "Bardibas";
    readonly nepali: "बर्दिबास";
}, {
    readonly roman: "Gausala";
    readonly nepali: "गौशाला";
}, {
    readonly roman: "Ekdara";
    readonly nepali: "एकडारा";
}, {
    readonly roman: "Sonama";
    readonly nepali: "सोनमा";
}, {
    readonly roman: "Samsi";
    readonly nepali: "साम्सी";
}, {
    readonly roman: "Loharpatti";
    readonly nepali: "लोहरपट्टी";
}, {
    readonly roman: "Ramgopalpur";
    readonly nepali: "रामगोपालपुर";
}, {
    readonly roman: "Mahottari";
    readonly nepali: "महोत्तरी";
}, {
    readonly roman: "Manara";
    readonly nepali: "मनरा";
}, {
    readonly roman: "Matihani";
    readonly nepali: "मटिहानी";
}, {
    readonly roman: "Bhanggaha";
    readonly nepali: "भँगाहा";
}, {
    readonly roman: "Balawa";
    readonly nepali: "बलवा";
}, {
    readonly roman: "Pipara";
    readonly nepali: "पिपरा";
}, {
    readonly roman: "Aurahi";
    readonly nepali: "औरही";
}, {
    readonly roman: "Birgunj";
    readonly nepali: "वीरगञ्ज";
}, {
    readonly roman: "Pokhariya";
    readonly nepali: "पोखरिया";
}, {
    readonly roman: "Subarnapur";
    readonly nepali: "सुवर्णपुर";
}, {
    readonly roman: "Jagarnathpur";
    readonly nepali: "जगरनाथपुर";
}, {
    readonly roman: "Dhobini";
    readonly nepali: "धोबीनी";
}, {
    readonly roman: "Chhipaharmai";
    readonly nepali: "छिपहरमाई";
}, {
    readonly roman: "Pakaha Mainapur";
    readonly nepali: "पकाहा मैनपुर";
}, {
    readonly roman: "Bindabasini";
    readonly nepali: "बिन्दबासिनी";
}, {
    readonly roman: "Bahudarmai";
    readonly nepali: "बहुदरमाई";
}, {
    readonly roman: "Belawa";
    readonly nepali: "बेलवा";
}, {
    readonly roman: "Parsagadhi";
    readonly nepali: "पर्सागढी";
}, {
    readonly roman: "Sakhuwa Prasauni";
    readonly nepali: "सखुवा प्रसौनी";
}, {
    readonly roman: "Paterwa Sugauli";
    readonly nepali: "पटेर्वा सुगौली";
}, {
    readonly roman: "Chandrapur";
    readonly nepali: "चन्द्रपुर";
}, {
    readonly roman: "Garuda";
    readonly nepali: "गरुडा";
}, {
    readonly roman: "Gaur";
    readonly nepali: "गौर";
}, {
    readonly roman: "Baudhimai";
    readonly nepali: "बौधीमाई";
}, {
    readonly roman: "Brindaban";
    readonly nepali: "वृन्दावन";
}, {
    readonly roman: "Dewahi Gonahi";
    readonly nepali: "देवाही गोनाही";
}, {
    readonly roman: "Durga Bhagwati";
    readonly nepali: "दुर्गाभगवती";
}, {
    readonly roman: "Durga Bhagwati";
    readonly nepali: "दुर्गा भगवती";
}, {
    readonly roman: "Gadhimai";
    readonly nepali: "गढीमाई";
}, {
    readonly roman: "Gujara";
    readonly nepali: "गुजरा";
}, {
    readonly roman: "Katahariya";
    readonly nepali: "कटहरीया";
}, {
    readonly roman: "Madhav Narayan";
    readonly nepali: "माधवनारायण";
}, {
    readonly roman: "Maulapur";
    readonly nepali: "मौलापुर";
}, {
    readonly roman: "Fatuwa Bijayapur";
    readonly nepali: "फतुवा विजयपुर";
}, {
    readonly roman: "Ishanath";
    readonly nepali: "ईशनाथ";
}, {
    readonly roman: "Paroha";
    readonly nepali: "परोहा";
}, {
    readonly roman: "Rajpur";
    readonly nepali: "राजपुर";
}, {
    readonly roman: "yamunamai";
    readonly nepali: "यमुनामाई";
}, {
    readonly roman: "rajbiraj";
    readonly nepali: "राजविराज";
}, {
    readonly roman: "Kanchanrup";
    readonly nepali: "कञ्चनरुप";
}, {
    readonly roman: "Dakneshwori";
    readonly nepali: "डाक्नेश्वरी";
}, {
    readonly roman: "Bodebarsain";
    readonly nepali: "बोदेबरसाईन";
}, {
    readonly roman: "Khadak";
    readonly nepali: "खडक";
}, {
    readonly roman: "Sambhunath";
    readonly nepali: "शम्भुनाथ";
}, {
    readonly roman: "Surunga";
    readonly nepali: "सुरुगां";
}, {
    readonly roman: "hanumannagar kankalini";
    readonly nepali: "हनुमाननगर कंकालिनी";
}, {
    readonly roman: "Krishna sabaran";
    readonly nepali: "कृष्णासवरन";
}, {
    readonly roman: "Chhinnamasta";
    readonly nepali: "छिन्नमस्ता";
}, {
    readonly roman: "Mahadeva";
    readonly nepali: "महादेवा";
}, {
    readonly roman: "rajgadh";
    readonly nepali: "राजगढ";
}, {
    readonly roman: "Saptakosi";
    readonly nepali: "सप्तकोशी";
}, {
    readonly roman: "Tirahut";
    readonly nepali: "तिरहुत";
}, {
    readonly roman: "Tilathi Koiladi";
    readonly nepali: "तिलाठी कोईलाडी";
}, {
    readonly roman: "Rupani";
    readonly nepali: "रुपनी";
}, {
    readonly roman: "Belhi Chapena";
    readonly nepali: "बेल्ही चपेना";
}, {
    readonly roman: "Bishnupur";
    readonly nepali: "बिष्णुपुर";
}, {
    readonly roman: "Ishworpur";
    readonly nepali: "ईश्वरपुर";
}, {
    readonly roman: "Lalbandi";
    readonly nepali: "लालबन्दी";
}, {
    readonly roman: "Haripur";
    readonly nepali: "हरिपुर";
}, {
    readonly roman: "Haripurba";
    readonly nepali: "हरिपुर्वा";
}, {
    readonly roman: "Hariban";
    readonly nepali: "हरिवन";
}, {
    readonly roman: "Barahathawa";
    readonly nepali: "बरहथवा";
}, {
    readonly roman: "Balara";
    readonly nepali: "बलरा";
}, {
    readonly roman: "Godaita";
    readonly nepali: "गोडैटा";
}, {
    readonly roman: "Malangwa";
    readonly nepali: "मलंगवा";
}, {
    readonly roman: "Bagmati";
    readonly nepali: "बागमती";
}, {
    readonly roman: "Kabilasi";
    readonly nepali: "कबिलासी";
}, {
    readonly roman: "Chakraghatta";
    readonly nepali: "चक्रघट्टा";
}, {
    readonly roman: "Chandranagar";
    readonly nepali: "चन्द्रनगर";
}, {
    readonly roman: "Dhankaul";
    readonly nepali: "धनकौल";
}, {
    readonly roman: "basbariya";
    readonly nepali: "बसबरीया";
}, {
    readonly roman: "Bramhapuri";
    readonly nepali: "ब्रह्मपुरी";
}, {
    readonly roman: "Ramnagar";
    readonly nepali: "रामनगर";
}, {
    readonly roman: "Bishnu";
    readonly nepali: "विष्णु";
}, {
    readonly roman: "Lahan";
    readonly nepali: "लहान";
}, {
    readonly roman: "Dhangadimai";
    readonly nepali: "धनगढीमाई";
}, {
    readonly roman: "Dhangadi";
    readonly nepali: "धनगढी";
}, {
    readonly roman: "Siraha";
    readonly nepali: "सिरहा";
}, {
    readonly roman: "Golbazar";
    readonly nepali: "गोलबजार";
}, {
    readonly roman: "Mirchaiya";
    readonly nepali: "मिर्चैया";
}, {
    readonly roman: "Kalyanpur";
    readonly nepali: "कल्याणपुर";
}, {
    readonly roman: "Bhagawanpur";
    readonly nepali: "भगवानपुर";
}, {
    readonly roman: "Bishnu";
    readonly nepali: "विष्णु";
}, {
    readonly roman: "Sukhipur";
    readonly nepali: "सुखीपुर";
}, {
    readonly roman: "Karjanha";
    readonly nepali: "कर्जन्हा";
}, {
    readonly roman: "Bariyarpatti";
    readonly nepali: "बरियारपट्टी";
}, {
    readonly roman: "Laxmipur Patari";
    readonly nepali: "लक्ष्मीपुर पतारी";
}, {
    readonly roman: "Naraha";
    readonly nepali: "नरहा";
}, {
    readonly roman: "Sakhuwanankarkatti";
    readonly nepali: "सखुवानान्कारकट्टी";
}, {
    readonly roman: "Arnama";
    readonly nepali: "अर्नमा";
}, {
    readonly roman: "Nawarajpur";
    readonly nepali: "नवराजपुर";
}, {
    readonly roman: "Changu Narayan";
    readonly nepali: "चाँगुनारायण";
}, {
    readonly roman: "Bhaktapur";
    readonly nepali: "भक्तपुर";
}, {
    readonly roman: "Madhyepur";
    readonly nepali: "मध्यपुर";
}, {
    readonly roman: "Thimi";
    readonly nepali: "थिमी";
}, {
    readonly roman: "Suryebinayak";
    readonly nepali: "सूर्यविनायक";
}, {
    readonly roman: "Bharatpur";
    readonly nepali: "भरतपुर";
}, {
    readonly roman: "Kalika";
    readonly nepali: "कालिका";
}, {
    readonly roman: "Khairhani";
    readonly nepali: "खैरहनी";
}, {
    readonly roman: "Madi";
    readonly nepali: "माडी";
}, {
    readonly roman: "Ratnanagar";
    readonly nepali: "रत्ननगर";
}, {
    readonly roman: "Rapti";
    readonly nepali: "राप्ती";
}, {
    readonly roman: "Echyakamana";
    readonly nepali: "इच्छाकामना";
}, {
    readonly roman: "Dhunibenshi";
    readonly nepali: "धुनीबेंसी";
}, {
    readonly roman: "Nilkantha";
    readonly nepali: "नीलकण्ठ";
}, {
    readonly roman: "Khaniyabash";
    readonly nepali: "खनियाबास";
}, {
    readonly roman: "Gajuri";
    readonly nepali: "गजुरी";
}, {
    readonly roman: "Galchi";
    readonly nepali: "गल्छी";
}, {
    readonly roman: "Gangajamuna";
    readonly nepali: "गङ्गाजमुना";
}, {
    readonly roman: "Jwalamukhi";
    readonly nepali: "ज्वालामूखी";
}, {
    readonly roman: "Thakre";
    readonly nepali: "थाक्रे";
}, {
    readonly roman: "Netrabati";
    readonly nepali: "नेत्रावती";
}, {
    readonly roman: "Benighat Rorang";
    readonly nepali: "बेनीघाट रोराङ्ग";
}, {
    readonly roman: "Rubi Valley";
    readonly nepali: "रुवी भ्याली";
}, {
    readonly roman: "Sidhlake";
    readonly nepali: "सिद्धलेक";
}, {
    readonly roman: "Tripurasundari";
    readonly nepali: "त्रिपुरासुन्दरी";
}, {
    readonly roman: "Jiri";
    readonly nepali: "जिरी";
}, {
    readonly roman: "Bhimeshwor";
    readonly nepali: "भिमेश्वर";
}, {
    readonly roman: "Kalinchowk";
    readonly nepali: "कालिन्चोक";
}, {
    readonly roman: "Gaurishankar";
    readonly nepali: "गौरीशङ्कर";
}, {
    readonly roman: "Tamakoshi";
    readonly nepali: "तामाकोशी";
}, {
    readonly roman: "Melung";
    readonly nepali: "मेलुङ्ग";
}, {
    readonly roman: "Bigu";
    readonly nepali: "विगु";
}, {
    readonly roman: "Baiteshwor";
    readonly nepali: "वैतेश्वर";
}, {
    readonly roman: "Shailung";
    readonly nepali: "शैलुङ्ग";
}, {
    readonly roman: "Dhulikhel";
    readonly nepali: "धुलिखेल";
}, {
    readonly roman: "Banepa";
    readonly nepali: "बनेपा";
}, {
    readonly roman: "Panauti";
    readonly nepali: "पनौती";
}, {
    readonly roman: "Panchkhaal";
    readonly nepali: "पांचखाल";
}, {
    readonly roman: "Namobuddha";
    readonly nepali: "नमोबुद्ध";
}, {
    readonly roman: "Khanikhola";
    readonly nepali: "खानीखोला";
}, {
    readonly roman: "Chaurideurali";
    readonly nepali: "चौंरीदेउराली";
}, {
    readonly roman: "Temaal";
    readonly nepali: "तेमाल";
}, {
    readonly roman: "Bethanchowk";
    readonly nepali: "बेथानचोक";
}, {
    readonly roman: "Bhumlu";
    readonly nepali: "भुम्लु";
}, {
    readonly roman: "Mandandeupur";
    readonly nepali: "मण्डनदेउपुर";
}, {
    readonly roman: "Mahabharat";
    readonly nepali: "महाभारत";
}, {
    readonly roman: "Roshi";
    readonly nepali: "रोशी";
}, {
    readonly roman: "Kathmandu";
    readonly nepali: "काठमाण्डौं";
}, {
    readonly roman: "Kageshwori";
    readonly nepali: "कागेश्वरी";
}, {
    readonly roman: "Kirtipur";
    readonly nepali: "कीर्तिपुर";
}, {
    readonly roman: "Gokarneshwor";
    readonly nepali: "गोकर्णेश्वर";
}, {
    readonly roman: "Chandragiri";
    readonly nepali: "चन्द्रागिरी";
}, {
    readonly roman: "Tokha";
    readonly nepali: "टोखा";
}, {
    readonly roman: "Tarkeshwor";
    readonly nepali: "तारकेश्वर";
}, {
    readonly roman: "Dakchinkali";
    readonly nepali: "दक्षिणकाली";
}, {
    readonly roman: "Nagarjun";
    readonly nepali: "नागार्जुन";
}, {
    readonly roman: "Budhanilkantha";
    readonly nepali: "बुढानिलकण्ठ";
}, {
    readonly roman: "Shankharapur";
    readonly nepali: "शंखरापुर";
}, {
    readonly roman: "Lalitpur";
    readonly nepali: "ललितपुर";
}, {
    readonly roman: "Godawari";
    readonly nepali: "गोदावरी";
}, {
    readonly roman: "Mahalaxmi";
    readonly nepali: "महालक्ष्मी";
}, {
    readonly roman: "Konjyosom";
    readonly nepali: "कोन्ज्योसोम";
}, {
    readonly roman: "Bagmati";
    readonly nepali: "बाग्मती";
}, {
    readonly roman: "Mahankaal";
    readonly nepali: "महाङ्काल";
}, {
    readonly roman: "Hetauda";
    readonly nepali: "हेटौंडा";
}, {
    readonly roman: "Thaha";
    readonly nepali: "थाहा";
}, {
    readonly roman: "Indrasarobar";
    readonly nepali: "ईन्द्रसरोवर";
}, {
    readonly roman: "Kailash";
    readonly nepali: "कैलाश";
}, {
    readonly roman: "Bakaiya";
    readonly nepali: "बकैया";
}, {
    readonly roman: "Bhimfedi";
    readonly nepali: "भिमफेदी";
}, {
    readonly roman: "Makwanpurgadhi";
    readonly nepali: "मकवानपुरगढी";
}, {
    readonly roman: "Manhari";
    readonly nepali: "मनहरी";
}, {
    readonly roman: "Raksirang";
    readonly nepali: "राक्सिराङ्ग";
}, {
    readonly roman: "Bidur";
    readonly nepali: "विदुर";
}, {
    readonly roman: "Belkotgadhi";
    readonly nepali: "बेलकोटगढी";
}, {
    readonly roman: "Kakani";
    readonly nepali: "ककनी";
}, {
    readonly roman: "Kispang";
    readonly nepali: "किस्पाङ";
}, {
    readonly roman: "Tadi";
    readonly nepali: "तादी";
}, {
    readonly roman: "Dupcheshwor";
    readonly nepali: "दुप्चेश्वर";
}, {
    readonly roman: "Panchakanya";
    readonly nepali: "पञ्चकन्या";
}, {
    readonly roman: "Likhu";
    readonly nepali: "लिखु";
}, {
    readonly roman: "Meghang";
    readonly nepali: "म्यागङ";
}, {
    readonly roman: "Shivapuri";
    readonly nepali: "शिवपुरी";
}, {
    readonly roman: "Suryegadhi";
    readonly nepali: "सुर्यगढी";
}, {
    readonly roman: "Manthali";
    readonly nepali: "मन्थली";
}, {
    readonly roman: "Ramechhap";
    readonly nepali: "रामेछाप";
}, {
    readonly roman: "Umakunda";
    readonly nepali: "उमाकुण्ड";
}, {
    readonly roman: "Khandadevi";
    readonly nepali: "खाँडादेवी";
}, {
    readonly roman: "Gokulganga";
    readonly nepali: "गोकुलगङ्गा";
}, {
    readonly roman: "Doramba";
    readonly nepali: "दोरम्बा";
}, {
    readonly roman: "Sunapati";
    readonly nepali: "सुनापति";
}, {
    readonly roman: "Uttargaya";
    readonly nepali: "उत्तरगया";
}, {
    readonly roman: "Kalika";
    readonly nepali: "कालिका";
}, {
    readonly roman: "Gosainkunda";
    readonly nepali: "गोसाईंकुण्ड";
}, {
    readonly roman: "Naukunda";
    readonly nepali: "नौकुण्ड";
}, {
    readonly roman: "Kamalamaai";
    readonly nepali: "कमलामाई";
}, {
    readonly roman: "Dudhauli";
    readonly nepali: "दुधौली";
}, {
    readonly roman: "Golanjor";
    readonly nepali: "गोलन्जोर";
}, {
    readonly roman: "Ghyan";
    readonly nepali: "घ्याङ";
}, {
    readonly roman: "Tinpatan";
    readonly nepali: "तीनपाटन";
}, {
    readonly roman: "Fikkal";
    readonly nepali: "फिक्कल";
}, {
    readonly roman: "Marin";
    readonly nepali: "मरिण";
}, {
    readonly roman: "Sunkoshi";
    readonly nepali: "सुनकोशी";
}, {
    readonly roman: "Hariharpurgadhi";
    readonly nepali: "हरिहरपुरगढी";
}, {
    readonly roman: "Sangachowkgadhi";
    readonly nepali: "सागाचोकगढी";
}, {
    readonly roman: "Barabise";
    readonly nepali: "वाह्रविसे";
}, {
    readonly roman: "Melamchi";
    readonly nepali: "मेलम्ची";
}, {
    readonly roman: "Indrabati";
    readonly nepali: "ईन्द्रावती";
}, {
    readonly roman: "Jugal";
    readonly nepali: "जुगल";
}, {
    readonly roman: "Thanpal";
    readonly nepali: "थाङपाल";
}, {
    readonly roman: "Balephi";
    readonly nepali: "बलेफी";
}, {
    readonly roman: "Botekoshi";
    readonly nepali: "भोटेकोशी";
}, {
    readonly roman: "Lisankhu Pakhar";
    readonly nepali: "लिसंखुपाखर";
}, {
    readonly roman: "Helambhu";
    readonly nepali: "हेलम्बु";
}, {
    readonly roman: "Tripurasundari";
    readonly nepali: "त्रिपुरासुन्दरी";
}, {
    readonly roman: "Baglung";
    readonly nepali: "बाग्लुङ";
}, {
    readonly roman: "Galkot";
    readonly nepali: "गल्कोट";
}, {
    readonly roman: "Jaimini";
    readonly nepali: "जैमिनी";
}, {
    readonly roman: "Dhorpatan";
    readonly nepali: "ढोरपाटन";
}, {
    readonly roman: "Bareng";
    readonly nepali: "वरेङ";
}, {
    readonly roman: "Kathekhola";
    readonly nepali: "काठेखोला";
}, {
    readonly roman: "Tamankhola";
    readonly nepali: "तमानखोला";
}, {
    readonly roman: "Tarakhola";
    readonly nepali: "ताराखोला";
}, {
    readonly roman: "Nisikhola";
    readonly nepali: "निसीखोला";
}, {
    readonly roman: "Badigad";
    readonly nepali: "वडिगाड";
}, {
    readonly roman: "Gorkha";
    readonly nepali: "गोरखा";
}, {
    readonly roman: "Palungtar";
    readonly nepali: "पालुङटार";
}, {
    readonly roman: "Sulikot";
    readonly nepali: "सुलिकोट";
}, {
    readonly roman: "Siranchok";
    readonly nepali: "सिरानचोक";
}, {
    readonly roman: "Ajirkot";
    readonly nepali: "अजिरकोट";
}, {
    readonly roman: "Aarughat";
    readonly nepali: "आरुघाट";
}, {
    readonly roman: "Gandaki";
    readonly nepali: "गण्डकी";
}, {
    readonly roman: "Chumnubri";
    readonly nepali: "चुमनुव्री";
}, {
    readonly roman: "Dharche";
    readonly nepali: "धार्चे";
}, {
    readonly roman: "Bhimsen";
    readonly nepali: "भीमसेन";
}, {
    readonly roman: "Sahid Lakhan";
    readonly nepali: "सहिद लखन";
}, {
    readonly roman: "Pokhara";
    readonly nepali: "पोखरा";
}, {
    readonly roman: "Annapurna";
    readonly nepali: "अन्नपूर्णा";
}, {
    readonly roman: "Machhapuchhre";
    readonly nepali: "ममाछापुछ्रे";
}, {
    readonly roman: "Madi";
    readonly nepali: "माडी";
}, {
    readonly roman: "Rupa";
    readonly nepali: "रुपा";
}, {
    readonly roman: "Beshisahar";
    readonly nepali: "बेसीशहर";
}, {
    readonly roman: "Madhyanepal";
    readonly nepali: "मध्यनेपाल";
}, {
    readonly roman: "Rainas";
    readonly nepali: "राईनास";
}, {
    readonly roman: "Sundarbajar";
    readonly nepali: "सुन्दरबजार";
}, {
    readonly roman: "Kobholasothar";
    readonly nepali: "क्व्होलासोथार";
}, {
    readonly roman: "Dudhpokhari";
    readonly nepali: "दुधपोखरी";
}, {
    readonly roman: "Dordi";
    readonly nepali: "दोर्दी";
}, {
    readonly roman: "Marsyandi";
    readonly nepali: "मर्स्याङदी";
}, {
    readonly roman: "Narpa";
    readonly nepali: "नार्पा";
}, {
    readonly roman: "Nashon";
    readonly nepali: "नासोँ";
}, {
    readonly roman: "Ngisyang";
    readonly nepali: "ङिस्याङ";
}, {
    readonly roman: "Chame";
    readonly nepali: "चामे";
}, {
    readonly roman: "Gharpajhong";
    readonly nepali: "घरपझोङ";
}, {
    readonly roman: "Thasang";
    readonly nepali: "थासाङ";
}, {
    readonly roman: "Lo-Ghekar Damodarkunda";
    readonly nepali: "लो-घेकर दामोदरकुण्ड";
}, {
    readonly roman: "Lomanthang";
    readonly nepali: "लोमन्थाङ";
}, {
    readonly roman: "Barhagaun Muktichhetra";
    readonly nepali: "वारागुङ मुक्तिक्षेत्र";
}, {
    readonly roman: "Beni";
    readonly nepali: "बेनी";
}, {
    readonly roman: "Annapurna";
    readonly nepali: "अन्नपूर्णा";
}, {
    readonly roman: "Dhaulagiri";
    readonly nepali: "धौलागिरी";
}, {
    readonly roman: "Mangala";
    readonly nepali: "मंगला";
}, {
    readonly roman: "Malika";
    readonly nepali: "मालिका";
}, {
    readonly roman: "Raghuganga";
    readonly nepali: "रघुगंगा";
}, {
    readonly roman: "Kawasoti";
    readonly nepali: "कावासोती";
}, {
    readonly roman: "Gaindakot";
    readonly nepali: "गैंडाकोट";
}, {
    readonly roman: "Devchuli";
    readonly nepali: "देवचुली";
}, {
    readonly roman: "Madhyabindu";
    readonly nepali: "मध्यविन्दु";
}, {
    readonly roman: "Bungdikali";
    readonly nepali: "बौदीकाली";
}, {
    readonly roman: "Bulingtar";
    readonly nepali: "बुलिङटार";
}, {
    readonly roman: "Binaie";
    readonly nepali: "बिनयी";
}, {
    readonly roman: "Hupsekot";
    readonly nepali: "हुप्सेकोट";
}, {
    readonly roman: "Kushma";
    readonly nepali: "कुश्मा";
}, {
    readonly roman: "Phalewas";
    readonly nepali: "फलेवास";
}, {
    readonly roman: "Jaljala";
    readonly nepali: "जलजला";
}, {
    readonly roman: "paiyu";
    readonly nepali: "पैयूं";
}, {
    readonly roman: "Mahashila";
    readonly nepali: "महाशिला";
}, {
    readonly roman: "Modi";
    readonly nepali: "मोदी";
}, {
    readonly roman: "Bihadi";
    readonly nepali: "विहादी";
}, {
    readonly roman: "Galyang";
    readonly nepali: "गल्याङ";
}, {
    readonly roman: "Chapkot";
    readonly nepali: "चापाकोट";
}, {
    readonly roman: "Putalibazar";
    readonly nepali: "पुतलीबजार";
}, {
    readonly roman: "Virkot";
    readonly nepali: "विरकोट";
}, {
    readonly roman: "Waling";
    readonly nepali: "वालिङ";
}, {
    readonly roman: "Arjunchaupari";
    readonly nepali: "अर्जुनचौपरी";
}, {
    readonly roman: "Aadhikhola";
    readonly nepali: "आँधिखोला";
}, {
    readonly roman: "Kaligandaki";
    readonly nepali: "कालीगण्डकी";
}, {
    readonly roman: "Fedikhola";
    readonly nepali: "फेदीखोला";
}, {
    readonly roman: "Biruwa";
    readonly nepali: "बिरुवा";
}, {
    readonly roman: "Harinas";
    readonly nepali: "हरिनास";
}, {
    readonly roman: "Bhanu";
    readonly nepali: "भानु";
}, {
    readonly roman: "Bhimad";
    readonly nepali: "भिमाद";
}, {
    readonly roman: "Byas";
    readonly nepali: "व्यास";
}, {
    readonly roman: "Shuklagandaki";
    readonly nepali: "शुक्लागण्डकी";
}, {
    readonly roman: "Ambukhaireni";
    readonly nepali: "आँबुखैरेनी";
}, {
    readonly roman: "Rhishing";
    readonly nepali: "ऋषिङ्ग";
}, {
    readonly roman: "Ghiring";
    readonly nepali: "घिरिङ";
}, {
    readonly roman: "Devghat";
    readonly nepali: "देवघाट";
}, {
    readonly roman: "Myagdi";
    readonly nepali: "म्याग्दी";
}, {
    readonly roman: "Bandipur";
    readonly nepali: "बन्दिपुर";
}, {
    readonly roman: "Sandhikharka";
    readonly nepali: "सन्धिखर्क";
}, {
    readonly roman: "Sitganga";
    readonly nepali: "शितगंगाा";
}, {
    readonly roman: "Bhumikasthan";
    readonly nepali: "भुमिकास्थान";
}, {
    readonly roman: "Chhatradev";
    readonly nepali: "छत्रदेव";
}, {
    readonly roman: "Pandini";
    readonly nepali: "पाणिनी";
}, {
    readonly roman: "Malarani";
    readonly nepali: "मालारानी";
}, {
    readonly roman: "Nepalgunj";
    readonly nepali: "नेपालगञ्ज";
}, {
    readonly roman: "Koholpur";
    readonly nepali: "कोहोलपुर";
}, {
    readonly roman: "Narainapur";
    readonly nepali: "नरैनापुर";
}, {
    readonly roman: "Raptisonari";
    readonly nepali: "राप्तीसोनारीी";
}, {
    readonly roman: "Baijanath";
    readonly nepali: "बैजनाथ";
}, {
    readonly roman: "Khajura";
    readonly nepali: "खजुरा";
}, {
    readonly roman: "Duduwa";
    readonly nepali: "डुडुवाा";
}, {
    readonly roman: "Janaki";
    readonly nepali: "जानकी";
}, {
    readonly roman: "Gulariya";
    readonly nepali: "गुलरिया";
}, {
    readonly roman: "Madhuban";
    readonly nepali: "मधुवन";
}, {
    readonly roman: "Rajapur";
    readonly nepali: "राजापुर";
}, {
    readonly roman: "Thakurbaba";
    readonly nepali: "ठाकुरबाबा";
}, {
    readonly roman: "Bansgadhi";
    readonly nepali: "बाँसगढी";
}, {
    readonly roman: "Barbardiya";
    readonly nepali: "बारबर्दिया";
}, {
    readonly roman: "Badhaiyatal";
    readonly nepali: "बढैयाताल";
}, {
    readonly roman: "Geruwa";
    readonly nepali: "गेरुवा";
}, {
    readonly roman: "Tulsipur";
    readonly nepali: "तुल्सीपुर";
}, {
    readonly roman: "Ghorahi";
    readonly nepali: "घोराही";
}, {
    readonly roman: "Lamahi";
    readonly nepali: "लमही";
}, {
    readonly roman: "Bangalichuli";
    readonly nepali: "बंगलाचुली";
}, {
    readonly roman: "Dangisaran";
    readonly nepali: "दंगीशरण";
}, {
    readonly roman: "Gadhawa";
    readonly nepali: "गढवा";
}, {
    readonly roman: "Rajpur";
    readonly nepali: "राजपुर";
}, {
    readonly roman: "Rapti";
    readonly nepali: "राप्ती";
}, {
    readonly roman: "Santinagar";
    readonly nepali: "शान्तिनगर";
}, {
    readonly roman: "Babai";
    readonly nepali: "बबई";
}, {
    readonly roman: "Musikot";
    readonly nepali: "मुसिकोट";
}, {
    readonly roman: "Resunga";
    readonly nepali: "रेसुंगा";
}, {
    readonly roman: "Ishma";
    readonly nepali: "इस्मा";
}, {
    readonly roman: "Kaligandaki";
    readonly nepali: "कालीगण्डकी";
}, {
    readonly roman: "Gulmidarbar";
    readonly nepali: "गुल्मीदरबार";
}, {
    readonly roman: "Satyawoti";
    readonly nepali: "सत्यवती";
}, {
    readonly roman: "Chandrakot";
    readonly nepali: "चन्द्रकोट";
}, {
    readonly roman: "Ruru";
    readonly nepali: "रुरु";
}, {
    readonly roman: "Chhatrakot";
    readonly nepali: "छत्रकोट";
}, {
    readonly roman: "Dhurkot";
    readonly nepali: "धुर्कोट";
}, {
    readonly roman: "Madane";
    readonly nepali: "मदाने";
}, {
    readonly roman: "Malika";
    readonly nepali: "मालिका";
}, {
    readonly roman: "Kapilvastu";
    readonly nepali: "कपिलवस्तु";
}, {
    readonly roman: "Buddhabhumi";
    readonly nepali: "बुद्धभुमी";
}, {
    readonly roman: "Shivaraj";
    readonly nepali: "शिवराज";
}, {
    readonly roman: "Maharajgang";
    readonly nepali: "महाराजगञ्ज";
}, {
    readonly roman: "Krishnanagar";
    readonly nepali: "कृष्णनगर";
}, {
    readonly roman: "Bandganga";
    readonly nepali: "बाणगंगा";
}, {
    readonly roman: "Mayadevi";
    readonly nepali: "मायादेवी";
}, {
    readonly roman: "Yesodhara";
    readonly nepali: "यसोधरा";
}, {
    readonly roman: "Bijayanagar";
    readonly nepali: "विजयनगर";
}, {
    readonly roman: "Suddhodhan";
    readonly nepali: "शुद्धोधन";
}, {
    readonly roman: "Sarawal";
    readonly nepali: "सरावल";
}, {
    readonly roman: "Ramgram";
    readonly nepali: "रामग्राम";
}, {
    readonly roman: "Sunwal";
    readonly nepali: "सुनवल";
}, {
    readonly roman: "Tribenisusta";
    readonly nepali: "ट्रिबेनिसुस्ता";
}, {
    readonly roman: "Palhinandan";
    readonly nepali: "पाल्हीनन्दन";
}, {
    readonly roman: "Pratappur";
    readonly nepali: "प्रतापपुर";
}, {
    readonly roman: "Bardghat";
    readonly nepali: "बर्दघाट";
}, {
    readonly roman: "Rampur";
    readonly nepali: "रामपुर";
}, {
    readonly roman: "Tansen";
    readonly nepali: "तानसेन";
}, {
    readonly roman: "Nisdi";
    readonly nepali: "निस्दी";
}, {
    readonly roman: "Purbakhola";
    readonly nepali: "पूर्वखोला";
}, {
    readonly roman: "Rambha";
    readonly nepali: "रम्भा";
}, {
    readonly roman: "Mathagadi";
    readonly nepali: "माथागढी";
}, {
    readonly roman: "Tinau";
    readonly nepali: "तिनाउ";
}, {
    readonly roman: "Baganaskali";
    readonly nepali: "बगनासकाली";
}, {
    readonly roman: "Ribdikot";
    readonly nepali: "रिब्दीकोट";
}, {
    readonly roman: "Rainadevi Chhahara";
    readonly nepali: "रैनादेवी छहरा";
}, {
    readonly roman: "Rolpa";
    readonly nepali: "रोल्पा";
}, {
    readonly roman: "Tribeni";
    readonly nepali: "त्रिवेणी";
}, {
    readonly roman: "Duikholi";
    readonly nepali: "दुईखोली";
}, {
    readonly roman: "Madi";
    readonly nepali: "माडी";
}, {
    readonly roman: "Runtigadhi";
    readonly nepali: "रुन्टीगढी";
}, {
    readonly roman: "Lungri";
    readonly nepali: "लुङग्री";
}, {
    readonly roman: "Sukidaha";
    readonly nepali: "सुकिदह";
}, {
    readonly roman: "Sunchhahari";
    readonly nepali: "सुनछहरी";
}, {
    readonly roman: "Subarnawoti";
    readonly nepali: "सुवर्णवती";
}, {
    readonly roman: "Thabang";
    readonly nepali: "थबाङ";
}, {
    readonly roman: "Putha Uttarganga";
    readonly nepali: "पुथा उत्तरगंगा";
}, {
    readonly roman: "Bhume";
    readonly nepali: "भूमे";
}, {
    readonly roman: "Sisne";
    readonly nepali: "सिस्ने";
}, {
    readonly roman: "Butwal";
    readonly nepali: "बुटवल";
}, {
    readonly roman: "Lumbini Saskritik";
    readonly nepali: "लुम्बिनी सांस्कृतिक";
}, {
    readonly roman: "Sidharthanager";
    readonly nepali: "सिद्धार्थनगर";
}, {
    readonly roman: "Sammarimai";
    readonly nepali: "सम्मरीमाई";
}, {
    readonly roman: "Debdaha";
    readonly nepali: "देवदह";
}, {
    readonly roman: "Sainamaina";
    readonly nepali: "सैनामैना";
}, {
    readonly roman: "Tilottma";
    readonly nepali: "तिलोत्तमा";
}, {
    readonly roman: "Siyari";
    readonly nepali: "सियारी";
}, {
    readonly roman: "Gaidahawa";
    readonly nepali: "गैडहवा";
}, {
    readonly roman: "Kanchan";
    readonly nepali: "कन्चन";
}, {
    readonly roman: "Kotahimai";
    readonly nepali: "कोटहीमाई";
}, {
    readonly roman: "Marchawari";
    readonly nepali: "मर्चवारी";
}, {
    readonly roman: "Mayadevi";
    readonly nepali: "मायादेवी";
}, {
    readonly roman: "Omsatiya";
    readonly nepali: "ओमसतिया";
}, {
    readonly roman: "Rohindi";
    readonly nepali: "रोहिणी";
}, {
    readonly roman: "Suddodhan";
    readonly nepali: "शुद्धोधन";
}, {
    readonly roman: "Narayan";
    readonly nepali: "नारायण";
}, {
    readonly roman: "Dullu";
    readonly nepali: "दुल्लु";
}, {
    readonly roman: "Chamunda Bindrasaini";
    readonly nepali: "चामुण्डा बिन्द्रासैनी";
}, {
    readonly roman: "Aathbis";
    readonly nepali: "आठबीस";
}, {
    readonly roman: "Bhagawatimai";
    readonly nepali: "भगवतीमाई";
}, {
    readonly roman: "Gurash";
    readonly nepali: "गुराँस";
}, {
    readonly roman: "Dungeshwar";
    readonly nepali: "डुंगेश्वर";
}, {
    readonly roman: "Naumule";
    readonly nepali: "नौमुले";
}, {
    readonly roman: "Mahabu";
    readonly nepali: "महाबु";
}, {
    readonly roman: "Bhairabi";
    readonly nepali: "भैरवी";
}, {
    readonly roman: "Thatikadh";
    readonly nepali: "ठाँटीकाँध";
}, {
    readonly roman: "Thuli veri";
    readonly nepali: "ठूलीभेरी";
}, {
    readonly roman: "Tripurasundari";
    readonly nepali: "त्रिपुरासुन्दरी";
}, {
    readonly roman: "Dolpa buddha";
    readonly nepali: "डोल्पा बुद्ध";
}, {
    readonly roman: "She phoksundo";
    readonly nepali: "शे फोक्सुन्डो";
}, {
    readonly roman: "Jagdulla";
    readonly nepali: "जगदुल्ला";
}, {
    readonly roman: "Mudkechula";
    readonly nepali: "मुड्केचुला";
}, {
    readonly roman: "Kaike";
    readonly nepali: "काइके";
}, {
    readonly roman: "Chharka tangsong";
    readonly nepali: "छार्का ताङसोङ";
}, {
    readonly roman: "Simkot";
    readonly nepali: "सिमकोट";
}, {
    readonly roman: "Namkha";
    readonly nepali: "नाम्खा";
}, {
    readonly roman: "kharpunath";
    readonly nepali: "खार्पुनाथ";
}, {
    readonly roman: "Surkegad";
    readonly nepali: "सर्केगाड";
}, {
    readonly roman: "Chankheli";
    readonly nepali: "चंखेली";
}, {
    readonly roman: "Adanchuli";
    readonly nepali: "अदानचुली";
}, {
    readonly roman: "Tajakot";
    readonly nepali: "ताँजाकोट";
}, {
    readonly roman: "Veri";
    readonly nepali: "भेरी";
}, {
    readonly roman: "Chhedagad";
    readonly nepali: "छेडागाड";
}, {
    readonly roman: "Tribeni nalgad";
    readonly nepali: "त्रिवेणी नलगाड";
}, {
    readonly roman: "Kuse";
    readonly nepali: "कुसे";
}, {
    readonly roman: "Junichande";
    readonly nepali: "जुनीचाँदे";
}, {
    readonly roman: "Barekot";
    readonly nepali: "बारेकोट";
}, {
    readonly roman: "Shibalaya";
    readonly nepali: "शिवालय";
}, {
    readonly roman: "Chandannath";
    readonly nepali: "चन्दननाथ";
}, {
    readonly roman: "Kankasundari";
    readonly nepali: "कनकासुन्दरी";
}, {
    readonly roman: "Sinja";
    readonly nepali: "सिंजा";
}, {
    readonly roman: "Hima";
    readonly nepali: "हिमा";
}, {
    readonly roman: "Tila";
    readonly nepali: "तिला";
}, {
    readonly roman: "Guthichaur";
    readonly nepali: "गुठीचौर";
}, {
    readonly roman: "Tatopani";
    readonly nepali: "तातोपानी";
}, {
    readonly roman: "Patarasi";
    readonly nepali: "पातारासी";
}, {
    readonly roman: "Khadachakra";
    readonly nepali: "खाँडाचक्र";
}, {
    readonly roman: "Raskot";
    readonly nepali: "रास्कोट";
}, {
    readonly roman: "Tilagupha";
    readonly nepali: "तिलागुफा";
}, {
    readonly roman: "Pachaljharana";
    readonly nepali: "पाचलझरना";
}, {
    readonly roman: "Sanni tribeni";
    readonly nepali: "सान्नी त्रिवेणी";
}, {
    readonly roman: "Naraharinath";
    readonly nepali: "नरहरीनाथ";
}, {
    readonly roman: "Kalika";
    readonly nepali: "कालिका";
}, {
    readonly roman: "Mahabai";
    readonly nepali: "महावै";
}, {
    readonly roman: "Palata";
    readonly nepali: "पलाता";
}, {
    readonly roman: "Musikot";
    readonly nepali: "मुसिकोट";
}, {
    readonly roman: "Chaurjahari";
    readonly nepali: "चौरजहारी";
}, {
    readonly roman: "Aathabiskot";
    readonly nepali: "आठबिसकोट";
}, {
    readonly roman: "Baphikot";
    readonly nepali: "बाँफिकोट";
}, {
    readonly roman: "Tribeni";
    readonly nepali: "त्रिवेणी";
}, {
    readonly roman: "Sanibheri";
    readonly nepali: "सानीभेरी";
}, {
    readonly roman: "Sarada";
    readonly nepali: "शारदा";
}, {
    readonly roman: "Bagchaur";
    readonly nepali: "बागचौर";
}, {
    readonly roman: "Bangad";
    readonly nepali: "बनगाँड";
}, {
    readonly roman: "Kalimati";
    readonly nepali: "कालिमाटी";
}, {
    readonly roman: "Tribeni";
    readonly nepali: "त्रिवेणी";
}, {
    readonly roman: "Kapurkot";
    readonly nepali: "कपुरकोट";
}, {
    readonly roman: "Chhatreswori";
    readonly nepali: "छत्रेश्वरी";
}, {
    readonly roman: "Dhorchaur";
    readonly nepali: "ढोरचौर";
}, {
    readonly roman: "Kumakhamalika";
    readonly nepali: "कुमाखमालिका";
}, {
    readonly roman: "Darma";
    readonly nepali: "दार्मा";
}, {
    readonly roman: "Birendra";
    readonly nepali: "बीरेन्द्र";
}, {
    readonly roman: "Bheriganga";
    readonly nepali: "भेरीगंगा";
}, {
    readonly roman: "Gurbhakot";
    readonly nepali: "गुर्भाकोट";
}, {
    readonly roman: "Pabchapuri";
    readonly nepali: "पञ्चपुरी";
}, {
    readonly roman: "Lekbesi";
    readonly nepali: "लेकबेसी";
}, {
    readonly roman: "Chaukune";
    readonly nepali: "चौकुने";
}, {
    readonly roman: "Barahatal";
    readonly nepali: "बराहताल";
}, {
    readonly roman: "Chingad";
    readonly nepali: "चिङ्गाड";
}, {
    readonly roman: "Simta";
    readonly nepali: "सिम्ता";
}, {
    readonly roman: "Mangalsen";
    readonly nepali: "मंगलसेन";
}, {
    readonly roman: "Kamalbajar";
    readonly nepali: "कमलबजार";
}, {
    readonly roman: "Sanphebagar";
    readonly nepali: "साँफेवगर";
}, {
    readonly roman: "Panchadewal Binayak";
    readonly nepali: "पंचदेवल विनायक";
}, {
    readonly roman: "Chaurpati";
    readonly nepali: "चौरपाटी";
}, {
    readonly roman: "Mellekh";
    readonly nepali: "मेल्लेख";
}, {
    readonly roman: "Bannigadi Jayagadh";
    readonly nepali: "बान्नीगढी जयगढ";
}, {
    readonly roman: "Ramaroshan";
    readonly nepali: "रामारोशन";
}, {
    readonly roman: "Dhakari";
    readonly nepali: "ढकारी";
}, {
    readonly roman: "Turmakhad";
    readonly nepali: "तुर्माखाँद";
}, {
    readonly roman: "Dashrathachanda";
    readonly nepali: "दशरथचन्द";
}, {
    readonly roman: "Patan";
    readonly nepali: "पाटन";
}, {
    readonly roman: "Melauli";
    readonly nepali: "मेलौली";
}, {
    readonly roman: "Purchaudi";
    readonly nepali: "पुर्चौडी";
}, {
    readonly roman: "Surnaya";
    readonly nepali: "सुर्नया";
}, {
    readonly roman: "Sisag";
    readonly nepali: "सिगास";
}, {
    readonly roman: "Shivanath";
    readonly nepali: "शिवनाथ";
}, {
    readonly roman: "Pancheshwar";
    readonly nepali: "पंचेश्वर";
}, {
    readonly roman: "Dogdakedar";
    readonly nepali: "दोगडाकेदार";
}, {
    readonly roman: "Dilasaini";
    readonly nepali: "डीलासैनी";
}, {
    readonly roman: "jayaprithvi";
    readonly nepali: "जयपृथ्वी";
}, {
    readonly roman: "Bungal";
    readonly nepali: "बुंगल";
}, {
    readonly roman: "Talkot";
    readonly nepali: "तालकोट";
}, {
    readonly roman: "Masta";
    readonly nepali: "मष्टा";
}, {
    readonly roman: "Khaptadchhanna";
    readonly nepali: "खप्तडछान्ना";
}, {
    readonly roman: "Thalara";
    readonly nepali: "थलारा";
}, {
    readonly roman: "Bitthadchir";
    readonly nepali: "वित्थडचिर";
}, {
    readonly roman: "Surma";
    readonly nepali: "सूर्मा";
}, {
    readonly roman: "Chhabispathibhera";
    readonly nepali: "छबिसपाथिभेरा";
}, {
    readonly roman: "Durgathali";
    readonly nepali: "दुर्गाथली";
}, {
    readonly roman: "Kedarsyun";
    readonly nepali: "केदारस्युँ";
}, {
    readonly roman: "Kanda";
    readonly nepali: "काण्ड";
}, {
    readonly roman: "Badimalika";
    readonly nepali: "बडिमालिका";
}, {
    readonly roman: "Tribeni";
    readonly nepali: "त्रिवेणी";
}, {
    readonly roman: "Budhiganga";
    readonly nepali: "बुढीगंगा";
}, {
    readonly roman: "Budhinanda";
    readonly nepali: "बुढीनन्दा";
}, {
    readonly roman: "Gaumun";
    readonly nepali: "गौमुल";
}, {
    readonly roman: "Pandav";
    readonly nepali: "पाण्डव";
}, {
    readonly roman: "Swamikartik";
    readonly nepali: "स्वामीकार्तिक";
}, {
    readonly roman: "Chhededaha";
    readonly nepali: "छेडेदह";
}, {
    readonly roman: "Himali";
    readonly nepali: "हिमाली";
}, {
    readonly roman: "Amargadhi";
    readonly nepali: "अमरगढी";
}, {
    readonly roman: "Parsuram";
    readonly nepali: "परशुराम";
}, {
    readonly roman: "Aalital";
    readonly nepali: "आलिताल";
}, {
    readonly roman: "Bhageshwar";
    readonly nepali: "भागेश्वर";
}, {
    readonly roman: "nabadurga";
    readonly nepali: "नवदुर्गा";
}, {
    readonly roman: "Ajayameru";
    readonly nepali: "अजयमेरु";
}, {
    readonly roman: "Ganyapdhura";
    readonly nepali: "गन्यापधुरा";
}, {
    readonly roman: "Mahakali";
    readonly nepali: "महाकाली";
}, {
    readonly roman: "Shailyashikar";
    readonly nepali: "शैल्यशिखर";
}, {
    readonly roman: "Malikarjun";
    readonly nepali: "मालिकार्जुन";
}, {
    readonly roman: "Apihimal";
    readonly nepali: "अपिहिमाल";
}, {
    readonly roman: "Duhu";
    readonly nepali: "दुहुँ";
}, {
    readonly roman: "Naugad";
    readonly nepali: "नौगाड";
}, {
    readonly roman: "Marma";
    readonly nepali: "मार्मा";
}, {
    readonly roman: "Lekam";
    readonly nepali: "लेकम";
}, {
    readonly roman: "Byash";
    readonly nepali: "व्याँस";
}, {
    readonly roman: "Dipayal siladhi";
    readonly nepali: "दिपायल सिलगढी";
}, {
    readonly roman: "Shikhar";
    readonly nepali: "शिखर";
}, {
    readonly roman: "Purbichauki";
    readonly nepali: "पूर्वीचौकी";
}, {
    readonly roman: "Badikedar";
    readonly nepali: "बडीकेदार";
}, {
    readonly roman: "Jorayal";
    readonly nepali: "जोरायल";
}, {
    readonly roman: "Sayal";
    readonly nepali: "सायल";
}, {
    readonly roman: "Aadarsh";
    readonly nepali: "आदर्श";
}, {
    readonly roman: "K.I.Singh";
    readonly nepali: "के.आई.सिंह";
}, {
    readonly roman: "Bogatan";
    readonly nepali: "बोगाटन";
}, {
    readonly roman: "Dhangadhi";
    readonly nepali: "धनगढी";
}, {
    readonly roman: "Tikapur";
    readonly nepali: "टिकापुर";
}, {
    readonly roman: "Ghodaghodi";
    readonly nepali: "घोडाघोडी";
}, {
    readonly roman: "Lamkichuha";
    readonly nepali: "लम्किचुहा";
}, {
    readonly roman: "bhajani";
    readonly nepali: "भजनी";
}, {
    readonly roman: "Godawari";
    readonly nepali: "गोदावरी";
}, {
    readonly roman: "Gauriganga";
    readonly nepali: "गौरीगंगा";
}, {
    readonly roman: "Janaki";
    readonly nepali: "जानकी";
}, {
    readonly roman: "Bardagoriya";
    readonly nepali: "बर्दगोरिया";
}, {
    readonly roman: "Mohanyal";
    readonly nepali: "मोहन्याल";
}, {
    readonly roman: "Kailari";
    readonly nepali: "कैलारी";
}, {
    readonly roman: "Joshipur";
    readonly nepali: "जोशीपुर";
}, {
    readonly roman: "Chure";
    readonly nepali: "चुरे";
}, {
    readonly roman: "bhimdatta";
    readonly nepali: "भिमदत्त";
}, {
    readonly roman: "Punarbas";
    readonly nepali: "पुनर्वास";
}, {
    readonly roman: "Bedkot";
    readonly nepali: "बेदकोट";
}, {
    readonly roman: "Mahakali";
    readonly nepali: "महाकाली";
}, {
    readonly roman: "Shuklaphata";
    readonly nepali: "शुक्लाफाँट";
}, {
    readonly roman: "Belauri";
    readonly nepali: "बेलौरी";
}, {
    readonly roman: "Krishnapur";
    readonly nepali: "कृष्णपुर";
}, {
    readonly roman: "Beldandi";
    readonly nepali: "बेलडाँडी";
}, {
    readonly roman: "Laljhadi";
    readonly nepali: "लालझाडी";
}, {
    readonly roman: "k";
    readonly nepali: "क्";
}, {
    readonly roman: "kh";
    readonly nepali: "ख्";
}, {
    readonly roman: "g";
    readonly nepali: "ग्";
}, {
    readonly roman: "gh";
    readonly nepali: "घ्";
}, {
    readonly roman: "n";
    readonly nepali: "ङ्";
}, {
    readonly roman: "ch";
    readonly nepali: "च्";
}, {
    readonly roman: "chh";
    readonly nepali: "छ्";
}, {
    readonly roman: "j";
    readonly nepali: "ज्";
}, {
    readonly roman: "jh";
    readonly nepali: "झ्";
}, {
    readonly roman: "n";
    readonly nepali: "ञ्";
}, {
    readonly roman: "t";
    readonly nepali: "ट्";
}, {
    readonly roman: "th";
    readonly nepali: "ठ्";
}, {
    readonly roman: "d";
    readonly nepali: "ड्";
}, {
    readonly roman: "dh";
    readonly nepali: "ढ्";
}, {
    readonly roman: "n";
    readonly nepali: "ण्";
}, {
    readonly roman: "t";
    readonly nepali: "त्";
}, {
    readonly roman: "th";
    readonly nepali: "थ्";
}, {
    readonly roman: "d";
    readonly nepali: "द्";
}, {
    readonly roman: "dh";
    readonly nepali: "ध्";
}, {
    readonly roman: "n";
    readonly nepali: "न्";
}, {
    readonly roman: "p";
    readonly nepali: "प्";
}, {
    readonly roman: "ph";
    readonly nepali: "फ्";
}, {
    readonly roman: "b";
    readonly nepali: "ब्";
}, {
    readonly roman: "bh";
    readonly nepali: "भ्";
}, {
    readonly roman: "m";
    readonly nepali: "म्";
}, {
    readonly roman: "y";
    readonly nepali: "य्";
}, {
    readonly roman: "r";
    readonly nepali: "र्";
}, {
    readonly roman: "l";
    readonly nepali: "ल्";
}, {
    readonly roman: "w";
    readonly nepali: "व्";
}, {
    readonly roman: "s";
    readonly nepali: "श्";
}, {
    readonly roman: "s";
    readonly nepali: "ष्";
}, {
    readonly roman: "s";
    readonly nepali: "स्";
}, {
    readonly roman: "h";
    readonly nepali: "ह्";
}, {
    readonly roman: "श";
    readonly nepali: "ष";
}, {
    readonly roman: "ka";
    readonly nepali: "का";
}, {
    readonly roman: "ko";
    readonly nepali: "को";
}, {
    readonly roman: "kau";
    readonly nepali: "कौ";
}, {
    readonly roman: "ki";
    readonly nepali: "कि";
}, {
    readonly roman: "ki";
    readonly nepali: "की";
}, {
    readonly roman: "ku";
    readonly nepali: "कु";
}, {
    readonly roman: "ku";
    readonly nepali: "कू";
}, {
    readonly roman: "ke";
    readonly nepali: "के";
}, {
    readonly roman: "kai";
    readonly nepali: "कै";
}, {
    readonly roman: "kum";
    readonly nepali: "कं";
}, {
    readonly roman: "kha";
    readonly nepali: "खा";
}, {
    readonly roman: "kho";
    readonly nepali: "खो";
}, {
    readonly roman: "khau";
    readonly nepali: "खौ";
}, {
    readonly roman: "khi";
    readonly nepali: "खि";
}, {
    readonly roman: "khi";
    readonly nepali: "खी";
}, {
    readonly roman: "khu";
    readonly nepali: "खु";
}, {
    readonly roman: "khu";
    readonly nepali: "खू";
}, {
    readonly roman: "khe";
    readonly nepali: "खे";
}, {
    readonly roman: "khai";
    readonly nepali: "खै";
}, {
    readonly roman: "khum";
    readonly nepali: "खं";
}, {
    readonly roman: "ga";
    readonly nepali: "गा";
}, {
    readonly roman: "go";
    readonly nepali: "गो";
}, {
    readonly roman: "gau";
    readonly nepali: "गौ";
}, {
    readonly roman: "gi";
    readonly nepali: "गि";
}, {
    readonly roman: "gi";
    readonly nepali: "गी";
}, {
    readonly roman: "gu";
    readonly nepali: "गु";
}, {
    readonly roman: "gu";
    readonly nepali: "गू";
}, {
    readonly roman: "ge";
    readonly nepali: "गे";
}, {
    readonly roman: "gai";
    readonly nepali: "गै";
}, {
    readonly roman: "gum";
    readonly nepali: "गं";
}, {
    readonly roman: "gha";
    readonly nepali: "घा";
}, {
    readonly roman: "gho";
    readonly nepali: "घो";
}, {
    readonly roman: "ghau";
    readonly nepali: "घौ";
}, {
    readonly roman: "ghi";
    readonly nepali: "घि";
}, {
    readonly roman: "ghi";
    readonly nepali: "घी";
}, {
    readonly roman: "ghu";
    readonly nepali: "घु";
}, {
    readonly roman: "ghu";
    readonly nepali: "घू";
}, {
    readonly roman: "ghe";
    readonly nepali: "घे";
}, {
    readonly roman: "ghai";
    readonly nepali: "घै";
}, {
    readonly roman: "ghum";
    readonly nepali: "घं";
}, {
    readonly roman: "na";
    readonly nepali: "ङा";
}, {
    readonly roman: "no";
    readonly nepali: "ङो";
}, {
    readonly roman: "nau";
    readonly nepali: "ङौ";
}, {
    readonly roman: "ni";
    readonly nepali: "ङि";
}, {
    readonly roman: "ni";
    readonly nepali: "ङी";
}, {
    readonly roman: "nu";
    readonly nepali: "ङु";
}, {
    readonly roman: "nu";
    readonly nepali: "ङू";
}, {
    readonly roman: "ne";
    readonly nepali: "ङे";
}, {
    readonly roman: "nai";
    readonly nepali: "ङै";
}, {
    readonly roman: "num";
    readonly nepali: "ङं";
}, {
    readonly roman: "cha";
    readonly nepali: "चा";
}, {
    readonly roman: "cho";
    readonly nepali: "चो";
}, {
    readonly roman: "chau";
    readonly nepali: "चौ";
}, {
    readonly roman: "chi";
    readonly nepali: "चि";
}, {
    readonly roman: "chi";
    readonly nepali: "ची";
}, {
    readonly roman: "chu";
    readonly nepali: "चु";
}, {
    readonly roman: "chu";
    readonly nepali: "चू";
}, {
    readonly roman: "che";
    readonly nepali: "चे";
}, {
    readonly roman: "chai";
    readonly nepali: "चै";
}, {
    readonly roman: "chum";
    readonly nepali: "चं";
}, {
    readonly roman: "chha";
    readonly nepali: "छा";
}, {
    readonly roman: "chho";
    readonly nepali: "छो";
}, {
    readonly roman: "chhau";
    readonly nepali: "छौ";
}, {
    readonly roman: "chhi";
    readonly nepali: "छि";
}, {
    readonly roman: "chhi";
    readonly nepali: "छी";
}, {
    readonly roman: "chhu";
    readonly nepali: "छु";
}, {
    readonly roman: "chhu";
    readonly nepali: "छू";
}, {
    readonly roman: "chhe";
    readonly nepali: "छे";
}, {
    readonly roman: "chhai";
    readonly nepali: "छै";
}, {
    readonly roman: "chhum";
    readonly nepali: "छं";
}, {
    readonly roman: "ja";
    readonly nepali: "जा";
}, {
    readonly roman: "jo";
    readonly nepali: "जो";
}, {
    readonly roman: "jau";
    readonly nepali: "जौ";
}, {
    readonly roman: "ji";
    readonly nepali: "जि";
}, {
    readonly roman: "ji";
    readonly nepali: "जी";
}, {
    readonly roman: "ju";
    readonly nepali: "जु";
}, {
    readonly roman: "ju";
    readonly nepali: "जू";
}, {
    readonly roman: "je";
    readonly nepali: "जे";
}, {
    readonly roman: "jai";
    readonly nepali: "जै";
}, {
    readonly roman: "jum";
    readonly nepali: "जं";
}, {
    readonly roman: "jha";
    readonly nepali: "झा";
}, {
    readonly roman: "jho";
    readonly nepali: "झो";
}, {
    readonly roman: "jhau";
    readonly nepali: "झौ";
}, {
    readonly roman: "jhi";
    readonly nepali: "झि";
}, {
    readonly roman: "jhi";
    readonly nepali: "झी";
}, {
    readonly roman: "jhu";
    readonly nepali: "झु";
}, {
    readonly roman: "jhu";
    readonly nepali: "झू";
}, {
    readonly roman: "jhe";
    readonly nepali: "झे";
}, {
    readonly roman: "jhai";
    readonly nepali: "झै";
}, {
    readonly roman: "jhum";
    readonly nepali: "झं";
}, {
    readonly roman: "na";
    readonly nepali: "ञा";
}, {
    readonly roman: "no";
    readonly nepali: "ञो";
}, {
    readonly roman: "nau";
    readonly nepali: "ञौ";
}, {
    readonly roman: "ni";
    readonly nepali: "ञि";
}, {
    readonly roman: "ni";
    readonly nepali: "ञी";
}, {
    readonly roman: "nu";
    readonly nepali: "ञु";
}, {
    readonly roman: "nu";
    readonly nepali: "ञू";
}, {
    readonly roman: "ne";
    readonly nepali: "ञे";
}, {
    readonly roman: "nai";
    readonly nepali: "ञै";
}, {
    readonly roman: "num";
    readonly nepali: "ञं";
}, {
    readonly roman: "ta";
    readonly nepali: "टा";
}, {
    readonly roman: "to";
    readonly nepali: "टो";
}, {
    readonly roman: "tau";
    readonly nepali: "टौ";
}, {
    readonly roman: "ti";
    readonly nepali: "टि";
}, {
    readonly roman: "ti";
    readonly nepali: "टी";
}, {
    readonly roman: "tu";
    readonly nepali: "टु";
}, {
    readonly roman: "tu";
    readonly nepali: "टू";
}, {
    readonly roman: "te";
    readonly nepali: "टे";
}, {
    readonly roman: "tai";
    readonly nepali: "टै";
}, {
    readonly roman: "tum";
    readonly nepali: "टं";
}, {
    readonly roman: "tha";
    readonly nepali: "ठा";
}, {
    readonly roman: "tho";
    readonly nepali: "ठो";
}, {
    readonly roman: "thau";
    readonly nepali: "ठौ";
}, {
    readonly roman: "thi";
    readonly nepali: "ठि";
}, {
    readonly roman: "thi";
    readonly nepali: "ठी";
}, {
    readonly roman: "thu";
    readonly nepali: "ठु";
}, {
    readonly roman: "thu";
    readonly nepali: "ठू";
}, {
    readonly roman: "the";
    readonly nepali: "ठे";
}, {
    readonly roman: "thai";
    readonly nepali: "ठै";
}, {
    readonly roman: "thum";
    readonly nepali: "ठं";
}, {
    readonly roman: "da";
    readonly nepali: "डा";
}, {
    readonly roman: "do";
    readonly nepali: "डो";
}, {
    readonly roman: "dau";
    readonly nepali: "डौ";
}, {
    readonly roman: "di";
    readonly nepali: "डि";
}, {
    readonly roman: "di";
    readonly nepali: "डी";
}, {
    readonly roman: "du";
    readonly nepali: "डु";
}, {
    readonly roman: "du";
    readonly nepali: "डू";
}, {
    readonly roman: "de";
    readonly nepali: "डे";
}, {
    readonly roman: "dai";
    readonly nepali: "डै";
}, {
    readonly roman: "dum";
    readonly nepali: "डं";
}, {
    readonly roman: "dha";
    readonly nepali: "ढा";
}, {
    readonly roman: "dho";
    readonly nepali: "ढो";
}, {
    readonly roman: "dha";
    readonly nepali: "ढौ";
}, {
    readonly roman: "dhi";
    readonly nepali: "ढि";
}, {
    readonly roman: "dhi";
    readonly nepali: "ढी";
}, {
    readonly roman: "dhu";
    readonly nepali: "ढु";
}, {
    readonly roman: "dhu";
    readonly nepali: "ढू";
}, {
    readonly roman: "dhe";
    readonly nepali: "ढे";
}, {
    readonly roman: "dhai";
    readonly nepali: "ढै";
}, {
    readonly roman: "dhum";
    readonly nepali: "ढं";
}, {
    readonly roman: "ta";
    readonly nepali: "ता";
}, {
    readonly roman: "to";
    readonly nepali: "तो";
}, {
    readonly roman: "tau";
    readonly nepali: "तौ";
}, {
    readonly roman: "ti";
    readonly nepali: "ति";
}, {
    readonly roman: "ti";
    readonly nepali: "ती";
}, {
    readonly roman: "tu";
    readonly nepali: "तु";
}, {
    readonly roman: "tu";
    readonly nepali: "तू";
}, {
    readonly roman: "te";
    readonly nepali: "ते";
}, {
    readonly roman: "tai";
    readonly nepali: "तै";
}, {
    readonly roman: "tum";
    readonly nepali: "तं";
}, {
    readonly roman: "tha";
    readonly nepali: "था";
}, {
    readonly roman: "tho";
    readonly nepali: "थो";
}, {
    readonly roman: "thau";
    readonly nepali: "थौ";
}, {
    readonly roman: "thi";
    readonly nepali: "थि";
}, {
    readonly roman: "thi";
    readonly nepali: "थी";
}, {
    readonly roman: "thu";
    readonly nepali: "थु";
}, {
    readonly roman: "thu";
    readonly nepali: "थू";
}, {
    readonly roman: "the";
    readonly nepali: "थे";
}, {
    readonly roman: "thai";
    readonly nepali: "थै";
}, {
    readonly roman: "thum";
    readonly nepali: "थं";
}, {
    readonly roman: "da";
    readonly nepali: "दा";
}, {
    readonly roman: "do";
    readonly nepali: "दो";
}, {
    readonly roman: "dau";
    readonly nepali: "दौ";
}, {
    readonly roman: "di";
    readonly nepali: "दि";
}, {
    readonly roman: "di";
    readonly nepali: "दी";
}, {
    readonly roman: "du";
    readonly nepali: "दु";
}, {
    readonly roman: "du";
    readonly nepali: "दू";
}, {
    readonly roman: "de";
    readonly nepali: "दे";
}, {
    readonly roman: "dai";
    readonly nepali: "दै";
}, {
    readonly roman: "dum";
    readonly nepali: "दं";
}, {
    readonly roman: "dha";
    readonly nepali: "धा";
}, {
    readonly roman: "dho";
    readonly nepali: "धो";
}, {
    readonly roman: "dhau";
    readonly nepali: "धौ";
}, {
    readonly roman: "dhi";
    readonly nepali: "धि";
}, {
    readonly roman: "dhi";
    readonly nepali: "धी";
}, {
    readonly roman: "dhu";
    readonly nepali: "धु";
}, {
    readonly roman: "dhu";
    readonly nepali: "धू";
}, {
    readonly roman: "dhe";
    readonly nepali: "धे";
}, {
    readonly roman: "dhai";
    readonly nepali: "धै";
}, {
    readonly roman: "dhum";
    readonly nepali: "धं";
}, {
    readonly roman: "na";
    readonly nepali: "ना";
}, {
    readonly roman: "no";
    readonly nepali: "नो";
}, {
    readonly roman: "nau";
    readonly nepali: "नौ";
}, {
    readonly roman: "ni";
    readonly nepali: "नि";
}, {
    readonly roman: "ni";
    readonly nepali: "नी";
}, {
    readonly roman: "nu";
    readonly nepali: "नु";
}, {
    readonly roman: "nu";
    readonly nepali: "नू";
}, {
    readonly roman: "ne";
    readonly nepali: "ने";
}, {
    readonly roman: "nai";
    readonly nepali: "नै";
}, {
    readonly roman: "num";
    readonly nepali: "नं";
}, {
    readonly roman: "pa";
    readonly nepali: "पा";
}, {
    readonly roman: "po";
    readonly nepali: "पो";
}, {
    readonly roman: "pau";
    readonly nepali: "पौ";
}, {
    readonly roman: "pi";
    readonly nepali: "पि";
}, {
    readonly roman: "pi";
    readonly nepali: "पी";
}, {
    readonly roman: "pu";
    readonly nepali: "पु";
}, {
    readonly roman: "pu";
    readonly nepali: "पू";
}, {
    readonly roman: "pe";
    readonly nepali: "पे";
}, {
    readonly roman: "pai";
    readonly nepali: "पै";
}, {
    readonly roman: "pum";
    readonly nepali: "पं";
}, {
    readonly roman: "pha";
    readonly nepali: "फा";
}, {
    readonly roman: "pho";
    readonly nepali: "फो";
}, {
    readonly roman: "phau";
    readonly nepali: "फौ";
}, {
    readonly roman: "phi";
    readonly nepali: "फि";
}, {
    readonly roman: "phi";
    readonly nepali: "फी";
}, {
    readonly roman: "phu";
    readonly nepali: "फु";
}, {
    readonly roman: "phu";
    readonly nepali: "फू";
}, {
    readonly roman: "phe";
    readonly nepali: "फे";
}, {
    readonly roman: "phai";
    readonly nepali: "फै";
}, {
    readonly roman: "phum";
    readonly nepali: "फं";
}, {
    readonly roman: "ba";
    readonly nepali: "बा";
}, {
    readonly roman: "bo";
    readonly nepali: "बो";
}, {
    readonly roman: "bau";
    readonly nepali: "बौ";
}, {
    readonly roman: "bi";
    readonly nepali: "बि";
}, {
    readonly roman: "bi";
    readonly nepali: "बी";
}, {
    readonly roman: "bu";
    readonly nepali: "बु";
}, {
    readonly roman: "bu";
    readonly nepali: "बू";
}, {
    readonly roman: "be";
    readonly nepali: "बे";
}, {
    readonly roman: "bai";
    readonly nepali: "बै";
}, {
    readonly roman: "bum";
    readonly nepali: "बं";
}, {
    readonly roman: "bha";
    readonly nepali: "भा";
}, {
    readonly roman: "bho";
    readonly nepali: "भो";
}, {
    readonly roman: "bhau";
    readonly nepali: "भौ";
}, {
    readonly roman: "bhi";
    readonly nepali: "भि";
}, {
    readonly roman: "bhi";
    readonly nepali: "भी";
}, {
    readonly roman: "bhu";
    readonly nepali: "भु";
}, {
    readonly roman: "bhu";
    readonly nepali: "भू";
}, {
    readonly roman: "bhe";
    readonly nepali: "भे";
}, {
    readonly roman: "bhai";
    readonly nepali: "भै";
}, {
    readonly roman: "bhum";
    readonly nepali: "भं";
}, {
    readonly roman: "ma";
    readonly nepali: "मा";
}, {
    readonly roman: "mo";
    readonly nepali: "मो";
}, {
    readonly roman: "mau";
    readonly nepali: "मौ";
}, {
    readonly roman: "mi";
    readonly nepali: "मि";
}, {
    readonly roman: "mi";
    readonly nepali: "मी";
}, {
    readonly roman: "mu";
    readonly nepali: "मु";
}, {
    readonly roman: "mu";
    readonly nepali: "मू";
}, {
    readonly roman: "me";
    readonly nepali: "मे";
}, {
    readonly roman: "mai";
    readonly nepali: "मै";
}, {
    readonly roman: "mum";
    readonly nepali: "मं";
}, {
    readonly roman: "ya";
    readonly nepali: "या";
}, {
    readonly roman: "yo";
    readonly nepali: "यो";
}, {
    readonly roman: "yau";
    readonly nepali: "यौ";
}, {
    readonly roman: "yi";
    readonly nepali: "यि";
}, {
    readonly roman: "yi";
    readonly nepali: "यी";
}, {
    readonly roman: "yu";
    readonly nepali: "यु";
}, {
    readonly roman: "yu";
    readonly nepali: "यू";
}, {
    readonly roman: "ye";
    readonly nepali: "ये";
}, {
    readonly roman: "yai";
    readonly nepali: "यै";
}, {
    readonly roman: "yum";
    readonly nepali: "यं";
}, {
    readonly roman: "ra";
    readonly nepali: "रा";
}, {
    readonly roman: "ro";
    readonly nepali: "रो";
}, {
    readonly roman: "rau";
    readonly nepali: "रौ";
}, {
    readonly roman: "ri";
    readonly nepali: "रि";
}, {
    readonly roman: "ri";
    readonly nepali: "री";
}, {
    readonly roman: "ru";
    readonly nepali: "रु";
}, {
    readonly roman: "ru";
    readonly nepali: "रू";
}, {
    readonly roman: "re";
    readonly nepali: "रे";
}, {
    readonly roman: "rai";
    readonly nepali: "रै";
}, {
    readonly roman: "rum";
    readonly nepali: "रं";
}, {
    readonly roman: "la";
    readonly nepali: "ला";
}, {
    readonly roman: "lo";
    readonly nepali: "लो";
}, {
    readonly roman: "lau";
    readonly nepali: "लौ";
}, {
    readonly roman: "li";
    readonly nepali: "लि";
}, {
    readonly roman: "li";
    readonly nepali: "ली";
}, {
    readonly roman: "lu";
    readonly nepali: "लु";
}, {
    readonly roman: "lu";
    readonly nepali: "लू";
}, {
    readonly roman: "le";
    readonly nepali: "ले";
}, {
    readonly roman: "lai";
    readonly nepali: "लै";
}, {
    readonly roman: "lum";
    readonly nepali: "लं";
}, {
    readonly roman: "wa";
    readonly nepali: "वा";
}, {
    readonly roman: "wo";
    readonly nepali: "वो";
}, {
    readonly roman: "wau";
    readonly nepali: "वौ";
}, {
    readonly roman: "wi";
    readonly nepali: "वि";
}, {
    readonly roman: "wi";
    readonly nepali: "वी";
}, {
    readonly roman: "wu";
    readonly nepali: "वु";
}, {
    readonly roman: "wu";
    readonly nepali: "वू";
}, {
    readonly roman: "we";
    readonly nepali: "वे";
}, {
    readonly roman: "wai";
    readonly nepali: "वै";
}, {
    readonly roman: "wum";
    readonly nepali: "वं";
}, {
    readonly roman: "sha";
    readonly nepali: "शा";
}, {
    readonly roman: "sho";
    readonly nepali: "शो";
}, {
    readonly roman: "shau";
    readonly nepali: "शौ";
}, {
    readonly roman: "shi";
    readonly nepali: "शि";
}, {
    readonly roman: "shi";
    readonly nepali: "शी";
}, {
    readonly roman: "shu";
    readonly nepali: "शु";
}, {
    readonly roman: "shu";
    readonly nepali: "शू";
}, {
    readonly roman: "she";
    readonly nepali: "शे";
}, {
    readonly roman: "shai";
    readonly nepali: "शै";
}, {
    readonly roman: "shum";
    readonly nepali: "शं";
}, {
    readonly roman: "ha";
    readonly nepali: "हा";
}, {
    readonly roman: "ho";
    readonly nepali: "हो";
}, {
    readonly roman: "hau";
    readonly nepali: "हौ";
}, {
    readonly roman: "hi";
    readonly nepali: "हि";
}, {
    readonly roman: "hi";
    readonly nepali: "ही";
}, {
    readonly roman: "hu";
    readonly nepali: "हु";
}, {
    readonly roman: "hu";
    readonly nepali: "हू";
}, {
    readonly roman: "he";
    readonly nepali: "हे";
}, {
    readonly roman: "hai";
    readonly nepali: "है";
}, {
    readonly roman: "hum";
    readonly nepali: "हं";
}, {
    readonly roman: "ka";
    readonly nepali: "क";
}, {
    readonly roman: "kha";
    readonly nepali: "ख";
}, {
    readonly roman: "ga";
    readonly nepali: "ग";
}, {
    readonly roman: "gha";
    readonly nepali: "घ";
}, {
    readonly roman: "na";
    readonly nepali: "ङ";
}, {
    readonly roman: "cha";
    readonly nepali: "च";
}, {
    readonly roman: "chha";
    readonly nepali: "छ";
}, {
    readonly roman: "ja";
    readonly nepali: "ज";
}, {
    readonly roman: "jha";
    readonly nepali: "झ";
}, {
    readonly roman: "na";
    readonly nepali: "ञ";
}, {
    readonly roman: "ta";
    readonly nepali: "ट";
}, {
    readonly roman: "tha";
    readonly nepali: "ठ";
}, {
    readonly roman: "da";
    readonly nepali: "ड";
}, {
    readonly roman: "dha";
    readonly nepali: "ढ";
}, {
    readonly roman: "na";
    readonly nepali: "ण";
}, {
    readonly roman: "ta";
    readonly nepali: "त";
}, {
    readonly roman: "tha";
    readonly nepali: "थ";
}, {
    readonly roman: "da";
    readonly nepali: "द";
}, {
    readonly roman: "dha";
    readonly nepali: "ध";
}, {
    readonly roman: "na";
    readonly nepali: "न";
}, {
    readonly roman: "pa";
    readonly nepali: "प";
}, {
    readonly roman: "pha";
    readonly nepali: "फ";
}, {
    readonly roman: "ba";
    readonly nepali: "ब";
}, {
    readonly roman: "bha";
    readonly nepali: "भ";
}, {
    readonly roman: "ma";
    readonly nepali: "म";
}, {
    readonly roman: "ya";
    readonly nepali: "य";
}, {
    readonly roman: "ra";
    readonly nepali: "र";
}, {
    readonly roman: "la";
    readonly nepali: "ल";
}, {
    readonly roman: "wa";
    readonly nepali: "व";
}, {
    readonly roman: "sa";
    readonly nepali: "स";
}, {
    readonly roman: "sha";
    readonly nepali: "श";
}, {
    readonly roman: "श";
    readonly nepali: "ष";
}, {
    readonly roman: "ha";
    readonly nepali: "ह";
}, {
    readonly roman: "n";
    readonly nepali: "ँ";
}, {
    readonly roman: "m";
    readonly nepali: "ं";
}, {
    readonly roman: "h";
    readonly nepali: "ः";
}, {
    readonly roman: "a";
    readonly nepali: "अ";
}, {
    readonly roman: "aa";
    readonly nepali: "आ";
}, {
    readonly roman: "i";
    readonly nepali: "इ";
}, {
    readonly roman: "i";
    readonly nepali: "ई";
}, {
    readonly roman: "u";
    readonly nepali: "उ";
}, {
    readonly roman: "u";
    readonly nepali: "ऊ";
}, {
    readonly roman: "ri";
    readonly nepali: "ऋ";
}, {
    readonly roman: "e";
    readonly nepali: "ए";
}, {
    readonly roman: "ai";
    readonly nepali: "ऐ";
}, {
    readonly roman: "o";
    readonly nepali: "ओ";
}, {
    readonly roman: "au";
    readonly nepali: "औ";
}, {
    readonly roman: "i";
    readonly nepali: "ि";
}, {
    readonly roman: "i";
    readonly nepali: "ी";
}, {
    readonly roman: "u";
    readonly nepali: "ु";
}, {
    readonly roman: "u";
    readonly nepali: "ू";
}, {
    readonly roman: "ri";
    readonly nepali: "ृ";
}, {
    readonly roman: "e";
    readonly nepali: "े";
}, {
    readonly roman: "ai";
    readonly nepali: "ै";
}, {
    readonly roman: "o";
    readonly nepali: "ो";
}, {
    readonly roman: "au";
    readonly nepali: "ौ";
}, {
    readonly roman: "0";
    readonly nepali: "०";
}, {
    readonly roman: "1";
    readonly nepali: "१";
}, {
    readonly roman: "2";
    readonly nepali: "२";
}, {
    readonly roman: "3";
    readonly nepali: "३";
}, {
    readonly roman: "4";
    readonly nepali: "४";
}, {
    readonly roman: "5";
    readonly nepali: "५";
}, {
    readonly roman: "6";
    readonly nepali: "६";
}, {
    readonly roman: "7";
    readonly nepali: "७";
}, {
    readonly roman: "8";
    readonly nepali: "८";
}, {
    readonly roman: "9";
    readonly nepali: "९";
}];

/**
 * Transliteration utilities
 * Shared functions for building character mappings
 */
export declare interface MappingEntry<T> {
    keys: string[];
    value: T;
    caseSensitive?: boolean;
}

/**
 * DOM Adapter for Nepali Converter
 * Manages input textarea, output display, and copy button
 */
export declare class NepaliConverter {
    private core;
    private inputElement;
    private outputElement;
    private copyButton;
    constructor(inputElement: HTMLTextAreaElement, outputElement: HTMLElement, copyButton?: HTMLButtonElement, options?: NepaliConverterOptions);
    private init;
    private handleInput;
    private updateOutput;
    private handleCopy;
    private showCopyFeedback;
    getCore(): NepaliConverterCore;
    setInput(text: string): void;
    getOutput(): string;
    clear(): void;
    setDirection(direction: 'toNepali' | 'toRoman'): void;
    toggleDirection(): void;
    destroy(): void;
}

/**
 * Headless Nepali Converter Core
 * Converts full text blocks (not character-by-character IME)
 */
export declare class NepaliConverterCore {
    private state;
    private options;
    private debounceTimer;
    constructor(options?: NepaliConverterOptions);
    getState(): Readonly<NepaliConverterState>;
    setInput(text: string): void;
    getOutput(): string;
    getInput(): string;
    setDirection(direction: 'toNepali' | 'toRoman'): void;
    toggleDirection(): void;
    getDirection(): 'toNepali' | 'toRoman';
    setUseDevanagariDigits(value: boolean): void;
    getUseDevanagariDigits(): boolean;
    clear(): void;
    private convert;
}

export declare interface NepaliConverterOptions {
    useDevanagariDigits?: boolean;
    bidirectional?: boolean;
    debounceMs?: number;
    onInput?: (romanized: string, converted: string) => void;
    onChange?: (romanized: string, converted: string) => void;
}

export declare interface NepaliConverterState {
    input: string;
    output: string;
    direction: 'toNepali' | 'toRoman';
}

/**
 * Headless Nepali IME Core
 * Framework-agnostic transliteration engine
 * Can be used with Vanilla JS, React, Vue, Svelte, etc.
 */
export declare class NepaliIMECore {
    private state;
    private options;
    private history;
    private convertedBuffer;
    private committedOutput;
    constructor(options?: NepaliIMEOptions);
    /**
     * Get current state
     */
    getState(): Readonly<NepaliIMEState>;
    /**
     * Handle keyboard input
     * Returns true if the event was handled, false otherwise
     */
    handleKey(key: string, modifiers?: {
        ctrl?: boolean;
        alt?: boolean;
        meta?: boolean;
        shift?: boolean;
    }): boolean;
    /**
     * Insert text (e.g., from paste)
     */
    insertText(text: string): void;
    /**
     * Clear all content
     */
    clear(): void;
    /**
     * Set content directly (useful for framework integration)
     */
    setValue(value: string): void;
    /**
     * Get current output value
     */
    getValue(): string;
    /**
     * Update digit conversion setting
     */
    setUseDevanagariDigits(value: boolean): void;
    /**
     * Get digit conversion setting
     */
    getUseDevanagariDigits(): boolean;
    private commitCurrentWord;
    private deleteCharacter;
    private isPunctuation;
    private convertSegment;
    private updateOutput;
    private pushSegment;
    private popSegment;
    private rebuildConvertedBuffer;
    private pushHistory;
    /**
     * Undo last change
     */
    undo(): boolean;
    /**
     * Redo last undone change
     */
    redo(): boolean;
    /**
     * Check if undo is available
     */
    canUndo(): boolean;
    /**
     * Check if redo is available
     */
    canRedo(): boolean;
    /**
     * Clear undo/redo history
     */
    clearHistory(): void;
}

export declare interface NepaliIMEOptions {
    useDevanagariDigits?: boolean;
    onStateChange?: (state: NepaliIMEState) => void;
    enableHistory?: boolean;
    maxHistory?: number;
}

export declare interface NepaliIMEState {
    romanBuffer: string[];
    currentWord: string;
    output: string;
    cursorPosition: number;
}

/**
 * Nepali input component for single-line text input
 * DOM adapter for input elements using the headless core
 */
export declare class NepaliInput extends NepaliInputBase<HTMLInputElement> {
    protected updateCursor(_state: NepaliIMEState): void;
}

/**
 * Base class for Nepali input components
 * DOM adapter that wraps the headless NepaliIMECore
 */
export declare abstract class NepaliInputBase<T extends HTMLInputElement | HTMLTextAreaElement> {
    protected element: T;
    protected options: Required<NepaliInputOptions>;
    protected core: NepaliIMECore;
    protected enabled: boolean;
    protected characterSelector: CharacterSelector | null;
    protected pendingInput: string;
    constructor(element: T, options?: NepaliInputOptions);
    protected init(): void;
    protected onCoreStateChange(state: NepaliIMEState): void;
    protected abstract updateCursor(state: NepaliIMEState): void;
    protected handleKeydown: (e: KeyboardEvent) => void;
    protected handlePaste: (e: ClipboardEvent) => void;
    protected handleNativeInput: () => void;
    protected handleBlur: () => void;
    private showCharacterSelector;
    private handleCharacterSelect;
    private handleCharacterCancel;
    disable(): void;
    isEnabled(): boolean;
    setValue(value: string): void;
    getValue(): string;
    clear(): void;
    setOptions(options: Partial<NepaliInputOptions>): void;
    getCore(): NepaliIMECore;
    destroy(): void;
}

export declare interface NepaliInputOptions {
    useDevanagariDigits?: boolean;
    autoConvert?: boolean;
    enableCharacterSelector?: boolean;
    onInput?: (value: string) => void;
    onChange?: (value: string) => void;
}

/**
 * Nepali textarea component for multi-line text input
 * DOM adapter for textarea elements using the headless core
 */
export declare class NepaliTextarea extends NepaliInputBase<HTMLTextAreaElement> {
    protected updateCursor(state: NepaliIMEState): void;
}

export declare type NepaliTextareaOptions = NepaliInputOptions;

export declare const reverseTransliterate: (input: string, options?: ReverseTransliterationOptions) => string;

declare interface ReverseTransliterationOptions {
    useLatinDigits?: boolean;
}

/**
 * Scheme metadata
 */
export declare interface SchemeInfo {
    id: TransliterationScheme;
    name: string;
    description: string;
    supportsUnicode: boolean;
    supportsAscii: boolean;
    caseSensitive: boolean;
    commonUse: string;
}

/**
 * Available transliteration schemes
 */
export declare const SCHEMES: SchemeInfo[];

export declare interface ShortcutDefinition {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    description: string;
    handler: ShortcutHandler;
    category?: string;
}

/**
 * Keyboard Shortcut Manager
 * Handles keyboard shortcuts for Nepali input applications
 */
export declare type ShortcutHandler = (event: KeyboardEvent) => boolean | void;

export declare interface ShortcutOptions {
    enabled?: boolean;
    preventDefault?: boolean;
}

export declare const SLP1_TO_DEVANAGARI: Record<string, string>;

/**
 * SLP1 consonant mappings
 * Single character for each consonant
 */
export declare const slp1ConsonantMapping: CompiledMapping<string>;

/**
 * SLP1 diacritic mappings
 */
export declare const slp1DiacriticMapping: CompiledMapping<string>;

export declare interface SLP1Mapping {
    vowels: CompiledMapping<{
        independent: string;
        matra: string;
        inherent?: boolean;
    }>;
    consonants: CompiledMapping<string>;
    diacritics: CompiledMapping<string>;
}

export declare const slp1ToDevanagari: (text: string) => string;

/**
 * SLP1 vowel mappings
 * Simple single-character mapping where possible
 */
export declare const slp1VowelMapping: CompiledMapping<{
    independent: string;
    matra: string;
    inherent?: boolean;
}>;

export declare const transliterate: (input: string, options?: TransliterationOptions) => string;

export declare interface TransliterationOptions {
    useDevanagariDigits?: boolean;
    halantTriggers?: string[];
}

/**
 * Supported transliteration scheme identifiers
 */
export declare type TransliterationScheme = 'default' | 'iast' | 'iso15919' | 'harvard-kyoto' | 'velthuis' | 'slp1';

export declare const VELTHUIS_TO_DEVANAGARI: Record<string, string>;

/**
 * Velthuis consonant mappings
 * Uses dot prefix for retroflex: .t=ट, .d=ड, .n=ण
 */
export declare const velthuisConsonantMapping: CompiledMapping<string>;

/**
 * Velthuis diacritic mappings
 */
export declare const velthuisDiacriticMapping: CompiledMapping<string>;

export declare interface VelthuisMapping {
    vowels: CompiledMapping<{
        independent: string;
        matra: string;
        inherent?: boolean;
    }>;
    consonants: CompiledMapping<string>;
    diacritics: CompiledMapping<string>;
}

export declare const velthuisToDevanagari: (text: string) => string;

/**
 * Velthuis vowel mappings
 * Uses "a for आ, .r for ऋ
 */
export declare const velthuisVowelMapping: CompiledMapping<{
    independent: string;
    matra: string;
    inherent?: boolean;
}>;

export { }
