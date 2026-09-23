import { Heading } from "@hive/react";

export default function HeadingLevels() {
  return (
    <div style={{ display: "grid", gap: "var(--hive-space-8)", width: "100%" }}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading {level}
        </Heading>
      ))}
    </div>
  );
}
