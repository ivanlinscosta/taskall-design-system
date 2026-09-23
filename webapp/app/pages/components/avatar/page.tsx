import { Avatar, type AvatarProps } from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import ImageFallback from "./examples/ImageFallback";
import imageFallbackCode from "./examples/ImageFallback?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import Statuses from "./examples/Statuses";
import statusesCode from "./examples/Statuses?raw";
import TaskAssignee from "./examples/TaskAssignee";
import taskAssigneeCode from "./examples/TaskAssignee?raw";

const page = findPage("componentes", "avatar");

type Status = NonNullable<AvatarProps["status"]> | "nenhum";

const doc: ComponentDoc = {
  page,
  description:
    "Avatar identifica uma pessoa por foto ou iniciais e pode exibir um indicador de presença ou ação (online, verificado, favorito…).",
  whenToUse: [
    "Mostrar responsáveis, professores e estudantes em listas, cabeçalhos e comentários.",
    "Sinalizar presença ou um estado curto junto da identidade.",
  ],
  whenNotToUse: [
    "Quando o nome precisa ser lido sem ambiguidade — mostre o nome ao lado.",
    "Para representar entidades sem pessoa (turmas, escolas) — use Slot com ícone.",
  ],
  usage: `import { Avatar } from "@hive/react";

<Avatar src={user.photoUrl} alt={user.name} fallback="MS" status="online" />`,
  playground: definePlayground({
    component: "Avatar",
    initial: {
      fallback: "MS",
      size: "lg" as NonNullable<AvatarProps["size"]>,
      status: "online" as Status,
    },
    controls: {
      fallback: { type: "text" },
      size: { type: "select", options: ["xs", "sm", "md", "lg", "xl"] },
      status: {
        type: "select",
        options: [
          "nenhum",
          "online",
          "busy",
          "away",
          "offline",
          "verified",
          "add",
          "delete",
          "favorite",
        ],
      },
    },
    render: ({ status, ...props }) => (
      <Avatar {...props} status={status === "nenhum" ? undefined : status} />
    ),
    code: ({ status, ...props }) =>
      jsx("Avatar", {
        ...props,
        status: status === "nenhum" ? undefined : status,
      }),
  }),
  examples: [
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description: "xs, sm, md (padrão), lg e xl.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "status",
        kind: "variantes",
        title: "Indicadores",
        description:
          "Presença (online, busy, away, offline) e ações (verified, add, delete, favorite).",
      },
      Statuses,
      statusesCode,
    ),
    example(
      {
        id: "fallback",
        kind: "estados",
        title: "Falha na imagem",
        description: "O fallback de iniciais assume quando `src` não carrega.",
      },
      ImageFallback,
      imageFallbackCode,
    ),
    example(
      {
        id: "revisores",
        kind: "aplicado",
        title: "Revisores de uma avaliação",
        description: "Avatar + nome + papel, com presença em tempo real.",
      },
      TaskAssignee,
      taskAssigneeCode,
    ),
  ],
  guidelines: [
    {
      do: "Mostre o nome da pessoa junto do avatar em listas e cards.",
      dont: "Depender só das iniciais para identificar alguém.",
    },
    {
      do: "Passe `alt` com o nome completo quando usar `src`.",
      dont: "Usar o indicador de status como única forma de comunicar disponibilidade.",
    },
  ],
  accessibility: {
    notes: [
      'Sem imagem, as iniciais usam `role="img"` com `aria-label` igual a `fallback` — prefira passar o nome completo via `aria-label` quando o nome não estiver visível ao lado.',
      "Com imagem, o nome acessível vem de `alt` (ou `fallback`).",
      "O indicador de status é decorativo (`aria-hidden`); informe o status em texto quando for relevante.",
      "Avatar não é interativo: para ações, envolva em `<button>` ou `<a>` com rótulo.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "Avatar",
      native: "<span>",
      descriptions: {
        fallback:
          "Iniciais exibidas sem foto; também é o nome acessível padrão.",
        src: "URL da foto.",
        alt: "Texto alternativo da foto (padrão: `fallback`).",
        size: "xs, sm, md, lg ou xl.",
        status: "Indicador no canto: presença ou ação.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function AvatarPage() {
  return <ComponentPage doc={doc} />;
}
