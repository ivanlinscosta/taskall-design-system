import type { Meta, StoryObj } from "@storybook/react";

import { BlankCalendar as Calendar } from "../../icons/BlankCalendar";
import { MagnifyingGlass as Search } from "../../icons/MagnifyingGlass";
import { UserCircleSingle as User } from "../../icons/UserCircleSingle";
import { Dropdown } from "./Dropdown";

const options = [
  { value: "today", label: "Hoje", icon: Calendar },
  { value: "tomorrow", label: "Amanhã", icon: Calendar, meta: "UTC-3" },
  {
    value: "week",
    label: "Esta semana",
    icon: Calendar,
    adornment: "check" as const,
  },
  {
    value: "month",
    label: "Este mês",
    icon: Calendar,
    adornment: "badge" as const,
    meta: "Padrão",
  },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## Introdução",
          "Dropdown usa Radix Select para oferecer seleção única com navegação por teclado, portal e lista acessível.",
          "## Quando usar",
          "- Para listas de opções quando apenas um valor pode ser escolhido.",
          "- Quando o gatilho precisa se comportar como um campo de formulário com placeholder e erro inline.",
          "## Quando não usar",
          "- Para digitação livre — use TextInput.",
          "- Para poucas opções sempre visíveis — prefira RadioGroup.",
          "## Playground",
          "Teste placeholder, ícone inicial, opções e valor controlado do select.",
          "## Matriz de variantes",
          "Comparação entre tamanhos e tipos de adornos laterais nas opções.",
          "## Estados",
          "Default, erro e desabilitado.",
          "## Exemplo real",
          "Seleção de turnos, períodos e preferências em formulários.",
          "## Acessibilidade",
          "Trigger com papel de combobox, lista de opções acessível e foco visível consistente.",
          "## Navegação por teclado",
          "Tab foca o trigger; Enter e setas abrem e percorrem as opções.",
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
    placeholder: { control: "text" },
    leftIcon: { control: false },
    disabled: { control: "boolean" },
    onValueChange: { action: "value changed" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: "Período",
    placeholder: "Selecione um período",
    options,
    leftIcon: Calendar,
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story:
          "## Playground\n\nAjuste tamanho, rótulo, placeholder e opções do select controlado por Radix.",
      },
    },
  },
};

export const Variants: Story = {
  args: {
    options,
  },
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Dropdown
        label="Medium"
        options={options}
        placeholder="Selecione"
        size="medium"
        leftIcon={Calendar}
      />
      <Dropdown
        label="Small"
        options={options}
        placeholder="Selecione"
        size="small"
        leftIcon={Search}
      />
      <Dropdown
        label="Com adornos"
        options={[
          {
            value: "owner",
            label: "Responsável",
            icon: User,
            adornment: "checkbox",
          },
          { value: "student", label: "Aluno", icon: User, meta: "12 vagas" },
        ]}
        placeholder="Selecione"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Variants\n\nComparação entre tamanhos e opções com ícones, meta e adornos laterais.",
      },
    },
  },
};

export const States: Story = {
  args: {
    options,
  },
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Dropdown label="Default" options={options} placeholder="Selecione" />
      <Dropdown
        label="Com erro"
        options={options}
        error="Campo obrigatório"
        placeholder="Selecione"
      />
      <Dropdown
        label="Desabilitado"
        options={options}
        disabled
        defaultValue="today"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## States\n\nEstados padrão, erro e desabilitado compartilhando a mesma linguagem visual do TextInput.",
      },
    },
  },
};

export const RealExample: Story = {
  args: {
    options,
  },
  render: () => (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Dropdown
        label="Turno"
        sublabel="Escolha a faixa de atendimento"
        leftIcon={Calendar}
        placeholder="Selecione um turno"
        options={[
          { value: "morning", label: "Manhã", meta: "08:00–12:00" },
          { value: "afternoon", label: "Tarde", meta: "13:00–17:00" },
          { value: "night", label: "Noite", meta: "18:00–21:00" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## RealExample\n\nExemplo de escolha de turno dentro de um formulário de agendamento.",
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    options,
  },
  render: () => (
    <Dropdown label="Status" options={options} placeholder="Selecione" />
  ),
  parameters: {
    docs: {
      description: {
        story: [
          "## Accessibility",
          "- O trigger do Radix é um botão com papel de `combobox` e anuncia placeholder, valor e expansão.",
          "- O conteúdo usa lista de opções com navegação nativa do primitive e seleção única.",
          "- **Tab** foca o trigger, **Enter**/**Seta para baixo** abre a lista e as setas percorrem as opções.",
        ].join("\n\n"),
      },
    },
  },
};
