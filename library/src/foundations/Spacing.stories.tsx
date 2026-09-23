import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section, useCssVar } from "./FoundationHelpers";

const meta = {
  title: "Foundations/Spacing",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const SpacingRow: React.FC<{ name: string; token: string }> = ({ name, token }) => {
  const value = useCssVar(token);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "var(--hive-space-16) 0",
        borderBottom: "1px solid var(--hive-border-subtle)",
        gap: "var(--hive-space-24)",
      }}
    >
      <div style={{ flex: "0 0 200px", display: "flex", flexDirection: "column", gap: "var(--hive-space-4)" }}>
        <span style={{ font: "var(--hive-font-label-s)", color: "var(--hive-content-primary)" }}>{name}</span>
        <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-secondary)" }}>{token}</span>
        <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-tertiary)" }}>
          {value || "..."}
        </span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: `var(${token})`,
            height: "var(--hive-space-24)",
            backgroundColor: "var(--hive-brand)",
            borderRadius: "var(--hive-radius-2)",
            minWidth: "2px",
          }}
        />
      </div>
    </div>
  );
};

export const Spacing: Story = {
  render: () => (
    <PageContainer
      title="Espaçamento"
      description="O sistema de espaçamento do Hive utiliza uma escala baseada em 4px e 8px. Utilize os tokens de 'step' para espaçamentos que devem responder à densidade global da aplicação (compact, default, expanded)."
    >
      <Section
        title="Density Steps (Responsivos)"
        description="Estes tokens mudam de valor dependendo da densidade configurada no HiveProvider. Use-os para margens, paddings e gaps em componentes que devem se adaptar."
      >
        <SpacingRow name="Step 1" token="--hive-space-step-1" />
        <SpacingRow name="Step 2" token="--hive-space-step-2" />
        <SpacingRow name="Step 3" token="--hive-space-step-3" />
        <SpacingRow name="Step 4" token="--hive-space-step-4" />
        <SpacingRow name="Step 5" token="--hive-space-step-5" />
        <SpacingRow name="Step 6" token="--hive-space-step-6" />
        <SpacingRow name="Step 7" token="--hive-space-step-7" />
        <SpacingRow name="Step 8" token="--hive-space-step-8" />
        <SpacingRow name="Step 9" token="--hive-space-step-9" />
      </Section>

      <Section
        title="Primitive Scale (Fixos)"
        description="Valores exatos em pixels que nunca mudam, independentemente da densidade. Use apenas quando um espaçamento estrito for necessário."
      >
        <SpacingRow name="Space 2" token="--hive-space-2" />
        <SpacingRow name="Space 4" token="--hive-space-4" />
        <SpacingRow name="Space 8" token="--hive-space-8" />
        <SpacingRow name="Space 12" token="--hive-space-12" />
        <SpacingRow name="Space 16" token="--hive-space-16" />
        <SpacingRow name="Space 24" token="--hive-space-24" />
        <SpacingRow name="Space 32" token="--hive-space-32" />
        <SpacingRow name="Space 40" token="--hive-space-40" />
        <SpacingRow name="Space 48" token="--hive-space-48" />
        <SpacingRow name="Space 64" token="--hive-space-64" />
      </Section>
    </PageContainer>
  ),
};
