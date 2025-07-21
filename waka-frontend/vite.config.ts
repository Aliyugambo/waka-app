import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Fix: use "url" not "node:url"

const __filename = fileURLToPath(import.meta.url as unknown as string); // ✅ Fix type issue
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"), // ✅ Use "path.resolve"
      },
    ],
  },
});
