import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";

const docsDescription = [
  "## Introdução",
  "ProgressBar mostra avanço quantitativo em uma trilha horizontal curta e direta.",
  "## Quando usar",
  "- Comunicar progresso de upload, sincronização ou etapas concluídas.",
  "- Resumir percentuais em cards, listas e painéis pequenos.",
  "## Quando não usar",
  "- Para tarefas sem estimativa mensurável de avanço.",
  "- Quando o estado precisa de múltiplas ações ou explicações detalhadas.",
  "## Playground",
  "Teste valores, tons e a exibição opcional do percentual.",
  "## Matriz de variantes",
  "Compara tons e escalas de altura da barra.",
  "## Estados",
  "Inclui valores baixos, médios e próximos do final.",
  "## Exemplo real",
  "Mostra o acompanhamento de um envio de documentação.",
  "## Acessibilidade",
  "A barra usa `role=progressbar` com valor mínimo, máximo, atual e texto percentual.",
  "## Navegação por teclado",
  "Não é interativa por padrão; use controles adjacentes quando houver ação.",
].join("\n\n");

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
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
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    showPercentage: { control: "boolean" },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 56,
    label: "Documentação enviada",
    tone: "brand",
    size: "medium",
    showPercentage: true,
  },
};

export const Variants: Story = {
  args: {
    value: 20,
  },
  parameters: {
    docs: {
      description: {
        story: "Matriz de tons em barras de referência com largura de 300px.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <ProgressBar value={20} tone="brand" label="Brand" />
      <ProgressBar value={35} tone="blue" label="Blue" />
      <ProgressBar value={50} tone="green" label="Green" />
      <ProgressBar value={65} tone="orange" label="Orange" />
      <ProgressBar value={80} tone="pink" label="Pink" />
    </div>
  ),
};

export const States: Story = {
  args: {
    value: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "Compara estados de avanço e alturas small/medium.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <ProgressBar value={8} label="Iniciando" showPercentage size="small" />
      <ProgressBar
        value={48}
        label="Em processamento"
        showPercentage
        tone="purple"
      />
      <ProgressBar value={92} label="Finalizando" showPercentage tone="green" />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    value: 72,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real para acompanhar o envio de documentos do cadastro.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <span
        style={{
          font: "var(--hive-font-paragraph-s)",
          color: "var(--hive-content-primary)",
        }}
      >
        Envio de documentação
      </span>
      <ProgressBar
        value={72}
        label="Arquivos validados"
        showPercentage
        tone="blue"
      />
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    value: 44,
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- `role=progressbar` expõe o valor atual com `aria-valuenow` e `aria-valuetext`.",
          "- O rótulo opcional vira o nome acessível da barra.",
          "## Navegação por teclado",
          "- Como visualização não interativa, a barra não recebe foco por teclado.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <ProgressBar
      value={44}
      label="Leitura acessível"
      showPercentage
      tone="red"
    />
  ),
};
