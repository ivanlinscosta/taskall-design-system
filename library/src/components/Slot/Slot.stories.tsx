import type { Meta, StoryObj } from "@storybook/react";

import { BellNotification as Bell } from "../../icons/BellNotification";
import { Home } from "../../icons/Home";
import { Cog as Settings } from "../../icons/Cog";
import { Slot } from "./Slot";

const meta = {
  title: "Components/Slot",
  component: Slot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "Slot é um contêiner visual compacto para ícones, avatares pequenos ou contadores curtos.",
          "## Quando usar",
          "- Agrupar um item visual pequeno com fundo neutro.",
          "## Quando não usar",
          "- Como alvo interativo isolado sem semântica apropriada.",
          "## Playground",
          "Escolha o `size` e injete qualquer child.",
          "## Matriz de variantes",
          "Tamanhos de 2xl até xs.",
          "## Estados",
          "O componente em si é apenas apresentacional.",
          "## Exemplo real",
          "Ícones em listas de atalhos e metadados.",
          "## Acessibilidade",
          "Adicione nome acessível quando o conteúdo visual sozinho não for suficiente.",
          "## Navegação por teclado",
          "Sem foco por padrão; herda do child quando aplicável.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["2xl", "xl", "lg", "md", "sm", "xs"] },
    children: { control: false },
  },
} satisfies Meta<typeof Slot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: "md",
    children: <Bell size={16} aria-hidden="true" />,
  },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: "Matriz dos seis tamanhos disponíveis." } },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {(["2xl", "xl", "lg", "md", "sm", "xs"] as const).map((size) => (
        <Slot key={size} size={size} aria-label={`Slot ${size}`}>
          <Bell
            size={size === "xs" ? 10 : size === "sm" ? 12 : 16}
            aria-hidden="true"
          />
        </Slot>
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: { story: "Exemplos com ícone, texto curto e iniciais." },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Slot>
        <Home size={16} aria-hidden="true" />
      </Slot>
      <Slot>2</Slot>
      <Slot size="lg">AB</Slot>
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: slots visuais em uma lista de atalhos rápidos.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Slot size="lg">
        <Home size={16} aria-hidden="true" />
      </Slot>
      <Slot size="lg">
        <Bell size={16} aria-hidden="true" />
      </Slot>
      <Slot size="lg">
        <Settings size={16} aria-hidden="true" />
      </Slot>
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Forneça `aria-label` quando o conteúdo do slot não tiver texto legível.",
          "## Navegação por teclado",
          "- Adicione foco apenas se o slot fizer parte de um elemento interativo maior.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <Slot aria-label="Notificações">
      <Bell size={16} aria-hidden="true" />
    </Slot>
  ),
};
