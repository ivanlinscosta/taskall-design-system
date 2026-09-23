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

const RadiusSwatch: React.FC<{ name: string; token: string }> = ({
  name,
  token,
}) => {
  const value = useCssVar(token);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--taskall-space-8)",
      }}
    >
      <div
        style={{
          height: 120,
          backgroundColor: "var(--taskall-background-secondary)",
          borderRadius: `var(${token})`,
          border: "1px solid var(--taskall-border-default)",
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
            borderTop: "2px solid var(--taskall-brand)",
            borderLeft: "2px solid var(--taskall-brand)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--taskall-space-4)",
        }}
      >
        <span
          style={{
            font: "var(--taskall-font-label-s)",
            color: "var(--taskall-content-primary)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            font: "var(--taskall-font-paragraph-xs)",
            color: "var(--taskall-content-secondary)",
          }}
        >
          {token}
        </span>
        <span
          style={{
            font: "var(--taskall-font-paragraph-xs)",
            color: "var(--taskall-content-tertiary)",
          }}
        >
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
      description="O sistema de arredondamento do TaskAll responde à configuração global de 'shape' (sharp, default, rounded). Utilize os tokens semânticos para garantir que os componentes se adaptem à personalidade da marca."
    >
      <Section
        title="Semantic Tokens"
        description="Tokens recomendados para uso geral em componentes."
      >
        <Grid>
          <RadiusSwatch name="Surface" token="--taskall-radius-surface" />
          <RadiusSwatch name="Pill" token="--taskall-radius-pill" />
        </Grid>
      </Section>

      <Section
        title="Scale Levels"
        description="Níveis de arredondamento que são remapeados dependendo do shape configurado."
      >
        <Grid>
          <RadiusSwatch name="Radius 1" token="--taskall-radius-1" />
          <RadiusSwatch name="Radius 2" token="--taskall-radius-2" />
          <RadiusSwatch name="Radius 3" token="--taskall-radius-3" />
          <RadiusSwatch name="Radius 4" token="--taskall-radius-4" />
          <RadiusSwatch name="Radius 5" token="--taskall-radius-5" />
          <RadiusSwatch name="Radius 6" token="--taskall-radius-6" />
          <RadiusSwatch name="Radius 7" token="--taskall-radius-7" />
          <RadiusSwatch name="Radius 8" token="--taskall-radius-8" />
          <RadiusSwatch name="Radius 9" token="--taskall-radius-9" />
        </Grid>
      </Section>
    </PageContainer>
  ),
};
