import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section, Grid, useCssVar } from "./FoundationHelpers";

const meta = {
  title: "Foundations/Colors",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const ColorSwatch: React.FC<{ name: string; token: string }> = ({ name, token }) => {
  const value = useCssVar(token);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-8)" }}>
      <div
        style={{
          height: 80,
          backgroundColor: `var(${token})`,
          borderRadius: "var(--hive-radius-surface)",
          border: "1px solid var(--hive-border-subtle)",
          boxShadow: "var(--hive-shadow-sm)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-4)" }}>
        <span style={{ font: "var(--hive-font-label-s)", color: "var(--hive-content-primary)" }}>
          {name}
        </span>
        <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-secondary)" }}>
          {token}
        </span>
        <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-tertiary)", textTransform: "uppercase" }}>
          {value || "..."}
        </span>
      </div>
    </div>
  );
};

export const Colors: Story = {
  render: () => (
    <PageContainer
      title="Cores"
      description="O sistema de cores do Hive é baseado em tokens semânticos que se adaptam automaticamente ao tema (light/dark) e à marca selecionada. Nunca utilize valores hexadecimais diretamente nos componentes."
    >
      <Section
        title="Background"
        description="Cores de fundo para superfícies, containers e áreas da interface."
      >
        <Grid>
          <ColorSwatch name="Primary" token="--hive-background-primary" />
          <ColorSwatch name="Secondary" token="--hive-background-secondary" />
          <ColorSwatch name="Tertiary" token="--hive-background-tertiary" />
          <ColorSwatch name="Inverse" token="--hive-background-inverse" />
          <ColorSwatch name="Disabled" token="--hive-background-disabled" />
          <ColorSwatch name="Hover" token="--hive-background-hover" />
        </Grid>
      </Section>

      <Section
        title="Content"
        description="Cores para textos, ícones e elementos de conteúdo."
      >
        <Grid>
          <ColorSwatch name="Primary" token="--hive-content-primary" />
          <ColorSwatch name="Secondary" token="--hive-content-secondary" />
          <ColorSwatch name="Tertiary" token="--hive-content-tertiary" />
          <ColorSwatch name="Inverse" token="--hive-content-inverse" />
          <ColorSwatch name="Disabled" token="--hive-content-disabled" />
          <ColorSwatch name="On Brand" token="--hive-content-on-brand" />
          <ColorSwatch name="On Soft" token="--hive-content-on-soft" />
        </Grid>
      </Section>

      <Section
        title="Border"
        description="Cores para bordas e divisores."
      >
        <Grid>
          <ColorSwatch name="Default" token="--hive-border-default" />
          <ColorSwatch name="Subtle" token="--hive-border-subtle" />
          <ColorSwatch name="Strong" token="--hive-border-strong" />
          <ColorSwatch name="Inverse" token="--hive-border-inverse" />
        </Grid>
      </Section>

      <Section
        title="Brand"
        description="Cores da marca atual. Estas cores mudam dependendo do contexto da aplicação (Coral, Gestão, Estudantes, Responsáveis)."
      >
        <Grid>
          <ColorSwatch name="Brand" token="--hive-brand" />
          <ColorSwatch name="Soft" token="--hive-brand-soft" />
          <ColorSwatch name="Hover" token="--hive-brand-hover" />
          <ColorSwatch name="Active" token="--hive-brand-active" />
          <ColorSwatch name="Soft Hover" token="--hive-brand-soft-hover" />
        </Grid>
      </Section>

      <Section
        title="Action"
        description="Cores para elementos interativos como botões e links."
      >
        <Grid>
          <ColorSwatch name="Primary" token="--hive-action-primary" />
          <ColorSwatch name="Primary Hover" token="--hive-action-primary-hover" />
          <ColorSwatch name="Primary Active" token="--hive-action-primary-active" />
          <ColorSwatch name="Neutral Fill" token="--hive-action-neutral-fill" />
          <ColorSwatch name="Error Fill" token="--hive-action-error-fill" />
          <ColorSwatch name="Disabled Fill" token="--hive-action-disabled-fill" />
        </Grid>
      </Section>

      <Section
        title="Status"
        description="Cores semânticas para feedback e estados do sistema."
      >
        <Grid>
          <ColorSwatch name="Information" token="--hive-status-information" />
          <ColorSwatch name="Warning" token="--hive-status-warning" />
          <ColorSwatch name="Success" token="--hive-status-success" />
          <ColorSwatch name="Error" token="--hive-status-error" />
          <ColorSwatch name="Update" token="--hive-status-update" />
        </Grid>
      </Section>
    </PageContainer>
  ),
};
