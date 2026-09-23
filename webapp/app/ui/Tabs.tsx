import * as React from "react";

import styles from "./Tabs.module.css";

type Tab = { id: string; label: string; content: React.ReactNode };

/** Abas simples (padrão WAI-ARIA com ativação automática) para Preview/Código. */
export function Tabs({
  tabs,
  label,
  actions,
}: {
  tabs: Tab[];
  label: string;
  actions?: React.ReactNode;
}) {
  const [selected, setSelected] = React.useState(tabs[0]?.id ?? "");
  const baseId = React.useId();
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const move = (index: number) => {
    const wrapped = (index + tabs.length) % tabs.length;
    const tab = tabs[wrapped];
    if (!tab) return;
    setSelected(tab.id);
    refs.current[wrapped]?.focus();
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.bar}>
        <div role="tablist" aria-label={label} className={styles.list}>
          {tabs.map((tab, index) => {
            const isSelected = tab.id === selected;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  refs.current[index] = node;
                }}
                id={`${baseId}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={styles.tab}
                onClick={() => setSelected(tab.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") move(index + 1);
                  if (event.key === "ArrowLeft") move(index - 1);
                  if (event.key === "Home") move(0);
                  if (event.key === "End") move(tabs.length - 1);
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== selected}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
