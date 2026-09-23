import { createHash } from "node:crypto";
import { basename } from "node:path";

/**
 * Nomes de classe estáveis com o prefixo `taskall-` para os CSS Modules da
 * biblioteca (Button.module.css → `.button` = `taskall-button`,
 * `.primary` = `taskall-button-primary`, `.root` = `taskall-avatar`).
 *
 * Arquivos fora de `library/src` (ex.: CSS da documentação) mantêm nomes com
 * hash. Usado pelo build da lib, pela documentação e pelo Storybook para que
 * as classes sejam idênticas em todos os ambientes.
 */
const LIBRARY_SRC = /[\\/]library[\\/]src[\\/]/;

function kebab(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

export function taskallClassName(local: string, filename: string, css = "") {
  const file = filename.split("?")[0] ?? filename;

  if (!LIBRARY_SRC.test(file)) {
    const hash = createHash("sha256").update(file).digest("hex").slice(0, 5);
    return `_${local}_${hash}`;
  }

  // "TaskAll" é uma palavra só e o prefixo não se repete: TaskAllProvider → provider.
  const component = kebab(
    basename(file)
      .replace(/\.module\.css$/, "")
      .replace(/TaskAll/g, "Taskall"),
  ).replace(/^taskall-/, "");
  const name = kebab(local);
  // `.slot-group` → `.group` é a raiz; se o arquivo já declara `.root`, só ele é.
  const hasRootClass = /\.root\b/.test(css);
  const isRoot =
    name === "root" ||
    name === component ||
    (!hasRootClass && component.endsWith(`-${name}`));

  return isRoot ? `taskall-${component}` : `taskall-${component}-${name}`;
}
