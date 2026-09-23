import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";
import { useControllableState } from "../../internal/useControllableState";

import styles from "./TabMenu.module.css";

export type TabItem = {
  key: string;
  label: React.ReactNode;
  /** Conteúdo do painel da aba. Sem ele, o painel exibe o `label`. */
  content?: React.ReactNode;
  /** Ícone decorativo exibido antes do rótulo da aba. */
  icon?: IconComponent;
};

export type TabMenuProps = {
  items: TabItem[];
  type?: "horizontal" | "vertical";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

function getWrappedIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  if (index < 0) {
    return length - 1;
  }

  if (index >= length) {
    return 0;
  }

  return index;
}

export const TabMenu = React.forwardRef<HTMLDivElement, TabMenuProps>(
  function TabMenu(
    {
      items,
      type = "horizontal",
      value,
      defaultValue,
      onValueChange,
      ariaLabel,
      className,
      ...props
    },
    ref,
  ) {
    const fallbackKey = defaultValue ?? items[0]?.key;
    const [selectedKey, setSelectedKey] = useControllableState<
      string | undefined
    >({
      value,
      defaultValue: fallbackKey,
      onChange: (nextValue) => {
        if (nextValue !== undefined) {
          onValueChange?.(nextValue);
        }
      },
    });
    const baseId = React.useId();
    const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const effectiveSelectedKey = items.some((item) => item.key === selectedKey)
      ? selectedKey
      : items[0]?.key;
    const effectiveSelectedIndex = items.findIndex(
      (item) => item.key === effectiveSelectedKey,
    );
    const [focusIndex, setFocusIndex] = React.useState(
      effectiveSelectedIndex >= 0 ? effectiveSelectedIndex : 0,
    );

    React.useEffect(() => {
      setFocusIndex(effectiveSelectedIndex >= 0 ? effectiveSelectedIndex : 0);
    }, [effectiveSelectedIndex]);

    const selectTab = React.useCallback(
      (index: number, shouldFocus: boolean) => {
        const nextItem = items[index];

        if (!nextItem) {
          return;
        }

        setFocusIndex(index);
        setSelectedKey(nextItem.key);

        if (shouldFocus) {
          tabRefs.current[index]?.focus();
        }
      },
      [items, setSelectedKey],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (items.length === 0) {
          return;
        }

        const previousKey = type === "vertical" ? "ArrowUp" : "ArrowLeft";
        const nextKey = type === "vertical" ? "ArrowDown" : "ArrowRight";

        switch (event.key) {
          case previousKey: {
            event.preventDefault();
            selectTab(getWrappedIndex(index - 1, items.length), true);
            return;
          }
          case nextKey: {
            event.preventDefault();
            selectTab(getWrappedIndex(index + 1, items.length), true);
            return;
          }
          case "Home": {
            event.preventDefault();
            selectTab(0, true);
            return;
          }
          case "End": {
            event.preventDefault();
            selectTab(items.length - 1, true);
            return;
          }
          case " ":
          case "Enter": {
            event.preventDefault();
            selectTab(index, false);
            return;
          }
          default:
        }
      },
      [items, selectTab, type],
    );

    return (
      <div
        ref={ref}
        className={cx(styles.root, className)}
        data-type={type}
        {...props}
      >
        <div
          role="tablist"
          aria-label={ariaLabel ?? "Menu de abas"}
          aria-orientation={type}
          data-type={type}
          className={cx(styles.list, styles[type])}
        >
          {items.map((item, index) => {
            const isSelected = index === effectiveSelectedIndex;
            const tabId = `${baseId}-tab-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <button
                key={item.key}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={focusIndex === index ? 0 : -1}
                data-selected={isSelected ? "true" : undefined}
                className={styles.tab}
                onFocus={() => setFocusIndex(index)}
                onClick={() => selectTab(index, false)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {item.icon ? <item.icon size={16} aria-hidden="true" /> : null}
                {item.label}
              </button>
            );
          })}
        </div>
        {items.map((item, index) => {
          const isSelected = index === effectiveSelectedIndex;

          return (
            <div
              key={`${item.key}-panel`}
              id={`${baseId}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${index}`}
              tabIndex={isSelected ? 0 : -1}
              hidden={!isSelected}
              className={styles.panel}
            >
              {item.content ?? item.label}
            </div>
          );
        })}
      </div>
    );
  },
);

TabMenu.displayName = "TabMenu";
