import { Bell, Slot } from "@hive/react";

const sizes = [
  { size: "2xl", icon: 24 },
  { size: "xl", icon: 20 },
  { size: "lg", icon: 20 },
  { size: "md", icon: 16 },
  { size: "sm", icon: 12 },
  { size: "xs", icon: 12 },
] as const;

export default function SlotSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        gap: "var(--hive-space-16)",
      }}
    >
      {sizes.map(({ size, icon }) => (
        <div
          key={size}
          style={{
            display: "grid",
            justifyItems: "center",
            gap: "var(--hive-space-6)",
          }}
        >
          <Slot size={size}>
            <Bell size={icon} aria-hidden="true" />
          </Slot>
          <span
            style={{
              font: "var(--hive-font-paragraph-xs)",
              color: "var(--hive-content-secondary)",
            }}
          >
            {size}
          </span>
        </div>
      ))}
    </div>
  );
}
