import { LabelText } from "@taskall/react";

export default function LabelTextSizes() {
  return (
    <div style={{ display: "grid", gap: "var(--taskall-space-8)" }}>
      <LabelText size="l">Label L · 18px</LabelText>
      <LabelText size="m">Label M · 16px</LabelText>
      <LabelText size="s">Label S · 14px</LabelText>
      <LabelText size="xs">Label XS · 12px</LabelText>
    </div>
  );
}
