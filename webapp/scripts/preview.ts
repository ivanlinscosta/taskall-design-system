/**
 * Servidor estático do build (build/client), com a mesma resolução de um host
 * estático: /rota → /rota/index.html; rotas desconhecidas → __spa-fallback.html.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(
  fileURLToPath(new URL("../build/client", import.meta.url)),
);
const port = Number(process.env.PORT ?? 4173);
const base = (process.env.DOCS_BASE ?? "/").replace(/\/$/, "");

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFile(pathname: string): { file: string; status: number } {
  const safe = normalize(decodeURIComponent(pathname)).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  const candidates = [join(root, safe), join(root, safe, "index.html")];
  for (const file of candidates) {
    if (file.startsWith(root) && existsSync(file) && statSync(file).isFile()) {
      return { file, status: 200 };
    }
  }
  return { file: join(root, "__spa-fallback.html"), status: 404 };
}

if (!existsSync(root)) {
  console.error("build/client não existe. Rode `pnpm build` antes.");
  process.exit(1);
}

createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  if (base && !url.pathname.startsWith(`${base}/`) && url.pathname !== base) {
    response.writeHead(302, { Location: `${base}/` });
    response.end();
    return;
  }
  const pathname = url.pathname.slice(base.length) || "/";
  const { file, status } = resolveFile(pathname);
  response.writeHead(status, {
    "Content-Type": types[extname(file)] ?? "application/octet-stream",
    "Cache-Control": file.includes(`${join(root, "assets")}`)
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  });
  createReadStream(file).pipe(response);
}).listen(port, () => {
  console.log(
    `TaskAll docs (build estático) em http://localhost:${port}${base}/`,
  );
});
