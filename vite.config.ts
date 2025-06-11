import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/',
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});