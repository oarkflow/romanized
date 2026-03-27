import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import solid from 'vite-plugin-solid'

export default defineConfig({
	plugins: [
		solid(),
		dts({
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
			rollupTypes: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'NepaliSolid',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
		},
		rollupOptions: {
			external: ['solid-js', 'solid-js/web', '@oarkflow/nepali-input'],
			output: {
				exports: 'named',
				globals: {
					'solid-js': 'SolidJS',
					'@oarkflow/nepali-input': 'NepaliInput'
				}
			}
		},
		sourcemap: true,
		minify: false
	}
})
