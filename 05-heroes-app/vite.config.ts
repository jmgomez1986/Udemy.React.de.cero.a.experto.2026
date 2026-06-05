import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      test: path.resolve(__dirname, './test'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },

  server: {
    port: 5000, // Specify the port
    open: true, // Open the browser automatically on startup
  },
});
