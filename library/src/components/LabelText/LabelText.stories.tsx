import type { Meta, StoryObj } from "@storybook/react";

import { LabelText } from "./LabelText";

const meta = {
  title: "Components/LabelText",
  component: LabelText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "LabelText exibe rótulos curtos com ênfase semibold usando a escala tipográfica do sistema.",
          "## Quando usar",
          "- Legendas, rótulos de campos e pequenos destaques textuais.",
          "## Quando não usar",
          "- Para blocos de texto longo ou títulos estruturais.",
          "## Playground",
          "Escolha entre l, m, s e xs.",
          "## Matriz de variantes",
          "Escalas de label do design system.",
          "## Estados",
          "Não possui estados interativos.",
          "## Exemplo real",
          "Rótulos de metadados em listas e cards.",
          "## Acessibilidade",
          "Mantém semântica neutra com `<span>`; use em contexto com texto próximo ou ARIA quando preciso.",
          "## Navegação por teclado",
          "Sem foco próprio.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["l", "m", "s", "xs"] },
    children: { control: "text" },
  },
} satisfies Meta<typeof LabelText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: "m",
    children: "Responsável",
  },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: "Matriz de tamanhos de label." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <LabelText size="l">Label l</LabelText>
      <LabelText size="m">Label m</LabelText>
      <LabelText size="s">Label s</LabelText>
      <LabelText size="xs">Label xs</LabelText>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: { description: { story: "Uso inline e em bloco curto." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <LabelText>Status</LabelText>
      <div>
        <LabelText size="s">Entrega</LabelText>
      </div>
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: metadados de um card de atividade.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <LabelText size="s">Prazo</LabelText>
      <LabelText>Hoje, 18h</LabelText>
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Use rótulos textuais claros e próximos ao conteúdo que descrevem.",
          "## Navegação por teclado",
          "- Não participa da ordem de foco por padrão.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <LabelText aria-label="Campo obrigatório">Obrigatório</LabelText>
  ),
};
