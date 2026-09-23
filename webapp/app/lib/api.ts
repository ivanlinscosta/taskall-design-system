import api from "../generated/api.json";

export type ApiProp = {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
};

export type ApiEntry = {
  name: string;
  source: string;
  props: ApiProp[];
};

export const API: ApiEntry[] = api;

export function getApi(name: string): ApiEntry {
  const entry = API.find((item) => item.name === name);
  if (!entry) {
    throw new Error(
      `Tipo ${name}Props não encontrado em generated/api.json. Rode \`pnpm gen:api\`.`,
    );
  }
  return entry;
}

type JsxValue = string | number | boolean | undefined | null | { raw: string };

/** Marca um valor para ser impresso como expressão (`{Add}`), não como string. */
export const raw = (code: string) => ({ raw: code });

function isDefault(component: string, prop: string, value: JsxValue) {
  const entry = API.find((item) => item.name === component);
  const defaultValue = entry?.props.find(
    (item) => item.name === prop,
  )?.defaultValue;
  if (
    defaultValue === undefined ||
    value === null ||
    value === undefined ||
    typeof value === "object"
  ) {
    return false;
  }
  return (
    defaultValue === JSON.stringify(value) || defaultValue === String(value)
  );
}

function formatProp(name: string, value: JsxValue) {
  if (value === true) return name;
  if (typeof value === "string") return `${name}=${JSON.stringify(value)}`;
  if (typeof value === "number") return `${name}={${value}}`;
  if (value && typeof value === "object") return `${name}={${value.raw}}`;
  return null;
}

/**
 * Gera JSX a partir de props, omitindo valores vazios e os padrões declarados
 * no componente (lidos de generated/api.json).
 */
export function jsx(
  component: string,
  props: Record<string, JsxValue>,
  children?: string,
) {
  const attrs = Object.entries(props)
    .filter(
      ([name, value]) =>
        value !== false && value !== "" && !isDefault(component, name, value),
    )
    .map(([name, value]) => formatProp(name, value))
    .filter((attr): attr is string => attr !== null);

  const inline = `<${component}${attrs.length ? ` ${attrs.join(" ")}` : ""}`;
  const opening =
    inline.length > 72
      ? `<${component}\n${attrs.map((attr) => `  ${attr}`).join("\n")}\n`
      : inline;
  const multiline = opening.includes("\n");

  if (children === undefined || children === "") {
    return `${opening}${multiline ? "/>" : " />"}`;
  }
  const body = children.includes("\n")
    ? `\n${children.replace(/^/gm, "  ")}\n`
    : children;
  return `${opening}>${body}</${component}>`;
}
