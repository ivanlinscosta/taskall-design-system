import { Bell, Slot, type SlotProps } from "@taskall/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Shortcuts from "./examples/Shortcuts";
import shortcutsCode from "./examples/Shortcuts?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";

const page = findPage("componentes", "slot");

const doc: ComponentDoc = {
  page,
  description:
    "Slot é um contêiner quadrado com fundo neutro para ícones, mini avatares ou contadores. Tamanhos de 16px (xs) a 44px (2xl) com o raio de superfície do tema.",
  whenToUse: [
    "Dar peso visual a um ícone em listas de atalhos e metadados.",
    "Alinhar elementos pequenos em uma grade consistente.",
  ],
  whenNotToUse: [
    "Como botão — Slot é apresentacional; envolva em `<button>`/`<a>` com rótulo.",
    "Para fotos de pessoas — use Avatar.",
  ],
  usage: `import { Bell, Slot } from "@taskall/react";

<Slot size="xl">
  <Bell size={20} aria-hidden="true" />
</Slot>`,
  playground: definePlayground({
    component: "Slot",
    initial: { size: "xl" as NonNullable<SlotProps["size"]> },
    controls: {
      size: { type: "select", options: ["2xl", "xl", "lg", "md", "sm", "xs"] },
    },
    render: ({ size }) => (
      <Slot size={size}>
        <Bell
          size={
            size === "2xl"
              ? 24
              : size === "xl" || size === "lg"
                ? 20
                : size === "md"
                  ? 16
                  : 12
          }
          aria-hidden="true"
        />
      </Slot>
    ),
    code: ({ size }) =>
      jsx("Slot", { size }, `<Bell size={20} aria-hidden="true" />`),
  }),
  examples: [
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description: "2xl (44px) a xs (16px); ajuste o ícone ao tamanho.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "atalhos",
        kind: "aplicado",
        title: "Atalhos do app do responsável",
        description: "Slot dentro de links com área de toque de 44px.",
      },
      Shortcuts,
      shortcutsCode,
    ),
  ],
  guidelines: [
    {
      do: "Deixe o ícone decorativo e coloque o significado em texto ao lado.",
      dont: "Slot isolado clicável sem nome acessível.",
    },
    {
      do: "Mantenha o mesmo tamanho de Slot dentro de uma lista.",
      dont: "Misturar tamanhos na mesma coluna.",
    },
  ],
  accessibility: {
    notes: [
      "`<span>` sem papel: não é anunciado sozinho.",
      'Se o conteúdo tiver significado sem texto ao lado, use `role="img"` + `aria-label` no Slot.',
      "Tamanhos abaixo de 44px não são alvos de toque — a área clicável deve ser o contêiner pai.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Slot",
      native: "<span>",
      descriptions: { size: "2xl, xl, lg, md, sm ou xs." },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function SlotPage() {
  return <ComponentPage doc={doc} />;
}
