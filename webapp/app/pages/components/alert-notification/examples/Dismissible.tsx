import * as React from "react";
import { AlertNotification, Button } from "@taskall/react";

export default function AlertNotificationDismissible() {
  const [key, setKey] = React.useState(0);
  const [closed, setClosed] = React.useState(false);

  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-12)",
        width: "100%",
        maxWidth: 520,
      }}
    >
      <AlertNotification
        key={key}
        closable
        status="warning"
        title="3 estudantes ainda não entregaram a tarefa"
        body="O prazo termina hoje às 23:59. Deseja enviar um lembrete?"
        linkLabel="Enviar lembrete"
        linkHref="#lembrete"
        onClose={() => setClosed(true)}
      />
      {closed ? (
        <Button
          size="small"
          tone="neutral"
          visualStyle="outline"
          onClick={() => {
            setClosed(false);
            setKey((value) => value + 1);
          }}
        >
          Mostrar novamente
        </Button>
      ) : null}
    </div>
  );
}
