import { LabelText, Slot, SlotGroup } from "@hive/react";

const subjects = [
  { short: "MA", name: "Matemática" },
  { short: "PT", name: "Português" },
  { short: "CI", name: "Ciências" },
  { short: "HI", name: "História" },
];

export default function SlotGroupSubjectTags() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--hive-space-16)",
        maxWidth: 420,
        margin: "0 auto",
        padding: "var(--hive-space-step-6)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <div>
        <LabelText size="s" style={{ display: "block" }}>
          Prof.ª Helena Duarte
        </LabelText>
        <LabelText size="xs" style={{ color: "var(--hive-content-secondary)" }}>
          Disciplinas no 8º B
        </LabelText>
      </div>
      <SlotGroup ariaLabel="Disciplinas lecionadas">
        {subjects.map((subject) => (
          <Slot
            key={subject.short}
            size="xl"
            role="img"
            aria-label={subject.name}
            title={subject.name}
          >
            <span style={{ font: "var(--hive-font-label-xs)" }}>
              {subject.short}
            </span>
          </Slot>
        ))}
      </SlotGroup>
    </div>
  );
}
