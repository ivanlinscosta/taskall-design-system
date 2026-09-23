import { Avatar } from "@taskall/react";

export default function AvatarImageFallback() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--taskall-space-16)",
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
          font: "var(--taskall-font-paragraph-s)",
          color: "var(--taskall-content-secondary)",
        }}
      >
        Se a foto falhar ao carregar, as iniciais aparecem automaticamente.
      </span>
    </div>
  );
}
