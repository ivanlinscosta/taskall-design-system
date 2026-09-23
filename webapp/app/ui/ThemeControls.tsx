import * as React from "react";
import { Button, Dropdown, Settings } from "@hive/react";

import {
  SETTING_LABELS,
  SETTING_OPTIONS,
  useSettings,
  type Brand,
  type Density,
  type Shape,
} from "../lib/settings";
import styles from "./ThemeControls.module.css";

function isInsidePopperPortal(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("[data-radix-popper-content-wrapper]"))
  );
}

export function ColorModeToggle() {
  const { settings, setSetting } = useSettings();
  const isDark = settings.colorMode === "dark";

  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
      onClick={() => setSetting("colorMode", isDark ? "light" : "dark")}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

/** Equivalente às toolbars de brand/density/shape do Storybook, persistido. */
export function ThemeControls() {
  const { settings, setSetting, reset } = useSettings();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        rootRef.current?.contains(event.target as Node) ||
        isInsidePopperPortal(event.target)
      )
        return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <Settings size={20} aria-hidden="true" />
        <span className={styles.triggerLabel}>Tema</span>
      </button>
      <div
        id={panelId}
        className={styles.panel}
        hidden={!open}
        role="group"
        aria-label="Personalizar tema"
      >
        <p className={styles.hint}>
          Aplica-se a todas as demonstrações e fica salvo neste navegador.
        </p>
        <Dropdown
          size="small"
          label={SETTING_LABELS.brand}
          options={SETTING_OPTIONS.brand}
          value={settings.brand}
          onValueChange={(value) => setSetting("brand", value as Brand)}
        />
        <Dropdown
          size="small"
          label={SETTING_LABELS.density}
          options={SETTING_OPTIONS.density}
          value={settings.density}
          onValueChange={(value) => setSetting("density", value as Density)}
        />
        <Dropdown
          size="small"
          label={SETTING_LABELS.shape}
          options={SETTING_OPTIONS.shape}
          value={settings.shape}
          onValueChange={(value) => setSetting("shape", value as Shape)}
        />
        <Button size="small" tone="neutral" visualStyle="light" onClick={reset}>
          Restaurar padrão
        </Button>
      </div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16.5 12.3A7 7 0 0 1 7.7 3.5a7 7 0 1 0 8.8 8.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
