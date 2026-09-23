import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section } from "./FoundationHelpers";

const meta = {
  title: "Foundations/Grid",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  render: () => (
    <PageContainer
      title="Grid System"
      description="O Hive utiliza um sistema de grid de 12 colunas baseado em CSS Grid, com gutters (espaçamentos) controlados pelos tokens de densidade."
    >
      <Section
        title="12-Column Layout"
        description="Exemplo visual de um grid de 12 colunas utilizando gap responsivo (--hive-space-step-4)."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "var(--hive-space-step-4)",
            backgroundColor: "var(--hive-background-secondary)",
            padding: "var(--hive-space-step-4)",
            borderRadius: "var(--hive-radius-surface)",
            border: "1px solid var(--hive-border-subtle)",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "var(--hive-brand-soft)",
                color: "var(--hive-brand)",
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--hive-radius-2)",
                font: "var(--hive-font-label-s)",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Composições Comuns"
        description="Exemplos de como as 12 colunas podem ser divididas."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-step-4)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--hive-space-step-4)" }}>
            <div style={{ gridColumn: "span 6", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>6 colunas</div>
            <div style={{ gridColumn: "span 6", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>6 colunas</div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--hive-space-step-4)" }}>
            <div style={{ gridColumn: "span 4", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>4 colunas</div>
            <div style={{ gridColumn: "span 4", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>4 colunas</div>
            <div style={{ gridColumn: "span 4", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>4 colunas</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--hive-space-step-4)" }}>
            <div style={{ gridColumn: "span 3", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>3 colunas</div>
            <div style={{ gridColumn: "span 3", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>3 colunas</div>
            <div style={{ gridColumn: "span 3", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>3 colunas</div>
            <div style={{ gridColumn: "span 3", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>3 colunas</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--hive-space-step-4)" }}>
            <div style={{ gridColumn: "span 8", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>8 colunas (Conteúdo principal)</div>
            <div style={{ gridColumn: "span 4", backgroundColor: "var(--hive-background-tertiary)", height: 48, borderRadius: "var(--hive-radius-2)", display: "flex", alignItems: "center", justifyContent: "center", font: "var(--hive-font-label-s)" }}>4 colunas (Sidebar)</div>
          </div>
        </div>
      </Section>
    </PageContainer>
  ),
};
