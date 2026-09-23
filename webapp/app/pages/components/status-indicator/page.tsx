import { StatusIndicator, type StatusIndicatorProps } from "@taskall/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import Statuses from "./examples/Statuses";
import statusesCode from "./examples/Statuses?raw";
import TeamPresence from "./examples/TeamPresence";
import teamPresenceCode from "./examples/TeamPresence?raw";

const page = findPage("componentes", "status-indicator");

const doc: ComponentDoc = {
  page,
  description:
    "StatusIndicator é o marcador mínimo de presença (online, ocupado, ausente, offline) ou ação (verificado, adicionar, remover, favorito). É o mesmo indicador usado no Avatar, disponível de forma isolada.",
  whenToUse: [
    "Mostrar presença ao lado de nomes em listas densas.",
    "Marcar itens verificados ou favoritos com o menor espaço possível.",
  ],
  whenNotToUse: [
    "Como único portador de significado — sempre há texto equivalente.",
    "Para feedback de sistema — use AlertNotification ou Badge.",
  ],
  usage: `import { StatusIndicator } from "@taskall/react";

<StatusIndicator status="online" /> Disponível`,
  playground: definePlayground({
    component: "StatusIndicator",
    initial: {
      status: "online" as StatusIndicatorProps["status"],
      size: "lg" as NonNullable<StatusIndicatorProps["size"]>,
    },
    controls: {
      status: {
        type: "select",
        options: [
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
      size: { type: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    },
    render: (props) => <StatusIndicator {...props} />,
    code: (props) => jsx("StatusIndicator", props),
  }),
  examples: [
    example(
      {
        id: "status",
        kind: "variantes",
        title: "Status",
        description:
          "Quatro de presença e quatro de ação, com rótulo em texto.",
      },
      Statuses,
      statusesCode,
    ),
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description: "xs a xl (acompanham os tamanhos de Avatar).",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "presenca-equipe",
        kind: "aplicado",
        title: "Presença da equipe pedagógica",
        description: "Indicador + texto de status para não depender de cor.",
      },
      TeamPresence,
      teamPresenceCode,
    ),
  ],
  guidelines: [
    {
      do: "Acompanhe o indicador de um texto (“Em aula até 11:40”).",
      dont: "Usar só a cor do ponto para comunicar disponibilidade.",
    },
    {
      do: "Use os mesmos status em todo o produto.",
      dont: "Reaproveitar `busy`/`away` com significados diferentes em telas diferentes.",
    },
  ],
  accessibility: {
    notes: [
      'É sempre `aria-hidden="true"`: o status precisa estar em texto visível ou acessível ao lado.',
      "Diferencie status por forma/ícone além da cor (ações usam ícones internos).",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "StatusIndicator",
      native: "<span>",
      descriptions: {
        status: "Presença ou ação representada.",
        size: "xs, sm, md, lg ou xl.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function StatusIndicatorPage() {
  return <ComponentPage doc={doc} />;
}
