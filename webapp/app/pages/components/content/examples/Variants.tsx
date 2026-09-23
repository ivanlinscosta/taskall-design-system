import { Avatar, Badge, Calendar, Content } from "@hive/react";

export default function ContentVariants() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--hive-space-16)",
        width: "100%",
        maxWidth: 420,
      }}
    >
      <Content label="Mariana Souza" description="Coordenação pedagógica" />
      <Content
        label="Rafael Lima"
        description="Professor de Matemática"
        avatar={<Avatar size="md" fallback="RL" status="online" />}
      />
      <Content
        type="icon"
        icon={Calendar}
        label="Conselho de classe"
        description="Quinta-feira, 14:00"
        badge={<Badge size="small">Hoje</Badge>}
      />
      <Content
        size="x-small"
        label="Beatriz Farias"
        description="8º B"
        avatarSize="sm"
      />
    </div>
  );
}
