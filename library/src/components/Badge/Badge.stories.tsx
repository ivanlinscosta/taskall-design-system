import type { Meta, StoryObj } from "@storybook/react";

import { Add } from "../../icons/Add";
import { Badge } from "./Badge";

const docsDescription = [
  "## Introdução",
  "O Badge destaca contexto curto como status, contagem e marcadores de ação.",
  "## Quando usar",
  "- Rotular estados rápidos em listas, cards e tabelas.",
  "- Exibir contagens pequenas ou sinalizadores compactos.",
  "## Quando não usar",
  "- Para mensagens longas ou feedback crítico — prefira um alert.",
  "- Quando a informação precisar de explicação adicional para fazer sentido.",
  "## Playground",
  "Altere o tipo, o tamanho e o estilo visual do badge.",
  "## Matriz de variantes",
  "Compara os tipos status, icon e number nas principais superfícies.",
  "## Estados",
  "Inclui densidade menor, presença de ícone e conteúdo numérico.",
  "## Exemplo real",
  "Mostra badges em uma linha de resumo operacional.",
  "## Acessibilidade",
  "O conteúdo textual continua disponível para leitores de tela; ícones são decorativos.",
  "## Navegação por teclado",
  "Badge não é interativo por padrão e não entra na ordem de tabulação.",
].join("\n\n");

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["status", "icon", "number"],
    },
    size: {
      control: "select",
      options: ["medium", "small", "x-small"],
    },
    visualStyle: {
      control: "select",
      options: ["filled", "light", "outline"],
    },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Em análise",
    type: "status",
    size: "medium",
    visualStyle: "filled",
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Matriz simples dos três tipos e estilos visuais.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Badge type="status" visualStyle="filled">
        Ativo
      </Badge>
      <Badge type="status" visualStyle="light">
        Revisão
      </Badge>
      <Badge type="status" visualStyle="outline">
        Rascunho
      </Badge>
      <Badge type="icon" icon={Add} visualStyle="filled">
        Novo
      </Badge>
      <Badge type="number" visualStyle="filled">
        24
      </Badge>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: { story: "Compara tamanhos e combinações de conteúdo." },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Badge size="medium">Padrão</Badge>
      <Badge size="small" visualStyle="light">
        Pequeno
      </Badge>
      <Badge size="x-small" visualStyle="outline">
        XS
      </Badge>
      <Badge type="icon" icon={Add}>
        Criar
      </Badge>
      <Badge type="number">9</Badge>
    </div>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real em uma área de acompanhamento de solicitações.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          font: "var(--taskall-font-paragraph-s)",
          color: "var(--taskall-content-secondary)",
        }}
      >
        Solicitações pendentes
      </span>
      <Badge type="number" visualStyle="filled">
        18
      </Badge>
      <Badge type="status" visualStyle="light">
        Em triagem
      </Badge>
    </div>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- O texto do badge continua disponível para tecnologias assistivas.",
          "- Ícones decorativos usam `aria-hidden` para não duplicar leitura.",
          "## Navegação por teclado",
          "- Badges não interativos não recebem foco por teclado por padrão.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Badge aria-label="Status ativo">Ativo</Badge>
      <Badge type="icon" icon={Add} aria-label="Criar novo item">
        Novo
      </Badge>
    </div>
  ),
};
