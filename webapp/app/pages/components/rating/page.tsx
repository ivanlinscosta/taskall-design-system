import { Rating, type RatingProps } from "@taskall/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import ActivityFeedback from "./examples/ActivityFeedback";
import activityFeedbackCode from "./examples/ActivityFeedback?raw";
import ReadOnly from "./examples/ReadOnly";
import readOnlyCode from "./examples/ReadOnly?raw";
import Variants from "./examples/Variants";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "rating");

const doc: ComponentDoc = {
  page,
  description:
    "Rating coleta ou exibe uma nota rápida em estrelas ou corações. No modo editável segue o padrão radiogroup; em `readOnly` suporta frações (ex.: 4,5).",
  whenToUse: [
    "Pesquisas rápidas de satisfação após uma atividade.",
    "Exibir a média de avaliações em modo somente leitura.",
  ],
  whenNotToUse: [
    "Notas escolares oficiais ou escalas detalhadas — use um campo numérico.",
    "Quando a decisão precisa de justificativa — combine com um campo de texto.",
  ],
  usage: `import { Rating } from "@taskall/react";

<Rating label="Nota da atividade" value={value} onChange={setValue} />
<Rating readOnly value={4.5} label="Média da turma" />`,
  playground: definePlayground({
    component: "Rating",
    initial: {
      value: 3,
      max: 5,
      type: "star" as NonNullable<RatingProps["type"]>,
      direction: "horizontal" as NonNullable<RatingProps["direction"]>,
      readOnly: false,
      label: "Nota da atividade",
    },
    controls: {
      value: { type: "number", min: 0, max: 10, step: 0.5 },
      max: { type: "number", min: 1, max: 10 },
      type: { type: "select", options: ["star", "heart"] },
      direction: { type: "select", options: ["horizontal", "vertical"] },
      readOnly: { type: "boolean" },
      label: { type: "text" },
    },
    render: (props) => <Rating {...props} />,
    code: (props) =>
      jsx("Rating", {
        ...props,
        onChange: props.readOnly ? undefined : { raw: "setValue" },
      }),
  }),
  examples: [
    example(
      {
        id: "variantes",
        kind: "variantes",
        title: "Estrelas, corações e vertical",
        description: "Modo editável não controlado, com `max` customizado.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "somente-leitura",
        kind: "estados",
        title: "Somente leitura",
        description:
          "Valores fracionados com meia estrela; exposto como imagem com rótulo.",
      },
      ReadOnly,
      readOnlyCode,
    ),
    example(
      {
        id: "feedback-atividade",
        kind: "aplicado",
        title: "Feedback de atividade",
        description: "Coleta a nota e confirma o envio.",
      },
      ActivityFeedback,
      activityFeedbackCode,
    ),
  ],
  guidelines: [
    {
      do: "Mostre o valor numérico junto do modo `readOnly` (“4,5 de 5”).",
      dont: "Depender só da leitura visual de estrelas parciais.",
    },
    {
      do: "Dê um `label` específico (“Nota da atividade”).",
      dont: "Usar o rótulo padrão “Avaliação” em telas com vários ratings.",
    },
  ],
  accessibility: {
    notes: [
      'Editável: `role="radiogroup"` com itens `role="radio"` rotulados (“3 estrelas”) e roving tabindex.',
      '`readOnly`: `role="img"` com `aria-label` “Rótulo: valor de máximo”.',
      "Ícones de 20px: em telas touch, considere espaçamento extra ao redor do componente.",
    ],
    keyboard: [
      { keys: "Tab", action: "Entra no grupo na nota atual." },
      { keys: "→ / ↓", action: "Aumenta a nota." },
      { keys: "← / ↑", action: "Diminui a nota." },
      { keys: "Home", action: "Vai para a primeira opção." },
      { keys: "End", action: "Vai para a última opção." },
      { keys: "Enter", action: "Confirma a opção focada (também Espaço)." },
    ],
  },
  api: [
    {
      name: "Rating",
      native: "<div>",
      descriptions: {
        value: "Nota controlada (aceita frações em `readOnly`).",
        max: "Quantidade de itens (padrão 5).",
        type: "star ou heart.",
        readOnly: "Somente exibição, sem interação.",
        onChange: "Chamado com a nova nota.",
        label: "Nome acessível do grupo (padrão “Avaliação”).",
        direction: "horizontal ou vertical.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function RatingPage() {
  return <ComponentPage doc={doc} />;
}
