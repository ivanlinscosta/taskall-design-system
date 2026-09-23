import { StatusIndicator } from "@taskall/react";

export default function StatusIndicatorSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--taskall-space-16)",
      }}
    >
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <StatusIndicator key={size} status="verified" size={size} />
      ))}
    </div>
  );
}
