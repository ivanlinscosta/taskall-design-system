import { StatusIndicator } from "@hive/react";

const statuses = [
  { status: "online", label: "Online" },
  { status: "busy", label: "Ocupado" },
  { status: "away", label: "Ausente" },
  { status: "offline", label: "Offline" },
  { status: "verified", label: "Verificado" },
  { status: "add", label: "Adicionar" },
  { status: "delete", label: "Remover" },
  { status: "favorite", label: "Favorito" },
] as const;

export default function StatusIndicatorStatuses() {
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, auto)",
        gap: "var(--hive-space-16) var(--hive-space-32)",
        margin: 0,
        padding: 0,
        listStyle: "none",
      }}
    >
      {statuses.map(({ status, label }) => (
        <li
          key={status}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--hive-space-8)",
            font: "var(--hive-font-paragraph-s)",
          }}
        >
          <StatusIndicator status={status} size="lg" />
          {label}
        </li>
      ))}
    </ul>
  );
}
