import type { Meta, StoryObj } from "@storybook/react";

import { MailSendEnvelope as Mail } from "../../icons/MailSendEnvelope";
import { MagnifyingGlass as Search } from "../../icons/MagnifyingGlass";
import { TextInput } from "./TextInput";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "TextInput coleta texto curto com rótulo, apoio contextual e mensagens de erro inline.",
          "## Quando usar",
          "- Para nomes, e-mails, buscas e outros valores textuais de uma linha.",
          "- Quando o campo precisa de ícones decorativos e validação visível.",
          "## Quando não usar",
          "- Para textos longos — use um textarea dedicado.",
          "- Para escolha entre opções prontas — use Dropdown ou RadioGroup.",
          "## Playground",
          "Experimente tamanhos, textos auxiliares, ícones e mensagens de erro.",
          "## Matriz de variantes",
          "Combinações de tamanho e adornos decorativos.",
          "## Estados",
          "Default, erro e desabilitado.",
          "## Exemplo real",
          "Campos de cadastro com contexto e validação inline.",
          "## Acessibilidade",
          "Rótulo associado por `htmlFor`, suporte a `aria-invalid` e `aria-describedby`.",
          "## Navegação por teclado",
          "Tab move o foco; o contêiner mostra foco visível com `:focus-within`.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "small"],
    },
    label: { control: "text" },
    sublabel: { control: "text" },
    error: { control: "text" },
    leftIcon: { control: false },
    rightIcon: { control: false },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: "Busca",
    placeholder: "Pesquise por nome ou e-mail",
    size: "medium",
    leftIcon: Search,
  },
  parameters: {
    docs: {
      description: {
        story:
          "## Playground\n\nAjuste tamanho, apoio textual e ícones do campo de entrada.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <TextInput label="Medium" placeholder="Digite aqui" size="medium" />
      <TextInput
        label="Small"
        placeholder="Digite aqui"
        size="small"
        leftIcon={Search}
      />
      <TextInput
        label="Com ícones"
        placeholder="nome@empresa.com"
        leftIcon={Mail}
        rightIcon={Search}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Variants\n\nComparação entre tamanhos e combinações de adornos decorativos.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <TextInput label="Default" placeholder="Digite aqui" />
      <TextInput
        label="Com erro"
        error="Campo obrigatório"
        placeholder="Digite aqui"
      />
      <TextInput label="Desabilitado" disabled placeholder="Digite aqui" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## States\n\nEstados padrão, erro e desabilitado com feedback visual baseado em tokens.",
      },
    },
  },
};

export const RealExample: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <TextInput
        label="Nome completo"
        sublabel="Como deve aparecer no certificado"
        placeholder="Seu nome"
      />
      <TextInput
        label="E-mail"
        leftIcon={Mail}
        placeholder="nome@empresa.com"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## RealExample\n\nExemplo de dois campos de cadastro em uma etapa de inscrição.",
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <TextInput
        label="E-mail"
        sublabel="Usaremos esse endereço para enviar atualizações"
      />
      <TextInput label="Telefone" error="Formato inválido" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          "## Accessibility",
          "- O componente usa um `<input>` nativo com `label` associado por `htmlFor`.",
          "- Erros ativam `aria-invalid` e ligam a mensagem por `aria-describedby`.",
          "- **Tab** move o foco para o campo e o estado de foco visível é aplicado no contêiner.",
        ].join("\n\n"),
      },
    },
  },
};
