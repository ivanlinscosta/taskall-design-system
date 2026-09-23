import { fileURLToPath } from "node:url";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

import { taskallClassName } from "../library/scripts/css-class-name";

const librarySrc = fileURLToPath(new URL("../library/src", import.meta.url));

/**
 * `@taskall/react` resolve para o código-fonte da biblioteca (mesmo padrão do
 * Storybook): hot-reload da lib durante o desenvolvimento e tree-shaking no build.
 */
export const taskallAliases = [
  {
    find: /^@taskall\/react\/styles\.css$/,
    replacement: `${librarySrc}/styles/index.css`,
  },
  { find: /^@taskall\/react$/, replacement: `${librarySrc}/index.ts` },
];

export default defineConfig({
  // Mesmo valor do `basename` em react-router.config.ts (GitHub Pages usa subcaminho).
  base: process.env.DOCS_BASE ?? "/",
  plugins: [reactRouter()],
  resolve: { alias: taskallAliases },
  css: { modules: { generateScopedName: taskallClassName } },
  server: { port: 5173 },
});
