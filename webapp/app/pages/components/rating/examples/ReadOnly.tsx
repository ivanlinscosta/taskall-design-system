import { LabelText, Paragraph, Rating } from "@taskall/react";

export default function RatingReadOnly() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--taskall-space-12)",
      }}
    >
      <Rating readOnly value={4.5} label="Avaliação média da atividade" />
      <div>
        <LabelText size="s">4,5 de 5</LabelText>
        <Paragraph
          size="xs"
          style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
        >
          32 avaliações de estudantes
        </Paragraph>
      </div>
    </div>
  );
}
