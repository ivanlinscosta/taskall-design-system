import { Calendar, Dropdown, type DropdownProps } from "@taskall/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Adornments from "./examples/Adornments";
import adornmentsCode from "./examples/Adornments?raw";
import ReportFilters from "./examples/ReportFilters";
import reportFiltersCode from "./examples/ReportFilters?raw";
import States from "./examples/States";
import statesCode from "./examples/States?raw";

const page = findPage("componentes", "dropdown");

const subjects = [
  { value: "mat", label: "Matemática" },
  { value: "por", label: "Português" },
  { value: "cie", label: "Ciências" },
  { value: "his", label: "História" },
];

const doc: ComponentDoc = {
  page,
  description:
    "Dropdown é um campo de seleção única baseado em Radix Select: rótulo, apoio, erro inline, lista em portal e navegação completa por teclado.",
  whenToUse: [
    "Escolher um valor entre 5 ou mais opções conhecidas (turma, período, disciplina).",
    "Filtros compactos em relatórios e listas.",
  ],
  whenNotToUse: [
    "Até ~4 opções que cabem na tela — use RadioGroup (todas visíveis).",
    "Seleção múltipla — use Checkbox.",
    "Texto livre ou busca — use TextInput.",
  ],
  usage: `import { Dropdown } from "@taskall/react";

const periods = [
  { value: "b1", label: "1º bimestre" },
  { value: "b2", label: "2º bimestre" },
];

export function PeriodFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <Dropdown label="Período" options={periods} value={value} onValueChange={onChange} />;
}`,
  playground: definePlayground({
    component: "Dropdown",
    initial: {
      label: "Disciplina",
      sublabel: "",
      placeholder: "Selecione",
      error: "",
      size: "medium" as NonNullable<DropdownProps["size"]>,
      leftIcon: false,
      disabled: false,
    },
    controls: {
      label: { type: "text" },
      sublabel: { type: "text" },
      placeholder: { type: "text" },
      error: { type: "text" },
      size: { type: "select", options: ["medium", "small"] },
      leftIcon: { type: "boolean" },
      disabled: { type: "boolean" },
    },
    render: ({ leftIcon, sublabel, error, ...props }) => (
      <div style={{ width: "100%", maxWidth: 320 }}>
        <Dropdown
          {...props}
          sublabel={sublabel || undefined}
          error={error || undefined}
          leftIcon={leftIcon ? Calendar : undefined}
          options={subjects}
        />
      </div>
    ),
    code: ({ leftIcon, ...props }) =>
      jsx("Dropdown", {
        ...props,
        leftIcon: leftIcon ? raw("Calendar") : undefined,
        options: raw("subjects"),
      }),
  }),
  examples: [
    example(
      {
        id: "adornos",
        kind: "variantes",
        title: "Adornos das opções",
        description:
          "check, radio, badge e meta à direita; opções desabilitadas.",
      },
      Adornments,
      adornmentsCode,
    ),
    example(
      {
        id: "estados",
        kind: "estados",
        title: "Estados",
        description: "Padrão, apoio, erro, desabilitado e small.",
      },
      States,
      statesCode,
    ),
    example(
      {
        id: "filtros-relatorio",
        kind: "aplicado",
        title: "Filtros de exportação de boletins",
        description:
          "Três dropdowns controlados alimentando um resumo e a ação principal.",
      },
      ReportFilters,
      reportFiltersCode,
    ),
  ],
  guidelines: [
    {
      do: "Ordene as opções de forma previsível (cronológica, alfabética ou por frequência).",
      dont: "Listas enormes sem ordem — considere busca/autocomplete.",
    },
    {
      do: "Use `label` visível e placeholder como instrução (“Escolha a turma”).",
      dont: "Esconder o rótulo e depender só do placeholder.",
    },
  ],
  accessibility: {
    notes: [
      'O gatilho é um `<button role="combobox">` do Radix com `aria-expanded` e nome vindo de `label` (ou `aria-label`).',
      '`sublabel` e `error` são ligados por `aria-describedby`; erro define `aria-invalid` e usa `role="alert"`.',
      'A lista é renderizada em portal com `role="listbox"`/`option` e foco gerenciado.',
      "`name`, `required` e `form` geram um `<select>` nativo oculto para envio em formulários.",
    ],
    keyboard: [
      { keys: "Tab", action: "Foca o gatilho." },
      { keys: "Enter", action: "Abre a lista / seleciona a opção focada." },
      { keys: "Espaço", action: "Abre a lista / seleciona a opção focada." },
      { keys: "↑ / ↓", action: "Percorre as opções." },
      { keys: "Esc", action: "Fecha sem alterar o valor." },
      { keys: "A–Z", action: "Busca por digitação (typeahead)." },
    ],
  },
  api: [
    {
      name: "Dropdown",
      native: "<button> (gatilho)",
      descriptions: {
        options: "Lista de opções (veja `DropdownOption`).",
        label: "Rótulo visível e nome acessível do gatilho.",
        sublabel: "Texto de apoio (aria-describedby).",
        error: "Mensagem de erro; ativa estado de erro e `aria-invalid`.",
        placeholder: "Texto exibido sem valor selecionado.",
        leftIcon: "Ícone decorativo no gatilho.",
        value: "Valor controlado.",
        defaultValue: "Valor inicial (não controlado).",
        onValueChange: "Chamado com o novo `value`.",
        size: "medium ou small.",
      },
    },
    {
      name: "DropdownOption",
      descriptions: {
        value: "Valor único da opção.",
        label: "Texto exibido e usado no typeahead.",
        disabled: "Impede a seleção.",
        icon: "Ícone à esquerda do rótulo.",
        meta: 'Conteúdo à direita (ou dentro do badge com `adornment="badge"`).',
        adornment:
          "Indicador à direita: check, checkbox, radio, flag ou badge.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function DropdownPage() {
  return <ComponentPage doc={doc} />;
}
