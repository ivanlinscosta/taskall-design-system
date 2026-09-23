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

const ThemeCard: React.FC<{
  brand: string;
  title: string;
  description: string;
}> = ({ brand, title, description }) => {
  return (
    <div
      data-brand={brand}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--taskall-space-16)",
        padding: "var(--taskall-space-24)",
        backgroundColor: "var(--taskall-background-primary)",
        borderRadius: "var(--taskall-radius-surface)",
        border: "1px solid var(--taskall-border-subtle)",
        boxShadow: "var(--taskall-shadow-sm)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--taskall-space-4)",
        }}
      >
        <h4
          style={{
            font: "var(--taskall-font-h4)",
            color: "var(--taskall-content-primary)",
            margin: 0,
          }}
        >
          {title}
        </h4>
        <p
          style={{
            font: "var(--taskall-font-paragraph-s)",
            color: "var(--taskall-content-secondary)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      <div style={{ display: "flex", gap: "var(--taskall-space-8)" }}>
        <div
          style={{
            flex: 1,
            height: 48,
            backgroundColor: "var(--taskall-brand)",
            borderRadius: "var(--taskall-radius-2)",
          }}
          title="--taskall-brand"
        />
        <div
          style={{
            flex: 1,
            height: 48,
            backgroundColor: "var(--taskall-brand-soft)",
            borderRadius: "var(--taskall-radius-2)",
          }}
          title="--taskall-brand-soft"
        />
        <div
          style={{
            flex: 1,
            height: 48,
            backgroundColor: "var(--taskall-brand-hover)",
            borderRadius: "var(--taskall-radius-2)",
          }}
          title="--taskall-brand-hover"
        />
        <div
          style={{
            flex: 1,
            height: 48,
            backgroundColor: "var(--taskall-brand-active)",
            borderRadius: "var(--taskall-radius-2)",
          }}
          title="--taskall-brand-active"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "var(--taskall-space-12)",
          marginTop: "var(--taskall-space-8)",
        }}
      >
        <button
          style={{
            padding: "var(--taskall-space-12) var(--taskall-space-24)",
            backgroundColor: "var(--taskall-action-primary)",
            color: "var(--taskall-action-primary-contrast)",
            border: "none",
            borderRadius: "var(--taskall-radius-surface)",
            font: "var(--taskall-font-label-m)",
            cursor: "pointer",
          }}
        >
          Ação Principal
        </button>
        <button
          style={{
            padding: "var(--taskall-space-12) var(--taskall-space-24)",
            backgroundColor: "transparent",
            color: "var(--taskall-action-primary)",
            border: "1px solid var(--taskall-action-primary)",
            borderRadius: "var(--taskall-radius-surface)",
            font: "var(--taskall-font-label-m)",
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
      description="O TaskAll suporta múltiplos temas através do componente TaskAllProvider. As propriedades colorMode, brand, density e shape alteram os tokens CSS globalmente, permitindo que a interface se adapte a diferentes contextos."
    >
      <Section
        title="Marcas Disponíveis"
        description="O sistema possui 4 marcas principais. Cada marca redefine os tokens --taskall-brand-* e afeta componentes interativos como botões, links e indicadores de progresso."
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
        title="Propriedades do TaskAllProvider"
        description="Como configurar o provedor na raiz da sua aplicação."
      >
        <div
          style={{
            padding: "var(--taskall-space-24)",
            backgroundColor: "var(--taskall-background-secondary)",
            borderRadius: "var(--taskall-radius-surface)",
            border: "1px solid var(--taskall-border-subtle)",
            font: "var(--taskall-font-paragraph-m)",
            color: "var(--taskall-content-primary)",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            {`import { TaskAllProvider } from "@taskall/react";

function App() {
  return (
    <TaskAllProvider
      colorMode="light" // "light" | "dark"
      brand="coral"     // "coral" | "gestao" | "estudantes" | "responsaveis"
      density="default" // "compact" | "default" | "expanded"
      shape="default"   // "sharp" | "default" | "rounded"
    >
      <YourApp />
    </TaskAllProvider>
  );
}`}
          </pre>
        </div>
      </Section>
    </PageContainer>
  ),
};
