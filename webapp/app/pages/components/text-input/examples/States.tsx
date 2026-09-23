import { Mail, TextInput } from "@hive/react";

export default function TextInputStates() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "var(--hive-space-16)",
        width: "100%",
      }}
    >
      <TextInput
        label="Padrão"
        placeholder="nome@escola.com.br"
        leftIcon={Mail}
      />
      <TextInput
        label="Com apoio"
        sublabel="Usado para recuperar a senha."
        defaultValue="ana@escola.com.br"
      />
      <TextInput
        label="Erro"
        defaultValue="ana@"
        error="Informe um e-mail válido."
      />
      <TextInput label="Desabilitado" defaultValue="Turma 8º B" disabled />
    </div>
  );
}
