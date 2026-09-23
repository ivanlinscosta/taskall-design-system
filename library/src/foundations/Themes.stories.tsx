import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section, Grid } from "./FoundationHelpers";

const meta = {
  title: "Foundations/Themes",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemeCard: React.FC<{ brand: string; title: string; description: string }> = ({ brand, title, description }) => {
  return (
    <div
      data-brand={brand}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--hive-space-16)",
        padding: "var(--hive-space-24)",
        backgroundColor: "var(--hive-background-primary)",
        borderRadius: "var(--hive-radius-surface)",
        border: "1px solid var(--hive-border-subtle)",
        boxShadow: "var(--hive-shadow-sm)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-4)" }}>
        <h4 style={{ font: "var(--hive-font-h4)", color: "var(--hive-content-primary)", margin: 0 }}>{title}</h4>
        <p style={{ font: "var(--hive-font-paragraph-s)", color: "var(--hive-content-secondary)", margin: 0 }}>{description}</p>
      </div>

      <div style={{ display: "flex", gap: "var(--hive-space-8)" }}>
        <div style={{ flex: 1, height: 48, backgroundColor: "var(--hive-brand)", borderRadius: "var(--hive-radius-2)" }} title="--hive-brand" />
        <div style={{ flex: 1, height: 48, backgroundColor: "var(--hive-brand-soft)", borderRadius: "var(--hive-radius-2)" }} title="--hive-brand-soft" />
        <div style={{ flex: 1, height: 48, backgroundColor: "var(--hive-brand-hover)", borderRadius: "var(--hive-radius-2)" }} title="--hive-brand-hover" />
        <div style={{ flex: 1, height: 48, backgroundColor: "var(--hive-brand-active)", borderRadius: "var(--hive-radius-2)" }} title="--hive-brand-active" />
      </div>

      <div style={{ display: "flex", gap: "var(--hive-space-12)", marginTop: "var(--hive-space-8)" }}>
        <button
          style={{
            padding: "var(--hive-space-12) var(--hive-space-24)",
            backgroundColor: "var(--hive-action-primary)",
            color: "var(--hive-action-primary-contrast)",
            border: "none",
            borderRadius: "var(--hive-radius-surface)",
            font: "var(--hive-font-label-m)",
            cursor: "pointer",
          }}
        >
          Ação Principal
        </button>
        <button
          style={{
            padding: "var(--hive-space-12) var(--hive-space-24)",
            backgroundColor: "transparent",
            color: "var(--hive-action-primary)",
            border: "1px solid var(--hive-action-primary)",
            borderRadius: "var(--hive-radius-surface)",
            font: "var(--hive-font-label-m)",
            cursor: "pointer",
          }}
        >
          Secundária
        </button>
      </div>
    </div>
  );
};

export const Themes: Story = {
  render: () => (
    <PageContainer
      title="Temas e Marcas"
      description="O Hive suporta múltiplos temas através do componente HiveProvider. As propriedades colorMode, brand, density e shape alteram os tokens CSS globalmente, permitindo que a interface se adapte a diferentes contextos."
    >
      <Section
        title="Marcas Disponíveis"
        description="O sistema possui 4 marcas principais. Cada marca redefine os tokens --hive-brand-* e afeta componentes interativos como botões, links e indicadores de progresso."
      >
        <Grid minWidth={320}>
          <ThemeCard
            brand="coral"
            title="Coral"
            description="Marca padrão do sistema. Utilizada na maioria das aplicações genéricas."
          />
          <ThemeCard
            brand="gestao"
            title="Gestão"
            description="Contexto de gestão escolar e administração."
          />
          <ThemeCard
            brand="estudantes"
            title="Estudantes"
            description="Contexto voltado para o portal do aluno e atividades."
          />
          <ThemeCard
            brand="responsaveis"
            title="Responsáveis"
            description="Contexto para pais e responsáveis financeiros/acadêmicos."
          />
        </Grid>
      </Section>

      <Section
        title="Propriedades do HiveProvider"
        description="Como configurar o provedor na raiz da sua aplicação."
      >
        <div
          style={{
            padding: "var(--hive-space-24)",
            backgroundColor: "var(--hive-background-secondary)",
            borderRadius: "var(--hive-radius-surface)",
            border: "1px solid var(--hive-border-subtle)",
            font: "var(--hive-font-paragraph-m)",
            color: "var(--hive-content-primary)",
          }}
        >
          <pre style={{ margin: 0, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{`import { HiveProvider } from "@hive/react";

function App() {
  return (
    <HiveProvider
      colorMode="light" // "light" | "dark"
      brand="coral"     // "coral" | "gestao" | "estudantes" | "responsaveis"
      density="default" // "compact" | "default" | "expanded"
      shape="default"   // "sharp" | "default" | "rounded"
    >
      <YourApp />
    </HiveProvider>
  );
}`}
          </pre>
        </div>
      </Section>
    </PageContainer>
  ),
};
