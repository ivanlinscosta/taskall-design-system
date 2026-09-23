import { AlertNotification, Badge, Button, ProgressBar } from "@taskall/react";

import { SETTING_OPTIONS } from "../../lib/settings";
import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { DemoSurface } from "../../ui/DemoSurface";
import { PropsTable } from "../../ui/PropsTable";
import { ThemeMatrix } from "../../ui/ThemeMatrix";
import {
  Article,
  BulletList,
  Callout,
  DocSection,
  PageHeader,
  Prose,
} from "../../ui/Page";
import styles from "./foundations.module.css";

const page = findPage("fundamentos", "temas");

const audiences: Record<string, string> = {
  coral: "Marca padrão do Task All e produtos gerais.",
  gestao: "Gestão escolar: coordenação, secretaria e direção.",
  estudantes: "App e portal dos estudantes.",
  responsaveis: "App dos pais e responsáveis.",
};

function Sample() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-4)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--taskall-space-8)",
          alignItems: "center",
        }}
      >
        <Button size="small">Publicar</Button>
        <Button size="small" visualStyle="light">
          Rascunho
        </Button>
        <Badge size="small">Nova</Badge>
      </div>
      <ProgressBar value={68} label="Entregas" showPercentage size="small" />
    </div>
  );
}

export const meta = () => pageMeta(page);

export default function ThemesPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Temas"
        lead="O TaskAllProvider define quatro dimensões independentes — modo de cor, marca, densidade e forma — como atributos data-* que remapeiam os tokens. Componentes nunca codificam tema."
      />
      <DocSection id="provider" title="TaskAllProvider">
        <Prose>
          <p>
            Envolva a aplicação uma vez e importe os estilos. Providers podem
            ser aninhados para uma área com tema diferente (ex.: um preview em
            modo escuro).
          </p>
        </Prose>
        <CodeBlock
          caption="main.tsx"
          code={`import { TaskAllProvider } from "@taskall/react";
import "@taskall/react/styles.css";

export function App() {
  return (
    <TaskAllProvider colorMode="light" brand="responsaveis" density="default" shape="default">
      <Routes />
    </TaskAllProvider>
  );
}`}
        />
        <PropsTable
          name="TaskAllProvider"
          native="<div>"
          descriptions={{
            colorMode: "Modo de cor: light ou dark.",
            brand: "Marca: coral, gestao, estudantes ou responsaveis.",
            density: "Densidade dos steps de espaço.",
            shape: "Forma dos raios: sharp, default ou rounded.",
          }}
        />
      </DocSection>
      <DocSection id="marcas" title="Marcas">
        <div className={styles.brandGrid}>
          {SETTING_OPTIONS.brand.map((brand) => (
            <DemoSurface
              key={brand.value}
              overrides={{ brand: brand.value }}
              align="stretch"
              className={styles.brandCard}
            >
              <div style={{ display: "grid", gap: "var(--taskall-space-12)" }}>
                <div>
                  <p style={{ margin: 0, font: "var(--taskall-font-h6)" }}>
                    {brand.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      font: "var(--taskall-font-paragraph-s)",
                      color: "var(--taskall-content-secondary)",
                    }}
                  >
                    {audiences[brand.value]}
                  </p>
                </div>
                <div className={styles.brandSwatches} aria-hidden="true">
                  <span style={{ background: "var(--taskall-brand)" }} />
                  <span style={{ background: "var(--taskall-brand-hover)" }} />
                  <span style={{ background: "var(--taskall-brand-active)" }} />
                  <span style={{ background: "var(--taskall-brand-soft)" }} />
                </div>
                <Sample />
              </div>
            </DemoSurface>
          ))}
        </div>
      </DocSection>
      <DocSection
        id="comparar"
        title="Comparar dimensões"
        intro={<p>Escolha a dimensão; as demais seguem o menu “Tema”.</p>}
      >
        <ThemeMatrix
          render={() => (
            <div
              style={{
                display: "grid",
                gap: "var(--taskall-space-step-4)",
                width: "100%",
              }}
            >
              <Sample />
              <AlertNotification
                size="small"
                status="success"
                title="Tarefa publicada"
              />
            </div>
          )}
        />
      </DocSection>
      <DocSection id="modo-escuro" title="Modo escuro">
        <BulletList
          items={[
            "Todos os tokens de cor têm par escuro; a marca usa tons mais claros para manter contraste.",
            "Esta documentação segue `prefers-color-scheme` até você escolher um modo, e salva a escolha no navegador.",
            "Não inverta cores manualmente nem use `filter: invert()` — troque `colorMode`.",
          ]}
        />
        <Callout title="Persistindo a preferência">
          <p>
            Guarde a escolha (ex.: <code>localStorage</code>) e aplique os
            atributos antes da primeira pintura para evitar “flash” de tema
            claro em páginas pré-renderizadas — é o que este site faz.
          </p>
        </Callout>
      </DocSection>
    </Article>
  );
}
