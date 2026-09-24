import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import { taskallAliases } from "./vite.config";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: taskallAliases },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["../library/src/test/setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    // Páginas inteiras + axe (ex.: 322 ícones) passam de 5s em máquinas mais lentas.
    testTimeout: 30_000,
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
