import { LabelText, Paragraph, Rating } from "@hive/react";

export default function RatingReadOnly() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--hive-space-12)",
      }}
    >
      <Rating readOnly value={4.5} label="Avaliação média da atividade" />
      <div>
        <LabelText size="s">4,5 de 5</LabelText>
        <Paragraph
          size="xs"
          style={{ margin: 0, color: "var(--hive-content-secondary)" }}
        >
          32 avaliações de estudantes
        </Paragraph>
      </div>
    </div>
  );
}
