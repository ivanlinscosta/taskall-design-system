import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer, Section } from "./FoundationHelpers";
import { iconSearchIndex } from "../icons/iconSearch";
import * as Icons from "../icons";

const meta = {
  title: "Foundations/Icons",
  parameters: {
    docs: {
      page: null,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const IconGrid: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`import { ${name} } from "@taskall/react";`);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredIcons = React.useMemo(() => {
    if (!search.trim()) return iconSearchIndex;
    const term = search.toLowerCase();
    return iconSearchIndex.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.keywords.some((k) => k.toLowerCase().includes(term)),
    );
  }, [search]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--taskall-space-32)",
      }}
    >
      <div style={{ position: "relative", maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Buscar ícones por nome ou palavra-chave..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "var(--taskall-space-12) var(--taskall-space-16)",
            paddingLeft: "var(--taskall-space-40)",
            borderRadius: "var(--taskall-radius-surface)",
            border: "1px solid var(--taskall-border-default)",
            backgroundColor: "var(--taskall-background-primary)",
            color: "var(--taskall-content-primary)",
            font: "var(--taskall-font-paragraph-m)",
            outline: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "var(--taskall-space-12)",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--taskall-content-tertiary)",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <Icons.Search size={20} />
        </div>
      </div>

      {filteredIcons.length === 0 ? (
        <div
          style={{
            padding: "var(--taskall-space-48)",
            textAlign: "center",
            color: "var(--taskall-content-secondary)",
            font: "var(--taskall-font-paragraph-m)",
            backgroundColor: "var(--taskall-background-secondary)",
            borderRadius: "var(--taskall-radius-surface)",
          }}
        >
          Nenhum ícone encontrado para "{search}"
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "var(--taskall-space-16)",
          }}
        >
          {filteredIcons.map((item) => {
            const IconComponent = Icons[
              item.componentName as keyof typeof Icons
            ] as React.FC<{ size?: number }>;
            if (!IconComponent) return null;

            const isPlaceholder = item.componentName === "Placeholder";

            return (
              <button
                key={item.componentName}
                onClick={() => handleCopy(item.componentName)}
                aria-label={`Copiar importação do ícone ${item.name}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--taskall-space-12)",
                  padding: "var(--taskall-space-24) var(--taskall-space-12)",
                  backgroundColor: isPlaceholder
                    ? "var(--taskall-status-warning-soft)"
                    : "var(--taskall-background-primary)",
                  border: `1px solid ${isPlaceholder ? "var(--taskall-status-warning-outline)" : "var(--taskall-border-subtle)"}`,
                  borderRadius: "var(--taskall-radius-surface)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  color: "var(--taskall-content-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isPlaceholder
                    ? "var(--taskall-status-warning-soft)"
                    : "var(--taskall-background-hover)";
                  e.currentTarget.style.borderColor = isPlaceholder
                    ? "var(--taskall-status-warning)"
                    : "var(--taskall-border-default)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isPlaceholder
                    ? "var(--taskall-status-warning-soft)"
                    : "var(--taskall-background-primary)";
                  e.currentTarget.style.borderColor = isPlaceholder
                    ? "var(--taskall-status-warning-outline)"
                    : "var(--taskall-border-subtle)";
                }}
              >
                <div
                  style={{
                    color: isPlaceholder
                      ? "var(--taskall-status-warning)"
                      : "inherit",
                  }}
                >
                  <IconComponent size={32} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--taskall-space-4)",
                  }}
                >
                  <span
                    style={{
                      font: "var(--taskall-font-label-s)",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.componentName}
                  </span>
                  <span
                    style={{
                      font: "var(--taskall-font-paragraph-xs)",
                      color: "var(--taskall-content-secondary)",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </span>
                </div>

                {isPlaceholder && (
                  <div
                    style={{
                      position: "absolute",
                      top: "var(--taskall-space-8)",
                      right: "var(--taskall-space-8)",
                      backgroundColor: "var(--taskall-status-warning)",
                      color: "var(--taskall-status-warning-contrast)",
                      padding: "2px 6px",
                      borderRadius: "var(--taskall-radius-pill)",
                      font: "var(--taskall-font-label-xs)",
                      fontSize: 10,
                    }}
                  >
                    Asset pendente
                  </div>
                )}

                {copied === item.componentName && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "var(--taskall-status-success)",
                      color: "var(--taskall-status-success-contrast)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--taskall-radius-surface)",
                      font: "var(--taskall-font-label-m)",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    Copiado!
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Icones: Story = {
  render: () => (
    <PageContainer
      title="Ícones"
      description="A biblioteca de ícones do TaskAll. Clique em qualquer ícone para copiar o código de importação."
    >
      <Section
        title="Biblioteca"
        description="Todos os ícones disponíveis no sistema. Utilize a busca para encontrar ícones por nome ou palavras-chave."
      >
        <IconGrid />
      </Section>
    </PageContainer>
  ),
};
