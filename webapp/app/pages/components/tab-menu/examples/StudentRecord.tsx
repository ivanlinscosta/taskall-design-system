import {
  Badge,
  Content,
  Heading,
  ProgressBar,
  TabMenu,
  CircleClock,
  TrendingContent,
  WarningSquare,
} from "@hive/react";

export default function TabMenuStudentRecord() {
  return (
    <section
      aria-labelledby="ficha-title"
      style={{
        display: "grid",
        gap: "var(--hive-space-step-5)",
        maxWidth: 560,
        margin: "0 auto",
        padding: "var(--hive-space-step-7)",
        border: "1px solid var(--hive-border-default)",
        borderRadius: "var(--hive-radius-surface)",
        backgroundColor: "var(--hive-background-primary)",
      }}
    >
      <Content
        id="ficha-title"
        label="Lucas Martins"
        description="8º B · Matrícula 2025-08B-031"
        badge={
          <Badge size="small" visualStyle="light">
            Regular
          </Badge>
        }
      />
      <TabMenu
        ariaLabel="Ficha do estudante"
        items={[
          {
            key: "desempenho",
            label: "Desempenho",
            icon: TrendingContent,
            content: (
              <div style={{ display: "grid", gap: "var(--hive-space-12)" }}>
                <ProgressBar
                  label="Matemática"
                  value={82}
                  showPercentage
                  size="small"
                />
                <ProgressBar
                  label="Português"
                  value={76}
                  showPercentage
                  size="small"
                />
                <ProgressBar
                  label="Ciências"
                  value={91}
                  showPercentage
                  size="small"
                  tone="green"
                />
              </div>
            ),
          },
          {
            key: "frequencia",
            label: "Frequência",
            icon: CircleClock,
            content: (
              <ProgressBar
                label="Presença no bimestre"
                value={96}
                showPercentage
                tone="green"
              />
            ),
          },
          {
            key: "ocorrencias",
            label: "Ocorrências",
            icon: WarningSquare,
            content: (
              <Heading level={4} as={6}>
                Nenhuma ocorrência registrada.
              </Heading>
            ),
          },
        ]}
      />
    </section>
  );
}
