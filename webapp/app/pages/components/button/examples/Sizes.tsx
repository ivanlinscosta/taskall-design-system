import { AddCircle, Button } from "@hive/react";

export default function ButtonSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--hive-space-12)",
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
