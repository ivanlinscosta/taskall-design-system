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

const ColorSwatch: React.FC<{ name: string; token: string }> = ({
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
          height: 80,
          backgroundColor: `var(${token})`,
          borderRadius: "var(--taskall-radius-surface)",
          border: "1px solid var(--taskall-border-subtle)",
          boxShadow: "var(--taskall-shadow-sm)",
        }}
      />
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
            textTransform: "uppercase",
          }}
        >
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
      description="O sistema de cores do TaskAll é baseado em tokens semânticos que se adaptam automaticamente ao tema (light/dark) e à marca selecionada. Nunca utilize valores hexadecimais diretamente nos componentes."
    >
      <Section
        title="Background"
        description="Cores de fundo para superfícies, containers e áreas da interface."
      >
        <Grid>
          <ColorSwatch name="Primary" token="--taskall-background-primary" />
          <ColorSwatch
            name="Secondary"
            token="--taskall-background-secondary"
          />
          <ColorSwatch name="Tertiary" token="--taskall-background-tertiary" />
          <ColorSwatch name="Inverse" token="--taskall-background-inverse" />
          <ColorSwatch name="Disabled" token="--taskall-background-disabled" />
          <ColorSwatch name="Hover" token="--taskall-background-hover" />
        </Grid>
      </Section>

      <Section
        title="Content"
        description="Cores para textos, ícones e elementos de conteúdo."
      >
        <Grid>
          <ColorSwatch name="Primary" token="--taskall-content-primary" />
          <ColorSwatch name="Secondary" token="--taskall-content-secondary" />
          <ColorSwatch name="Tertiary" token="--taskall-content-tertiary" />
          <ColorSwatch name="Inverse" token="--taskall-content-inverse" />
          <ColorSwatch name="Disabled" token="--taskall-content-disabled" />
          <ColorSwatch name="On Brand" token="--taskall-content-on-brand" />
          <ColorSwatch name="On Soft" token="--taskall-content-on-soft" />
        </Grid>
      </Section>

      <Section title="Border" description="Cores para bordas e divisores.">
        <Grid>
          <ColorSwatch name="Default" token="--taskall-border-default" />
          <ColorSwatch name="Subtle" token="--taskall-border-subtle" />
          <ColorSwatch name="Strong" token="--taskall-border-strong" />
          <ColorSwatch name="Inverse" token="--taskall-border-inverse" />
        </Grid>
      </Section>

      <Section
        title="Brand"
        description="Cores da marca atual. Estas cores mudam dependendo do contexto da aplicação (Coral, Gestão, Estudantes, Responsáveis)."
      >
        <Grid>
          <ColorSwatch name="Brand" token="--taskall-brand" />
          <ColorSwatch name="Soft" token="--taskall-brand-soft" />
          <ColorSwatch name="Hover" token="--taskall-brand-hover" />
          <ColorSwatch name="Active" token="--taskall-brand-active" />
          <ColorSwatch name="Soft Hover" token="--taskall-brand-soft-hover" />
        </Grid>
      </Section>

      <Section
        title="Action"
        description="Cores para elementos interativos como botões e links."
      >
        <Grid>
          <ColorSwatch name="Primary" token="--taskall-action-primary" />
          <ColorSwatch
            name="Primary Hover"
            token="--taskall-action-primary-hover"
          />
          <ColorSwatch
            name="Primary Active"
            token="--taskall-action-primary-active"
          />
          <ColorSwatch
            name="Neutral Fill"
            token="--taskall-action-neutral-fill"
          />
          <ColorSwatch name="Error Fill" token="--taskall-action-error-fill" />
          <ColorSwatch
            name="Disabled Fill"
            token="--taskall-action-disabled-fill"
          />
        </Grid>
      </Section>

      <Section
        title="Status"
        description="Cores semânticas para feedback e estados do sistema."
      >
        <Grid>
          <ColorSwatch
            name="Information"
            token="--taskall-status-information"
          />
          <ColorSwatch name="Warning" token="--taskall-status-warning" />
          <ColorSwatch name="Success" token="--taskall-status-success" />
          <ColorSwatch name="Error" token="--taskall-status-error" />
          <ColorSwatch name="Update" token="--taskall-status-update" />
        </Grid>
      </Section>
    </PageContainer>
  ),
};
