import {
  Bell,
  Calendar,
  Home,
  Settings,
  Slot,
  SlotGroup,
  type SlotGroupProps,
} from "@hive/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Orientation from "./examples/Orientation";
import orientationCode from "./examples/Orientation?raw";
import SubjectTags from "./examples/SubjectTags";
import subjectTagsCode from "./examples/SubjectTags?raw";

const page = findPage("componentes", "slot-group");
const icons = [Home, Calendar, Bell, Settings];

const doc: ComponentDoc = {
  page,
  description:
    "SlotGroup organiza vários Slots em linha ou coluna com espaçamento consistente e um nome de grupo acessível.",
  whenToUse: [
    "Agrupar ícones ou siglas relacionadas (disciplinas, atalhos, integrações).",
    "Barras compactas de metadados.",
  ],
  whenNotToUse: [
    "Listas com semântica de lista e muitos itens — use `<ul>` com Content.",
    "Grupos de botões com seleção — use RadioGroup ou TabMenu.",
  ],
  usage: `import { Slot, SlotGroup } from "@hive/react";

<SlotGroup ariaLabel="Disciplinas lecionadas">
  <Slot size="xl" role="img" aria-label="Matemática">MA</Slot>
  <Slot size="xl" role="img" aria-label="Português">PT</Slot>
</SlotGroup>`,
  playground: definePlayground({
    component: "SlotGroup",
    initial: {
      orientation: "horizontal" as NonNullable<SlotGroupProps["orientation"]>,
      ariaLabel: "Atalhos",
      count: 4,
    },
    controls: {
      orientation: { type: "select", options: ["horizontal", "vertical"] },
      ariaLabel: { type: "text" },
      count: { type: "number", label: "quantidade de slots", min: 1, max: 4 },
    },
    render: ({ count, ...props }) => (
      <SlotGroup {...props}>
        {icons.slice(0, count).map((Icon, index) => (
          <Slot key={index} size="lg">
            <Icon size={20} aria-hidden="true" />
          </Slot>
        ))}
      </SlotGroup>
    ),
    code: ({ count, ...props }) =>
      jsx(
        "SlotGroup",
        props,
        ["Home", "Calendar", "Bell", "Settings"]
          .slice(0, count)
          .map(
            (name) =>
              `<Slot size="lg"><${name} size={20} aria-hidden="true" /></Slot>`,
          )
          .join("\n"),
      ),
  }),
  examples: [
    example(
      {
        id: "orientacao",
        kind: "variantes",
        title: "Horizontal e vertical",
        description: "`orientation` muda o eixo mantendo o espaçamento.",
      },
      Orientation,
      orientationCode,
    ),
    example(
      {
        id: "disciplinas",
        kind: "aplicado",
        title: "Disciplinas do professor",
        description: "Siglas com nome acessível e title para hover.",
      },
      SubjectTags,
      subjectTagsCode,
    ),
  ],
  guidelines: [
    {
      do: "Nomeie o grupo com `ariaLabel` e cada item significativo com `aria-label`.",
      dont: "Siglas soltas sem explicação para leitores de tela.",
    },
    {
      do: "Até ~6 itens por grupo.",
      dont: "Grupos longos que quebram o layout em telas pequenas.",
    },
  ],
  accessibility: {
    notes: [
      '`role="group"` com `aria-label` (padrão “Grupo de slots”).',
      "A ordem de leitura e de foco segue a ordem dos filhos.",
    ],
    keyboard: [],
  },
  api: [
    {
      name: "SlotGroup",
      native: "<div>",
      descriptions: {
        orientation: "horizontal ou vertical.",
        ariaLabel: "Nome acessível do grupo.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function SlotGroupPage() {
  return <ComponentPage doc={doc} />;
}
