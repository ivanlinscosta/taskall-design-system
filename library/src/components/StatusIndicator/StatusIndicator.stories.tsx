import type { Meta, StoryObj } from "@storybook/react";

import { StatusIndicator } from "./StatusIndicator";

const docsDescription = [
  "## Introdução",
  "StatusIndicator sinaliza presença, verificação ou pequenas ações com o menor espaço possível.",
  "## Quando usar",
  "- Complementar avatares, listas e resumos compactos.",
  "- Representar presença, disponibilidade ou ações rápidas em contextos densos.",
  "## Quando não usar",
  "- Como único portador de significado crítico sem texto de apoio.",
  "- Para mensagens longas ou feedback que precise de anúncio assistivo.",
  "## Playground",
  "Teste o estado e o tamanho do indicador.",
  "## Matriz de variantes",
  "Compara estados baseados em ponto e em ícone.",
  "## Estados",
  "Inclui presença, favorito e verificação.",
  "## Exemplo real",
  "Mostra o indicador ao lado de um rótulo de disponibilidade.",
  "## Acessibilidade",
  "É decorativo (`aria-hidden`) e deve ser combinado com texto quando o significado for essencial.",
  "## Navegação por teclado",
  "Não é focável por padrão.",
].join("\n\n");

const meta = {
  title: "Components/StatusIndicator",
  component: StatusIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: [
        "online",
        "busy",
        "away",
        "offline",
        "verified",
        "add",
        "delete",
        "favorite",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    status: "online",
    size: "md",
  },
};

export const Variants: Story = {
  args: {
    status: "online",
  },
  parameters: {
    docs: { description: { story: "Matriz com estados de ponto e ícone." } },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <StatusIndicator status="online" />
      <StatusIndicator status="busy" />
      <StatusIndicator status="away" />
      <StatusIndicator status="offline" />
      <StatusIndicator status="verified" />
      <StatusIndicator status="favorite" />
    </div>
  ),
};

export const States: Story = {
  args: {
    status: "verified",
  },
  parameters: {
    docs: {
      description: { story: "Compara escalas diferentes do mesmo indicador." },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <StatusIndicator status="verified" size="xs" />
      <StatusIndicator status="verified" size="sm" />
      <StatusIndicator status="verified" size="md" />
      <StatusIndicator status="verified" size="lg" />
      <StatusIndicator status="verified" size="xl" />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    status: "online",
  },
  parameters: {
    docs: {
      description: { story: "Exemplo real ao lado de um estado de usuário." },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <StatusIndicator status="online" size="lg" />
      <span
        style={{
          font: "var(--hive-font-paragraph-s)",
          color: "var(--hive-content-secondary)",
        }}
      >
        Atendimento disponível agora
      </span>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    status: "busy",
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- O indicador é decorativo e usa `aria-hidden`.",
          "- Em fluxos críticos, complemente a cor com texto próximo.",
          "## Navegação por teclado",
          "- Não recebe foco por teclado e não substitui um controle acionável.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <StatusIndicator status="busy" />
      <span
        style={{
          font: "var(--hive-font-paragraph-s)",
          color: "var(--hive-content-primary)",
        }}
      >
        Ocupado
      </span>
    </div>
  ),
};
