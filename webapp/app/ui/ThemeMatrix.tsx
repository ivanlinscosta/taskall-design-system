import * as React from "react";

import {
  SETTING_LABELS,
  SETTING_OPTIONS,
  type SettingKey,
  type ThemeSettings,
} from "../lib/settings";
import { DemoSurface } from "./DemoSurface";
import styles from "./ThemeMatrix.module.css";

const DIMENSIONS: SettingKey[] = ["brand", "colorMode", "density", "shape"];

/**
 * Renderiza o mesmo conteúdo lado a lado variando uma dimensão do tema.
 * As demais dimensões seguem a configuração global.
 */
export function ThemeMatrix({ render }: { render: () => React.ReactNode }) {
  const [dimension, setDimension] = React.useState<SettingKey>("brand");
  const options = SETTING_OPTIONS[dimension] as Array<{
    value: string;
    label: string;
  }>;

  return (
    <div className={styles.matrix}>
      <div className={styles.switcher} role="group" aria-label="Comparar por">
        <span className={styles.switcherLabel} aria-hidden="true">
          Comparar por
        </span>
        {DIMENSIONS.map((key) => (
          <button
            key={key}
            type="button"
            className={styles.option}
            aria-pressed={dimension === key}
            onClick={() => setDimension(key)}
          >
            {SETTING_LABELS[key]}
          </button>
        ))}
      </div>
      <div className={styles.grid} data-count={options.length}>
        {options.map((option) => (
          <figure key={option.value} className={styles.cell}>
            <DemoSurface
              overrides={
                { [dimension]: option.value } as Partial<ThemeSettings>
              }
              className={styles.surface}
            >
              {render()}
            </DemoSurface>
            <figcaption className={styles.caption}>
              {SETTING_LABELS[dimension]}: <strong>{option.label}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
