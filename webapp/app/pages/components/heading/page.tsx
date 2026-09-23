import { Heading, type HeadingLevel } from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Dashboard from "./examples/Dashboard";
import dashboardCode from "./examples/Dashboard?raw";
import Levels from "./examples/Levels";
import levelsCode from "./examples/Levels?raw";
import SemanticVsVisual from "./examples/SemanticVsVisual";
import semanticVsVisualCode from "./examples/SemanticVsVisual?raw";

const page = findPage("componentes", "heading");
const levels = ["1", "2", "3", "4", "5", "6"] as const;
type LevelOption = (typeof levels)[number];

const doc: ComponentDoc = {
  page,
  description:
    "Heading renderiza títulos h1–h6 com a escala tipográfica do Hive. `level` define a semântica; `as` define só a aparência.",
  whenToUse: [
    "Títulos de páginas, seções, cards e modais.",
    "Sempre que a hierarquia precisa aparecer no outline para leitores de tela.",
  ],
  whenNotToUse: [
    "Texto corrido — use Paragraph.",
    "Rótulos curtos de interface — use LabelText.",
    "Só para deixar um texto em negrito/maior sem ser título.",
  ],
  usage: `import { Heading } from "@hive/react";

<Heading level={1} as={4}>Painel da coordenação</Heading>
<Heading level={2} as={6}>Tarefas atrasadas</Heading>`,
  playground: definePlayground({
    component: "Heading",
    initial: {
      children: "Tarefas da semana",
      level: "2" as LevelOption,
      as: "2" as LevelOption,
    },
    controls: {
      children: { type: "text" },
      level: { type: "select", options: levels },
      as: { type: "select", options: levels },
    },
    render: ({ children, level, as }) => (
      <Heading
        level={Number(level) as HeadingLevel}
        as={Number(as) as HeadingLevel}
      >
        {children}
      </Heading>
    ),
    code: ({ children, level, as }) =>
      jsx(
        "Heading",
        { level: Number(level), as: as === level ? undefined : Number(as) },
        children,
      ),
  }),
  examples: [
    example(
      {
        id: "niveis",
        kind: "variantes",
        title: "Escala h1–h6",
        description: "Tamanhos vindos de `--hive-font-h1…h6`.",
      },
      Levels,
      levelsCode,
    ),
    example(
      {
        id: "semantica-aparencia",
        kind: "variantes",
        title: "Semântica × aparência",
        description: "Combine `level` e `as` para manter o outline correto.",
      },
      SemanticVsVisual,
      semanticVsVisualCode,
    ),
    example(
      {
        id: "painel",
        kind: "aplicado",
        title: "Painel da coordenação",
        description: "Um h1 por página e h2 por seção, com tamanhos compactos.",
      },
      Dashboard,
      dashboardCode,
    ),
  ],
  guidelines: [
    {
      do: "Um `level={1}` por página e níveis sem saltos (h1 → h2 → h3).",
      dont: "Escolher o nível pelo tamanho visual — use `as` para isso.",
    },
    {
      do: "Títulos curtos e descritivos que funcionem fora de contexto.",
      dont: "Títulos genéricos como “Informações” repetidos em várias seções.",
    },
  ],
  accessibility: {
    notes: [
      "Renderiza `<h1>`…`<h6>` nativos: leitores de tela navegam pela lista de títulos.",
      "`as` altera apenas classes visuais; a semântica vem de `level`.",
      "Não adiciona foco nem comportamento de teclado.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Heading",
      native: "<h1>…<h6>",
      descriptions: {
        level: "Nível semântico (1–6).",
        as: "Nível visual (1–6); padrão = `level`.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function HeadingPage() {
  return <ComponentPage doc={doc} />;
}
