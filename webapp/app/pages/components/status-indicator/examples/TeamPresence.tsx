import { LabelText, StatusIndicator } from "@hive/react";

const team = [
  { name: "Mariana Souza", status: "online" as const, text: "Disponível" },
  { name: "Rafael Lima", status: "busy" as const, text: "Em aula até 11:40" },
  { name: "Helena Duarte", status: "away" as const, text: "Ausente" },
  { name: "Carlos Mendes", status: "offline" as const, text: "Offline" },
];

export default function StatusIndicatorTeamPresence() {
  return (
    <ul
      aria-label="Equipe pedagógica"
      style={{
        display: "grid",
        gap: "var(--hive-space-step-4)",
        maxWidth: 360,
        margin: "0 auto",
        padding: "var(--hive-space-step-6)",
        listStyle: "none",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      {team.map((person) => (
        <li
          key={person.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--hive-space-12)",
          }}
        >
          <StatusIndicator status={person.status} size="md" />
          <LabelText size="s" style={{ flex: 1 }}>
            {person.name}
          </LabelText>
          <span
            style={{
              font: "var(--hive-font-paragraph-xs)",
              color: "var(--hive-content-secondary)",
            }}
          >
            {person.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
