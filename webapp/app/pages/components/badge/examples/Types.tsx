import { Badge, Bell, Check } from "@taskall/react";

export default function BadgeTypes() {
  return (
    <div style={{ display: "grid", gap: "var(--taskall-space-16)" }}>
      {(["filled", "light", "outline"] as const).map((visualStyle) => (
        <div
          key={visualStyle}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--taskall-space-12)",
          }}
        >
          <Badge visualStyle={visualStyle}>Publicada</Badge>
          <Badge type="icon" icon={Check} visualStyle={visualStyle}>
            Entregue
          </Badge>
          <Badge
            type="icon"
            icon={Bell}
            visualStyle={visualStyle}
            role="img"
            aria-label="Notificações"
            children={null}
          />
          <Badge type="number" visualStyle={visualStyle}>
            12
          </Badge>
        </div>
      ))}
    </div>
  );
}
