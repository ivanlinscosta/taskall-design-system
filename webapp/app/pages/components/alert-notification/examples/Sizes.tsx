import { AlertNotification } from "@hive/react";

export default function AlertNotificationSizes() {
  return (
    <div
      style={{ display: "grid", gap: "var(--hive-space-12)", width: "100%" }}
    >
      <AlertNotification
        size="large"
        status="information"
        title="Reunião de pais na quinta-feira"
        body="A pauta e o link da chamada foram enviados para os responsáveis."
        linkLabel="Ver pauta"
        linkHref="#pauta"
      />
      <AlertNotification
        size="medium"
        status="information"
        title="Reunião de pais na quinta-feira"
        linkLabel="Ver pauta"
        linkHref="#pauta"
      />
      <AlertNotification
        size="small"
        status="information"
        title="Reunião de pais na quinta-feira"
      />
    </div>
  );
}
