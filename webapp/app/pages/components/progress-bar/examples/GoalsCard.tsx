import { Heading, ProgressBar } from "@hive/react";

const goals = [
  { label: "Frequência mínima (75%)", value: 96, tone: "green" as const },
  { label: "Tarefas entregues", value: 72, tone: "brand" as const },
  { label: "Leituras do bimestre", value: 40, tone: "yellow" as const },
];

export default function ProgressBarGoalsCard() {
  return (
    <section
      aria-labelledby="goals-title"
      style={{
        display: "grid",
        gap: "var(--hive-space-step-5)",
        maxWidth: 420,
        margin: "0 auto",
        padding: "var(--hive-space-step-7)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <Heading level={3} as={6} id="goals-title">
        Metas do bimestre · Lucas
      </Heading>
      {goals.map((goal) => (
        <ProgressBar
          key={goal.label}
          label={goal.label}
          value={goal.value}
          tone={goal.tone}
          showPercentage
        />
      ))}
    </section>
  );
}
