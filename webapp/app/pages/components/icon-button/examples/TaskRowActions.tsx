import * as React from "react";
import {
  Badge,
  BlankCalendar,
  Content,
  CopyPaste,
  IconButton,
  PencilSquare,
  RecycleBin,
  Tooltip,
} from "@hive/react";

const actions = [
  { icon: PencilSquare, label: "Editar tarefa", tone: "neutral" as const },
  { icon: CopyPaste, label: "Duplicar tarefa", tone: "neutral" as const },
  { icon: RecycleBin, label: "Excluir tarefa", tone: "error" as const },
];

export default function IconButtonTaskRowActions() {
  const [last, setLast] = React.useState("");

  return (
    <div
      style={{
        display: "grid",
        gap: "var(--hive-space-8)",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--hive-space-12)",
          padding: "var(--hive-space-step-4) var(--hive-space-step-5)",
          border: "1px solid var(--hive-border-default)",
          borderRadius: "var(--hive-radius-surface)",
          backgroundColor: "var(--hive-background-primary)",
        }}
      >
        <Content
          style={{ flex: 1 }}
          type="icon"
          icon={BlankCalendar}
          label="Lista de exercícios 5"
          description="8º A · vence sexta"
          badge={<Badge size="x-small">Aberta</Badge>}
        />
        <div
          role="toolbar"
          aria-label="Ações da tarefa"
          style={{ display: "flex", gap: "var(--hive-space-4)" }}
        >
          {actions.map((action) => (
            <Tooltip key={action.label} title={action.label}>
              <IconButton
                icon={action.icon}
                aria-label={action.label}
                tone={action.tone}
                visualStyle="light"
                size="small"
                onClick={() => setLast(action.label)}
              />
            </Tooltip>
          ))}
        </div>
      </div>
      <p
        role="status"
        style={{
          margin: 0,
          font: "var(--hive-font-paragraph-xs)",
          color: "var(--hive-content-secondary)",
        }}
      >
        {last ? `Ação: ${last}` : ""}
      </p>
    </div>
  );
}
