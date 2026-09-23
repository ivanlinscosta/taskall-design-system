import { Radio, RadioGroup, type RadioGroupProps } from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import ReminderFrequency from "./examples/ReminderFrequency";
import reminderFrequencyCode from "./examples/ReminderFrequency?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import States from "./examples/States";
import statesCode from "./examples/States?raw";

const page = findPage("componentes", "radio");
const shifts = ["manha", "tarde", "integral"] as const;
const shiftLabels: Record<(typeof shifts)[number], string> = {
  manha: "Manhã",
  tarde: "Tarde",
  integral: "Integral",
};

const doc: ComponentDoc = {
  page,
  description:
    "Radio e RadioGroup oferecem escolha única entre opções sempre visíveis, com `<fieldset>`/`<legend>` e radios nativos.",
  whenToUse: [
    "Escolher exatamente uma opção entre 2 e ~5 alternativas.",
    "Quando comparar as opções lado a lado ajuda na decisão (turno, frequência, formato).",
  ],
  whenNotToUse: [
    "Várias opções independentes — use Checkbox.",
    "Muitas opções ou pouco espaço — use Dropdown.",
    "Ligar/desligar uma única configuração — use Checkbox.",
  ],
  usage: `import { Radio, RadioGroup } from "@hive/react";

<RadioGroup name="turno" label="Turno" value={shift} onValueChange={setShift}>
  <Radio value="manha" label="Manhã" />
  <Radio value="tarde" label="Tarde" />
</RadioGroup>`,
  playground: definePlayground({
    component: "RadioGroup",
    initial: {
      label: "Turno da turma",
      value: "manha" as (typeof shifts)[number],
      size: "small" as NonNullable<RadioGroupProps["size"]>,
      disabled: false,
    },
    controls: {
      label: { type: "text" },
      value: { type: "select", options: shifts },
      size: { type: "select", options: ["small", "x-small"] },
      disabled: { type: "boolean" },
    },
    render: ({ value, ...props }) => (
      <RadioGroup
        key={value}
        name="playground-turno"
        defaultValue={value}
        {...props}
      >
        {shifts.map((shift) => (
          <Radio key={shift} value={shift} label={shiftLabels[shift]} />
        ))}
      </RadioGroup>
    ),
    code: ({ value, ...props }) =>
      jsx(
        "RadioGroup",
        { name: "turno", defaultValue: value, ...props },
        shifts
          .map(
            (shift) =>
              `<Radio value="${shift}" label="${shiftLabels[shift]}" />`,
          )
          .join("\n"),
      ),
  }),
  examples: [
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description: "small e x-small, definidos no grupo.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "estados",
        kind: "estados",
        title: "Desabilitado",
        description: "Uma opção ou o grupo inteiro.",
      },
      States,
      statesCode,
    ),
    example(
      {
        id: "frequencia",
        kind: "aplicado",
        title: "Frequência de resumo",
        description: "Grupo controlado com consequência explicada logo abaixo.",
      },
      ReminderFrequency,
      reminderFrequencyCode,
    ),
  ],
  guidelines: [
    {
      do: "Sempre use RadioGroup com `label` (vira a `<legend>`).",
      dont: "Radios soltos sem contexto do que está sendo escolhido.",
    },
    {
      do: "Pré-selecione a opção mais segura ou comum.",
      dont: "Usar radio para uma única opção “sim” — use Checkbox.",
    },
  ],
  accessibility: {
    notes: [
      "RadioGroup renderiza `<fieldset>` + `<legend>`: o contexto é anunciado ao entrar no grupo.",
      'Cada Radio é um `<input type="radio">` real com o mesmo `name`: as setas funcionam nativamente.',
      "`disabled` no grupo desabilita o `<fieldset>` inteiro.",
    ],
    keyboard: [
      {
        keys: "Tab",
        action: "Entra no grupo (na opção selecionada) e sai dele.",
      },
      { keys: "↑ / ↓", action: "Move e seleciona a opção anterior/próxima." },
      { keys: "← / →", action: "Move e seleciona a opção anterior/próxima." },
      { keys: "Espaço", action: "Seleciona a opção focada." },
    ],
  },
  api: [
    {
      name: "RadioGroup",
      native: "<fieldset>",
      descriptions: {
        name: "Nome compartilhado pelos radios (obrigatório).",
        label: "Legenda do grupo.",
        value: "Valor controlado.",
        defaultValue: "Valor inicial (não controlado).",
        onValueChange: "Chamado com o valor selecionado.",
        size: "small ou x-small para todos os radios.",
        disabled: "Desabilita todo o grupo.",
      },
    },
    {
      name: "Radio",
      native: '<input type="radio">',
      descriptions: {
        label: "Rótulo clicável.",
        size: "Sobrescreve o tamanho do grupo.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function RadioPage() {
  return <ComponentPage doc={doc} />;
}
