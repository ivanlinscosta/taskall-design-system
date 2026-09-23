import {
  Button,
  Delete,
  IconButton,
  RecycleBin,
  TaillessLineArrowRight,
} from "@hive/react";

export default function ButtonStates() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--hive-space-12)",
      }}
    >
      <Button>Padrão</Button>
      <Button disabled>Desabilitado</Button>
      <Button loading>Salvando</Button>
      <Button rightIcon={TaillessLineArrowRight}>Continuar</Button>
      <Button tone="error" visualStyle="light" leftIcon={RecycleBin}>
        Excluir tarefa
      </Button>
      <IconButton
        icon={Delete}
        aria-label="Fechar painel"
        tone="neutral"
        visualStyle="outline"
      />
    </div>
  );
}
