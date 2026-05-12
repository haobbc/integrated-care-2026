import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/integrated-care-2026/" : "/",
  plugins: [react()],
  server: {
    port: 5174,
    fs: { allow: [".."] },
  },
}));
