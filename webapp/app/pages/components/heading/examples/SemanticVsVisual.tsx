import { Heading, Paragraph } from "@hive/react";

export default function HeadingSemanticVsVisual() {
  return (
    <div
      style={{ display: "grid", gap: "var(--hive-space-16)", width: "100%" }}
    >
      <div>
        <Heading level={2} as={5}>
          Semântica h2, aparência h5
        </Heading>
        <Paragraph size="s" style={{ margin: 0 }}>
          Útil em cards: mantém o outline correto sem um título gigante.
        </Paragraph>
      </div>
      <div>
        <Heading level={3} as={2}>
          Semântica h3, aparência h2
        </Heading>
        <Paragraph size="s" style={{ margin: 0 }}>
          Destaque visual sem pular níveis no documento.
        </Paragraph>
      </div>
    </div>
  );
}
