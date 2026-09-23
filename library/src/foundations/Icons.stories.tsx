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
    navigator.clipboard.writeText(`import { ${name} } from "@hive/react";`);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredIcons = React.useMemo(() => {
    if (!search.trim()) return iconSearchIndex;
    const term = search.toLowerCase();
    return iconSearchIndex.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }, [search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--hive-space-32)" }}>
      <div style={{ position: "relative", maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Buscar ícones por nome ou palavra-chave..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "var(--hive-space-12) var(--hive-space-16)",
            paddingLeft: "var(--hive-space-40)",
            borderRadius: "var(--hive-radius-surface)",
            border: "1px solid var(--hive-border-default)",
            backgroundColor: "var(--hive-background-primary)",
            color: "var(--hive-content-primary)",
            font: "var(--hive-font-paragraph-m)",
            outline: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "var(--hive-space-12)",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--hive-content-tertiary)",
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
            padding: "var(--hive-space-48)",
            textAlign: "center",
            color: "var(--hive-content-secondary)",
            font: "var(--hive-font-paragraph-m)",
            backgroundColor: "var(--hive-background-secondary)",
            borderRadius: "var(--hive-radius-surface)",
          }}
        >
          Nenhum ícone encontrado para "{search}"
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "var(--hive-space-16)",
          }}
        >
          {filteredIcons.map((item) => {
            const IconComponent = Icons[item.componentName as keyof typeof Icons] as React.FC<{ size?: number }>;
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
                  gap: "var(--hive-space-12)",
                  padding: "var(--hive-space-24) var(--hive-space-12)",
                  backgroundColor: isPlaceholder ? "var(--hive-status-warning-soft)" : "var(--hive-background-primary)",
                  border: `1px solid ${isPlaceholder ? "var(--hive-status-warning-outline)" : "var(--hive-border-subtle)"}`,
                  borderRadius: "var(--hive-radius-surface)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                  color: "var(--hive-content-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isPlaceholder ? "var(--hive-status-warning-soft)" : "var(--hive-background-hover)";
                  e.currentTarget.style.borderColor = isPlaceholder ? "var(--hive-status-warning)" : "var(--hive-border-default)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isPlaceholder ? "var(--hive-status-warning-soft)" : "var(--hive-background-primary)";
                  e.currentTarget.style.borderColor = isPlaceholder ? "var(--hive-status-warning-outline)" : "var(--hive-border-subtle)";
                }}
              >
                <div style={{ color: isPlaceholder ? "var(--hive-status-warning)" : "inherit" }}>
                  <IconComponent size={32} />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--hive-space-4)" }}>
                  <span style={{ font: "var(--hive-font-label-s)", textAlign: "center", wordBreak: "break-word" }}>
                    {item.componentName}
                  </span>
                  <span style={{ font: "var(--hive-font-paragraph-xs)", color: "var(--hive-content-secondary)", textAlign: "center" }}>
                    {item.name}
                  </span>
                </div>

                {isPlaceholder && (
                  <div
                    style={{
                      position: "absolute",
                      top: "var(--hive-space-8)",
                      right: "var(--hive-space-8)",
                      backgroundColor: "var(--hive-status-warning)",
                      color: "var(--hive-status-warning-contrast)",
                      padding: "2px 6px",
                      borderRadius: "var(--hive-radius-pill)",
                      font: "var(--hive-font-label-xs)",
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
                      backgroundColor: "var(--hive-status-success)",
                      color: "var(--hive-status-success-contrast)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--hive-radius-surface)",
                      font: "var(--hive-font-label-m)",
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
      description="A biblioteca de ícones do Hive. Clique em qualquer ícone para copiar o código de importação."
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
