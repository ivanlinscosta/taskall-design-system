import { defineConfig } from "vite";

import { taskallClassName } from "../../library/scripts/css-class-name";

/**
 * Config Vite isolado do Storybook: o vite.config.ts da webapp carrega o plugin
 * do React Router (framework mode), que não deve rodar dentro do Storybook.
 * O alias de @taskall/react é aplicado em main.ts (viteFinal); as classes da lib
 * usam o prefixo taskall- como no build publicado.
 */
export default defineConfig({
  css: { modules: { generateScopedName: taskallClassName } },
});
