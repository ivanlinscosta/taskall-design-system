import { AlertNotification, Heading, ProgressBar } from "@hive/react";

export default function AlertNotificationSyncStatus() {
  return (
    <section
      aria-labelledby="sync-title"
      style={{
        display: "grid",
        gap: "var(--hive-space-step-5)",
        maxWidth: 560,
        margin: "0 auto",
        padding: "var(--hive-space-step-7)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <Heading level={3} as={6} id="sync-title">
        Importação de notas · 2º bimestre
      </Heading>
      <ProgressBar
        value={100}
        label="Planilha processada"
        showPercentage
        tone="green"
      />
      <AlertNotification
        status="success"
        title="248 notas importadas"
        body="Os boletins ficam visíveis para estudantes e responsáveis a partir de amanhã, 07:00."
        linkLabel="Revisar boletins"
        linkHref="#boletins"
      />
      <AlertNotification
        status="error"
        size="medium"
        title="4 linhas com matrícula inexistente"
        linkLabel="Baixar relatório"
        linkHref="#relatorio"
      />
    </section>
  );
}
