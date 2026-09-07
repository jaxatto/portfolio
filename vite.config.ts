import { defineConfig } from 'vite';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import pxtorem from 'postcss-pxtorem-plus';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [
		react(),
		svgr({
			include: '**/*.svg',
		}),
	],
	base: '/',
	server: {
		open: true,
	},
	build: {
		outDir: 'dist',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	// css: {
	// 	postcss: {
	// 		plugins: [
	// 			pxtorem({
	// 				rootValue: 16,
	// 				propList: ['*'],
	// 				mediaQuery: true,
	// 			}),
	// 		],
	// 	},
	// },
});
