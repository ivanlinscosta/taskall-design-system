import * as React from "react";
import {
  AlertNotification,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Heading,
  Mail,
  Paragraph,
  Radio,
  RadioGroup,
  TextInput,
  User,
} from "@taskall/react";

const relationships = [
  { value: "mae", label: "Mãe" },
  { value: "pai", label: "Pai" },
  { value: "avo", label: "Avó / avô" },
  { value: "outro", label: "Outro responsável legal" },
];

export default function GuardianOnboarding() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [channel, setChannel] = React.useState("app");
  const [accepted, setAccepted] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const errors = {
    name: !name.trim() ? "Informe o nome completo." : undefined,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? "Informe um e-mail válido."
      : undefined,
    relationship: !relationship ? "Escolha o parentesco." : undefined,
  };
  const hasErrors = Object.values(errors).some(Boolean) || !accepted;

  if (done) {
    return (
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          display: "grid",
          gap: "var(--taskall-space-12)",
        }}
      >
        <AlertNotification
          status="success"
          title="Convite enviado"
          body={`${name} vai receber o acesso ao app Task All Responsáveis em ${email}.`}
        />
        <Button
          tone="neutral"
          visualStyle="outline"
          onClick={() => {
            setDone(false);
            setSubmitted(false);
          }}
        >
          Cadastrar outro responsável
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (!hasErrors) setDone(true);
      }}
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-6)",
        maxWidth: 520,
        margin: "0 auto",
        padding: "var(--taskall-space-step-8)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--taskall-space-12)",
        }}
      >
        <Avatar size="lg" fallback="LM" alt="Lucas Martins" />
        <div>
          <Heading level={2} as={5}>
            Cadastrar responsável
          </Heading>
          <Paragraph
            size="s"
            style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
          >
            Estudante: Lucas Martins · 8º B
          </Paragraph>
        </div>
      </div>
      {submitted && hasErrors ? (
        <AlertNotification
          status="error"
          size="medium"
          title="Revise os campos destacados para continuar."
        />
      ) : null}
      <TextInput
        label="Nome completo"
        autoComplete="name"
        leftIcon={User}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        error={submitted ? errors.name : undefined}
      />
      <TextInput
        label="E-mail"
        type="email"
        autoComplete="email"
        leftIcon={Mail}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        error={submitted ? errors.email : undefined}
      />
      <Dropdown
        label="Parentesco"
        options={relationships}
        value={relationship}
        onValueChange={setRelationship}
        placeholder="Selecione"
        error={submitted ? errors.relationship : undefined}
      />
      <Divider />
      <RadioGroup
        name="canal"
        label="Como prefere receber avisos?"
        value={channel}
        onValueChange={setChannel}
      >
        <Radio value="app" label="Notificação no app" />
        <Radio value="email" label="E-mail" />
        <Radio value="ambos" label="App e e-mail" />
      </RadioGroup>
      <Checkbox
        checked={accepted}
        onChange={(event) => setAccepted(event.currentTarget.checked)}
        label="Declaro ser responsável legal pelo estudante."
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "var(--taskall-space-8)",
        }}
      >
        <Button type="button" tone="neutral" visualStyle="light">
          Cancelar
        </Button>
        <Button type="submit">Enviar convite</Button>
      </div>
    </form>
  );
}
