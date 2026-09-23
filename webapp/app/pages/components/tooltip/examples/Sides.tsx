import { Button, Tooltip } from "@taskall/react";

export default function TooltipSides() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "var(--taskall-space-24) var(--taskall-space-48)",
        padding: "var(--taskall-space-32)",
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
