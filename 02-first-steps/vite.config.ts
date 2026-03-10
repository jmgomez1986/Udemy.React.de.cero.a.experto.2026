// import { defineConfig } from 'vite';
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5000, // Specify the port
    open: true, // Open the browser automatically on startup
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
