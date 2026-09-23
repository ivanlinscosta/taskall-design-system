import { Button, CheckCircle, PencilSquare, RecycleBin } from "@taskall/react";

const tones = ["primary", "neutral", "error"] as const;
const visualStyles = ["filled", "light", "outline"] as const;
const icons = {
  primary: CheckCircle,
  neutral: PencilSquare,
  error: RecycleBin,
};

export default function ButtonVariants() {
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
          <Button
            key={`${tone}-${visualStyle}`}
            tone={tone}
            visualStyle={visualStyle}
            leftIcon={icons[tone]}
          >
            {tone} / {visualStyle}
          </Button>
        )),
      )}
    </div>
  );
}
