import type { Meta, StoryObj } from "@storybook/react";

import { Paragraph } from "./Paragraph";

const meta = {
  title: "Components/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "Paragraph organiza texto corrido com escalas tipográficas do sistema.",
          "## Quando usar",
          "- Descrições, resumos e conteúdo textual curto ou médio.",
          "## Quando não usar",
          "- Para títulos ou rótulos de interface — use Heading ou LabelText.",
          "## Playground",
          "Ajuste `size` para densidades diferentes de texto corrido.",
          "## Matriz de variantes",
          "Escalas l, m, s e xs.",
          "## Estados",
          "Não possui estados visuais próprios.",
          "## Exemplo real",
          "Texto de apoio em cards e listas.",
          "## Acessibilidade",
          "Usa elemento `<p>` nativo para leitura linear por leitores de tela.",
          "## Navegação por teclado",
          "Sem comportamento de teclado adicional.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["l", "m", "s", "xs"] },
    children: { control: "text" },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: "m",
    children:
      "Acompanhe as próximas atividades e priorize o que precisa de atenção imediata.",
  },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: "Matriz de tamanhos para texto corrido." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Paragraph size="l">Paragraph l</Paragraph>
      <Paragraph size="m">Paragraph m</Paragraph>
      <Paragraph size="s">Paragraph s</Paragraph>
      <Paragraph size="xs">Paragraph xs</Paragraph>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: { story: "Uso com conteúdo mais curto e mais longo." },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 420,
      }}
    >
      <Paragraph size="m">Texto breve.</Paragraph>
      <Paragraph size="s">
        Texto um pouco mais longo para mostrar quebra de linha e comportamento
        do espaçamento.
      </Paragraph>
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real: descrição de uma tarefa em uma visão de detalhes.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Paragraph>
        Revise os dados desta entrega e confirme se todos os anexos obrigatórios
        foram enviados antes de concluir a etapa.
      </Paragraph>
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Mantenha o conteúdo textual claro e em ordem lógica de leitura.",
          "## Navegação por teclado",
          "- O componente não recebe foco por padrão.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <Paragraph>Leitura linear e semântica nativa de parágrafo.</Paragraph>
  ),
};
