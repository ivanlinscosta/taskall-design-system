import { AvatarGroup } from "@taskall/react";

const people = [
  { fallback: "AL" },
  { fallback: "BR" },
  { fallback: "CM" },
  { fallback: "DF" },
  { fallback: "EG" },
];

export default function AvatarGroupSizes() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-16)",
        justifyItems: "start",
      }}
    >
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <AvatarGroup
          key={size}
          size={size}
          ariaLabel={`Grupo ${size}`}
          avatars={people}
          max={4}
        />
      ))}
    </div>
  );
}
