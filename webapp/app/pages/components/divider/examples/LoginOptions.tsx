import { Button, Divider, Mail, TextInput } from "@taskall/react";

export default function DividerLoginOptions() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-6)",
        maxWidth: 380,
        margin: "0 auto",
        padding: "var(--taskall-space-step-7)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <TextInput
        label="Código de acesso do estudante"
        placeholder="Ex.: 8B-2931"
      />
      <Button type="submit">Entrar</Button>
      <Divider type="text" text="ou" />
      <Button
        type="button"
        tone="neutral"
        visualStyle="outline"
        leftIcon={Mail}
      >
        Receber link por e-mail
      </Button>
    </form>
  );
}
