import { Avatar } from "@hive/react";

export default function AvatarSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--hive-space-16)",
      }}
    >
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} fallback="MS" />
      ))}
    </div>
  );
}
