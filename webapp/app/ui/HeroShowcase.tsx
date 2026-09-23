import {
  AlertNotification,
  AvatarGroup,
  Badge,
  BlankCalendar,
  Button,
  Checkbox,
  Delete,
  Divider,
  Dropdown,
  Heading,
  IconButton,
  NotepadText,
  Paragraph,
  PencilLine,
  ProgressBar,
  TaillessLineArrowRight,
  TextInput,
  Tooltip,
} from "@taskall/react";

import { DemoSurface } from "./DemoSurface";
import styles from "./HeroShowcase.module.css";

const classes = [
  { value: "8a", label: "8º A" },
  { value: "8b", label: "8º B" },
  { value: "9a", label: "9º A" },
];

const deadlines = [
  { value: "qui", label: "Qui, 25/09" },
  { value: "sex", label: "Sex, 26/09" },
  { value: "seg", label: "Seg, 29/09" },
];

/** Tela real do Task All montada só com componentes e tokens do design system. */
export function HeroShowcase() {
  return (
    <DemoSurface
      align="stretch"
      className={styles.surface}
      label="Exemplo: criação de tarefa com componentes TaskAll"
    >
      <section className={styles.card} aria-labelledby="hero-showcase-title">
        <header className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.titleRow}>
              <Heading level={2} as={6} id="hero-showcase-title">
                Nova tarefa
              </Heading>
              <Badge size="x-small" visualStyle="light">
                Rascunho
              </Badge>
            </div>
            <Paragraph size="xs" className={styles.muted}>
              Ciências · Prof.ª Helena Duarte
            </Paragraph>
          </div>
          <Tooltip title="Fechar">
            <IconButton
              icon={Delete}
              aria-label="Fechar"
              tone="neutral"
              visualStyle="light"
              size="small"
            />
          </Tooltip>
        </header>

        <div className={styles.body}>
          <TextInput
            label="Título"
            defaultValue="Mapa mental de Biologia"
            leftIcon={PencilLine}
          />
          <div className={styles.row}>
            <Dropdown label="Turma" options={classes} defaultValue="8b" />
            <Dropdown
              label="Prazo"
              leftIcon={BlankCalendar}
              options={deadlines}
              defaultValue="sex"
            />
          </div>
          <Checkbox label="Notificar responsáveis pelo app" defaultChecked />

          <Divider />

          <ProgressBar
            label="Entregas da turma"
            value={68}
            showPercentage
            size="small"
          />
          <div className={styles.people}>
            <AvatarGroup
              size="sm"
              max={4}
              ariaLabel="Estudantes que já entregaram"
              avatars={["LM", "BF", "TC", "IR", "GN", "SA"].map((fallback) => ({
                fallback,
              }))}
            />
            <Paragraph size="xs" className={styles.muted}>
              21 de 31 estudantes entregaram
            </Paragraph>
          </div>
        </div>

        <footer className={styles.footer}>
          <Button
            size="small"
            tone="neutral"
            visualStyle="light"
            leftIcon={NotepadText}
          >
            Salvar rascunho
          </Button>
          <Button size="small" rightIcon={TaillessLineArrowRight}>
            Publicar
          </Button>
        </footer>
      </section>

      <AlertNotification
        size="small"
        status="success"
        title="Lembrete enviado para 10 responsáveis."
      />
    </DemoSurface>
  );
}
