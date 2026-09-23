import * as React from "react";
import {
  AlertNotification,
  Button,
  Heading,
  Paragraph,
  Rating,
} from "@taskall/react";

export default function RatingActivityFeedback() {
  const [value, setValue] = React.useState(0);
  const [sent, setSent] = React.useState(false);

  return (
    <section
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-5)",
        maxWidth: 420,
        margin: "0 auto",
        padding: "var(--taskall-space-step-7)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div>
        <Heading level={3} as={6}>
          Como foi a atividade “Mapa mental de Biologia”?
        </Heading>
        <Paragraph
          size="s"
          style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
        >
          Sua resposta é anônima e ajuda o professor a planejar as próximas
          aulas.
        </Paragraph>
      </div>
      {sent ? (
        <AlertNotification
          status="success"
          size="medium"
          title="Obrigado! Avaliação enviada."
        />
      ) : (
        <>
          <Rating label="Nota da atividade" value={value} onChange={setValue} />
          <Button disabled={value === 0} onClick={() => setSent(true)}>
            Enviar avaliação
          </Button>
        </>
      )}
    </section>
  );
}
