import * as React from "react";
import {
  Button,
  SendEmail,
  UserCircleSingle,
  Modal,
  ModalFooter,
  ModalHeader,
  Paragraph,
} from "@taskall/react";

export default function ModalCustomHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        visualStyle="outline"
        leftIcon={UserCircleSingle}
        onClick={() => setOpen(true)}
      >
        Convidar responsáveis
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Convidar responsáveis"
        description="Envie convites por e-mail e acompanhe quem já aceitou."
        width={440}
        header={
          <ModalHeader
            type="icon"
            icon={SendEmail}
            iconTone="information"
            title="Convidar responsáveis"
            subtitle="Envie convites por e-mail e acompanhe quem já aceitou."
          />
        }
        footer={
          <ModalFooter variant="cta">
            <Button
              tone="neutral"
              visualStyle="light"
              onClick={() => setOpen(false)}
            >
              Depois
            </Button>
            <Button leftIcon={SendEmail} onClick={() => setOpen(false)}>
              Enviar 12 convites
            </Button>
          </ModalFooter>
        }
      >
        <Paragraph size="s">
          Responsáveis acompanham recados, autorizações e o boletim do estudante
          pelo app Task All Responsáveis.
        </Paragraph>
      </Modal>
    </>
  );
}
