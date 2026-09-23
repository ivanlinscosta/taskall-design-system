import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = fileURLToPath(new URL(".", import.meta.url));

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: { viteConfigPath: resolve(dirname, "vite.config.ts") },
    },
  },
  stories: [
    "../../library/src/**/*.stories.@(ts|tsx)",
    "../../library/src/**/*.mdx",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  staticDirs: [{ from: "../../library/src/assets", to: "/brand" }],
  async viteFinal(viteConfig) {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@taskall/react": resolve(dirname, "../../library/src/index.ts"),
    };
    return viteConfig;
  },
};

export default config;
