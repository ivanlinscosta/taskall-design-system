import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDirs: [
        { dir: "dist/esm", moduleFormat: "esm" },
        { dir: "dist/cjs", moduleFormat: "cjs" },
      ],
      tsconfigPath: "./tsconfig.json",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "cjs" ? "cjs/[name].cjs" : "esm/[name].js"),
      cssFileName: "styles",
    },
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    rolldownOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});