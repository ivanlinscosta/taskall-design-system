import { StatusIndicator } from "@hive/react";

export default function StatusIndicatorSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--hive-space-16)",
      }}
    >
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <StatusIndicator key={size} status="verified" size={size} />
      ))}
    </div>
  );
}
