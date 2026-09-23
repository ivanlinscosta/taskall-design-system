import { AvatarGroup } from "@hive/react";

const team = ["AL", "BR", "CM", "DF", "EG", "FH", "GI", "HJ"].map(
  (fallback) => ({ fallback }),
);

export default function AvatarGroupOverflow() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--hive-space-16)",
        justifyItems: "start",
      }}
    >
      <AvatarGroup ariaLabel="Equipe completa" avatars={team.slice(0, 3)} />
      <AvatarGroup ariaLabel="Equipe com limite de 4" avatars={team} max={4} />
      <AvatarGroup
        ariaLabel="Equipe com rótulo de excedentes"
        avatars={team}
        max={2}
        surplusLabel="Mais 6 professores na equipe"
      />
    </div>
  );
}
