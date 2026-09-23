import { Checkbox, type CheckboxProps } from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import NotificationPreferences from "./examples/NotificationPreferences";
import notificationPreferencesCode from "./examples/NotificationPreferences?raw";
import SelectAll from "./examples/SelectAll";
import selectAllCode from "./examples/SelectAll?raw";
import States from "./examples/States";
import statesCode from "./examples/States?raw";

const page = findPage("componentes", "checkbox");

const doc: ComponentDoc = {
  page,
  description:
    'Checkbox permite marcar zero, uma ou várias opções independentes. Usa um `<input type="checkbox">` real e suporta o estado parcial (indeterminate).',
  whenToUse: [
    "Selecionar vários itens de uma lista (turmas, estudantes, filtros).",
    "Consentimentos e preferências que podem ser ligados ou desligados.",
    "“Selecionar todos” com estado parcial.",
  ],
  whenNotToUse: [
    "Escolha única entre opções — use RadioGroup.",
    "Ações que acontecem imediatamente ao clicar — use Button.",
  ],
  usage: `import { Checkbox } from "@hive/react";

<Checkbox label="Notas publicadas" checked={prefs.grades} onChange={(e) => setGrades(e.currentTarget.checked)} />`,
  playground: definePlayground({
    component: "Checkbox",
    initial: {
      label: "Enviar lembrete 1 dia antes do prazo",
      size: "small" as NonNullable<CheckboxProps["size"]>,
      checked: true,
      indeterminate: false,
      disabled: false,
    },
    controls: {
      label: { type: "text" },
      size: { type: "select", options: ["small", "x-small"] },
      checked: { type: "boolean" },
      indeterminate: { type: "boolean" },
      disabled: { type: "boolean" },
    },
    render: (props) => <Checkbox {...props} readOnly />,
    code: (props) =>
      jsx("Checkbox", {
        ...props,
        onChange:
          props.checked !== undefined ? { raw: "handleChange" } : undefined,
      }),
  }),
  examples: [
    example(
      {
        id: "estados",
        kind: "estados",
        title: "Estados e tamanhos",
        description: "Não marcado, marcado, parcial, desabilitado e x-small.",
      },
      States,
      statesCode,
    ),
    example(
      {
        id: "selecionar-todos",
        kind: "estados",
        title: "Selecionar todos (indeterminate)",
        description:
          "O pai fica parcial quando só parte das turmas está marcada.",
      },
      SelectAll,
      selectAllCode,
    ),
    example(
      {
        id: "preferencias",
        kind: "aplicado",
        title: "Preferências de notificação",
        description: "Grupo com fieldset/legend e consentimento obrigatório.",
      },
      NotificationPreferences,
      notificationPreferencesCode,
    ),
  ],
  guidelines: [
    {
      do: "Agrupe checkboxes relacionados em `<fieldset>` com `<legend>`.",
      dont: "Usar checkbox para opções mutuamente exclusivas.",
    },
    {
      do: "Rótulos afirmativos e clicáveis: “Receber notas por e-mail”.",
      dont: "Negativas duplas: “Não desativar notificações”.",
      doExample: <Checkbox label="Receber notas por e-mail" defaultChecked />,
      dontExample: <Checkbox label="Não desativar notificações" />,
    },
  ],
  accessibility: {
    notes: [
      "Input nativo dentro de `<label>`: clicar no texto alterna o valor.",
      'O estado parcial define `indeterminate` no DOM e `aria-checked="mixed"`.',
      "Sem `label` visível, forneça `aria-label` ao input.",
      "Tamanho small = 16px de controle com área clicável do rótulo; mantenha o rótulo para ampliar o alvo.",
    ],
    keyboard: [
      { keys: "Tab", action: "Move o foco entre checkboxes." },
      { keys: "Espaço", action: "Alterna marcado/desmarcado." },
    ],
  },
  api: [
    {
      name: "Checkbox",
      native: '<input type="checkbox">',
      descriptions: {
        label: "Rótulo clicável.",
        size: "small (16px) ou x-small (12px).",
        indeterminate:
          "Estado parcial (ex.: “selecionar todos” com parte marcada).",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function CheckboxPage() {
  return <ComponentPage doc={doc} />;
}
