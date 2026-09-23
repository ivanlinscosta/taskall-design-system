import {
  Calendar,
  ChevronRight,
  LabelText,
  Mail,
  Paragraph,
  Settings,
  Slot,
} from "@taskall/react";

const shortcuts = [
  { icon: Calendar, title: "Calendário escolar", hint: "Provas e feriados" },
  { icon: Mail, title: "Comunicados", hint: "3 não lidos" },
  { icon: Settings, title: "Preferências", hint: "Notificações e idioma" },
];

export default function SlotShortcuts() {
  return (
    <nav aria-label="Atalhos" style={{ maxWidth: 400, margin: "0 auto" }}>
      <ul
        style={{
          display: "grid",
          gap: "var(--taskall-space-step-2)",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {shortcuts.map(({ icon: Icon, title, hint }) => (
          <li key={title}>
            <a
              href={`#${title}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--taskall-space-12)",
                minHeight: "var(--taskall-touch-target)",
                padding:
                  "var(--taskall-space-step-3) var(--taskall-space-step-4)",
                borderRadius: "var(--taskall-radius-surface)",
                color: "inherit",
                textDecoration: "none",
                backgroundColor: "var(--taskall-background-primary)",
                border: "1px solid var(--taskall-border-subtle)",
              }}
            >
              <Slot size="xl">
                <Icon size={20} aria-hidden="true" />
              </Slot>
              <span style={{ flex: 1 }}>
                <LabelText size="s" style={{ display: "block" }}>
                  {title}
                </LabelText>
                <Paragraph
                  size="xs"
                  style={{
                    margin: 0,
                    color: "var(--taskall-content-secondary)",
                  }}
                >
                  {hint}
                </Paragraph>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
