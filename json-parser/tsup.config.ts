import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: false,
	entry: ['src/**/*.ts'],
	format: ['esm'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'esnext',
	tsconfig: './tsconfig.json',
	bundle: true,
	shims: false,
	keepNames: true,
	splitting: false,
	treeshake: true,
	outExtension() {
		return {
			js: '.mjs'
		};
	},
	esbuildPlugins: [esbuildPluginFilePathExtensions()]
});
