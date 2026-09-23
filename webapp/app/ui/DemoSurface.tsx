import * as React from "react";
import { TaskAllProvider } from "@taskall/react";

import { useSettings, type ThemeSettings } from "../lib/settings";
import styles from "./DemoSurface.module.css";

type DemoSurfaceProps = {
  children: React.ReactNode;
  /** Sobrescreve dimensões do tema global apenas nesta área. */
  overrides?: Partial<ThemeSettings>;
  align?: "center" | "start" | "stretch";
  className?: string;
  label?: string;
};

/**
 * Área de demonstração: aplica as 4 dimensões do tema (modo, marca, densidade
 * e forma) com um TaskAllProvider aninhado, como o decorator do Storybook.
 */
export function DemoSurface({
  children,
  overrides,
  align = "center",
  className,
  label,
}: DemoSurfaceProps) {
  const { settings } = useSettings();
  const theme = { ...settings, ...overrides };

  return (
    <TaskAllProvider
      colorMode={theme.colorMode}
      brand={theme.brand}
      density={theme.density}
      shape={theme.shape}
      data-align={align}
      className={[styles.surface, className].filter(Boolean).join(" ")}
      role={label ? "region" : undefined}
      aria-label={label}
    >
      {children}
    </TaskAllProvider>
  );
}
