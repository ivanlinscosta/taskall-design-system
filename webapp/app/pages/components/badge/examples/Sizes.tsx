import { Badge } from "@taskall/react";

export default function BadgeSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--taskall-space-12)",
      }}
    >
      <Badge size="medium">Medium</Badge>
      <Badge size="small">Small</Badge>
      <Badge size="x-small">X-small</Badge>
      <Badge size="small" type="number">
        3
      </Badge>
    </div>
  );
}
