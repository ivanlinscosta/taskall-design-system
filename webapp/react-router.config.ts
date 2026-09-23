import type { Config } from "@react-router/dev/config";

/** Subcaminho de publicação (ex.: "/taskall-design-system/" no GitHub Pages). */
const basename = process.env.DOCS_BASE ?? "/";

export default {
  appDirectory: "app",
  basename,
  ssr: false,
  prerender: true,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
