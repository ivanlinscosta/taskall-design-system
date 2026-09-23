import * as React from "react";
import { Button, Heading, Mail, Paragraph, TextInput, User } from "@hive/react";

export default function TextInputGuardianForm() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      style={{
        display: "grid",
        gap: "var(--hive-space-step-6)",
        maxWidth: 480,
        margin: "0 auto",
        padding: "var(--hive-space-step-8)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <div>
        <Heading level={3} as={5}>
          Cadastrar responsável
        </Heading>
        <Paragraph size="s" style={{ color: "var(--hive-content-secondary)" }}>
          Estudante: Lucas Martins · 8º B
        </Paragraph>
      </div>
      <TextInput
        label="Nome completo"
        autoComplete="name"
        leftIcon={User}
        required
      />
      <TextInput
        label="E-mail"
        type="email"
        autoComplete="email"
        leftIcon={Mail}
        required
        error={submitted ? "Campo obrigatório." : undefined}
      />
      <TextInput label="Parentesco" sublabel="Opcional. Ex.: mãe, pai, avó." />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "var(--hive-space-8)",
        }}
      >
        <Button
          tone="neutral"
          visualStyle="light"
          type="reset"
          onClick={() => setSubmitted(false)}
        >
          Limpar
        </Button>
        <Button type="submit">Enviar convite</Button>
      </div>
    </form>
  );
}
