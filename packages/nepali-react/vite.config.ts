import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		dts({
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
			rollupTypes: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'NepaliReact',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime', '@verishore/nepali-input'],
			output: {
				exports: 'named',
				globals: {
					react: 'React',
					'@verishore/nepali-input': 'NepaliInput'
				}
			}
		},
		sourcemap: true,
		minify: false
	}
})
