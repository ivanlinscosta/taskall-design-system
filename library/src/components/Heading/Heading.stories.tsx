import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./Heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "Heading comunica hierarquia de informação com semântica nativa e aparência desacoplada.",
          "## Quando usar",
          "- Títulos de páginas, seções e blocos de conteúdo.",
          "- Quando a ordem do outline semântico precisa ser preservada.",
          "## Quando não usar",
          "- Para texto corrido ou rótulos curtos — use Paragraph ou LabelText.",
          "## Playground",
          "Ajuste `level` para semântica e `as` para tamanho visual.",
          "## Matriz de variantes",
          "Visual levels de h1 a h6 sobre semânticas diferentes.",
          "## Estados",
          "O componente não possui estados interativos próprios.",
          "## Exemplo real",
          "Títulos de uma tela de dashboard com subtítulos menores.",
          "## Acessibilidade",
          "Usa headings nativos sem `role` adicional.",
          "## Navegação por teclado",
          "Não adiciona comportamento de teclado além da semântica nativa.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    as: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    children: { control: "text" },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Painel de controle",
    level: 1,
    as: 1,
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Visual levels h1–h6 aplicados na mesma semântica.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <Heading key={value} level={2} as={value as 1 | 2 | 3 | 4 | 5 | 6}>
          Heading visual {value}
        </Heading>
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: "Semântica e aparência podem divergir quando necessário.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Heading level={1} as={3}>
        H1 com aparência de H3
      </Heading>
      <Heading level={3} as={1}>
        H3 com aparência de H1
      </Heading>
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: cabeçalho de uma página com título e subtítulo.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Heading level={1} as={2}>
        Visão geral da jornada
      </Heading>
      <Heading level={2} as={5}>
        Métricas principais da semana
      </Heading>
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Preserve a ordem lógica dos headings na página.",
          "- Use `as` apenas para aparência; `level` controla a semântica real.",
          "## Navegação por teclado",
          "- Headings não entram no fluxo de Tab por padrão.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Heading level={2}>Resumo</Heading>
      <Heading level={3}>Itens pendentes</Heading>
    </div>
  ),
};
