import { Avatar } from "@hive/react";

export default function AvatarImageFallback() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--hive-space-16)",
      }}
    >
      <Avatar
        size="lg"
        fallback="JP"
        alt="João Pereira"
        src="/fotos/nao-existe.jpg"
      />
      <span
        style={{
          font: "var(--hive-font-paragraph-s)",
          color: "var(--hive-content-secondary)",
        }}
      >
        Se a foto falhar ao carregar, as iniciais aparecem automaticamente.
      </span>
    </div>
  );
}
