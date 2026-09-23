import { Badge, Calendar, Content, type ContentProps } from "@taskall/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Agenda from "./examples/Agenda";
import agendaCode from "./examples/Agenda?raw";
import Variants from "./examples/Variants";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "content");

const doc: ComponentDoc = {
  page,
  description:
    "Content monta uma linha compacta: elemento visual (avatar ou ícone), rótulo, descrição opcional e um badge ao final. É o bloco básico de listas e resultados.",
  whenToUse: [
    "Itens de lista: pessoas, eventos, arquivos, resultados de busca.",
    "Metadados compactos em cards e cabeçalhos.",
  ],
  whenNotToUse: [
    "Layouts com várias ações por linha — componha com Button ao lado.",
    "Conteúdo longo com parágrafos — use Heading + Paragraph.",
  ],
  usage: `import { Badge, Calendar, Content } from "@taskall/react";

<Content
  type="icon"
  icon={Calendar}
  label="Reunião de pais"
  description="Qui, 25/09 · 19:00"
  badge={<Badge size="x-small">Hoje</Badge>}
/>`,
  playground: definePlayground({
    component: "Content",
    initial: {
      label: "Conselho de classe",
      description: "Quinta-feira, 14:00 · Sala 12",
      type: "icon" as NonNullable<ContentProps["type"]>,
      size: "small" as NonNullable<ContentProps["size"]>,
      badge: true,
    },
    controls: {
      label: { type: "text" },
      description: { type: "text" },
      type: { type: "select", options: ["avatar", "icon"] },
      size: { type: "select", options: ["small", "x-small"] },
      badge: { type: "boolean", label: "badge" },
    },
    render: ({ badge, description, ...props }) => (
      <div style={{ width: "100%", maxWidth: 380 }}>
        <Content
          {...props}
          description={description || undefined}
          icon={Calendar}
          badge={badge ? <Badge size="x-small">Hoje</Badge> : undefined}
        />
      </div>
    ),
    code: ({ badge, ...props }) =>
      jsx("Content", {
        ...props,
        icon: props.type === "icon" ? raw("Calendar") : undefined,
        badge: badge ? raw(`<Badge size="x-small">Hoje</Badge>`) : undefined,
      }),
  }),
  examples: [
    example(
      {
        id: "variantes",
        kind: "variantes",
        title: "Avatar, ícone e badge",
        description:
          "Iniciais automáticas, avatar customizado, ícone com badge e tamanho x-small.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "agenda",
        kind: "aplicado",
        title: "Agenda da semana",
        description: "Lista semântica de eventos separados por Divider.",
      },
      Agenda,
      agendaCode,
    ),
  ],
  guidelines: [
    {
      do: "Coloque Content dentro de `<li>` quando for uma lista.",
      dont: "Empilhar vários Content soltos sem semântica de lista.",
    },
    {
      do: "Use a descrição para o metadado mais útil (data, papel, turma).",
      dont: "Repetir no badge a mesma informação da descrição.",
    },
  ],
  accessibility: {
    notes: [
      "O `label` é o texto principal lido pelo leitor de tela; as iniciais geradas são `aria-hidden`.",
      "Ícones são decorativos.",
      "O componente não é focável; se a linha for clicável, envolva em `<a>` ou `<button>`.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Content",
      native: "<div>",
      descriptions: {
        label: "Texto principal; também gera as iniciais do avatar padrão.",
        description: "Linha secundária.",
        type: "avatar (iniciais ou `avatar` customizado) ou icon.",
        size: "small ou x-small.",
        avatar:
          'Nó customizado no lugar das iniciais (ex.: `<Avatar size="xl">` para acompanhar rótulo + descrição).',
        avatarSize:
          "Tamanho fixo das iniciais. Sem valor, acompanha a altura do texto (32px sem descrição, 40px com).",
        icon: 'Ícone usado quando `type="icon"`.',
        badge: "Nó exibido à direita (ex.: `<Badge>`).",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function ContentPage() {
  return <ComponentPage doc={doc} />;
}
