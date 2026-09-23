import {
  Mail,
  Search,
  TextInput,
  User,
  type TextInputProps,
} from "@taskall/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import GuardianForm from "./examples/GuardianForm";
import guardianFormCode from "./examples/GuardianForm?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import States from "./examples/States";
import statesCode from "./examples/States?raw";
import Validation from "./examples/Validation";
import validationCode from "./examples/Validation?raw";

const page = findPage("componentes", "text-input");

const icons = { nenhum: undefined, Search, Mail, User } as const;
type IconName = keyof typeof icons;

const doc: ComponentDoc = {
  page,
  description:
    "TextInput captura texto curto com rótulo, texto de apoio, ícones e mensagem de erro inline, já conectados por aria-describedby.",
  whenToUse: [
    "Entradas de texto de uma linha: nome, e-mail, código da turma, busca.",
    "Formulários que precisam de validação com mensagem próxima ao campo.",
  ],
  whenNotToUse: [
    "Escolher entre opções conhecidas — use Dropdown ou RadioGroup.",
    "Textos longos de várias linhas — use um `<textarea>` estilizado com tokens.",
    "Como rótulo visível substituto: não use só `placeholder`.",
  ],
  usage: `import { Mail, TextInput } from "@taskall/react";

export function GuardianEmail({ error }: { error?: string }) {
  return (
    <TextInput
      label="E-mail do responsável"
      type="email"
      autoComplete="email"
      leftIcon={Mail}
      error={error}
    />
  );
}`,
  playground: definePlayground({
    component: "TextInput",
    initial: {
      label: "Nome da tarefa",
      sublabel: "Aparece para a turma no mural.",
      placeholder: "Ex.: Resumo do capítulo 3",
      error: "",
      size: "medium" as NonNullable<TextInputProps["size"]>,
      leftIcon: "nenhum" as IconName,
      disabled: false,
    },
    controls: {
      label: { type: "text" },
      sublabel: { type: "text" },
      placeholder: { type: "text" },
      error: { type: "text" },
      size: { type: "select", options: ["medium", "small"] },
      leftIcon: { type: "select", options: Object.keys(icons) as IconName[] },
      disabled: { type: "boolean" },
    },
    render: ({ leftIcon, error, sublabel, ...props }) => (
      <div style={{ width: "100%", maxWidth: 360 }}>
        <TextInput
          {...props}
          sublabel={sublabel || undefined}
          error={error || undefined}
          leftIcon={icons[leftIcon]}
        />
      </div>
    ),
    code: ({ leftIcon, ...props }) =>
      jsx("TextInput", {
        ...props,
        leftIcon: leftIcon === "nenhum" ? undefined : raw(leftIcon),
      }),
  }),
  examples: [
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description:
          "Medium (44px) para formulários; small para filtros e barras densas.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "estados",
        kind: "estados",
        title: "Estados",
        description: "Padrão, com texto de apoio, erro e desabilitado.",
      },
      States,
      statesCode,
    ),
    example(
      {
        id: "validacao",
        kind: "estados",
        title: "Validação ao sair do campo",
        description:
          "Erro só aparece após o blur, com role=alert e aria-invalid.",
      },
      Validation,
      validationCode,
    ),
    example(
      {
        id: "cadastro-responsavel",
        kind: "aplicado",
        title: "Cadastro de responsável",
        description:
          "Formulário com autocomplete, campos obrigatórios e ações.",
      },
      GuardianForm,
      guardianFormCode,
    ),
  ],
  guidelines: [
    {
      do: "Mantenha o `label` sempre visível e use `sublabel` para instruções.",
      dont: "Usar o placeholder como único rótulo — ele some ao digitar.",
      doExample: <TextInput label="E-mail" placeholder="nome@escola.com.br" />,
      dontExample: <TextInput aria-label="E-mail" placeholder="E-mail" />,
    },
    {
      do: "Escreva erros que dizem como corrigir: “Informe um e-mail no formato nome@dominio.com”.",
      dont: "Mensagens vagas como “Inválido” ou só a borda vermelha.",
      doExample: (
        <TextInput
          label="E-mail"
          defaultValue="ana@"
          error="Use o formato nome@dominio.com."
        />
      ),
      dontExample: (
        <TextInput label="E-mail" defaultValue="ana@" error="Inválido" />
      ),
    },
    {
      do: "Use `type`, `autoComplete` e `inputMode` corretos para acelerar o preenchimento.",
      dont: "Validar a cada tecla antes da pessoa terminar de digitar.",
    },
  ],
  accessibility: {
    notes: [
      "`label` é um `<label for>` real; sem label visível, passe `aria-label`.",
      "`sublabel` e `error` são ligados ao input por `aria-describedby`.",
      'Com `error`, o input recebe `aria-invalid` e a mensagem usa `role="alert"` (anunciada imediatamente).',
      "Ícones são decorativos (`aria-hidden`).",
    ],
    keyboard: [
      { keys: "Tab", action: "Move o foco para o campo." },
      { keys: "Shift + Tab", action: "Volta ao campo anterior." },
    ],
  },
  api: [
    {
      name: "TextInput",
      native: "<input>",
      descriptions: {
        label: "Rótulo visível, associado ao input via `htmlFor`.",
        sublabel: "Texto de apoio abaixo do rótulo (aria-describedby).",
        error: "Mensagem de erro; ativa o estado de erro e `aria-invalid`.",
        leftIcon: "Ícone decorativo à esquerda.",
        rightIcon: "Ícone decorativo à direita.",
        size: "Altura do campo: medium ou small.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function TextInputPage() {
  return <ComponentPage doc={doc} />;
}
