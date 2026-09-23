import { Checkbox } from "@hive/react";

export default function CheckboxStates() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "var(--hive-space-12) var(--hive-space-32)",
      }}
    >
      <Checkbox label="Não marcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Parcial" indeterminate />
      <Checkbox label="Desabilitado" disabled />
      <Checkbox label="Marcado desabilitado" defaultChecked disabled />
      <Checkbox label="X-small" size="x-small" defaultChecked />
    </div>
  );
}
