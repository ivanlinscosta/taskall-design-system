import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section, useCssVar } from "./FoundationHelpers";

const meta = {
  title: "Foundations/Typography",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const TypographyRow: React.FC<{ name: string; token: string; sizeToken: string; lhToken: string }> = ({
  name,
  token,
  sizeToken,
  lhToken,
}) => {
  const size = useCssVar(sizeToken);
  const lh = useCssVar(lhToken);

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
          {size || "..."} / {lh || "..."}
        </span>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div
          style={{
            font: `var(${token})`,
            color: "var(--hive-content-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          O rápido raposa marrom pula sobre o cão preguiçoso
        </div>
      </div>
    </div>
  );
};

export const Typography: Story = {
  render: () => (
    <PageContainer
      title="Tipografia"
      description="A escala tipográfica do Hive é construída para garantir legibilidade e hierarquia clara. Utilize os tokens compostos (--hive-font-*) que já incluem font-family, font-size, font-weight e line-height."
    >
      <Section
        title="Display"
        description="Títulos de grande impacto, geralmente usados em hero sections ou números em destaque."
      >
        <TypographyRow name="Display 1" token="--hive-font-display-1" sizeToken="--hive-font-size-display-1" lhToken="--hive-line-height-display-1" />
        <TypographyRow name="Display 2" token="--hive-font-display-2" sizeToken="--hive-font-size-display-2" lhToken="--hive-line-height-display-2" />
        <TypographyRow name="Display 3" token="--hive-font-display-3" sizeToken="--hive-font-size-display-3" lhToken="--hive-line-height-display-3" />
        <TypographyRow name="Display 4" token="--hive-font-display-4" sizeToken="--hive-font-size-display-4" lhToken="--hive-line-height-display-4" />
      </Section>

      <Section
        title="Headings"
        description="Títulos para estruturação de páginas e seções."
      >
        <TypographyRow name="Heading 1" token="--hive-font-h1" sizeToken="--hive-font-size-h1" lhToken="--hive-line-height-h1" />
        <TypographyRow name="Heading 2" token="--hive-font-h2" sizeToken="--hive-font-size-h2" lhToken="--hive-line-height-h2" />
        <TypographyRow name="Heading 3" token="--hive-font-h3" sizeToken="--hive-font-size-h3" lhToken="--hive-line-height-h3" />
        <TypographyRow name="Heading 4" token="--hive-font-h4" sizeToken="--hive-font-size-h4" lhToken="--hive-line-height-h4" />
        <TypographyRow name="Heading 5" token="--hive-font-h5" sizeToken="--hive-font-size-h5" lhToken="--hive-line-height-h5" />
        <TypographyRow name="Heading 6" token="--hive-font-h6" sizeToken="--hive-font-size-h6" lhToken="--hive-line-height-h6" />
      </Section>

      <Section
        title="Paragraphs"
        description="Textos de corpo e blocos de leitura."
      >
        <TypographyRow name="Paragraph L" token="--hive-font-paragraph-l" sizeToken="--hive-font-size-paragraph-l" lhToken="--hive-line-height-paragraph-l" />
        <TypographyRow name="Paragraph M" token="--hive-font-paragraph-m" sizeToken="--hive-font-size-paragraph-m" lhToken="--hive-line-height-paragraph-m" />
        <TypographyRow name="Paragraph S" token="--hive-font-paragraph-s" sizeToken="--hive-font-size-paragraph-s" lhToken="--hive-line-height-paragraph-s" />
        <TypographyRow name="Paragraph XS" token="--hive-font-paragraph-xs" sizeToken="--hive-font-size-paragraph-xs" lhToken="--hive-line-height-paragraph-xs" />
      </Section>

      <Section
        title="Labels"
        description="Textos curtos para elementos de interface, botões e formulários (peso semibold)."
      >
        <TypographyRow name="Label L" token="--hive-font-label-l" sizeToken="--hive-font-size-paragraph-l" lhToken="--hive-line-height-paragraph-l" />
        <TypographyRow name="Label M" token="--hive-font-label-m" sizeToken="--hive-font-size-paragraph-m" lhToken="--hive-line-height-paragraph-m" />
        <TypographyRow name="Label S" token="--hive-font-label-s" sizeToken="--hive-font-size-paragraph-s" lhToken="--hive-line-height-paragraph-s" />
        <TypographyRow name="Label XS" token="--hive-font-label-xs" sizeToken="--hive-font-size-paragraph-xs" lhToken="--hive-line-height-paragraph-xs" />
      </Section>
    </PageContainer>
  ),
};
