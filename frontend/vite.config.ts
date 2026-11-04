import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "../custom_components/dashforge/frontend",
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: () => "dashforge-panel.js",
    },
  },
});
