import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "O Tooltip adiciona contexto breve a um elemento de interface sem competir com o conteúdo principal.",
          "## Quando usar",
          "- Explicar um ícone, atalho ou ação secundária.",
          "- Complementar um rótulo curto com mais contexto.",
          "## Quando não usar",
          "- Para informação essencial ao entendimento da tarefa.",
          "- Para textos longos, instruções passo a passo ou conteúdo que precise permanecer visível.",
          "## Playground",
          "Use os controles para trocar tamanho, variante visual e posição.",
          "## Matriz de variantes",
          "Mostra outline, light e filled em tamanhos pequenos e grandes.",
          "## Estados",
          "Inclui abertura por hover e por foco no gatilho.",
          "## Exemplo real",
          "Ajuda contextual em uma ação secundária de interface.",
          "## Acessibilidade",
          "- O tooltip é complementar: não coloque informação essencial apenas nele.",
          "- O gatilho permanece o elemento interativo principal; o conteúdo aparece por hover e foco.",
          "## Navegação por teclado",
          "- **Tab** move o foco para o gatilho.",
          "- Ao focar, o tooltip aparece após o delay configurado pelo provider.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    size: { control: "select", options: ["small", "large"] },
    visualStyle: { control: "select", options: ["outline", "light", "filled"] },
    side: { control: "select", options: ["top", "bottom", "left", "right"] },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "Editar cadastro",
    description: "Abre a edição em contexto sem sair da tela atual.",
    size: "large",
    visualStyle: "light",
    side: "top",
    children: <Button>Passar o mouse</Button>,
  },
};

export const Variants: Story = {
  args: {
    title: "Tooltip",
    children: <Button>Tooltip</Button>,
  },
  parameters: {
    docs: {
      description: { story: "Matriz com variantes visuais e tamanhos." },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Tooltip title="Outline" visualStyle="outline" size="small">
        <Button>Outline</Button>
      </Tooltip>
      <Tooltip title="Light" visualStyle="light" size="small">
        <Button>Light</Button>
      </Tooltip>
      <Tooltip
        title="Filled"
        description="Variante com alto contraste para contextos densos."
        visualStyle="filled"
        size="large"
      >
        <Button>Filled</Button>
      </Tooltip>
    </div>
  ),
};

export const States: Story = {
  args: {
    title: "Tooltip",
    children: <Button>Tooltip</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplos pequenos, grandes e com diferentes posições.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Tooltip title="Salvar rascunho" side="top">
        <Button>Topo</Button>
      </Tooltip>
      <Tooltip
        title="Excluir"
        description="A ação remove o item permanentemente."
        side="right"
      >
        <Button>Direita</Button>
      </Tooltip>
      <Tooltip title="Compartilhar" side="bottom" visualStyle="outline">
        <Button>Base</Button>
      </Tooltip>
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    title: "Tooltip",
    children: <Button>Tooltip</Button>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real: ação secundária em uma toolbar com ajuda contextual breve.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button>Salvar</Button>
      <Tooltip
        title="Mais opções"
        description="Abre ações avançadas para este registro."
        side="bottom"
      >
        <Button visualStyle="outline" tone="neutral">
          Mais opções
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    title: "Atalho",
    children: <Button>Ação</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- O conteúdo do tooltip complementa o gatilho, mas não substitui rótulos essenciais.",
          "- O padrão funciona com foco e hover, respeitando o delay do provider.",
          "## Navegação por teclado",
          "- **Tab** foca o gatilho.",
          "- Ao focar, o tooltip aparece automaticamente após o delay.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <Tooltip
      title="Atalho"
      description="Pressione Enter para confirmar a ação."
      size="large"
    >
      <Button>Ação</Button>
    </Tooltip>
  ),
};
