import * as React from "react";
import { Button, Check, UploadTray } from "@taskall/react";

type Status = "idle" | "sending" | "sent";

export default function ButtonAsyncSubmit() {
  const [status, setStatus] = React.useState<Status>("idle");

  React.useEffect(() => {
    if (status !== "sending") return;
    const timeout = window.setTimeout(() => setStatus("sent"), 1500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--taskall-space-8)",
      }}
    >
      <Button
        loading={status === "sending"}
        leftIcon={status === "sent" ? Check : UploadTray}
        visualStyle={status === "sent" ? "light" : "filled"}
        onClick={() => setStatus(status === "sent" ? "idle" : "sending")}
      >
        {status === "sending"
          ? "Enviando relatório"
          : status === "sent"
            ? "Relatório enviado"
            : "Enviar relatório"}
      </Button>
      <span
        role="status"
        style={{
          font: "var(--taskall-font-paragraph-xs)",
          color: "var(--taskall-content-secondary)",
        }}
      >
        {status === "sent" ? "Enviado para a coordenação às 14:32." : ""}
      </span>
    </div>
  );
}
