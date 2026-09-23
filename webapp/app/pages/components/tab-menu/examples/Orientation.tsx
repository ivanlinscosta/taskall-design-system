import {
  BlankCalendar,
  CircleClock,
  LayoutGrid,
  TabMenu,
} from "@taskall/react";

const items = [
  {
    key: "resumo",
    label: "Resumo",
    icon: LayoutGrid,
    content: "Resumo da turma: 31 estudantes, média 7,8.",
  },
  {
    key: "tarefas",
    label: "Tarefas",
    icon: BlankCalendar,
    content: "4 tarefas abertas nesta semana.",
  },
  {
    key: "frequencia",
    label: "Frequência",
    icon: CircleClock,
    content: "Frequência média de 94%.",
  },
];

export default function TabMenuOrientation() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "var(--taskall-space-32)",
        width: "100%",
      }}
    >
      <TabMenu items={items} ariaLabel="Turma (horizontal)" />
      <TabMenu
        items={items}
        type="vertical"
        defaultValue="tarefas"
        ariaLabel="Turma (vertical)"
      />
    </div>
  );
}
