import { SETTING_OPTIONS } from "../../lib/settings";
import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { DemoSurface } from "../../ui/DemoSurface";
import { TokenTable, useComputedTokens } from "../../ui/Foundation";
import { Article, Callout, DocSection, PageHeader, Prose } from "../../ui/Page";
import styles from "./foundations.module.css";

const page = findPage("fundamentos", "espacamento");

const primitives = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 44, 48, 56, 64];
const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const stepTokens = steps.map((step) => `--taskall-space-step-${step}`);

function StepColumn({ label }: { label: string }) {
  const [ref, values] = useComputedTokens<HTMLDivElement>(stepTokens);
  return (
    <div ref={ref} className={styles.stepColumn}>
      <p className={styles.columnTitle}>{label}</p>
      {steps.map((step) => (
        <div key={step} className={styles.barRow}>
          <code className={styles.barLabel}>step-{step}</code>
          <span
            className={styles.bar}
            style={{ width: `var(--taskall-space-step-${step})` }}
            aria-hidden="true"
          />
          <span className={styles.barValue}>
            {values[`--taskall-space-step-${step}`] || "…"}
          </span>
        </div>
      ))}
    </div>
  );
}

export const meta = () => pageMeta(page);

export default function SpacingPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Espaçamento"
        lead="Duas escalas: primitivos em px exatos, que nunca mudam, e steps 1–9, que o TaskAllProvider remapeia conforme a densidade (compacta, padrão, expandida)."
      />
      <DocSection id="uso" title="Como usar">
        <Prose>
          <p>
            Use <code>--taskall-space-step-*</code> para paddings, gaps e
            margens de componentes e layouts — eles acompanham a densidade
            escolhida. Use os primitivos apenas quando a medida precisa ser fixa
            (ex.: alinhar um ícone de 16px).
          </p>
        </Prose>
        <CodeBlock
          language="css"
          caption="TaskList.module.css"
          code={`.list {
  display: grid;
  gap: var(--taskall-space-step-4);   /* 8 · 12 · 16px conforme a densidade */
  padding: var(--taskall-space-step-6);
}

.icon {
  width: var(--taskall-space-16);     /* fixo */
}`}
        />
      </DocSection>
      <DocSection
        id="steps"
        title="Steps de densidade"
        intro={
          <p>
            Os mesmos 9 tokens renderizados em cada densidade. Valores lidos do
            CSS em tempo real.
          </p>
        }
      >
        <div className={styles.columns}>
          {SETTING_OPTIONS.density.map((option) => (
            <DemoSurface
              key={option.value}
              overrides={{ density: option.value }}
              align="stretch"
              className={styles.columnSurface}
            >
              <StepColumn label={option.label} />
            </DemoSurface>
          ))}
        </div>
      </DocSection>
      <DocSection id="primitivos" title="Escala primitiva">
        <TokenTable
          caption="Escala primitiva de espaço"
          columns={["Token", "Valor", "Visual"]}
          rows={primitives.map((value) => ({
            key: String(value),
            cells: [
              <code key="token">--taskall-space-{value}</code>,
              `${value}px`,
              <span
                key="bar"
                className={styles.bar}
                style={{ width: `var(--taskall-space-${value})` }}
                aria-hidden="true"
              />,
            ],
          }))}
        />
      </DocSection>
      <DocSection id="alvo-toque" title="Alvo de toque">
        <Callout title="--taskall-touch-target: 44px">
          <p>
            Controles interativos devem ter no mínimo 44×44px de área clicável
            (WCAG 2.5.5). Botões medium, campos e o fechar do Modal já seguem
            esse valor; tamanhos menores são exceções documentadas para desktop.
          </p>
        </Callout>
      </DocSection>
    </Article>
  );
}
