import type { Meta, StoryObj } from "@storybook/react";

import { Filter } from "../../icons/Filter";
import { Star } from "../../icons/Star";
import { Divider } from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "Divider separa conteúdo com uma linha simples ou com conteúdo centralizado.",
          "## Quando usar",
          "- Delimitar grupos de ações, seções ou informações relacionadas.",
          "## Quando não usar",
          "- Como substituto de hierarquia visual mais adequada, como espaçamento ou headings.",
          "## Playground",
          "Experimente `line`, `text` e `icon`.",
          "## Matriz de variantes",
          "Linha contínua, linha tracejada, texto central e ícone central.",
          "## Estados",
          "A variação `dotted` se aplica à linha principal.",
          "## Exemplo real",
          "Separação entre filtros, resultados e blocos de formulário.",
          "## Acessibilidade",
          "Usa `role=separator` e nome acessível quando há conteúdo central.",
          "## Navegação por teclado",
          "Sem interação própria.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    type: { control: "select", options: ["line", "text", "icon"] },
    dotted: { control: "boolean" },
    text: { control: "text" },
    icon: { control: false },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    type: "line",
    dotted: false,
  },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: "Matriz com os três tipos de divisor." } },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: 343,
      }}
    >
      <Divider />
      <Divider dotted />
      <Divider type="text" text="ou" />
      <Divider type="icon" icon={Star} />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: "Comparação entre linha simples e conteúdo central.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: 343,
      }}
    >
      <Divider />
      <Divider type="text" text="Continuar" />
      <Divider type="icon" icon={Filter} text="Filtros" />
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real: separação entre login social e formulário principal.",
      },
    },
  },
  render: () => <Divider type="text" text="ou entre com e-mail" />,
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Use `text` ou um `aria-label` implícito para descrever separadores com significado contextual.",
          "## Navegação por teclado",
          "- O componente não é focável por padrão.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: 343,
      }}
    >
      <Divider type="text" text="Próxima etapa" />
      <Divider type="icon" icon={Star} />
    </div>
  ),
};
