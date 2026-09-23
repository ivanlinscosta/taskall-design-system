import {
  AddCircle,
  Cog,
  Delete,
  IconButton,
  PencilSquare,
  RecycleBin,
  Tooltip,
  type IconButtonProps,
} from "@hive/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import TaskRowActions from "./examples/TaskRowActions";
import taskRowActionsCode from "./examples/TaskRowActions?raw";
import Variants from "./examples/Variants";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "icon-button");

const icons = { Cog, PencilSquare, AddCircle, RecycleBin, Delete } as const;
type IconName = keyof typeof icons;

const doc: ComponentDoc = {
  page,
  description:
    "IconButton é um Button quadrado só com ícone — mesmos tons, estilos, tamanhos e estado de loading — para ações compactas e reconhecíveis. O `aria-label` é obrigatório no tipo.",
  whenToUse: [
    "Ações recorrentes em linhas de lista e barras de ferramentas (editar, duplicar, excluir).",
    "Fechar painéis, abrir configurações ou menus.",
  ],
  whenNotToUse: [
    "Ação principal da tela — use Button com texto.",
    "Quando o ícone não é universalmente reconhecido — acrescente texto.",
  ],
  usage: `import { Cog, IconButton, Tooltip } from "@hive/react";

<Tooltip title="Configurações da turma">
  <IconButton icon={Cog} aria-label="Configurações da turma" tone="neutral" visualStyle="light" />
</Tooltip>`,
  playground: definePlayground({
    component: "IconButton",
    initial: {
      icon: "Cog" as IconName,
      "aria-label": "Configurações",
      tone: "neutral" as NonNullable<IconButtonProps["tone"]>,
      visualStyle: "light" as NonNullable<IconButtonProps["visualStyle"]>,
      size: "medium" as NonNullable<IconButtonProps["size"]>,
      loading: false,
      disabled: false,
    },
    controls: {
      icon: { type: "select", options: Object.keys(icons) as IconName[] },
      "aria-label": { type: "text" },
      tone: { type: "select", options: ["primary", "neutral", "error"] },
      visualStyle: { type: "select", options: ["filled", "light", "outline"] },
      size: { type: "select", options: ["medium", "small"] },
      loading: { type: "boolean" },
      disabled: { type: "boolean" },
    },
    render: ({ icon, ...props }) => (
      <Tooltip title={props["aria-label"] || "Ação"}>
        <IconButton
          {...props}
          aria-label={props["aria-label"] || "Ação"}
          icon={icons[icon]}
        />
      </Tooltip>
    ),
    code: ({ icon, ...props }) =>
      jsx("IconButton", { icon: raw(icon), ...props }),
  }),
  examples: [
    example(
      {
        id: "variantes",
        kind: "variantes",
        title: "Tons × estilos",
        description: "Os mesmos 3 tons e 3 estilos do Button.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "tamanhos-estados",
        kind: "estados",
        title: "Tamanhos e estados",
        description: "Medium (44px), small (32px), desabilitado e loading.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "acoes-da-tarefa",
        kind: "aplicado",
        title: "Ações de uma linha de tarefa",
        description:
          "Barra de ferramentas com Tooltip repetindo o nome acessível de cada ação.",
      },
      TaskRowActions,
      taskRowActionsCode,
    ),
  ],
  guidelines: [
    {
      do: "Combine com Tooltip usando o mesmo texto do `aria-label`.",
      dont: "Ícones ambíguos sem nome visível nem tooltip.",
      doExample: (
        <Tooltip title="Editar tarefa">
          <IconButton
            icon={PencilSquare}
            aria-label="Editar tarefa"
            tone="neutral"
            visualStyle="light"
          />
        </Tooltip>
      ),
    },
    {
      do: 'Use `tone="error"` só em ações destrutivas e confirme com Modal.',
      dont: "Vários IconButtons filled lado a lado — reserve filled para a ação principal.",
      dontExample: (
        <>
          <IconButton icon={PencilSquare} aria-label="Editar" />
          <IconButton icon={AddCircle} aria-label="Adicionar" />
          <IconButton icon={Cog} aria-label="Configurar" />
        </>
      ),
    },
  ],
  accessibility: {
    notes: [
      "`aria-label` é obrigatório no tipo `IconButtonProps` — o botão não tem texto visível.",
      "O ícone é decorativo (`aria-hidden`); o nome vem só do `aria-label`.",
      "Medium tem 44×44px (alvo de toque). Small (32px) é exceção para barras densas em desktop.",
      "`loading` desabilita o botão e adiciona `aria-busy`.",
    ],
    keyboard: [
      {
        keys: "Tab",
        action: "Move o foco para o botão (e exibe o Tooltip, se houver).",
      },
      { keys: "Enter / Espaço", action: "Ativa o botão." },
    ],
  },
  api: [
    {
      name: "IconButton",
      native: "<button>",
      descriptions: {
        icon: "Ícone exibido (qualquer ícone de `@hive/react`).",
        "aria-label": "Nome acessível obrigatório.",
        tone: "Intenção: primary, neutral ou error.",
        visualStyle: "Ênfase: filled, light ou outline.",
        size: "medium (44px) ou small (32px).",
        loading: "Mostra spinner, desabilita e define `aria-busy`.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function IconButtonPage() {
  return <ComponentPage doc={doc} />;
}
