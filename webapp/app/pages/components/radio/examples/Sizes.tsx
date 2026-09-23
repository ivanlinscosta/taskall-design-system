import { Radio, RadioGroup } from "@taskall/react";

export default function RadioSizes() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--taskall-space-48)",
      }}
    >
      <RadioGroup name="size-small" label="Small" defaultValue="a">
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" />
      </RadioGroup>
      <RadioGroup
        name="size-xsmall"
        label="X-small"
        size="x-small"
        defaultValue="a"
      >
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" />
      </RadioGroup>
    </div>
  );
}
