import type { Meta, StoryObj } from "@storybook/react";

import { AddCircle } from "../../icons/AddCircle";
import { Cog } from "../../icons/Cog";
import { Delete } from "../../icons/Delete";
import { PencilSquare } from "../../icons/PencilSquare";
import { RecycleBin } from "../../icons/RecycleBin";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "IconButton é um Button quadrado só com ícone, para ações compactas em barras e listas.",
          "## Quando usar",
          "- Ações secundárias recorrentes e reconhecíveis (editar, excluir, fechar, configurações).",
          "## Quando não usar",
          "- Ações principais ou ambíguas — use Button com texto.",
          "## Acessibilidade",
          "- `aria-label` é obrigatório (tipado). Combine com Tooltip para exibir o nome.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    tone: { control: "select", options: ["primary", "neutral", "error"] },
    visualStyle: { control: "select", options: ["filled", "light", "outline"] },
    size: { control: "select", options: ["medium", "small"] },
    icon: { control: false },
  },
  args: { icon: Cog, "aria-label": "Configurações" },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { tone: "neutral", visualStyle: "light", size: "medium" },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <IconButton icon={AddCircle} aria-label="Adicionar" />
      <IconButton
        icon={PencilSquare}
        aria-label="Editar"
        tone="neutral"
        visualStyle="light"
      />
      <IconButton
        icon={Cog}
        aria-label="Configurações"
        tone="neutral"
        visualStyle="outline"
      />
      <IconButton
        icon={RecycleBin}
        aria-label="Excluir"
        tone="error"
        visualStyle="light"
      />
      <IconButton
        icon={Delete}
        aria-label="Fechar"
        tone="neutral"
        visualStyle="light"
        size="small"
      />
    </div>
  ),
};
