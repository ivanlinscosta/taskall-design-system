import * as React from "react";
import {
  AlertNotification,
  Button,
  Loop,
  Modal,
  ModalFooter,
  Paragraph,
  RecycleBin,
  WarningTriangle,
} from "@taskall/react";

export default function ModalConfirmDelete() {
  const [open, setOpen] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  if (deleted) {
    return (
      <div
        style={{
          display: "grid",
          gap: "var(--taskall-space-12)",
          width: "100%",
          maxWidth: 420,
        }}
      >
        <AlertNotification
          status="success"
          size="medium"
          title="Tarefa “Resumo do capítulo 3” excluída."
        />
        <Button
          tone="neutral"
          visualStyle="outline"
          leftIcon={Loop}
          onClick={() => setDeleted(false)}
        >
          Restaurar exemplo
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        tone="error"
        visualStyle="light"
        leftIcon={RecycleBin}
        onClick={() => setOpen(true)}
      >
        Excluir tarefa
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        icon={WarningTriangle}
        iconTone="error"
        title="Excluir tarefa?"
        description="As 18 entregas já enviadas pelos estudantes também serão removidas."
        width={440}
        footer={
          <ModalFooter>
            <Button
              tone="neutral"
              visualStyle="light"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              tone="error"
              leftIcon={RecycleBin}
              onClick={() => {
                setOpen(false);
                setDeleted(true);
              }}
            >
              Excluir tarefa
            </Button>
          </ModalFooter>
        }
      >
        <Paragraph size="s">
          Esta ação não pode ser desfeita. Baixe as entregas antes, se precisar.
        </Paragraph>
      </Modal>
    </>
  );
}
