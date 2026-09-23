import type { Meta, StoryObj } from "@storybook/react";

import { Rating } from "./Rating";

const meta = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "O Rating comunica uma avaliação rápida por estrelas ou corações, com suporte a leitura estática e escolha interativa.",
          "## Quando usar",
          "- Coletar uma nota curta em formulários ou pesquisas rápidas.",
          "- Exibir a média de avaliações em modo somente leitura.",
          "## Quando não usar",
          "- Quando a decisão precisa de justificativa textual ou escala detalhada.",
          "- Para métricas críticas sem contexto adicional.",
          "## Playground",
          "Use os controles para alternar tipo, direção e estados editáveis.",
          "## Matriz de variantes",
          "Mostra estrelas e corações em modo editável e somente leitura.",
          "## Estados",
          "Cobertura para interação padrão, vertical e readOnly.",
          "## Exemplo real",
          "Um fluxo simples de avaliação de conteúdo após uma ação concluída.",
          "## Acessibilidade",
          "- Em modo editável, o componente segue o padrão de `radiogroup` com itens `radio`.",
          "- Em `readOnly`, o valor é exposto como imagem acessível com rótulo descritivo.",
          "## Navegação por teclado",
          "- **Setas** mudam foco e seleção.",
          "- **Home** vai para a primeira opção e **End** para a última.",
          "- **Enter** e **Espaço** confirmam a opção focada.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 5, step: 0.5 } },
    max: { control: { type: "number", min: 1, max: 10, step: 1 } },
    type: { control: "select", options: ["star", "heart"] },
    readOnly: { control: "boolean" },
    label: { control: "text" },
    direction: { control: "select", options: ["horizontal", "vertical"] },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: "Avaliação do curso",
    value: 3,
    max: 5,
    type: "star",
    direction: "horizontal",
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Estrelas e corações nos estados editável e readOnly.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Rating label="Avaliação por estrelas" value={4} type="star" />
      <Rating label="Avaliação por estrelas" value={3.5} type="star" readOnly />
      <Rating label="Avaliação por corações" value={4} type="heart" />
      <Rating
        label="Avaliação por corações"
        value={2.5}
        type="heart"
        readOnly
      />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: { story: "Exemplos horizontal, vertical e readOnly." },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <Rating label="Horizontal" value={2} />
      <Rating label="Vertical" value={3} direction="vertical" />
      <Rating label="Somente leitura" value={4.5} readOnly />
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: feedback rápido após concluir uma aula.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <strong
        style={{
          font: "var(--hive-font-label-s)",
          color: "var(--hive-content-primary)",
        }}
      >
        Como foi sua experiência?
      </strong>
      <Rating label="Experiência da aula" value={4} />
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Cada item interativo usa `role=radio` com nome acessível por quantidade.",
          "- O foco visível segue os tokens do tema.",
          "- O tamanho visual do ícone é 20×20; documente a exceção de touch target em contextos compactos.",
          "## Navegação por teclado",
          "- **Setas** mudam a seleção sem sair do grupo.",
          "- **Home**/**End** saltam para extremidades.",
        ].join("\n\n"),
      },
    },
  },
  render: () => <Rating label="Acessibilidade da avaliação" value={3} />,
};
