import type { Meta, StoryObj } from "@storybook/react";

import { BellNotification as Bell } from "../../icons/BellNotification";
import { BlankCalendar as Calendar } from "../../icons/BlankCalendar";
import { UserCircleSingle as User } from "../../icons/UserCircleSingle";
import { Content } from "./Content";

const badge = (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "0 8px",
      minHeight: 20,
      borderRadius: 999,
      backgroundColor: "var(--taskall-background-secondary)",
      color: "var(--taskall-content-primary)",
      font: "var(--taskall-font-label-xs)",
    }}
  >
    Novo
  </span>
);

const meta = {
  title: "Components/Content",
  component: Content,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "Content combina um elemento visual de apoio com label, descrição opcional e badge final.",
          "## Quando usar",
          "- Linhas compactas em listas, seletores e células de metadados.",
          "## Quando não usar",
          "- Para layouts complexos com múltiplas ações embutidas.",
          "## Playground",
          "Alterne entre `avatar` e `icon`, além dos tamanhos compactos.",
          "## Matriz de variantes",
          "Avatar fallback, avatar customizado, ícone e badge.",
          "## Estados",
          "Sem estado interno; recebe conteúdo por props.",
          "## Exemplo real",
          "Itens de lista, cards compactos e resultados de busca.",
          "## Acessibilidade",
          "Mantenha `label` descritivo; ícones decorativos ficam fora da árvore de acessibilidade.",
          "## Navegação por teclado",
          "Sem interação própria; delegue foco ao contêiner pai quando necessário.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    type: { control: "select", options: ["avatar", "icon"] },
    size: { control: "select", options: ["small", "x-small"] },
    label: { control: "text" },
    description: { control: "text" },
    avatar: { control: false },
    icon: { control: false },
    badge: { control: false },
    avatarSize: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Content>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    type: "avatar",
    size: "small",
    label: "Maria Silva",
    description: "Responsável pela turma",
    badge,
    avatarSize: "md",
  },
};

export const Variants: Story = {
  args: {
    label: "Maria Silva",
  },
  parameters: {
    docs: {
      description: {
        story: "Matriz de combinações com avatar, ícone e badge.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 343,
      }}
    >
      <Content
        label="Maria Silva"
        description="Responsável pela turma"
        badge={badge}
      />
      <Content
        label="Equipe de produto"
        avatar={<span aria-hidden="true">EP</span>}
      />
      <Content
        type="icon"
        label="Calendário"
        description="3 eventos hoje"
        icon={Calendar}
      />
      <Content
        type="icon"
        size="x-small"
        label="Usuários"
        icon={User}
        badge={<span>12</span>}
      />
    </div>
  ),
};

export const States: Story = {
  args: {
    label: "Maria Silva",
  },
  parameters: {
    docs: { description: { story: "Densidades small e x-small." } },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 343,
      }}
    >
      <Content label="Maria Silva" description="Aluno monitor" />
      <Content
        type="icon"
        size="x-small"
        label="Notificações"
        description="2 pendências"
        icon={Bell}
      />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    label: "Maria Silva",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: linhas compactas de uma lista de membros.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 343,
      }}
    >
      <Content
        label="Maria Silva"
        description="Coordenadora"
        badge={<span>Online</span>}
      />
      <Content label="João Souza" description="Professor" />
      <Content
        type="icon"
        label="Calendário"
        description="Próxima reunião amanhã"
        icon={Calendar}
      />
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    label: "Notificações",
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Use `label` como principal texto descritivo do item.",
          "- Ícones decorativos usam `aria-hidden`; badges devem ter texto significativo quando necessário.",
          "## Navegação por teclado",
          "- A linha não é focável sozinha, a menos que o contêiner pai a torne interativa.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <Content
      type="icon"
      label="Notificações"
      description="3 novas"
      icon={Bell}
      badge={<span>3</span>}
    />
  ),
};
