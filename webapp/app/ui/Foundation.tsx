import * as React from "react";

import { useSettings } from "../lib/settings";
import styles from "./Foundation.module.css";

/**
 * Lê o valor computado de tokens a partir de um elemento — respeita o
 * HiveProvider mais próximo e recalcula quando o tema global muda.
 */
export function useComputedTokens<T extends HTMLElement>(
  tokens: readonly string[],
) {
  const ref = React.useRef<T>(null);
  const { settings } = useSettings();
  const [values, setValues] = React.useState<Record<string, string>>({});
  const key = tokens.join("|");

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const frame = window.requestAnimationFrame(() => {
      const style = getComputedStyle(element);
      setValues(
        Object.fromEntries(
          key
            .split("|")
            .map((token) => [token, style.getPropertyValue(token).trim()]),
        ),
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, [key, settings]);

  return [ref, values] as const;
}

type Rgb = [number, number, number];

/** Converte qualquer cor CSS em RGB usando o próprio navegador. */
export function resolveColor(element: HTMLElement, token: string): Rgb | null {
  const probe = document.createElement("span");
  probe.style.color = `var(${token})`;
  probe.style.display = "none";
  element.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  const match = color.match(/[\d.]+/g);
  if (!match || match.length < 3) return null;
  return [Number(match[0]), Number(match[1]), Number(match[2])];
}

function luminance([r, g, b]: Rgb) {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: Rgb, b: Rgb) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (light + 0.05) / (dark + 0.05);
}

export function SwatchGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.swatchGrid}>{children}</div>;
}

export function Swatch({
  name,
  token,
  value,
}: {
  name: string;
  token: string;
  value?: string;
}) {
  return (
    <figure className={styles.swatch}>
      <div
        className={styles.swatchColor}
        style={{ background: `var(${token})` }}
        aria-hidden="true"
      />
      <figcaption className={styles.swatchCaption}>
        <span className={styles.swatchName}>{name}</span>
        <code className={styles.swatchToken}>{token}</code>
        <span className={styles.swatchValue}>{value || "…"}</span>
      </figcaption>
    </figure>
  );
}

/** Grade de amostras com valores computados no tema atual. */
export function ColorGroup({
  tokens,
}: {
  tokens: Array<{ name: string; token: string }>;
}) {
  const [ref, values] = useComputedTokens<HTMLDivElement>(
    tokens.map((item) => item.token),
  );
  return (
    <div ref={ref}>
      <SwatchGrid>
        {tokens.map((item) => (
          <Swatch
            key={item.token}
            name={item.name}
            token={item.token}
            value={values[item.token]}
          />
        ))}
      </SwatchGrid>
    </div>
  );
}

export function TokenTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: Array<{ key: string; cells: React.ReactNode[] }>;
}) {
  return (
    <div
      className={styles.tableWrap}
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {row.cells.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={index}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
