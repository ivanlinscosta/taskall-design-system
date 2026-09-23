import { Search, TextInput } from "@hive/react";

export default function TextInputSizes() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--hive-space-16)",
        width: "100%",
        maxWidth: 360,
      }}
    >
      <TextInput label="Medium" placeholder="Buscar tarefa" leftIcon={Search} />
      <TextInput
        label="Small"
        size="small"
        placeholder="Buscar tarefa"
        leftIcon={Search}
      />
    </div>
  );
}
