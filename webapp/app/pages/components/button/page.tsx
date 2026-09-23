import {
  AddCircle,
  Button,
  Cog,
  SendEmail,
  TaillessLineArrowRight,
  UploadTray,
  type ButtonProps,
} from "@taskall/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import AsyncSubmit from "./examples/AsyncSubmit";
import asyncSubmitCode from "./examples/AsyncSubmit?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import States from "./examples/States";
import statesCode from "./examples/States?raw";
import TaskFormActions from "./examples/TaskFormActions";
import taskFormActionsCode from "./examples/TaskFormActions?raw";
import Variants from "./examples/Variants";
import WithIcons from "./examples/WithIcons";
import withIconsCode from "./examples/WithIcons?raw";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "button");

const icons = {
  nenhum: undefined,
  AddCircle,
  TaillessLineArrowRight,
  SendEmail,
  UploadTray,
  Cog,
} as const;
type IconName = keyof typeof icons;
const iconNames = Object.keys(icons) as IconName[];

const doc: ComponentDoc = {
  page,
  description:
    "O Button comunica ações que a pessoa pode executar: salvar, enviar, confirmar ou excluir. Use um único botão primário por região.",
  whenToUse: [
    "Iniciar, confirmar ou enviar uma ação (salvar tarefa, publicar comunicado).",
    "Disparar etapas de fluxos em formulários e modais.",
    'Ações destrutivas, com `tone="error"` e confirmação.',
  ],
  whenNotToUse: [
    "Navegar entre páginas — use um link (<a>).",
    "Alternar um estado ligado/desligado — use Checkbox.",
    "Muitas ações equivalentes lado a lado — agrupe em menu ou reduza a hierarquia.",
  ],
  usage: `import { Button, TaillessLineArrowRight } from "@taskall/react";

export function PublishTask({ onPublish, saving }: { onPublish: () => void; saving: boolean }) {
  return (
    <Button rightIcon={TaillessLineArrowRight} loading={saving} onClick={onPublish}>
      Publicar tarefa
    </Button>
  );
}`,
  playground: definePlayground({
    component: "Button",
    initial: {
      children: "Salvar tarefa",
      tone: "primary" as NonNullable<ButtonProps["tone"]>,
      visualStyle: "filled" as NonNullable<ButtonProps["visualStyle"]>,
      size: "medium" as NonNullable<ButtonProps["size"]>,
      leftIcon: "AddCircle" as IconName,
      rightIcon: "nenhum" as IconName,
      loading: false,
      disabled: false,
    },
    controls: {
      children: { type: "text", label: "children" },
      tone: { type: "select", options: ["primary", "neutral", "error"] },
      visualStyle: { type: "select", options: ["filled", "light", "outline"] },
      size: { type: "select", options: ["medium", "small"] },
      leftIcon: { type: "select", options: iconNames },
      rightIcon: { type: "select", options: iconNames },
      loading: { type: "boolean" },
      disabled: { type: "boolean" },
    },
    render: ({ children, leftIcon, rightIcon, ...props }) => (
      <Button
        {...props}
        leftIcon={icons[leftIcon]}
        rightIcon={icons[rightIcon]}
      >
        {children}
      </Button>
    ),
    code: ({ children, leftIcon, rightIcon, ...props }) =>
      jsx(
        "Button",
        {
          ...props,
          leftIcon: leftIcon === "nenhum" ? undefined : raw(leftIcon),
          rightIcon: rightIcon === "nenhum" ? undefined : raw(rightIcon),
        },
        children,
      ),
  }),
  examples: [
    example(
      {
        id: "variantes",
        kind: "variantes",
        title: "Tons × estilos",
        description:
          "3 tons (primary, neutral, error) combinados com 3 estilos visuais.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description:
          "Medium (44px, alvo de toque padrão) e small (32px) para barras densas.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "com-icones",
        kind: "variantes",
        title: "Com ícones",
        description:
          "Ícone à esquerda (ação), à direita (avançar), nos dois lados e só ícone com IconButton.",
      },
      WithIcons,
      withIconsCode,
    ),
    example(
      {
        id: "estados",
        kind: "estados",
        title: "Estados e ícones",
        description:
          "Disabled, loading, ícone à direita, ação destrutiva e botão só com ícone (com aria-label).",
      },
      States,
      statesCode,
    ),
    example(
      {
        id: "envio-assincrono",
        kind: "estados",
        title: "Envio assíncrono",
        description:
          "loading desabilita o botão e expõe aria-busy; o resultado é anunciado em role=status.",
      },
      AsyncSubmit,
      asyncSubmitCode,
    ),
    example(
      {
        id: "rodape-formulario",
        kind: "aplicado",
        title: "Rodapé do formulário de tarefa",
        description:
          "Hierarquia clara: uma ação primária, secundárias em neutral.",
      },
      TaskFormActions,
      taskFormActionsCode,
    ),
  ],
  guidelines: [
    {
      do: "Use um único botão primário por região e rotule com verbo + objeto.",
      dont: "Colocar vários botões primários competindo pela atenção.",
      doExample: (
        <>
          <Button tone="neutral" visualStyle="light">
            Cancelar
          </Button>
          <Button>Salvar tarefa</Button>
        </>
      ),
      dontExample: (
        <>
          <Button>Cancelar</Button>
          <Button>Salvar</Button>
          <Button>Enviar</Button>
        </>
      ),
    },
    {
      do: "Dê nome acessível a botões só com ícone (`aria-label`).",
      dont: "Usar rótulos genéricos como “Clique aqui” ou “OK”.",
      doExample: <Button leftIcon={AddCircle}>Adicionar responsável</Button>,
      dontExample: <Button>Clique aqui</Button>,
    },
    {
      do: 'Reserve `tone="error"` para ações destrutivas e peça confirmação.',
      dont: "Usar o tom de erro para chamar atenção em ações comuns.",
    },
  ],
  accessibility: {
    notes: [
      'Renderiza um `<button>` nativo com `type="button"` por padrão — use `type="submit"` em formulários.',
      '`loading` desabilita o botão e adiciona `aria-busy="true"`; o texto continua acessível.',
      "Ícones são decorativos (`aria-hidden`). Para botão só com ícone use IconButton (exige `aria-label`).",
      "Altura medium = 44px (alvo de toque). Small (32px) é exceção documentada para barras densas em desktop.",
      "Foco visível via `--taskall-focus-ring-*`; não remova o outline.",
    ],
    keyboard: [
      { keys: "Tab", action: "Move o foco para o botão." },
      { keys: "Enter", action: "Ativa o botão." },
      { keys: "Espaço", action: "Ativa o botão." },
    ],
  },
  api: [
    {
      name: "Button",
      native: "<button>",
      descriptions: {
        tone: "Intenção da ação: principal, neutra ou destrutiva.",
        visualStyle: "Ênfase visual: preenchido, suave ou contorno.",
        size: "Altura do botão: medium (44px) ou small (32px).",
        leftIcon: "Ícone antes do rótulo. Oculto enquanto `loading`.",
        rightIcon:
          "Ícone depois do rótulo (ex.: TaillessLineArrowRight para avançar).",
        loading: "Mostra spinner, desabilita o botão e define `aria-busy`.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function ButtonPage() {
  return <ComponentPage doc={doc} />;
}
