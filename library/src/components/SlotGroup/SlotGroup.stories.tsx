import type { Meta, StoryObj } from "@storybook/react";

import { BellNotification as Bell } from "../../icons/BellNotification";
import { BlankCalendar as Calendar } from "../../icons/BlankCalendar";
import { Home } from "../../icons/Home";
import { Slot } from "../Slot/Slot";
import { SlotGroup } from "./SlotGroup";

const meta = {
  title: "Components/SlotGroup",
  component: SlotGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "SlotGroup organiza múltiplos slots em linha ou coluna com espaçamento consistente.",
          "## Quando usar",
          "- Agrupar pequenos elementos visuais relacionados.",
          "## Quando não usar",
          "- Para listas complexas com semântica de lista obrigatória.",
          "## Playground",
          "Troque a orientação entre horizontal e vertical.",
          "## Matriz de variantes",
          "Dois eixos de agrupamento para os mesmos slots.",
          "## Estados",
          "O grupo não gerencia seleção ou interação própria.",
          "## Exemplo real",
          "Atalhos visuais de dashboard ou metadados compactos.",
          "## Acessibilidade",
          "Expõe `role=group` com `aria-label` configurável.",
          "## Navegação por teclado",
          "A ordem segue a dos filhos renderizados.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    ariaLabel: { control: "text" },
    children: { control: false },
  },
} satisfies Meta<typeof SlotGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    orientation: "horizontal",
    ariaLabel: "Navegação rápida",
    children: (
      <>
        <Slot>
          <Home size={16} aria-hidden="true" />
        </Slot>
        <Slot>
          <Bell size={16} aria-hidden="true" />
        </Slot>
        <Slot>
          <Calendar size={16} aria-hidden="true" />
        </Slot>
      </>
    ),
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Comparação entre agrupamento horizontal e vertical.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <SlotGroup ariaLabel="Horizontal">
        <Slot>1</Slot>
        <Slot>2</Slot>
        <Slot>3</Slot>
      </SlotGroup>
      <SlotGroup ariaLabel="Vertical" orientation="vertical">
        <Slot>1</Slot>
        <Slot>2</Slot>
        <Slot>3</Slot>
      </SlotGroup>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: { story: "Uso com diferentes conteúdos dentro dos slots." },
    },
  },
  render: () => (
    <SlotGroup ariaLabel="Indicadores">
      <Slot>3</Slot>
      <Slot>
        <Bell size={16} aria-hidden="true" />
      </Slot>
      <Slot>AB</Slot>
    </SlotGroup>
  ),
};

export const RealExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo real: grupo de atalhos rápidos em um cabeçalho.",
      },
    },
  },
  render: () => (
    <SlotGroup ariaLabel="Atalhos rápidos">
      <Slot>
        <Home size={16} aria-hidden="true" />
      </Slot>
      <Slot>
        <Bell size={16} aria-hidden="true" />
      </Slot>
      <Slot>
        <Calendar size={16} aria-hidden="true" />
      </Slot>
    </SlotGroup>
  ),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Sempre nomeie o grupo quando os filhos não tiverem contexto suficiente sozinhos.",
          "## Navegação por teclado",
          "- A navegação depende dos elementos focáveis dentro do grupo.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <SlotGroup ariaLabel="Links rápidos">
      <Slot>
        <Home size={16} aria-hidden="true" />
      </Slot>
      <Slot>
        <Bell size={16} aria-hidden="true" />
      </Slot>
    </SlotGroup>
  ),
};
