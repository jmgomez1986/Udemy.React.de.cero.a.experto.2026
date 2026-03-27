import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // Specify the port
    open: true, // Open the browser automatically on startup
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
