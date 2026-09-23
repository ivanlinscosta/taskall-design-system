import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { DemoSurface } from "../../ui/DemoSurface";
import { TokenTable } from "../../ui/Foundation";
import { Article, Callout, DocSection, PageHeader, Prose } from "../../ui/Page";
import styles from "./foundations.module.css";

const page = findPage("fundamentos", "grid");

const compositions: Array<{ label: string; spans: Array<[number, string]> }> = [
  {
    label: "Metades",
    spans: [
      [6, "6"],
      [6, "6"],
    ],
  },
  {
    label: "Terços",
    spans: [
      [4, "4"],
      [4, "4"],
      [4, "4"],
    ],
  },
  {
    label: "Quartos (cards de indicador)",
    spans: [
      [3, "3"],
      [3, "3"],
      [3, "3"],
      [3, "3"],
    ],
  },
  {
    label: "Conteúdo + painel lateral",
    spans: [
      [8, "8 · lista de tarefas"],
      [4, "4 · filtros"],
    ],
  },
];

const breakpoints = [
  {
    name: "Celular",
    range: "< 640px",
    columns: "4",
    gutter: "step-4",
    margin: "16px",
  },
  {
    name: "Tablet",
    range: "640–1023px",
    columns: "8",
    gutter: "step-5",
    margin: "24px",
  },
  {
    name: "Desktop",
    range: "≥ 1024px",
    columns: "12",
    gutter: "step-5",
    margin: "48px",
  },
];

export const meta = () => pageMeta(page);

export default function GridPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Grid"
        lead="Layouts do Task All usam CSS Grid de 12 colunas com gutters vindos dos steps de densidade — o mesmo layout fica mais denso ou mais arejado sem mudar o código."
      />
      <DocSection id="colunas" title="12 colunas">
        <DemoSurface align="stretch">
          <div className={styles.gridDemo}>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className={styles.gridCell}>
                {index + 1}
              </div>
            ))}
          </div>
        </DemoSurface>
        <CodeBlock
          language="css"
          caption="layout.module.css"
          code={`.layout {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--hive-space-step-5);
}

.main  { grid-column: span 8; }
.aside { grid-column: span 4; }

@media (max-width: 1023px) {
  .layout { grid-template-columns: repeat(8, minmax(0, 1fr)); }
  .main, .aside { grid-column: 1 / -1; }
}`}
        />
      </DocSection>
      <DocSection id="composicoes" title="Composições comuns">
        <DemoSurface align="stretch">
          <div style={{ display: "grid", gap: "var(--hive-space-step-5)" }}>
            {compositions.map((composition) => (
              <div
                key={composition.label}
                style={{ display: "grid", gap: "var(--hive-space-6)" }}
              >
                <span
                  style={{
                    font: "var(--hive-font-label-xs)",
                    color: "var(--hive-content-secondary)",
                  }}
                >
                  {composition.label}
                </span>
                <div className={styles.gridDemo}>
                  {composition.spans.map(([span, label], index) => (
                    <div
                      key={index}
                      className={styles.gridBlock}
                      style={{ gridColumn: `span ${span}` }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DemoSurface>
      </DocSection>
      <DocSection id="breakpoints" title="Breakpoints">
        <Prose>
          <p>
            O Hive não define tokens de breakpoint; estes são os valores
            recomendados para as aplicações Task All (e usados nesta
            documentação).
          </p>
        </Prose>
        <TokenTable
          caption="Breakpoints recomendados"
          columns={["Faixa", "Largura", "Colunas", "Gutter", "Margem lateral"]}
          rows={breakpoints.map((item) => ({
            key: item.name,
            cells: [
              item.name,
              item.range,
              item.columns,
              <code key="g">--hive-space-{item.gutter}</code>,
              item.margin,
            ],
          }))}
        />
        <Callout title="Troque a densidade no menu “Tema”">
          <p>
            Os gutters acima usam steps: em densidade compacta ficam menores, em
            expandida, maiores.
          </p>
        </Callout>
      </DocSection>
    </Article>
  );
}
