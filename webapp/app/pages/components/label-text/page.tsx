import { LabelText, type LabelTextProps } from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import StudentMeta from "./examples/StudentMeta";
import studentMetaCode from "./examples/StudentMeta?raw";

const page = findPage("componentes", "label-text");

const doc: ComponentDoc = {
  page,
  description:
    "LabelText exibe rótulos curtos em semibold usando a escala `--hive-font-label-*` (l, m, s, xs).",
  whenToUse: [
    "Rótulos de metadados (Turma, Matrícula), legendas e pequenos destaques.",
    "Nomes em linhas de lista acima de uma descrição.",
  ],
  whenNotToUse: [
    "Títulos de seção — use Heading para manter a semântica.",
    "Rótulo de campo de formulário — os campos do Hive já trazem `label`.",
    "Parágrafos — use Paragraph.",
  ],
  usage: `import { LabelText } from "@hive/react";

<LabelText size="xs">Matrícula</LabelText>`,
  playground: definePlayground({
    component: "LabelText",
    initial: {
      children: "Entregas pendentes",
      size: "m" as NonNullable<LabelTextProps["size"]>,
    },
    controls: {
      children: { type: "text" },
      size: { type: "select", options: ["l", "m", "s", "xs"] },
    },
    render: ({ children, size }) => (
      <LabelText size={size}>{children}</LabelText>
    ),
    code: ({ children, size }) => jsx("LabelText", { size }, children),
  }),
  examples: [
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Escala",
        description: "l, m (padrão), s e xs.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "ficha-estudante",
        kind: "aplicado",
        title: "Ficha do estudante",
        description: "LabelText como termo de uma lista de definição (`<dl>`).",
      },
      StudentMeta,
      studentMetaCode,
    ),
  ],
  guidelines: [
    {
      do: "Combine com semântica adequada (`<dt>`, `<th>`, legendas).",
      dont: "Usar LabelText grande como substituto de título.",
    },
    {
      do: "Rótulos de 1–3 palavras.",
      dont: "Frases inteiras em semibold, que cansam a leitura.",
    },
  ],
  accessibility: {
    notes: [
      "Renderiza `<span>` sem papel: o significado vem do contexto (ex.: `<dt>`, `<label>`).",
      "Mantenha contraste AA: use `--hive-content-secondary` no mínimo para textos de apoio.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "LabelText",
      native: "<span>",
      descriptions: { size: "l, m, s ou xs." },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function LabelTextPage() {
  return <ComponentPage doc={doc} />;
}
