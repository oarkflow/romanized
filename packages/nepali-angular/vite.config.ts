import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		dts({
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.spec.ts'],
			rollupTypes: true
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'NepaliAngular',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
		},
		rollupOptions: {
			external: ['@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', '@oarkflow/nepali-input'],
			output: {
				exports: 'named',
				globals: {
					'@angular/core': 'ng.core',
					'@angular/forms': 'ng.forms',
					'rxjs': 'rxjs',
					'@oarkflow/nepali-input': 'NepaliInput'
				}
			}
		},
		sourcemap: true,
		minify: false
	}
})
