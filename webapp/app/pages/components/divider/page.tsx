import { Divider, Star, type DividerProps } from "@hive/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import LoginOptions from "./examples/LoginOptions";
import loginOptionsCode from "./examples/LoginOptions?raw";
import Variants from "./examples/Variants";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "divider");

const doc: ComponentDoc = {
  page,
  description:
    "Divider separa grupos de conteúdo com uma linha — contínua ou pontilhada — ou com texto/ícone central.",
  whenToUse: [
    "Separar grupos de itens em listas e menus.",
    "Dividir métodos alternativos (“ou”) em formulários de acesso.",
  ],
  whenNotToUse: [
    "Quando espaçamento ou um título já separam bem as seções.",
    "Como decoração repetida entre todos os elementos da tela.",
  ],
  usage: `import { Divider } from "@hive/react";

<Divider />
<Divider type="text" text="ou" />`,
  playground: definePlayground({
    component: "Divider",
    initial: {
      type: "text" as NonNullable<DividerProps["type"]>,
      text: "ou continue com",
      dotted: false,
    },
    controls: {
      type: { type: "select", options: ["line", "text", "icon"] },
      text: { type: "text" },
      dotted: { type: "boolean" },
    },
    render: (props) => (
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Divider {...props} icon={Star} />
      </div>
    ),
    code: ({ type, text, dotted }) =>
      jsx("Divider", {
        type,
        text: type === "line" ? undefined : text,
        dotted: type === "line" ? dotted : undefined,
        icon: type === "icon" ? raw("Star") : undefined,
      }),
  }),
  examples: [
    example(
      {
        id: "variantes",
        kind: "variantes",
        title: "Linha, pontilhada, texto e ícone",
        description: "`dotted` só se aplica à linha simples.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "acesso",
        kind: "aplicado",
        title: "Opções de acesso do estudante",
        description: "Divider com “ou” entre métodos alternativos.",
      },
      LoginOptions,
      loginOptionsCode,
    ),
  ],
  guidelines: [
    {
      do: "Use texto curto e significativo no divisor central (“ou”).",
      dont: "Colocar frases longas ou ações dentro do divisor.",
    },
    {
      do: "Prefira espaçamento (tokens `--hive-space-step-*`) antes de adicionar linhas.",
      dont: "Linhas entre cada elemento, criando ruído visual.",
    },
  ],
  accessibility: {
    notes: [
      '`type="line"` renderiza `<hr role="separator">`.',
      'Com texto ou ícone, o contêiner é `role="separator"` com `aria-label` (o `text`, ou “Divisor”).',
      "Não é focável.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Divider",
      native: "<hr> ou <div>",
      descriptions: {
        type: "line, text ou icon.",
        dotted: "Linha pontilhada (somente `line`).",
        text: "Texto central e nome acessível.",
        icon: 'Ícone central quando `type="icon"`.',
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function DividerPage() {
  return <ComponentPage doc={doc} />;
}
