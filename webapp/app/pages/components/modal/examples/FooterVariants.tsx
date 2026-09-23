import {
  Button,
  Check,
  Checkbox,
  InformationCircle,
  Loop,
  ModalFooter,
  TaillessLineArrowRight,
} from "@hive/react";

const frame = {
  border: "1px solid var(--hive-border-subtle)",
  borderRadius: "var(--hive-radius-surface)",
  backgroundColor: "var(--hive-background-primary)",
};

export default function ModalFooterVariants() {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--hive-space-16)",
        width: "100%",
        maxWidth: 520,
      }}
    >
      <div style={frame}>
        <ModalFooter variant="cta">
          <Button tone="neutral" visualStyle="light">
            Cancelar
          </Button>
          <Button leftIcon={Check}>Salvar</Button>
        </ModalFooter>
      </div>
      <div style={frame}>
        <ModalFooter variant="information">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--hive-space-8)",
              font: "var(--hive-font-paragraph-s)",
            }}
          >
            <InformationCircle size={16} aria-hidden="true" />
            Os convites expiram em 7 dias.
          </span>
          <Button
            size="small"
            tone="neutral"
            visualStyle="light"
            leftIcon={Loop}
          >
            Reenviar
          </Button>
        </ModalFooter>
      </div>
      <div style={frame}>
        <ModalFooter variant="checkbox">
          <Checkbox defaultChecked label="Enviar cópia para a coordenação" />
          <Button>Confirmar</Button>
        </ModalFooter>
      </div>
      <div style={frame}>
        <ModalFooter variant="link">
          <a
            href="#politica"
            style={{
              color: "var(--hive-content-primary)",
              font: "var(--hive-font-link-s)",
            }}
          >
            Ver política de convites
          </a>
          <Button size="small" tone="neutral" visualStyle="light">
            Entendi
          </Button>
        </ModalFooter>
      </div>
      <div style={frame}>
        <ModalFooter variant="cta-full">
          <Button rightIcon={TaillessLineArrowRight}>Continuar</Button>
        </ModalFooter>
      </div>
    </div>
  );
}
