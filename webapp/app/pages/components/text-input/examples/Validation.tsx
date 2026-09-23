import * as React from "react";
import { Mail, TextInput } from "@hive/react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TextInputValidation() {
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const error =
    touched && !EMAIL.test(value)
      ? "Informe um e-mail no formato nome@dominio.com."
      : undefined;

  return (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <TextInput
        label="E-mail do responsável"
        sublabel="Enviaremos o convite de acesso para este endereço."
        type="email"
        autoComplete="email"
        leftIcon={Mail}
        required
        value={value}
        error={error}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
}
