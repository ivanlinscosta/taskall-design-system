import { Dropdown } from "@hive/react";

const options = [
  { value: "mat", label: "Matemática" },
  { value: "por", label: "Português" },
  { value: "cie", label: "Ciências" },
];

export default function DropdownStates() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "var(--hive-space-16)",
        width: "100%",
      }}
    >
      <Dropdown label="Padrão" options={options} />
      <Dropdown
        label="Com apoio"
        sublabel="Disciplina da avaliação."
        options={options}
        defaultValue="mat"
      />
      <Dropdown
        label="Erro"
        options={options}
        error="Escolha uma disciplina."
      />
      <Dropdown
        label="Desabilitado"
        options={options}
        defaultValue="por"
        disabled
      />
      <Dropdown
        label="Small"
        size="small"
        options={options}
        defaultValue="cie"
      />
    </div>
  );
}
