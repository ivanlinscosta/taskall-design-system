import { fileURLToPath } from "node:url";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

const librarySrc = fileURLToPath(new URL("../library/src", import.meta.url));

/**
 * `@hive/react` resolve para o código-fonte da biblioteca (mesmo padrão do
 * Storybook): hot-reload da lib durante o desenvolvimento e tree-shaking no build.
 */
export const hiveAliases = [
  {
    find: /^@hive\/react\/styles\.css$/,
    replacement: `${librarySrc}/styles/index.css`,
  },
  { find: /^@hive\/react$/, replacement: `${librarySrc}/index.ts` },
];

export default defineConfig({
  plugins: [reactRouter()],
  resolve: { alias: hiveAliases },
  server: { port: 5173 },
});
