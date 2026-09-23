import {
  AddCircle,
  Cog,
  IconButton,
  PencilSquare,
  RecycleBin,
} from "@taskall/react";

const tones = ["primary", "neutral", "error"] as const;
const visualStyles = ["filled", "light", "outline"] as const;
const icons = { primary: AddCircle, neutral: PencilSquare, error: RecycleBin };

export default function IconButtonVariants() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        gap: "var(--taskall-space-12)",
      }}
    >
      {tones.map((tone) =>
        visualStyles.map((visualStyle) => (
          <IconButton
            key={`${tone}-${visualStyle}`}
            icon={
              tone === "neutral" && visualStyle === "outline"
                ? Cog
                : icons[tone]
            }
            tone={tone}
            visualStyle={visualStyle}
            aria-label={`${tone} ${visualStyle}`}
          />
        )),
      )}
    </div>
  );
}
