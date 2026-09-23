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

const TypographyRow: React.FC<{
  name: string;
  token: string;
  sizeToken: string;
  lhToken: string;
}> = ({ name, token, sizeToken, lhToken }) => {
  const size = useCssVar(sizeToken);
  const lh = useCssVar(lhToken);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "var(--taskall-space-16) 0",
        borderBottom: "1px solid var(--taskall-border-subtle)",
        gap: "var(--taskall-space-24)",
      }}
    >
      <div
        style={{
          flex: "0 0 200px",
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
          {size || "..."} / {lh || "..."}
        </span>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div
          style={{
            font: `var(${token})`,
            color: "var(--taskall-content-primary)",
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
      description="A escala tipográfica do TaskAll é construída para garantir legibilidade e hierarquia clara. Utilize os tokens compostos (--taskall-font-*) que já incluem font-family, font-size, font-weight e line-height."
    >
      <Section
        title="Display"
        description="Títulos de grande impacto, geralmente usados em hero sections ou números em destaque."
      >
        <TypographyRow
          name="Display 1"
          token="--taskall-font-display-1"
          sizeToken="--taskall-font-size-display-1"
          lhToken="--taskall-line-height-display-1"
        />
        <TypographyRow
          name="Display 2"
          token="--taskall-font-display-2"
          sizeToken="--taskall-font-size-display-2"
          lhToken="--taskall-line-height-display-2"
        />
        <TypographyRow
          name="Display 3"
          token="--taskall-font-display-3"
          sizeToken="--taskall-font-size-display-3"
          lhToken="--taskall-line-height-display-3"
        />
        <TypographyRow
          name="Display 4"
          token="--taskall-font-display-4"
          sizeToken="--taskall-font-size-display-4"
          lhToken="--taskall-line-height-display-4"
        />
      </Section>

      <Section
        title="Headings"
        description="Títulos para estruturação de páginas e seções."
      >
        <TypographyRow
          name="Heading 1"
          token="--taskall-font-h1"
          sizeToken="--taskall-font-size-h1"
          lhToken="--taskall-line-height-h1"
        />
        <TypographyRow
          name="Heading 2"
          token="--taskall-font-h2"
          sizeToken="--taskall-font-size-h2"
          lhToken="--taskall-line-height-h2"
        />
        <TypographyRow
          name="Heading 3"
          token="--taskall-font-h3"
          sizeToken="--taskall-font-size-h3"
          lhToken="--taskall-line-height-h3"
        />
        <TypographyRow
          name="Heading 4"
          token="--taskall-font-h4"
          sizeToken="--taskall-font-size-h4"
          lhToken="--taskall-line-height-h4"
        />
        <TypographyRow
          name="Heading 5"
          token="--taskall-font-h5"
          sizeToken="--taskall-font-size-h5"
          lhToken="--taskall-line-height-h5"
        />
        <TypographyRow
          name="Heading 6"
          token="--taskall-font-h6"
          sizeToken="--taskall-font-size-h6"
          lhToken="--taskall-line-height-h6"
        />
      </Section>

      <Section
        title="Paragraphs"
        description="Textos de corpo e blocos de leitura."
      >
        <TypographyRow
          name="Paragraph L"
          token="--taskall-font-paragraph-l"
          sizeToken="--taskall-font-size-paragraph-l"
          lhToken="--taskall-line-height-paragraph-l"
        />
        <TypographyRow
          name="Paragraph M"
          token="--taskall-font-paragraph-m"
          sizeToken="--taskall-font-size-paragraph-m"
          lhToken="--taskall-line-height-paragraph-m"
        />
        <TypographyRow
          name="Paragraph S"
          token="--taskall-font-paragraph-s"
          sizeToken="--taskall-font-size-paragraph-s"
          lhToken="--taskall-line-height-paragraph-s"
        />
        <TypographyRow
          name="Paragraph XS"
          token="--taskall-font-paragraph-xs"
          sizeToken="--taskall-font-size-paragraph-xs"
          lhToken="--taskall-line-height-paragraph-xs"
        />
      </Section>

      <Section
        title="Labels"
        description="Textos curtos para elementos de interface, botões e formulários (peso semibold)."
      >
        <TypographyRow
          name="Label L"
          token="--taskall-font-label-l"
          sizeToken="--taskall-font-size-paragraph-l"
          lhToken="--taskall-line-height-paragraph-l"
        />
        <TypographyRow
          name="Label M"
          token="--taskall-font-label-m"
          sizeToken="--taskall-font-size-paragraph-m"
          lhToken="--taskall-line-height-paragraph-m"
        />
        <TypographyRow
          name="Label S"
          token="--taskall-font-label-s"
          sizeToken="--taskall-font-size-paragraph-s"
          lhToken="--taskall-line-height-paragraph-s"
        />
        <TypographyRow
          name="Label XS"
          token="--taskall-font-label-xs"
          sizeToken="--taskall-font-size-paragraph-xs"
          lhToken="--taskall-line-height-paragraph-xs"
        />
      </Section>
    </PageContainer>
  ),
};
