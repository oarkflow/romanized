export type DevanagariLanguage =
	| 'generic'
	| 'nepali'
	| 'hindi'
	| 'marathi'
	| 'sanskrit'
	| 'maithili'
	| 'newari'
	| 'dogri'
	| 'bodo'
	| 'konkani'
	| 'kashmiri'
	| 'sindhi'

export interface CommonWordEntry {
	roman: string
	devanagari: string
}
