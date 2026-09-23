import {
  TabMenu,
  type TabMenuProps,
  CheckCircle,
  NotepadText,
  UploadTray,
} from "@taskall/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Orientation from "./examples/Orientation";
import orientationCode from "./examples/Orientation?raw";
import StudentRecord from "./examples/StudentRecord";
import studentRecordCode from "./examples/StudentRecord?raw";

const page = findPage("componentes", "tab-menu");

const items = [
  {
    key: "abertas",
    label: "Abertas",
    icon: NotepadText,
    content: "5 tarefas abertas.",
  },
  {
    key: "entregues",
    label: "Entregues",
    icon: UploadTray,
    content: "18 entregas aguardando correção.",
  },
  {
    key: "corrigidas",
    label: "Corrigidas",
    icon: CheckCircle,
    content: "42 tarefas corrigidas neste bimestre.",
  },
];

const doc: ComponentDoc = {
  page,
  description:
    "TabMenu alterna entre visões irmãs de uma mesma área, com abas horizontais ou verticais, ativação automática e painéis ligados por id.",
  whenToUse: [
    "Separar seções de uma ficha ou detalhe (desempenho, frequência, ocorrências).",
    "Filtrar uma lista por estado sem sair da página.",
  ],
  whenNotToUse: [
    "Navegação entre páginas ou rotas — use links.",
    "Etapas sequenciais de um fluxo — use um stepper/formulário em etapas.",
    "Mais de ~7 abas ou rótulos longos.",
  ],
  usage: `import { CircleClock, TabMenu, TrendingContent } from "@taskall/react";

<TabMenu
  ariaLabel="Ficha do estudante"
  items={[
    { key: "desempenho", label: "Desempenho", icon: TrendingContent, content: <Performance /> },
    { key: "frequencia", label: "Frequência", icon: CircleClock, content: <Attendance /> },
  ]}
/>`,
  playground: definePlayground({
    component: "TabMenu",
    initial: {
      type: "horizontal" as NonNullable<TabMenuProps["type"]>,
      value: "entregues",
      ariaLabel: "Tarefas por estado",
    },
    controls: {
      type: { type: "select", options: ["horizontal", "vertical"] },
      value: { type: "select", options: items.map((item) => item.key) },
      ariaLabel: { type: "text" },
    },
    render: ({ value, ...props }) => (
      <TabMenu key={value} {...props} defaultValue={value} items={items} />
    ),
    code: ({ value, ...props }) =>
      jsx("TabMenu", { ...props, defaultValue: value, items: raw("items") }),
  }),
  examples: [
    example(
      {
        id: "orientacao",
        kind: "variantes",
        title: "Horizontal e vertical",
        description: "As setas seguem a orientação (←/→ ou ↑/↓).",
      },
      Orientation,
      orientationCode,
    ),
    example(
      {
        id: "ficha-estudante",
        kind: "aplicado",
        title: "Ficha do estudante",
        description: "Painéis com conteúdo rico via `content`.",
      },
      StudentRecord,
      studentRecordCode,
    ),
  ],
  guidelines: [
    {
      do: "Rótulos curtos (1–2 palavras) e paralelos entre si.",
      dont: "Abas com frases longas ou que quebram em duas linhas.",
    },
    {
      do: "Nomeie a lista com `ariaLabel` descrevendo o conjunto.",
      dont: "Usar abas para ações (salvar, excluir).",
    },
  ],
  accessibility: {
    notes: [
      "Padrão WAI-ARIA Tabs: `tablist`, `tab` (`aria-selected`, `aria-controls`) e `tabpanel` (`aria-labelledby`).",
      "Roving tabindex: só a aba ativa entra na ordem de Tab; o painel ativo é focável.",
      "Ativação automática: mover o foco com as setas também seleciona a aba.",
    ],
    keyboard: [
      {
        keys: "Tab",
        action: "Entra na aba ativa; o próximo Tab vai para o painel.",
      },
      {
        keys: "← / →",
        action: "Aba anterior/próxima (horizontal), com retorno circular.",
      },
      { keys: "↑ / ↓", action: "Aba anterior/próxima (vertical)." },
      { keys: "Home / End", action: "Primeira/última aba." },
    ],
  },
  api: [
    {
      name: "TabMenu",
      native: "<div>",
      descriptions: {
        items: "Abas (veja `TabItem`).",
        type: "horizontal ou vertical.",
        value: "Aba selecionada (controlado).",
        defaultValue: "Aba inicial (padrão: a primeira).",
        onValueChange: "Chamado com a `key` da nova aba.",
        ariaLabel: "Nome acessível da lista de abas.",
      },
    },
    {
      name: "TabItem",
      descriptions: {
        key: "Identificador único da aba.",
        label: "Rótulo da aba.",
        icon: "Ícone decorativo antes do rótulo.",
        content: "Conteúdo do painel; sem ele, o painel exibe o `label`.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function TabMenuPage() {
  return <ComponentPage doc={doc} />;
}
