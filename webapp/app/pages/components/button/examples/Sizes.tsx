import { AddCircle, Button } from "@taskall/react";

export default function ButtonSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--taskall-space-12)",
      }}
    >
      <Button size="medium" leftIcon={AddCircle}>
        Nova tarefa
      </Button>
      <Button size="small" leftIcon={AddCircle}>
        Nova tarefa
      </Button>
    </div>
  );
}
