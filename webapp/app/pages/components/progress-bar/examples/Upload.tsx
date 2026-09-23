import * as React from "react";
import { Button, ProgressBar, Upload } from "@taskall/react";

export default function ProgressBarUpload() {
  const [value, setValue] = React.useState(0);
  const running = value > 0 && value < 100;

  React.useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(
      () => setValue((current) => Math.min(current + 7, 100)),
      250,
    );
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-12)",
        width: "100%",
        maxWidth: 420,
      }}
    >
      <ProgressBar
        value={value}
        label={
          value === 100 ? "Trabalho enviado" : "Enviando trabalho-ciencias.pdf"
        }
        showPercentage
        tone={value === 100 ? "green" : "brand"}
      />
      <Button
        size="small"
        visualStyle="outline"
        leftIcon={Upload}
        disabled={running}
        onClick={() => setValue(1)}
      >
        {value === 100 ? "Enviar novamente" : "Simular envio"}
      </Button>
    </div>
  );
}
