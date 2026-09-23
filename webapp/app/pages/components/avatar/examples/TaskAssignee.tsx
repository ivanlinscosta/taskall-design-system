import { Avatar, Badge, LabelText, Paragraph } from "@taskall/react";

const reviewers = [
  {
    name: "Mariana Souza",
    initials: "MS",
    role: "Coordenação pedagógica",
    status: "online" as const,
  },
  {
    name: "Rafael Lima",
    initials: "RL",
    role: "Professor de Matemática",
    status: "away" as const,
  },
];

export default function AvatarTaskAssignee() {
  return (
    <ul
      aria-label="Revisores da avaliação"
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-3)",
        maxWidth: 440,
        margin: "0 auto",
        padding: "var(--taskall-space-step-4)",
        listStyle: "none",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      {reviewers.map((person) => (
        <li
          key={person.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--taskall-space-12)",
          }}
        >
          <Avatar
            fallback={person.initials}
            alt={person.name}
            status={person.status}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <LabelText size="s">{person.name}</LabelText>
            <Paragraph
              size="xs"
              style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
            >
              {person.role} ·{" "}
              {person.status === "online" ? "online agora" : "ausente"}
            </Paragraph>
          </div>
          <Badge size="small" visualStyle="light">
            Revisor
          </Badge>
        </li>
      ))}
    </ul>
  );
}
