import {
  BlankCalendar,
  Dropdown,
  Sun,
  AngledMoon,
  CircleClock,
  type DropdownOption,
} from "@hive/react";

const periods: DropdownOption[] = [
  { value: "b1", label: "1º bimestre", adornment: "check" },
  { value: "b2", label: "2º bimestre", adornment: "check" },
  { value: "b3", label: "3º bimestre", adornment: "check" },
  { value: "b4", label: "4º bimestre", adornment: "check", disabled: true },
];

const shifts: DropdownOption[] = [
  { value: "manha", label: "Manhã", icon: Sun, adornment: "radio" },
  { value: "tarde", label: "Tarde", icon: AngledMoon, adornment: "radio" },
  {
    value: "integral",
    label: "Integral",
    icon: CircleClock,
    adornment: "radio",
  },
];

const classes: DropdownOption[] = [
  { value: "6a", label: "6º A", meta: "28 alunos" },
  { value: "7a", label: "7º A", meta: "31 alunos" },
  { value: "8b", label: "8º B", adornment: "badge", meta: "Nova" },
];

export default function DropdownAdornments() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "var(--hive-space-16)",
        width: "100%",
      }}
    >
      <Dropdown
        label="Período"
        leftIcon={BlankCalendar}
        options={periods}
        defaultValue="b2"
      />
      <Dropdown label="Turno" options={shifts} defaultValue="manha" />
      <Dropdown label="Turma" options={classes} placeholder="Escolha a turma" />
    </div>
  );
}
