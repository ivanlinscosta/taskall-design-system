import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

import { COMPONENTS, FOUNDATIONS, GUIDES } from "./lib/registry";

/**
 * Uma rota (e um chunk) por página. Todas as rotas são estáticas, então o
 * `prerender: true` gera HTML para cada uma no build.
 */
export default [
  index("routes/home.tsx"),
  layout("layouts/docs.tsx", [
    route("componentes", "routes/components-index.tsx"),
    ...COMPONENTS.map((item) =>
      route(item.path.slice(1), `pages/components/${item.slug}/page.tsx`),
    ),
    ...FOUNDATIONS.map((item) =>
      route(item.path.slice(1), `pages/foundations/${item.slug}.tsx`),
    ),
    ...GUIDES.map((item) =>
      route(item.path.slice(1), `pages/guides/${item.slug}.tsx`),
    ),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
