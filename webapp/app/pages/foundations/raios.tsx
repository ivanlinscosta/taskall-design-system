import { SETTING_OPTIONS } from "../../lib/settings";
import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { DemoSurface } from "../../ui/DemoSurface";
import { useComputedTokens } from "../../ui/Foundation";
import { Article, DocSection, PageHeader, Prose } from "../../ui/Page";
import styles from "./foundations.module.css";

const page = findPage("fundamentos", "raios");

const tokens = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({
    label: `radius-${level}`,
    token: `--hive-radius-${level}`,
  })),
  { label: "radius-surface", token: "--hive-radius-surface" },
  { label: "radius-pill", token: "--hive-radius-pill" },
];

function RadiusGrid() {
  const [ref, values] = useComputedTokens<HTMLDivElement>(
    tokens.map((item) => item.token),
  );
  return (
    <div ref={ref} className={styles.radiusGrid}>
      {tokens.map((item) => (
        <figure key={item.token} className={styles.radiusItem}>
          <div
            className={styles.radiusBox}
            style={{ borderRadius: `var(${item.token})` }}
            aria-hidden="true"
          />
          <figcaption>
            <code>{item.label}</code>
            <span className={styles.barValue}>{values[item.token] || "…"}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export const meta = () => pageMeta(page);

export default function RadiusPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Raios"
        lead="Nove níveis de arredondamento mais dois semânticos. A forma do tema (reta, padrão, arredondada) remapeia todos os níveis de uma vez."
      />
      <DocSection id="uso" title="Como usar">
        <Prose>
          <p>
            Para superfícies (cards, modais, campos agrupados) use{" "}
            <code>--hive-radius-surface</code>. Para elementos internos, escolha
            um nível. <code>--hive-radius-pill</code> é fixo (999px) para chips
            e trilhas.
          </p>
        </Prose>
        <CodeBlock
          language="css"
          caption="Card.module.css"
          code={`.card {
  border-radius: var(--hive-radius-surface);
}

.thumb {
  border-radius: var(--hive-radius-3);
}`}
        />
      </DocSection>
      {SETTING_OPTIONS.shape.map((option) => (
        <DocSection
          key={option.value}
          id={`forma-${option.value}`}
          title={`Forma: ${option.label}`}
        >
          <DemoSurface overrides={{ shape: option.value }} align="stretch">
            <RadiusGrid />
          </DemoSurface>
        </DocSection>
      ))}
    </Article>
  );
}
