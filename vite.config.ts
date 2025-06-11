import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(), // Include if using React
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
});