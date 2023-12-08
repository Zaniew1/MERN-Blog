import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Access environment variables here
    VITE_API_URL: process.env.VITE_API_URL,
  },
});
