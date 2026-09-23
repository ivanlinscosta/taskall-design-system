import { Button, Tooltip, type TooltipProps } from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Sides from "./examples/Sides";
import sidesCode from "./examples/Sides?raw";
import Toolbar from "./examples/Toolbar";
import toolbarCode from "./examples/Toolbar?raw";
import Variants from "./examples/Variants";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "tooltip");

const doc: ComponentDoc = {
  page,
  description:
    "Tooltip mostra uma dica curta ao passar o mouse ou focar um elemento. Baseado em Radix Tooltip, com portal, seta e posicionamento automático.",
  whenToUse: [
    "Nomear botões só com ícone em barras de ferramentas.",
    "Dar uma explicação breve e complementar sobre um termo ou ação.",
  ],
  whenNotToUse: [
    "Informação essencial para concluir a tarefa — deixe visível na tela.",
    "Conteúdo interativo (links, botões) — use um popover ou Modal.",
    "Em elementos não focáveis: quem usa teclado ou toque não verá a dica.",
  ],
  usage: `import { Tooltip } from "@hive/react";

<Tooltip title="Baixar todas as entregas">
  <button type="button" aria-label="Baixar todas as entregas">
    <Download aria-hidden="true" />
  </button>
</Tooltip>`,
  playground: definePlayground({
    component: "Tooltip",
    initial: {
      title: "Entrega em grupo",
      description: "Um integrante envia o arquivo em nome do grupo.",
      side: "top" as NonNullable<TooltipProps["side"]>,
      visualStyle: "light" as NonNullable<TooltipProps["visualStyle"]>,
    },
    controls: {
      title: { type: "text" },
      description: { type: "text" },
      side: { type: "select", options: ["top", "right", "bottom", "left"] },
      visualStyle: { type: "select", options: ["light", "filled", "outline"] },
    },
    render: ({ description, ...props }) => (
      <Tooltip {...props} description={description || undefined}>
        <Button tone="neutral" visualStyle="outline">
          Passe o mouse ou foque
        </Button>
      </Tooltip>
    ),
    code: (props) =>
      jsx("Tooltip", props, `<Button>Passe o mouse ou foque</Button>`),
  }),
  examples: [
    example(
      {
        id: "estilos",
        kind: "variantes",
        title: "Estilos e tamanho",
        description:
          "light, filled, outline; `description` muda para o tamanho large.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "posicoes",
        kind: "variantes",
        title: "Posições",
        description: "`side` preferido; o Radix inverte se faltar espaço.",
      },
      Sides,
      sidesCode,
    ),
    example(
      {
        id: "barra-ferramentas",
        kind: "aplicado",
        title: "Barra de ações das entregas",
        description:
          "Botões de ícone com aria-label e tooltip com o mesmo texto.",
      },
      Toolbar,
      toolbarCode,
    ),
  ],
  guidelines: [
    {
      do: "Repita o nome acessível do botão de ícone no `title` do tooltip.",
      dont: "Colocar no tooltip a única explicação de um campo obrigatório.",
    },
    {
      do: "Frases curtas, sem pontuação final quando for um rótulo.",
      dont: "Parágrafos longos ou links dentro do tooltip.",
    },
  ],
  accessibility: {
    notes: [
      "Abre no hover (300ms) e no foco do teclado; fecha com Esc ou ao sair.",
      "O conteúdo é associado ao gatilho via `aria-describedby` pelo Radix.",
      "O filho precisa ser focável e aceitar ref (`<button>`, `<a>`, componentes com forwardRef).",
      "Em telas touch, tooltips não aparecem de forma confiável — não dependa deles para informação crítica.",
    ],
    keyboard: [
      { keys: "Tab", action: "Foca o gatilho e mostra o tooltip." },
      { keys: "Esc", action: "Fecha o tooltip mantendo o foco." },
    ],
  },
  api: [
    {
      name: "Tooltip",
      native: "<div> (conteúdo)",
      descriptions: {
        title: "Texto principal do tooltip.",
        description: "Texto secundário; ativa o tamanho large.",
        children: "Gatilho: um único elemento focável que aceite ref.",
        size: "small ou large (padrão: automático pela `description`).",
        visualStyle: "light, filled ou outline.",
        side: "Lado preferido: top, right, bottom ou left.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function TooltipPage() {
  return <ComponentPage doc={doc} />;
}
