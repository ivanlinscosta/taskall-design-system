import type { Meta, StoryObj } from "@storybook/react";

import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "RadioGroup apresenta opções mutuamente exclusivas usando radios nativos dentro de um `fieldset`.",
          "## Quando usar",
          "- Para escolher exatamente uma opção entre várias alternativas.",
          "- Em filtros, preferências e etapas com seleção única.",
          "## Quando não usar",
          "- Para múltipla seleção — use Checkbox.",
          "- Para listas muito longas com colapso — considere Dropdown.",
          "## Playground",
          "Altere o valor inicial, o tamanho e o estado desabilitado do grupo.",
          "## Matriz de variantes",
          "Comparação entre os tamanhos disponíveis para radios.",
          "## Estados",
          "Selecionado, não selecionado e desabilitado.",
          "## Exemplo real",
          "Escolhas únicas como periodicidade, canal ou formato.",
          "## Acessibilidade",
          "Usa `fieldset`, `legend` e radios nativos para anunciar contexto e seleção.",
          "## Navegação por teclado",
          "Tab entra no grupo; Espaço seleciona a opção focada.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "x-small"],
    },
    disabled: { control: "boolean" },
    onValueChange: { action: "value changed" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args} name="playground" label="Canal preferido">
      <Radio value="email" label="E-mail" />
      <Radio value="sms" label="SMS" />
      <Radio value="push" label="Push" />
    </RadioGroup>
  ),
  args: {
    name: "playground",
    size: "small",
    defaultValue: "email",
  },
  parameters: {
    docs: {
      description: {
        story:
          "## Playground\n\nTroque o tamanho, o estado inicial e o valor controlado do grupo.",
      },
    },
  },
};

export const Variants: Story = {
  args: {
    name: "variant-small",
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <RadioGroup
        name="variant-small"
        label="Small"
        defaultValue="a"
        size="small"
      >
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" />
      </RadioGroup>
      <RadioGroup
        name="variant-xsmall"
        label="X-small"
        defaultValue="a"
        size="x-small"
      >
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Variants\n\nComparação dos tamanhos disponíveis para seleção única.",
      },
    },
  },
};

export const States: Story = {
  args: {
    name: "active",
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <RadioGroup name="active" label="Ativo" defaultValue="yes">
        <Radio value="yes" label="Sim" />
        <Radio value="no" label="Não" />
      </RadioGroup>
      <RadioGroup
        name="disabled"
        label="Desabilitado"
        defaultValue="yes"
        disabled
      >
        <Radio value="yes" label="Sim" />
        <Radio value="no" label="Não" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## States\n\nEstados selecionado e desabilitado usando radios reais com o mesmo `name`.",
      },
    },
  },
};

export const RealExample: Story = {
  args: {
    name: "billing",
  },
  render: () => (
    <RadioGroup
      name="billing"
      label="Periodicidade de cobrança"
      defaultValue="monthly"
    >
      <Radio value="monthly" label="Mensal" />
      <Radio value="quarterly" label="Trimestral" />
      <Radio value="yearly" label="Anual" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## RealExample\n\nExemplo de escolha única para uma preferência de cobrança.",
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    name: "accessibility",
  },
  render: () => (
    <RadioGroup
      name="accessibility"
      label="Formato de envio"
      defaultValue="email"
    >
      <Radio value="email" label="E-mail" />
      <Radio value="sms" label="SMS" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          "## Accessibility",
          "- O grupo usa `fieldset` + `legend`, então leitores de tela anunciam o contexto corretamente.",
          '- Cada opção usa um `<input type="radio">` real com foco e seleção nativos.',
          "- **Tab** entra no grupo e **Espaço** seleciona a opção focada.",
        ].join("\n\n"),
      },
    },
  },
};
