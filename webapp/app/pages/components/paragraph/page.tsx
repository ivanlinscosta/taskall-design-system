import { Paragraph, type ParagraphProps } from "@taskall/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Announcement from "./examples/Announcement";
import announcementCode from "./examples/Announcement?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";

const page = findPage("componentes", "paragraph");

const doc: ComponentDoc = {
  page,
  description:
    "Paragraph formata texto corrido com a escala `--taskall-font-paragraph-*` e renderiza um `<p>` nativo.",
  whenToUse: [
    "Descrições, comunicados, textos de apoio em cards e modais.",
    "Qualquer bloco de leitura com mais de uma frase.",
  ],
  whenNotToUse: ["Títulos — use Heading.", "Rótulos curtos — use LabelText."],
  usage: `import { Paragraph } from "@taskall/react";

<Paragraph size="s">Envie a autorização até sexta-feira.</Paragraph>`,
  playground: definePlayground({
    component: "Paragraph",
    initial: {
      children:
        "A autorização deve ser enviada pelo app até sexta-feira, 26/09.",
      size: "m" as NonNullable<ParagraphProps["size"]>,
    },
    controls: {
      children: { type: "text" },
      size: { type: "select", options: ["l", "m", "s", "xs"] },
    },
    render: ({ children, size }) => (
      <div style={{ maxWidth: 480 }}>
        <Paragraph size={size}>{children}</Paragraph>
      </div>
    ),
    code: ({ children, size }) => jsx("Paragraph", { size }, children),
  }),
  examples: [
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Escala",
        description: "l (18/32), m (16/24), s (14) e xs (12).",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "comunicado",
        kind: "aplicado",
        title: "Comunicado para responsáveis",
        description: "Texto principal em m e instrução secundária em s.",
      },
      Announcement,
      announcementCode,
    ),
  ],
  guidelines: [
    {
      do: "Linhas de 60–80 caracteres (`max-width` em ch) para leitura confortável.",
      dont: "Parágrafos ocupando toda a largura de telas grandes.",
    },
    {
      do: "Use `m` como padrão; `xs` apenas para metadados.",
      dont: "Blocos longos em `xs`.",
    },
  ],
  accessibility: {
    notes: [
      "`<p>` nativo: leitura linear por tecnologias assistivas.",
      "Texto secundário deve usar `--taskall-content-secondary` (contraste AA), nunca `tertiary` para conteúdo essencial.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Paragraph",
      native: "<p>",
      descriptions: { size: "l, m, s ou xs." },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function ParagraphPage() {
  return <ComponentPage doc={doc} />;
}
