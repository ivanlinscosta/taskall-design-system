import { Button, Tooltip } from "@hive/react";

export default function TooltipSides() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "var(--hive-space-24) var(--hive-space-48)",
        padding: "var(--hive-space-32)",
      }}
    >
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} title={`side="${side}"`} side={side}>
          <Button size="small" tone="neutral" visualStyle="light">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
