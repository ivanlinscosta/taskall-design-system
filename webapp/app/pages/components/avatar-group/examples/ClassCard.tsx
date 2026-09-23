import {
  AvatarGroup,
  Badge,
  Heading,
  Paragraph,
  ProgressBar,
} from "@taskall/react";

const students = [
  { fallback: "LM", alt: "Lucas Martins" },
  { fallback: "BF", alt: "Beatriz Farias" },
  { fallback: "TC", alt: "Thiago Costa" },
  { fallback: "IR", alt: "Isabela Rocha" },
  { fallback: "GN", alt: "Gabriel Nunes" },
  { fallback: "SA", alt: "Sofia Alves" },
];

export default function AvatarGroupClassCard() {
  return (
    <article
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-5)",
        maxWidth: 380,
        margin: "0 auto",
        padding: "var(--taskall-space-step-7)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          gap: "var(--taskall-space-8)",
        }}
      >
        <div>
          <Heading level={3} as={6}>
            Projeto de Ciências
          </Heading>
          <Paragraph
            size="xs"
            style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
          >
            Grupo 3 · entrega em 02/10
          </Paragraph>
        </div>
        <Badge size="small" visualStyle="light">
          Em andamento
        </Badge>
      </div>
      <AvatarGroup
        ariaLabel="Integrantes do grupo 3"
        avatars={students}
        max={4}
        size="sm"
        surplusLabel="Mais 2 integrantes"
      />
      <ProgressBar
        value={60}
        label="Etapas concluídas"
        showPercentage
        size="small"
      />
    </article>
  );
}
