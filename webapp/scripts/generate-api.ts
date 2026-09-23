/**
 * Gera app/generated/api.json a partir dos tipos TypeScript reais de @hive/react.
 *
 * Para cada `export type XProps` em library/src/components, extrai as props
 * declaradas na própria biblioteca (ignora atributos HTML herdados do React),
 * o tipo, a obrigatoriedade e o valor padrão da desestruturação do componente.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

type ApiProp = {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
};

type ApiEntry = {
  name: string;
  source: string;
  props: ApiProp[];
};

const here = dirname(fileURLToPath(import.meta.url));
const libraryRoot = resolve(here, "../../library");
const componentsDir = resolve(libraryRoot, "src/components");
const outFile = resolve(here, "../app/generated/api.json");

/** Tipos auxiliares documentados além dos `*Props`. */
const extraTypes = new Set(["DropdownOption", "TabItem"]);

const configPath = resolve(libraryRoot, "tsconfig.json");
const parsed = ts.getParsedCommandLineOfConfigFile(
  configPath,
  {},
  {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      throw new Error(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      );
    },
  },
);

if (!parsed) {
  throw new Error(`Não foi possível ler ${configPath}`);
}

const componentFiles = parsed.fileNames.filter(
  (file) =>
    file.startsWith(componentsDir) &&
    file.endsWith(".tsx") &&
    !file.endsWith(".test.tsx") &&
    !file.endsWith(".stories.tsx"),
);

const program = ts.createProgram(componentFiles, parsed.options);
const checker = program.getTypeChecker();

function isLibraryDeclaration(declaration: ts.Declaration) {
  return declaration
    .getSourceFile()
    .fileName.startsWith(resolve(libraryRoot, "src"));
}

function collectDefaults(sourceFile: ts.SourceFile, componentName: string) {
  const defaults = new Map<string, string>();

  function readBinding(pattern: ts.ObjectBindingPattern) {
    for (const element of pattern.elements) {
      if (!element.initializer) continue;
      const key = element.propertyName ?? element.name;
      if (ts.isIdentifier(key) || ts.isStringLiteral(key)) {
        defaults.set(key.text, element.initializer.getText(sourceFile));
      }
    }
  }

  function visit(node: ts.Node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === componentName &&
      node.initializer &&
      ts.isCallExpression(node.initializer)
    ) {
      const [render] = node.initializer.arguments;
      if (
        render &&
        (ts.isFunctionExpression(render) || ts.isArrowFunction(render))
      ) {
        const [firstParam] = render.parameters;
        if (firstParam && ts.isObjectBindingPattern(firstParam.name)) {
          readBinding(firstParam.name);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return defaults;
}

function describeType(symbol: ts.Symbol, location: ts.Declaration) {
  if (ts.isPropertySignature(location) && location.type) {
    return location.type
      .getText()
      .replace(/\s+/g, " ")
      .replace(/React\./g, "");
  }
  const type = checker.getNonNullableType(
    checker.getTypeOfSymbolAtLocation(symbol, location),
  );
  return checker
    .typeToString(
      type,
      location,
      ts.TypeFormatFlags.NoTruncation |
        ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
    )
    .replace(/React\./g, "");
}

const entries: ApiEntry[] = [];

for (const file of componentFiles) {
  const sourceFile = program.getSourceFile(file);
  if (!sourceFile) continue;

  for (const statement of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(statement)) continue;
    const isExported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    const typeName = statement.name.text;
    if (
      !isExported ||
      !(typeName.endsWith("Props") || extraTypes.has(typeName))
    )
      continue;

    const componentName = typeName.endsWith("Props")
      ? typeName.slice(0, -"Props".length)
      : typeName;
    const defaults = collectDefaults(sourceFile, componentName);
    const type = checker.getTypeAtLocation(statement.name);

    const props = checker
      .getPropertiesOfType(type)
      .filter((symbol) =>
        (symbol.declarations ?? []).some(isLibraryDeclaration),
      )
      .map<ApiProp>((symbol) => {
        const declaration =
          symbol.declarations?.find(isLibraryDeclaration) ?? statement;
        const optional = (symbol.flags & ts.SymbolFlags.Optional) !== 0;
        const defaultValue = defaults.get(symbol.name);
        return {
          name: symbol.name,
          type: describeType(symbol, declaration),
          required: !optional,
          ...(defaultValue !== undefined ? { defaultValue } : {}),
        };
      })
      .sort(
        (a, b) =>
          Number(b.required) - Number(a.required) ||
          a.name.localeCompare(b.name),
      );

    entries.push({
      name: componentName,
      source: relative(resolve(libraryRoot, ".."), file),
      props,
    });
  }
}

entries.sort((a, b) => a.name.localeCompare(b.name));

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(entries, null, 2)}\n`);
console.log(
  `api.json: ${entries.length} tipos, ${entries.reduce((n, e) => n + e.props.length, 0)} props`,
);
