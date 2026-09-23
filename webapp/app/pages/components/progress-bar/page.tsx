import { ProgressBar, type ProgressBarProps } from "@taskall/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import GoalsCard from "./examples/GoalsCard";
import goalsCardCode from "./examples/GoalsCard?raw";
import Tones from "./examples/Tones";
import tonesCode from "./examples/Tones?raw";
import UploadExample from "./examples/Upload";
import uploadCode from "./examples/Upload?raw";

const page = findPage("componentes", "progress-bar");

const doc: ComponentDoc = {
  page,
  description:
    "ProgressBar mostra avanço quantitativo de 0 a 100 com rótulo e percentual opcionais. Valores são arredondados a uma casa e limitados ao intervalo.",
  whenToUse: [
    "Uploads, importações e sincronizações com progresso mensurável.",
    "Metas e percentuais em cards (frequência, tarefas entregues).",
  ],
  whenNotToUse: [
    "Esperas sem estimativa — use o `loading` do Button ou um spinner.",
    "Comparar muitas séries — use um gráfico.",
  ],
  usage: `import { ProgressBar } from "@taskall/react";

<ProgressBar label="Tarefas entregues" value={72} showPercentage />`,
  playground: definePlayground({
    component: "ProgressBar",
    initial: {
      value: 64,
      label: "Tarefas entregues",
      showPercentage: true,
      tone: "brand" as NonNullable<ProgressBarProps["tone"]>,
      size: "medium" as NonNullable<ProgressBarProps["size"]>,
    },
    controls: {
      value: { type: "number", min: 0, max: 100 },
      label: { type: "text" },
      showPercentage: { type: "boolean" },
      tone: {
        type: "select",
        options: [
          "brand",
          "purple",
          "blue",
          "green",
          "yellow",
          "orange",
          "red",
          "pink",
        ],
      },
      size: { type: "select", options: ["medium", "small"] },
    },
    render: (props) => (
      <div style={{ width: "100%", maxWidth: 360 }}>
        <ProgressBar {...props} label={props.label || undefined} />
      </div>
    ),
    code: (props) => jsx("ProgressBar", props),
  }),
  examples: [
    example(
      {
        id: "tons",
        kind: "variantes",
        title: "Tons",
        description:
          "brand segue a marca; os demais são tons fixos de categoria.",
      },
      Tones,
      tonesCode,
    ),
    example(
      {
        id: "upload",
        kind: "estados",
        title: "Upload em andamento",
        description:
          "Valor atualizado em tempo real e troca de tom ao concluir.",
      },
      UploadExample,
      uploadCode,
    ),
    example(
      {
        id: "metas",
        kind: "aplicado",
        title: "Metas do bimestre",
        description: "Várias barras rotuladas em um card do estudante.",
      },
      GoalsCard,
      goalsCardCode,
    ),
  ],
  guidelines: [
    {
      do: "Sempre informe `label` (visível ou não) — ele é o nome acessível da barra.",
      dont: "Barras sem contexto do que está sendo medido.",
    },
    {
      do: "Use tons para categorias consistentes (ex.: verde = meta atingida).",
      dont: "Cores aleatórias por barra sem significado.",
    },
  ],
  accessibility: {
    notes: [
      '`role="progressbar"` com `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow` e `aria-valuetext` (ex.: “64%”).',
      "`label` vira o `aria-label` da barra.",
      'Não é focável; para progresso que muda sozinho, anuncie a conclusão em uma região `role="status"`.',
    ],
    keyboard: [],
  },
  api: [
    {
      name: "ProgressBar",
      native: "<div>",
      descriptions: {
        value: "Percentual de 0 a 100 (limitado e arredondado a 1 casa).",
        label: "Rótulo visível e nome acessível.",
        showPercentage: "Exibe o percentual à direita do rótulo.",
        tone: "Cor da barra: brand ou um tom de categoria.",
        size: "Espessura: medium ou small.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function ProgressBarPage() {
  return <ComponentPage doc={doc} />;
}
