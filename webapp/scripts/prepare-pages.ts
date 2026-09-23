/**
 * Ajusta build/client para o GitHub Pages (site de projeto em subcaminho).
 *
 * - Com `basename`, o React Router grava o HTML em build/client/<base>/…,
 *   mas no Pages a raiz do artefato já é <base>: move o HTML para a raiz.
 * - 404.html = fallback SPA (rotas desconhecidas são resolvidas no cliente).
 * - .nojekyll: publica arquivos que começam com "_" sem processamento.
 */
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const client = resolve(
  fileURLToPath(new URL("../build/client", import.meta.url)),
);
const base = (process.env.DOCS_BASE ?? "/").replace(/^\/|\/$/g, "");

if (!existsSync(join(client, "__spa-fallback.html"))) {
  console.error(
    "build/client não encontrado. Rode `pnpm build` com DOCS_BASE antes.",
  );
  process.exit(1);
}

if (base) {
  const nested = join(client, base);
  if (!existsSync(nested)) {
    console.error(
      `Esperava o HTML em build/client/${base}. DOCS_BASE confere com o build?`,
    );
    process.exit(1);
  }
  cpSync(nested, client, { recursive: true });
  rmSync(nested, { recursive: true });
}

cpSync(join(client, "__spa-fallback.html"), join(client, "404.html"));
writeFileSync(join(client, ".nojekyll"), "");

console.log(`Pronto para o GitHub Pages (base: /${base}${base ? "/" : ""}).`);
