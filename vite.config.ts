import { defineConfig } from 'vite';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { imageSize } from './scripts/vite-image-size';
import { themeColor } from './src/tokens/themeColor';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    imageSize(),
    {
      // index.html carries the browser bar color in a meta tag and in the pre-paint script. Both read
      // the values generated from the surface token (npm run build:theme), so they cannot drift.
      name: 'theme-color',
      transformIndexHtml: (html: string) =>
        html
          .replaceAll('%THEME_COLOR_LIGHT%', themeColor.light)
          .replaceAll('%THEME_COLOR_DARK%', themeColor.dark),
    },
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
      // These mirror package.json "imports" and the tsconfig paths. Keep all three in sync.
      '#src': path.resolve(__dirname, 'src'),
      '#tokens': path.resolve(__dirname, 'src/tokens'),
      '#styles': path.resolve(__dirname, 'src/styles'),
      '#pages': path.resolve(__dirname, 'src/pages'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#assets': path.resolve(__dirname, 'src/assets'),
      '#constants': path.resolve(__dirname, 'src/constants'),
      '#providers': path.resolve(__dirname, 'src/providers'),
    },
  },
});
