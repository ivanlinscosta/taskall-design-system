import { defineConfig } from "vite";

/**
 * Config Vite isolado do Storybook: o vite.config.ts da webapp carrega o plugin
 * do React Router (framework mode), que não deve rodar dentro do Storybook.
 * O alias de @hive/react é aplicado em main.ts (viteFinal).
 */
export default defineConfig({});
