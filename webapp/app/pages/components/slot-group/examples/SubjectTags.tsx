import { LabelText, Slot, SlotGroup } from "@taskall/react";

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
        gap: "var(--taskall-space-16)",
        maxWidth: 420,
        margin: "0 auto",
        padding: "var(--taskall-space-step-6)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div>
        <LabelText size="s" style={{ display: "block" }}>
          Prof.ª Helena Duarte
        </LabelText>
        <LabelText
          size="xs"
          style={{ color: "var(--taskall-content-secondary)" }}
        >
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
            <span style={{ font: "var(--taskall-font-label-xs)" }}>
              {subject.short}
            </span>
          </Slot>
        ))}
      </SlotGroup>
    </div>
  );
}
