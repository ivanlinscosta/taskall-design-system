import * as React from "react";
import { Heading, Paragraph, Radio, RadioGroup } from "@hive/react";

const labels: Record<string, string> = {
  diario: "todos os dias às 18h",
  semanal: "às segundas-feiras às 8h",
  nunca: "nunca",
};

export default function RadioReminderFrequency() {
  const [value, setValue] = React.useState("semanal");

  return (
    <section
      style={{
        display: "grid",
        gap: "var(--hive-space-step-5)",
        maxWidth: 440,
        margin: "0 auto",
        padding: "var(--hive-space-step-7)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <Heading level={3} as={6}>
        Resumo de tarefas para responsáveis
      </Heading>
      <RadioGroup
        name="frequencia"
        label="Frequência do resumo"
        value={value}
        onValueChange={setValue}
      >
        <Radio value="diario" label="Diário" />
        <Radio value="semanal" label="Semanal" />
        <Radio value="nunca" label="Não enviar" />
      </RadioGroup>
      <Paragraph
        size="s"
        role="status"
        style={{ margin: 0, color: "var(--hive-content-secondary)" }}
      >
        O resumo será enviado {labels[value]}.
      </Paragraph>
    </section>
  );
}
