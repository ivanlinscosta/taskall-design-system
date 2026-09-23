import { Download, Filter, More, Tooltip, Upload } from "@taskall/react";

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
        gap: "var(--taskall-space-4)",
        padding: "var(--taskall-space-4)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
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
              width: "var(--taskall-touch-target)",
              height: "var(--taskall-touch-target)",
              border: 0,
              borderRadius: "var(--taskall-radius-3)",
              background: "transparent",
              color: "var(--taskall-content-primary)",
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
