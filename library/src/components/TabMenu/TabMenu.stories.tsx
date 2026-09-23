import type { Meta, StoryObj } from "@storybook/react";

import { TabMenu } from "./TabMenu";

const tabItems = [
  { key: "overview", label: "Visão geral" },
  { key: "details", label: "Detalhes" },
  { key: "history", label: "Histórico" },
];

const meta = {
  title: "Components/TabMenu",
  component: TabMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "O TabMenu organiza conteúdos relacionados em abas com ativação automática e suporte a orientação horizontal ou vertical.",
          "## Quando usar",
          "- Alternar entre visões irmãs de uma mesma área.",
          "- Reduzir ruído visual sem esconder navegação importante.",
          "## Quando não usar",
          "- Para mudar de página ou contexto de navegação global.",
          "- Quando houver mais de dez itens ou hierarquia profunda.",
          "## Playground",
          "Use os controles para alternar orientação e valor selecionado.",
          "## Matriz de variantes",
          "Horizontal e vertical com estados selecionados.",
          "## Estados",
          "Inclui seleção padrão, controlada e navegação por teclado.",
          "## Exemplo real",
          "Abas de seções de uma ficha com painel associado.",
          "## Acessibilidade",
          "- O componente usa `tablist`, `tab` e `tabpanel` com relacionamentos por id.",
          "- O foco usa roving tabindex para manter a navegação previsível.",
          "## Navegação por teclado",
          "- Horizontal: **ArrowLeft** e **ArrowRight**.",
          "- Vertical: **ArrowUp** e **ArrowDown**.",
          "- **Home** e **End** saltam para as extremidades.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    items: { control: false },
    type: { control: "select", options: ["horizontal", "vertical"] },
    value: { control: "select", options: tabItems.map((item) => item.key) },
    defaultValue: {
      control: "select",
      options: tabItems.map((item) => item.key),
    },
    onValueChange: { action: "changed" },
    ariaLabel: { control: "text" },
  },
} satisfies Meta<typeof TabMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    items: tabItems,
    ariaLabel: "Seções do cadastro",
    type: "horizontal",
  },
};

export const Variants: Story = {
  args: {
    items: tabItems,
    ariaLabel: "Tabs",
  },
  parameters: {
    docs: { description: { story: "Orientações horizontal e vertical." } },
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
      <TabMenu items={tabItems} ariaLabel="Horizontal" />
      <TabMenu items={tabItems} type="vertical" ariaLabel="Vertical" />
    </div>
  ),
};

export const States: Story = {
  args: {
    items: tabItems,
    ariaLabel: "Estados",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplos com valor inicial diferente e navegação vertical destacada.",
      },
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
      <TabMenu
        items={tabItems}
        defaultValue="details"
        ariaLabel="Estado inicial"
      />
      <TabMenu
        items={tabItems}
        type="vertical"
        defaultValue="history"
        ariaLabel="Vertical"
      />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    items: tabItems,
    ariaLabel: "Ficha do aluno",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real: alternância entre áreas de uma ficha de acompanhamento.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <TabMenu items={tabItems} ariaLabel="Ficha do aluno" />
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    items: tabItems,
    ariaLabel: "Acessibilidade das abas",
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Cada aba expõe `aria-selected` e se relaciona com um `tabpanel` via `aria-controls`.",
          "- O painel ativo permanece focável para leitura por teclado e tecnologias assistivas.",
          "## Navegação por teclado",
          "- As setas movem foco e seleção automaticamente.",
          "- **Home**/**End** pulam para o início ou fim da lista.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <TabMenu items={tabItems} ariaLabel="Acessibilidade das abas" />
  ),
};
