import { Badge, Calendar, Check, LabelText, Paragraph } from "@taskall/react";

const tasks = [
  {
    title: "Resumo do capítulo 3",
    due: "Hoje, 23:59",
    status: "Pendente",
    pending: 7,
  },
  {
    title: "Lista de exercícios 5",
    due: "Amanhã",
    status: "Publicada",
    pending: 18,
  },
  {
    title: "Relatório da feira de ciências",
    due: "Encerrada",
    status: "Corrigida",
    pending: 0,
  },
];

export default function BadgeTaskList() {
  return (
    <ul
      aria-label="Tarefas da turma 8º B"
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: 0,
        listStyle: "none",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      {tasks.map((task, index) => (
        <li
          key={task.title}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--taskall-space-12)",
            padding: "var(--taskall-space-step-5)",
            borderTop:
              index === 0
                ? undefined
                : "1px solid var(--taskall-border-subtle)",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <LabelText size="s">{task.title}</LabelText>
            <Paragraph
              size="xs"
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "var(--taskall-space-4)",
                color: "var(--taskall-content-secondary)",
              }}
            >
              <Calendar size={12} aria-hidden="true" /> {task.due}
            </Paragraph>
          </div>
          {task.pending > 0 ? (
            <Badge
              type="number"
              size="small"
              role="img"
              aria-label={`${task.pending} entregas pendentes`}
            >
              {task.pending}
            </Badge>
          ) : null}
          <Badge
            size="small"
            type={task.status === "Corrigida" ? "icon" : "status"}
            icon={task.status === "Corrigida" ? Check : undefined}
            visualStyle={task.status === "Pendente" ? "filled" : "outline"}
          >
            {task.status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
