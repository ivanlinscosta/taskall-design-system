import { Divider, Star } from "@taskall/react";

export default function DividerVariants() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-24)",
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
