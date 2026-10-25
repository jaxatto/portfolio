import { defineConfig } from 'vite';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

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
