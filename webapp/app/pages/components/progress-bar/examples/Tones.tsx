import { ProgressBar } from "@taskall/react";

const tones = [
  "brand",
  "purple",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
] as const;

export default function ProgressBarTones() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-12)",
        width: "100%",
        maxWidth: 420,
      }}
    >
      {tones.map((tone, index) => (
        <ProgressBar
          key={tone}
          tone={tone}
          value={30 + index * 9}
          label={tone}
          showPercentage
          size="small"
        />
      ))}
    </div>
  );
}
