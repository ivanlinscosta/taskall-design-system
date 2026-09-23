import { Heading, LabelText, Paragraph } from "@hive/react";

export default function ParagraphAnnouncement() {
  return (
    <article
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: "var(--hive-space-step-7)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <LabelText size="xs" style={{ color: "var(--hive-content-secondary)" }}>
        Comunicado · 22/09
      </LabelText>
      <Heading level={3} as={5}>
        Saída de campo ao Museu de Ciências
      </Heading>
      <Paragraph>
        Na próxima quarta-feira, as turmas do 8º ano visitam o Museu de
        Ciências. A saída será às 8h e o retorno às 12h30.
      </Paragraph>
      <Paragraph size="s" style={{ color: "var(--hive-content-secondary)" }}>
        Envie a autorização assinada pelo app até sexta-feira. Estudantes sem
        autorização terão atividade na biblioteca.
      </Paragraph>
    </article>
  );
}
