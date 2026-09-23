import { Paragraph } from "@taskall/react";

const text =
  "A tarefa fica disponível para a turma até a data de entrega definida pelo professor.";

export default function ParagraphSizes() {
  return (
    <div
      style={{ display: "grid", gap: "var(--taskall-space-12)", maxWidth: 560 }}
    >
      <Paragraph size="l">L · {text}</Paragraph>
      <Paragraph size="m">M · {text}</Paragraph>
      <Paragraph size="s">S · {text}</Paragraph>
      <Paragraph size="xs">XS · {text}</Paragraph>
    </div>
  );
}
