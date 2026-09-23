import { AlertNotification } from "@hive/react";

const statuses = [
  "information",
  "success",
  "warning",
  "error",
  "update",
] as const;
const titles = {
  information: "Novo período de matrículas aberto.",
  success: "Tarefa publicada para a turma 8º B.",
  warning: "Prazo da tarefa termina em 2 horas.",
  error: "Não foi possível enviar o boletim.",
  update: "Nova versão do app disponível.",
};

export default function AlertNotificationVariants() {
  return (
    <div
      style={{ display: "grid", gap: "var(--hive-space-12)", width: "100%" }}
    >
      {(["light", "filled", "outline"] as const).map((visualStyle) => (
        <div
          key={visualStyle}
          style={{ display: "grid", gap: "var(--hive-space-8)" }}
        >
          {statuses.map((status) => (
            <AlertNotification
              key={status}
              size="small"
              status={status}
              visualStyle={visualStyle}
              title={`${visualStyle} · ${titles[status]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
