import { Rating } from "@taskall/react";

export default function RatingVariants() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--taskall-space-32)",
      }}
    >
      <Rating label="Estrelas" />
      <Rating label="Corações" type="heart" />
      <Rating label="Vertical" direction="vertical" max={3} />
    </div>
  );
}
