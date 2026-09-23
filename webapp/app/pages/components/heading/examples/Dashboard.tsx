import { Badge, Heading, Paragraph } from "@taskall/react";

export default function HeadingDashboard() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-7)",
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      <header>
        <Heading level={1} as={4}>
          Painel da coordenação
        </Heading>
        <Paragraph
          size="s"
          style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
        >
          Escola Municipal Ana Néri · semana de 22 a 26/09
        </Paragraph>
      </header>
      <section style={{ display: "grid", gap: "var(--taskall-space-step-3)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--taskall-space-8)",
          }}
        >
          <Heading level={2} as={6}>
            Tarefas atrasadas
          </Heading>
          <Badge type="number" size="small">
            4
          </Badge>
        </div>
        <Paragraph size="s" style={{ margin: 0 }}>
          Quatro turmas têm entregas pendentes há mais de 3 dias.
        </Paragraph>
      </section>
      <section style={{ display: "grid", gap: "var(--taskall-space-step-3)" }}>
        <Heading level={2} as={6}>
          Próximos eventos
        </Heading>
        <Paragraph size="s" style={{ margin: 0 }}>
          Conselho de classe na quinta-feira, 14:00.
        </Paragraph>
      </section>
    </div>
  );
}
