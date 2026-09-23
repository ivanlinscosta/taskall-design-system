import { Radio, RadioGroup } from "@taskall/react";

export default function RadioStates() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--taskall-space-48)",
      }}
    >
      <RadioGroup
        name="estado-padrao"
        label="Com uma opção desabilitada"
        defaultValue="presencial"
      >
        <Radio value="presencial" label="Presencial" />
        <Radio value="online" label="Online" />
        <Radio value="hibrido" label="Híbrido (indisponível)" disabled />
      </RadioGroup>
      <RadioGroup
        name="estado-disabled"
        label="Grupo desabilitado"
        defaultValue="online"
        disabled
      >
        <Radio value="presencial" label="Presencial" />
        <Radio value="online" label="Online" />
      </RadioGroup>
    </div>
  );
}
