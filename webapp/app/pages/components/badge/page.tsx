import { Badge, Bell, Check, type BadgeProps } from "@taskall/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import TaskList from "./examples/TaskList";
import taskListCode from "./examples/TaskList?raw";
import Types from "./examples/Types";
import typesCode from "./examples/Types?raw";

const page = findPage("componentes", "badge");
const icons = { nenhum: undefined, Check, Bell } as const;
type IconName = keyof typeof icons;

const doc: ComponentDoc = {
  page,
  description:
    "Badge destaca informação curta — status, contagem ou marcador — ao lado do conteúdo que qualifica.",
  whenToUse: [
    "Rotular o estado de itens em listas e cards (Publicada, Pendente).",
    "Mostrar contagens pequenas (entregas pendentes, mensagens novas).",
  ],
  whenNotToUse: [
    "Mensagens com frase completa ou que exigem ação — use AlertNotification.",
    "Como botão ou filtro clicável — Badge não é interativo.",
  ],
  usage: `import { Badge, Check } from "@taskall/react";

<Badge size="small" type="icon" icon={Check} visualStyle="outline">Corrigida</Badge>
<Badge type="number" role="img" aria-label="7 entregas pendentes">7</Badge>`,
  playground: definePlayground({
    component: "Badge",
    initial: {
      children: "Publicada",
      type: "status" as NonNullable<BadgeProps["type"]>,
      size: "medium" as NonNullable<BadgeProps["size"]>,
      visualStyle: "filled" as NonNullable<BadgeProps["visualStyle"]>,
      icon: "nenhum" as IconName,
    },
    controls: {
      children: { type: "text" },
      type: { type: "select", options: ["status", "icon", "number"] },
      size: { type: "select", options: ["medium", "small", "x-small"] },
      visualStyle: { type: "select", options: ["filled", "light", "outline"] },
      icon: { type: "select", options: Object.keys(icons) as IconName[] },
    },
    render: ({ children, icon, ...props }) => (
      <Badge {...props} icon={icons[icon]}>
        {children}
      </Badge>
    ),
    code: ({ children, icon, ...props }) =>
      jsx(
        "Badge",
        { ...props, icon: icon === "nenhum" ? undefined : raw(icon) },
        children,
      ),
  }),
  examples: [
    example(
      {
        id: "tipos",
        kind: "variantes",
        title: "Tipos × estilos",
        description:
          "status, icon (com ou sem texto) e number em filled, light e outline.",
      },
      Types,
      typesCode,
    ),
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description: "medium, small e x-small.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "lista-tarefas",
        kind: "aplicado",
        title: "Lista de tarefas",
        description:
          "Status e contagem de pendências com rótulo acessível descritivo.",
      },
      TaskList,
      taskListCode,
    ),
  ],
  guidelines: [
    {
      do: "Use 1–2 palavras e mantenha um vocabulário consistente de status.",
      dont: "Frases longas dentro do badge.",
      doExample: <Badge>Pendente</Badge>,
      dontExample: <Badge>Esta tarefa ainda está pendente de correção</Badge>,
    },
    {
      do: 'Dê contexto a números com `role="img"` + `aria-label` (“7 entregas pendentes”).',
      dont: "Deixar um número solto sem explicar o que ele conta.",
    },
  ],
  accessibility: {
    notes: [
      "O texto do badge é lido normalmente; ícones são decorativos (`aria-hidden`).",
      'Badges só com ícone ou número precisam de `role="img"` + `aria-label` com o significado (`aria-label` em `<span>` sem papel é ignorado).',
      "Não comunique estado apenas por cor — o texto deve bastar.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Badge",
      native: "<span>",
      descriptions: {
        children:
          "Texto ou número do badge (padrão “Badge”). Passe `null` para só ícone.",
        type: "status (texto), icon (ícone + texto opcional) ou number (contagem).",
        size: "medium, small ou x-small.",
        visualStyle: "filled, light ou outline (number usa light por padrão).",
        icon: "Ícone exibido antes do texto.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function BadgePage() {
  return <ComponentPage doc={doc} />;
}
