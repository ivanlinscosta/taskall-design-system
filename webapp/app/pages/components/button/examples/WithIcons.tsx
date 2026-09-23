import {
  AddCircle,
  Button,
  CloudUpload,
  DownloadTray,
  IconButton,
  MagnifyingGlass,
  SendEmail,
  TaillessLineArrowRight,
} from "@taskall/react";

export default function ButtonWithIcons() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--taskall-space-16)",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--taskall-space-12)",
        }}
      >
        <Button leftIcon={AddCircle}>Nova tarefa</Button>
        <Button rightIcon={TaillessLineArrowRight}>Continuar</Button>
        <Button
          leftIcon={SendEmail}
          rightIcon={TaillessLineArrowRight}
          visualStyle="light"
        >
          Enviar comunicado
        </Button>
        <Button leftIcon={DownloadTray} tone="neutral" visualStyle="outline">
          Baixar boletim
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--taskall-space-12)",
        }}
      >
        <Button size="small" leftIcon={CloudUpload}>
          Enviar arquivo
        </Button>
        <Button
          size="small"
          leftIcon={MagnifyingGlass}
          tone="neutral"
          visualStyle="light"
        >
          Buscar aluno
        </Button>
        <IconButton
          icon={MagnifyingGlass}
          aria-label="Buscar aluno"
          tone="neutral"
          visualStyle="light"
          size="small"
        />
      </div>
    </div>
  );
}
