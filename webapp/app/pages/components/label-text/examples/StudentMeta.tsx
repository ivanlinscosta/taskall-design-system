import { LabelText, Paragraph } from "@taskall/react";

const fields = [
  { term: "Matrícula", value: "2025-08B-031" },
  { term: "Turma", value: "8º B · Manhã" },
  { term: "Responsável", value: "Cláudia Martins" },
  { term: "Frequência", value: "96%" },
];

export default function LabelTextStudentMeta() {
  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "var(--taskall-space-step-5)",
        maxWidth: 560,
        margin: "0 auto",
        padding: "var(--taskall-space-step-6)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      {fields.map((field) => (
        <div key={field.term}>
          <dt>
            <LabelText
              size="xs"
              style={{ color: "var(--taskall-content-secondary)" }}
            >
              {field.term}
            </LabelText>
          </dt>
          <dd style={{ margin: 0 }}>
            <Paragraph size="m" style={{ margin: 0 }}>
              {field.value}
            </Paragraph>
          </dd>
        </div>
      ))}
    </dl>
  );
}
