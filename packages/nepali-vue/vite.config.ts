import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		vue(),
		dts({
			include: ['src/**/*.ts', 'src/**/*.vue'],
			exclude: ['src/**/*.spec.ts'],
			rollupTypes: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'NepaliVue',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
		},
		rollupOptions: {
			external: ['vue', '@oarkflow/nepali-input'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue',
					'@oarkflow/nepali-input': 'NepaliInput'
				}
			}
		},
		sourcemap: true,
		minify: false
	}
})
