import { Button, Checkbox, Heading, Paragraph } from "@taskall/react";

export default function CheckboxNotificationPreferences() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-6)",
        maxWidth: 480,
        margin: "0 auto",
        padding: "var(--taskall-space-step-7)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div>
        <Heading level={3} as={6}>
          Notificações do responsável
        </Heading>
        <Paragraph
          size="s"
          style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
        >
          Escolha o que você quer receber sobre Lucas Martins.
        </Paragraph>
      </div>
      <fieldset
        style={{
          margin: 0,
          padding: 0,
          border: 0,
          display: "grid",
          gap: "var(--taskall-space-step-4)",
        }}
      >
        <legend className="visually-hidden">Tipos de notificação</legend>
        <Checkbox
          name="prefs"
          value="tarefas"
          label="Novas tarefas e prazos"
          defaultChecked
        />
        <Checkbox
          name="prefs"
          value="notas"
          label="Notas publicadas"
          defaultChecked
        />
        <Checkbox
          name="prefs"
          value="faltas"
          label="Faltas e atrasos"
          defaultChecked
        />
        <Checkbox name="prefs" value="eventos" label="Eventos da escola" />
      </fieldset>
      <Checkbox
        size="x-small"
        name="termos"
        label="Concordo em receber comunicações por e-mail e pelo app."
        required
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Salvar preferências</Button>
      </div>
    </form>
  );
}
