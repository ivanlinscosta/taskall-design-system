import { AvatarGroup, type AvatarProps } from "@hive/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import ClassCard from "./examples/ClassCard";
import classCardCode from "./examples/ClassCard?raw";
import Overflow from "./examples/Overflow";
import overflowCode from "./examples/Overflow?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";

const page = findPage("componentes", "avatar-group");

const initials = ["AL", "BR", "CM", "DF", "EG", "FH", "GI", "HJ"];

const doc: ComponentDoc = {
  page,
  description:
    "AvatarGroup empilha avatares de uma equipe, turma ou grupo de trabalho e resume os excedentes em um marcador “+N” com nome acessível.",
  whenToUse: [
    "Mostrar participantes de um grupo, turma ou tarefa em pouco espaço.",
    "Dar contexto coletivo em cards e linhas de lista.",
  ],
  whenNotToUse: [
    "Quando cada pessoa precisa ser identificada ou acionada individualmente — use uma lista.",
    "Para listas longas que exigem busca ou paginação.",
  ],
  usage: `import { AvatarGroup } from "@hive/react";

<AvatarGroup
  ariaLabel="Integrantes do grupo 3"
  avatars={students.map((s) => ({ fallback: s.initials, src: s.photo, alt: s.name }))}
  max={4}
/>`,
  playground: definePlayground({
    component: "AvatarGroup",
    initial: {
      count: 6,
      max: 4,
      size: "md" as NonNullable<AvatarProps["size"]>,
      ariaLabel: "Professores da turma 8º B",
    },
    controls: {
      count: { type: "number", label: "avatars.length", min: 1, max: 8 },
      max: { type: "number", min: 1, max: 8 },
      size: { type: "select", options: ["xs", "sm", "md", "lg", "xl"] },
      ariaLabel: { type: "text" },
    },
    render: ({ count, ...props }) => (
      <AvatarGroup
        {...props}
        avatars={initials.slice(0, count).map((fallback) => ({ fallback }))}
      />
    ),
    code: ({ count, ...props }) =>
      jsx("AvatarGroup", {
        ...props,
        avatars: raw(
          JSON.stringify(
            initials.slice(0, count).map((fallback) => ({ fallback })),
          ).replace(/"fallback"/g, "fallback"),
        ),
      }),
  }),
  examples: [
    example(
      {
        id: "excedentes",
        kind: "variantes",
        title: "Limite e excedentes",
        description: "`max` define quantos aparecem; o restante vira “+N”.",
      },
      Overflow,
      overflowCode,
    ),
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description: "O `size` do grupo se aplica a todos os avatares.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "card-grupo",
        kind: "aplicado",
        title: "Card de grupo de trabalho",
        description: "Integrantes, status e progresso de um projeto da turma.",
      },
      ClassCard,
      classCardCode,
    ),
  ],
  guidelines: [
    {
      do: "Nomeie o grupo com `ariaLabel` descrevendo quem são as pessoas.",
      dont: "Deixar o rótulo padrão “Avatares” em telas com vários grupos.",
    },
    {
      do: "Use `max` entre 3 e 5 para manter o grupo legível.",
      dont: "Exibir dezenas de avatares sobrepostos.",
    },
  ],
  accessibility: {
    notes: [
      'O contêiner usa `role="group"` com `aria-label` (padrão “Avatares”).',
      'O marcador de excedentes tem `role="img"` e nome próprio (`surplusLabel` ou “+N avatares adicionais”).',
      "Cada avatar mantém seu nome acessível; passe `alt` com o nome completo.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "AvatarGroup",
      native: "<div>",
      descriptions: {
        avatars: "Lista de props de Avatar ou elementos `<Avatar>`.",
        max: "Quantidade máxima visível; o restante vira “+N”.",
        size: "Tamanho aplicado a todos os avatares.",
        surplusLabel: "Nome acessível do marcador de excedentes.",
        ariaLabel: "Nome acessível do grupo.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function AvatarGroupPage() {
  return <ComponentPage doc={doc} />;
}
