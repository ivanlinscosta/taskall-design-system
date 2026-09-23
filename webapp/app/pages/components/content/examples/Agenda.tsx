import {
  Badge,
  Bell,
  Calendar,
  Content,
  Divider,
  Heading,
  Mail,
} from "@hive/react";

const items = [
  {
    icon: Calendar,
    label: "Reunião de pais",
    description: "Qui, 25/09 · 19:00 · Auditório",
    badge: "Hoje",
  },
  {
    icon: Mail,
    label: "Comunicado: saída de campo",
    description: "Autorização até 30/09",
    badge: "Novo",
  },
  {
    icon: Bell,
    label: "Prazo: Lista de exercícios 5",
    description: "Sex, 26/09 · 23:59",
  },
];

export default function ContentAgenda() {
  return (
    <section
      aria-labelledby="agenda-title"
      style={{
        maxWidth: 440,
        margin: "0 auto",
        padding: "var(--hive-space-step-6)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <Heading
        level={3}
        as={6}
        id="agenda-title"
        style={{ marginBottom: "var(--hive-space-step-4)" }}
      >
        Agenda da semana
      </Heading>
      <ul
        style={{
          display: "grid",
          gap: "var(--hive-space-step-4)",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <li
            key={item.label}
            style={{ display: "grid", gap: "var(--hive-space-step-4)" }}
          >
            {index > 0 ? <Divider /> : null}
            <Content
              type="icon"
              icon={item.icon}
              label={item.label}
              description={item.description}
              badge={
                item.badge ? (
                  <Badge size="x-small" visualStyle="light">
                    {item.badge}
                  </Badge>
                ) : undefined
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
