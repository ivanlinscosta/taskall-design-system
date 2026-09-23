import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const appDir = join(__dirname, "..");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory())
      return name === "generated" || name === "test" ? [] : walk(path);
    return /\.(tsx?|css)$/.test(name) ? [path] : [];
  });
}

const files = walk(appDir);

describe("código da aplicação", () => {
  it("não usa cores fixas (hex, rgb, hsl): só tokens --hive-*", () => {
    const offenders = files.flatMap((file) =>
      readFileSync(file, "utf8")
        .split("\n")
        .map((line, index) => ({ line, index }))
        .filter(({ line }) =>
          /#[0-9a-fA-F]{3,8}\b(?![-\w])|\b(rgba?|hsla?)\(/.test(line),
        )
        .filter(({ line }) => !/href=|to=|#\$\{|`#/.test(line))
        .map(({ index }) => `${relative(appDir, file)}:${index + 1}`),
    );
    expect(offenders).toEqual([]);
  });

  it("não usa any nem suprime erros de tipo", () => {
    const offenders = files
      .filter((file) => /\.tsx?$/.test(file))
      .filter((file) => {
        const code = readFileSync(file, "utf8").replace(
          /"(?:[^"\\\n]|\\.)*"|`[^`]*`/g,
          '""',
        );
        return /:\s*any\b|as any\b|<any>|@ts-ignore|@ts-expect-error/.test(
          code,
        );
      })
      .map((file) => relative(appDir, file));
    expect(offenders).toEqual([]);
  });

  it("importa componentes somente de @hive/react", () => {
    const offenders = files
      .filter((file) => /\.tsx?$/.test(file))
      .filter((file) =>
        /from ["'][./]*library\//.test(readFileSync(file, "utf8")),
      )
      .map((file) => relative(appDir, file));
    expect(offenders).toEqual([]);
  });
});
