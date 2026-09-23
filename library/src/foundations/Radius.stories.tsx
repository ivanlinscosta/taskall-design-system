import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section, Grid, useCssVar } from "./FoundationHelpers";

const meta = {
  title: "Foundations/Radius",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const RadiusSwatch: React.FC<{ name: string; token: string }> = ({ name, token }) => {
  const value = useCssVar(token);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-8)" }}>
      <div
        style={{
          height: 120,
          backgroundColor: "var(--hive-background-secondary)",
          borderRadius: `var(${token})`,
          border: "1px solid var(--hive-border-default)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderTopLeftRadius: `var(${token})`,
            borderTop: "2px solid var(--hive-brand)",
            borderLeft: "2px solid var(--hive-brand)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-4)" }}>
        <span style={{ font: "var(--hive-font-label-s)", color: "var(--hive-content-primary)" }}>{name}</span>
        <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-secondary)" }}>{token}</span>
        <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-tertiary)" }}>
          {value || "..."}
        </span>
      </div>
    </div>
  );
};

export const Radius: Story = {
  render: () => (
    <PageContainer
      title="Radius (Bordas)"
      description="O sistema de arredondamento do Hive responde à configuração global de 'shape' (sharp, default, rounded). Utilize os tokens semânticos para garantir que os componentes se adaptem à personalidade da marca."
    >
      <Section
        title="Semantic Tokens"
        description="Tokens recomendados para uso geral em componentes."
      >
        <Grid>
          <RadiusSwatch name="Surface" token="--hive-radius-surface" />
          <RadiusSwatch name="Pill" token="--hive-radius-pill" />
        </Grid>
      </Section>

      <Section
        title="Scale Levels"
        description="Níveis de arredondamento que são remapeados dependendo do shape configurado."
      >
        <Grid>
          <RadiusSwatch name="Radius 1" token="--hive-radius-1" />
          <RadiusSwatch name="Radius 2" token="--hive-radius-2" />
          <RadiusSwatch name="Radius 3" token="--hive-radius-3" />
          <RadiusSwatch name="Radius 4" token="--hive-radius-4" />
          <RadiusSwatch name="Radius 5" token="--hive-radius-5" />
          <RadiusSwatch name="Radius 6" token="--hive-radius-6" />
          <RadiusSwatch name="Radius 7" token="--hive-radius-7" />
          <RadiusSwatch name="Radius 8" token="--hive-radius-8" />
          <RadiusSwatch name="Radius 9" token="--hive-radius-9" />
        </Grid>
      </Section>
    </PageContainer>
  ),
};
