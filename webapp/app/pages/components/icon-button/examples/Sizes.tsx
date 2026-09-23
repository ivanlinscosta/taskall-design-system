import { Delete, IconButton, MagnifyingGlass } from "@taskall/react";

export default function IconButtonSizes() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--taskall-space-12)",
      }}
    >
      <IconButton
        icon={MagnifyingGlass}
        aria-label="Buscar (medium)"
        tone="neutral"
        visualStyle="light"
      />
      <IconButton
        icon={MagnifyingGlass}
        aria-label="Buscar (small)"
        tone="neutral"
        visualStyle="light"
        size="small"
      />
      <IconButton
        icon={Delete}
        aria-label="Fechar"
        tone="neutral"
        visualStyle="outline"
      />
      <IconButton
        icon={Delete}
        aria-label="Fechar (desabilitado)"
        tone="neutral"
        visualStyle="outline"
        disabled
      />
      <IconButton icon={Delete} aria-label="Salvando" loading />
    </div>
  );
}
