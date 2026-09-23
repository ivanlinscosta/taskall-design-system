import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";

import pkg from "./package.json";
import { taskallClassName } from "./scripts/css-class-name";

/**
 * Dependências e peers ficam fora do bundle (inclusive subpaths como
 * `react/jsx-runtime`): o app que consome instala uma única cópia de cada.
 */
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const external = (id: string) =>
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

/** Componentes usam hooks: marca todos os módulos para o App Router do Next.js. */
const output = {
  preserveModules: true,
  preserveModulesRoot: "src",
  banner: '"use client";',
};

export default defineConfig({
  css: {
    modules: { generateScopedName: taskallClassName },
  },
  plugins: [
    react(),
    dts({
      outDirs: [
        { dir: "dist/esm", moduleFormat: "esm" },
        { dir: "dist/cjs", moduleFormat: "cjs" },
      ],
      tsconfigPath: "./tsconfig.json",
      entryRoot: "src",
      include: ["src"],
      // Só a API pública: sem testes, stories, páginas do Storybook e helpers de teste.
      exclude: [
        "src/**/*.test.tsx",
        "src/**/*.stories.tsx",
        "src/foundations/**",
        "src/test/**",
      ],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "cjs" ? "cjs/[name].cjs" : "esm/[name].js",
      cssFileName: "styles",
    },
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
    rollupOptions: { external, output },
    rolldownOptions: { external, output },
  },
});
