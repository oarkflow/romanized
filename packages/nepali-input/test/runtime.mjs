import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const bootstrapDomStubs = () => {
	globalThis.document = {
		createElement() {
			return {
				style: {},
				textContent: '',
				appendChild() {},
				removeChild() {},
				setAttribute() {},
				select() {}
			}
		},
		head: { appendChild() {} },
		body: { appendChild() {}, removeChild() {} },
		querySelector() { return null }
	}

	globalThis.window = {
		setTimeout,
		clearTimeout
	}

	Object.defineProperty(globalThis, 'navigator', {
		configurable: true,
		value: {
			clipboard: {
				writeText: async () => {}
			}
		}
	})
}

export const loadRuntime = () => {
	bootstrapDomStubs()
	return require('../dist/index.cjs')
}
