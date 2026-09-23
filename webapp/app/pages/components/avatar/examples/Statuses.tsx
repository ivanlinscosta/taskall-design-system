import { Avatar } from "@hive/react";

const statuses = [
  { status: "online", label: "Online" },
  { status: "busy", label: "Ocupada" },
  { status: "away", label: "Ausente" },
  { status: "offline", label: "Offline" },
  { status: "verified", label: "Verificada" },
  { status: "add", label: "Adicionar" },
  { status: "delete", label: "Remover" },
  { status: "favorite", label: "Favorita" },
] as const;

export default function AvatarStatuses() {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--hive-space-20)",
        margin: 0,
        padding: 0,
        listStyle: "none",
      }}
    >
      {statuses.map(({ status, label }) => (
        <li
          key={status}
          style={{
            display: "grid",
            justifyItems: "center",
            gap: "var(--hive-space-6)",
          }}
        >
          <Avatar size="lg" fallback="AL" status={status} />
          <span
            style={{
              font: "var(--hive-font-paragraph-xs)",
              color: "var(--hive-content-secondary)",
            }}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
