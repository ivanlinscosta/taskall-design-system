import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "../Avatar/Avatar";
import { AvatarGroup } from "./AvatarGroup";

const docsDescription = [
  "## Introdução",
  "AvatarGroup empilha participantes para economizar espaço sem perder o contexto coletivo.",
  "## Quando usar",
  "- Mostrar equipes, turmas ou listas curtas de participantes.",
  "- Resumir presença de múltiplas pessoas em cards compactos.",
  "## Quando não usar",
  "- Quando cada pessoa precisa de nome visível ao mesmo tempo.",
  "- Para listas longas que exigem navegação detalhada por item.",
  "## Playground",
  "Ajuste tamanho, limite máximo e rótulo do grupo.",
  "## Matriz de variantes",
  "Compara grupos pequenos, completos e com overflow.",
  "## Estados",
  "Inclui composições com objetos simples e elementos Avatar prontos.",
  "## Exemplo real",
  "Mostra participantes de um fluxo colaborativo.",
  "## Acessibilidade",
  "O grupo usa `role=group` com um rótulo acessível. O overflow vira um marcador com nome próprio.",
  "## Navegação por teclado",
  "Como estrutura não interativa, o grupo não entra em foco por teclado por padrão.",
].join("\n\n");

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    max: { control: "number" },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleAvatars = [
  { fallback: "IC", status: "online" as const },
  { fallback: "AM", status: "verified" as const },
  { fallback: "NO", status: "away" as const },
  { fallback: "BR", status: "busy" as const },
];

export const Playground: Story = {
  args: {
    avatars: sampleAvatars,
    size: "md",
    max: 3,
  },
};

export const Variants: Story = {
  args: {
    avatars: sampleAvatars,
  },
  parameters: {
    docs: {
      description: {
        story: "Compara grupos compactos, completos e com excedente.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <AvatarGroup avatars={sampleAvatars.slice(0, 2)} size="sm" />
      <AvatarGroup avatars={sampleAvatars} size="md" />
      <AvatarGroup avatars={sampleAvatars} size="lg" max={3} />
    </div>
  ),
};

export const States: Story = {
  args: {
    avatars: sampleAvatars,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inclui composição a partir de elementos Avatar e limite máximo.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <AvatarGroup avatars={sampleAvatars} max={2} />
      <AvatarGroup
        size="lg"
        avatars={[
          <Avatar key="1" fallback="IC" status="online" />,
          <Avatar key="2" fallback="AM" status="favorite" />,
          <Avatar key="3" fallback="NO" status="verified" />,
        ]}
      />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    avatars: sampleAvatars,
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo real em um resumo de responsáveis por uma entrega.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <AvatarGroup
        avatars={sampleAvatars}
        max={3}
        ariaLabel="Responsáveis pela tarefa"
      />
      <span
        style={{
          font: "var(--hive-font-paragraph-s)",
          color: "var(--hive-content-secondary)",
        }}
      >
        4 responsáveis acompanhando a entrega.
      </span>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    avatars: sampleAvatars,
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- O grupo recebe `role=group` e um nome acessível descritivo.",
          "- O item de overflow expõe um `aria-label` próprio para a contagem oculta.",
          "## Navegação por teclado",
          "- Use o grupo junto de links ou botões externos quando os avatares precisarem ser acionáveis.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <AvatarGroup
      avatars={sampleAvatars}
      max={2}
      ariaLabel="Participantes da turma"
    />
  ),
};
