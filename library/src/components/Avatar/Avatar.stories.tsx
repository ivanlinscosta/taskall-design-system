import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const demoAvatarSrc = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="40" fill="#D6F1FA" />
    <circle cx="40" cy="30" r="16" fill="#2BABD0" />
    <path d="M17 67C20.5 54 30 46 40 46C50 46 59.5 54 63 67" fill="#2BABD0" />
  </svg>
`)}`;

const docsDescription = [
  "## Introdução",
  "Avatar identifica pessoas ou entidades com foto, iniciais e indicador de presença contextual.",
  "## Quando usar",
  "- Mostrar responsáveis, participantes ou perfis em listas e cabeçalhos.",
  "- Sinalizar presença ou ação contextual com um marcador visual curto.",
  "## Quando não usar",
  "- Quando a pessoa precisa de identificação textual completa sem ambiguidade.",
  "- Para feedbacks de sistema independentes do contexto de usuário.",
  "## Playground",
  "Experimente tamanhos, estados e fallback de iniciais.",
  "## Matriz de variantes",
  "Compara tamanhos e estados visuais mais comuns.",
  "## Estados",
  "Inclui fallback, imagem carregada e indicadores de presença.",
  "## Exemplo real",
  "Mostra a assinatura de responsável em uma área de revisão.",
  "## Acessibilidade",
  "Sem imagem, o fallback usa `role=img`; com imagem, o `alt` da foto transmite o nome.",
  "## Navegação por teclado",
  "Avatar não é interativo por padrão e não participa da navegação por tabulação.",
].join("\n\n");

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
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
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    fallback: "IC",
    src: demoAvatarSrc,
    alt: "Ivana Costa",
    size: "lg",
    status: "online",
  },
};

export const Variants: Story = {
  args: {
    fallback: "XS",
  },
  parameters: {
    docs: {
      description: {
        story: "Matriz com os tamanhos principais e estados de presença.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Avatar fallback="XS" size="xs" status="offline" />
      <Avatar fallback="SM" size="sm" status="away" />
      <Avatar fallback="MD" size="md" status="busy" />
      <Avatar fallback="LG" size="lg" status="online" />
      <Avatar fallback="XL" size="xl" status="verified" />
    </div>
  ),
};

export const States: Story = {
  args: {
    fallback: "IC",
  },
  parameters: {
    docs: {
      description: {
        story: "Compara foto, fallback de iniciais e ícones de ação.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Avatar
        fallback="IC"
        src={demoAvatarSrc}
        alt="Ivana Costa"
        status="online"
      />
      <Avatar fallback="AM" status="favorite" />
      <Avatar fallback="NO" status="add" />
      <Avatar fallback="EX" status="delete" />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    fallback: "IC",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real em uma revisão de aprovação com responsável visível.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar
        fallback="IC"
        src={demoAvatarSrc}
        alt="Ivana Costa"
        size="xl"
        status="verified"
      />
      <div style={{ display: "grid", gap: 4 }}>
        <strong
          style={{
            font: "var(--hive-font-label-s)",
            color: "var(--hive-content-primary)",
          }}
        >
          Ivana Costa
        </strong>
        <span
          style={{
            font: "var(--hive-font-paragraph-xs)",
            color: "var(--hive-content-secondary)",
          }}
        >
          Responsável pela revisão final do cadastro.
        </span>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    fallback: "AC",
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- O fallback de iniciais usa `role=img` e `aria-label` com o texto fornecido.",
          "- Quando há foto, o nome acessível vem do `alt` da imagem; o indicador é decorativo.",
          "## Navegação por teclado",
          "- Avatar não é focável por padrão; combine com um botão ou link quando houver ação.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <Avatar
      fallback="AC"
      src={demoAvatarSrc}
      alt="Ana Clara"
      status="verified"
    />
  ),
};
