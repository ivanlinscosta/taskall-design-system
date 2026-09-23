import {
  Button,
  Heading,
  NotepadText,
  Paragraph,
  TaillessLineArrowLeft,
  TaillessLineArrowRight,
} from "@taskall/react";

export default function ButtonTaskFormActions() {
  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div style={{ padding: "var(--taskall-space-step-7)" }}>
        <Heading level={3} as={6}>
          Nova tarefa · Etapa 2 de 3
        </Heading>
        <Paragraph
          size="s"
          style={{ color: "var(--taskall-content-secondary)" }}
        >
          Revise responsáveis e prazo antes de publicar a tarefa para a turma 8º
          B.
        </Paragraph>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "var(--taskall-space-12)",
          padding: "var(--taskall-space-step-5) var(--taskall-space-step-7)",
          borderTop: "1px solid var(--taskall-border-subtle)",
        }}
      >
        <Button tone="neutral" visualStyle="light" leftIcon={NotepadText}>
          Salvar rascunho
        </Button>
        <div style={{ display: "flex", gap: "var(--taskall-space-8)" }}>
          <Button
            tone="neutral"
            visualStyle="outline"
            leftIcon={TaillessLineArrowLeft}
          >
            Voltar
          </Button>
          <Button rightIcon={TaillessLineArrowRight}>Publicar tarefa</Button>
        </div>
      </div>
    </div>
  );
}
