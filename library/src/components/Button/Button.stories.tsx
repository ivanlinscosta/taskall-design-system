import type { Meta, StoryObj } from "@storybook/react";

import { Button, type ButtonProps } from "./Button";
import { Add } from "../../icons/Add";
import { ArrowRight } from "../../icons/ArrowRight";
import { Cog as Settings } from "../../icons/Cog";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "O Button comunica ações que as pessoas podem executar. Um botão primário por região.",
          "## Quando usar",
          "- Iniciar, confirmar ou enviar uma ação.",
          "- Disparar ações em fluxos como formulários e dialogs.",
          "## Quando não usar",
          "- Para navegação entre páginas — use um link.",
          "- Para ações inline em listas densas — avalie um icon button.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "neutral", "error"],
    },
    visualStyle: {
      control: "select",
      options: ["filled", "light", "outline"],
    },
    size: {
      control: "select",
      options: ["medium", "small"],
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Salvar",
    tone: "primary",
    visualStyle: "filled",
    size: "medium",
  },
};

const matrix = (tone: ButtonProps["tone"]): Story["args"][] =>
  (["filled", "light", "outline"] as const).map((visualStyle) => ({
    tone,
    visualStyle,
    children: "Botão",
  }));

export const Variants: Story = {
  parameters: {
    docs: {
      description: { story: "Matriz de variantes: 3 tons × 3 estilos." },
    },
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {matrix(args.tone).map((row, i) => (
        <Button key={i} {...args} {...row} />
      ))}
    </div>
  ),
  args: { tone: "primary" },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: "Medium (44px) e small (32px)." } },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button size="medium">Botão medium</Button>
      <Button size="small">Botão small</Button>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: { description: { story: "Disabled, loading e botão com ícones." } },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button disabled>Disabled</Button>
      <Button loading>Carregando</Button>
      <Button rightIcon={ArrowRight}>Continuar</Button>
      <Button leftIcon={Settings} visualStyle="outline">
        Configurações
      </Button>
      <Button tone="error" leftIcon={Add}>
        Excluir
      </Button>
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: barra de ações de uma tela de cadastro.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        width: "100%",
        maxWidth: 480,
        padding: "16px 0",
        borderTop: "1px solid var(--taskall-border-default)",
      }}
    >
      <Button tone="neutral" visualStyle="light">
        Cancelar
      </Button>
      <Button rightIcon={ArrowRight}>Salvar e continuar</Button>
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Botões nativos <button>: Enter e Espaço funcionam por padrão.",
          "- `loading` adiciona `aria-busy` e desabilita o botão, mantendo o texto acessível.",
          "- Ícones decorativos usam `aria-hidden`; quando o botão só tem ícone, forneça `aria-label`.",
          "## Navegação por teclado",
          "- **Tab** foca o botão, **Enter**/**Espaço** ativam.",
          "- O foco visível segue `prefers-reduced-motion` e o anel de foco do tema.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button aria-label="Fechar jornada" rightIcon={Add} />
      <Button>Fechar jornada</Button>
    </div>
  ),
};
