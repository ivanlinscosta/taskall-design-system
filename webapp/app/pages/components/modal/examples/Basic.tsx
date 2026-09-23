import * as React from "react";
import {
  BlankCalendar,
  Button,
  Check,
  Modal,
  ModalFooter,
  Paragraph,
} from "@taskall/react";

export default function ModalBasic() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button leftIcon={BlankCalendar} onClick={() => setOpen(true)}>
        Editar prazo
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        icon={BlankCalendar}
        title="Editar prazo da tarefa"
        description="A nova data será comunicada à turma 8º B."
        width={420}
        footer={
          <ModalFooter>
            <Button
              tone="neutral"
              visualStyle="light"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button leftIcon={Check} onClick={() => setOpen(false)}>
              Salvar prazo
            </Button>
          </ModalFooter>
        }
      >
        <Paragraph size="s">
          Prazo atual: sexta-feira, 26 de setembro, 23:59.
        </Paragraph>
      </Modal>
    </>
  );
}
