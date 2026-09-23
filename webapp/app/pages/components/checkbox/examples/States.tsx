import { Checkbox } from "@taskall/react";

export default function CheckboxStates() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "var(--taskall-space-12) var(--taskall-space-32)",
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
