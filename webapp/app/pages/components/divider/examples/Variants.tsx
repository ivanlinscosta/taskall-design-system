import { Divider, Star } from "@hive/react";

export default function DividerVariants() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--hive-space-24)",
        width: "100%",
        maxWidth: 480,
      }}
    >
      <Divider />
      <Divider dotted />
      <Divider type="text" text="ou continue com" />
      <Divider type="icon" icon={Star} text="Destaques" />
    </div>
  );
}
