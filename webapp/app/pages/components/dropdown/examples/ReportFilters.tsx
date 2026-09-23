import * as React from "react";
import { Button, Download, Dropdown, Filter, Paragraph } from "@hive/react";

const classes = [
  { value: "todas", label: "Todas as turmas" },
  { value: "8a", label: "8º A" },
  { value: "8b", label: "8º B" },
];
const periods = [
  { value: "b1", label: "1º bimestre" },
  { value: "b2", label: "2º bimestre" },
];
const formats = [
  { value: "pdf", label: "PDF" },
  { value: "csv", label: "Planilha (CSV)" },
];

export default function DropdownReportFilters() {
  const [classId, setClassId] = React.useState("todas");
  const [period, setPeriod] = React.useState("b2");
  const [format, setFormat] = React.useState("pdf");
  const classLabel = classes.find((item) => item.value === classId)?.label;

  return (
    <section
      aria-label="Exportar boletins"
      style={{
        display: "grid",
        gap: "var(--hive-space-step-5)",
        maxWidth: 640,
        margin: "0 auto",
        padding: "var(--hive-space-step-7)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "var(--hive-space-12)",
        }}
      >
        <Dropdown
          label="Turma"
          leftIcon={Filter}
          options={classes}
          value={classId}
          onValueChange={setClassId}
        />
        <Dropdown
          label="Período"
          options={periods}
          value={period}
          onValueChange={setPeriod}
        />
        <Dropdown
          label="Formato"
          options={formats}
          value={format}
          onValueChange={setFormat}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--hive-space-12)",
        }}
      >
        <Paragraph
          size="s"
          style={{ margin: 0, color: "var(--hive-content-secondary)" }}
        >
          {classLabel} · {period === "b1" ? "1º" : "2º"} bimestre ·{" "}
          {format.toUpperCase()}
        </Paragraph>
        <Button leftIcon={Download}>Exportar boletins</Button>
      </div>
    </section>
  );
}
