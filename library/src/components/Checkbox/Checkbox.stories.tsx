import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "O Checkbox permite selecionar zero, uma ou várias opções independentes em listas e formulários.",
          "## Quando usar",
          "- Em consentimentos, filtros e listas com múltipla seleção.",
          "- Quando cada item pode ser ligado ou desligado sem afetar os demais.",
          "## Quando não usar",
          "- Para escolhas mutuamente exclusivas — use RadioGroup.",
          "- Para ações instantâneas — use um botão ou switch conforme o caso.",
          "## Playground",
          "Explore tamanho, rótulo e o estado parcial do checkbox.",
          "## Matriz de variantes",
          "Comparação entre small, x-small e estados visuais nativos.",
          "## Estados",
          "Unchecked, checked, indeterminate e disabled.",
          "## Exemplo real",
          "Consentimentos, permissões e filtros com seleção múltipla.",
          "## Acessibilidade",
          'Usa um input real com anúncio nativo e `aria-checked="mixed"` no estado parcial.',
          "## Navegação por teclado",
          "Tab move o foco; Espaço alterna o valor.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "x-small"],
    },
    label: { control: "text" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: "Receber novidades",
    size: "small",
  },
  parameters: {
    docs: {
      description: {
        story:
          "## Playground\n\nAjuste tamanho, estado e rótulo para validar o comportamento do checkbox nativo.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Checkbox label="Small" size="small" />
      <Checkbox label="Small selecionado" size="small" defaultChecked />
      <Checkbox label="X-small" size="x-small" />
      <Checkbox label="X-small parcial" size="x-small" indeterminate />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Variants\n\nMatriz com os dois tamanhos e os estados visuais principais.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## States\n\nEstados desabilitado, selecionado e parcial usando o input real do HTML.",
      },
    },
  },
};

export const RealExample: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Checkbox label="Aceito os Termos de Uso" />
      <Checkbox label="Aceito receber comunicações por e-mail" defaultChecked />
      <Checkbox label="Permissões parcialmente revisadas" indeterminate />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## RealExample\n\nExemplo de consentimentos e permissões dentro de um formulário real.",
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox label="Opção com foco por Tab" />
      <Checkbox label="Estado parcial anunciado como mixed" indeterminate />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          "## Accessibility",
          '- Usa um `<input type="checkbox">` real, então clique, foco e teclado seguem o comportamento nativo.',
          '- O estado parcial sincroniza `indeterminate` no DOM e `aria-checked="mixed"`.',
          "- **Tab** move o foco e **Espaço** alterna o valor.",
        ].join("\n\n"),
      },
    },
  },
};
