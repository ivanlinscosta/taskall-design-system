import { Download, Filter, More, Tooltip, Upload } from "@hive/react";

const actions = [
  { icon: Filter, label: "Filtrar entregas" },
  { icon: Download, label: "Baixar todas as entregas" },
  { icon: Upload, label: "Enviar notas em lote" },
  { icon: More, label: "Mais ações" },
];

export default function TooltipToolbar() {
  return (
    <div
      role="toolbar"
      aria-label="Ações das entregas"
      style={{
        display: "inline-flex",
        gap: "var(--hive-space-4)",
        padding: "var(--hive-space-4)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      {actions.map(({ icon: Icon, label }) => (
        <Tooltip key={label} title={label}>
          <button
            type="button"
            aria-label={label}
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: "var(--hive-touch-target)",
              height: "var(--hive-touch-target)",
              border: 0,
              borderRadius: "var(--hive-radius-3)",
              background: "transparent",
              color: "var(--hive-content-primary)",
              cursor: "pointer",
            }}
          >
            <Icon size={20} aria-hidden="true" />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
