import { Button, Tooltip } from "@hive/react";

export default function TooltipVariants() {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--hive-space-12)" }}
    >
      {(["light", "filled", "outline"] as const).map((visualStyle) => (
        <Tooltip
          key={visualStyle}
          title={`Estilo ${visualStyle}`}
          visualStyle={visualStyle}
        >
          <Button tone="neutral" visualStyle="outline">
            {visualStyle}
          </Button>
        </Tooltip>
      ))}
      <Tooltip
        title="Entrega em grupo"
        description="Um integrante envia o arquivo em nome de todo o grupo."
        side="bottom"
      >
        <Button tone="neutral" visualStyle="outline">
          large (com descrição)
        </Button>
      </Tooltip>
    </div>
  );
}
