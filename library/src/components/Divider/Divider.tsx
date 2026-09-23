import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./Divider.module.css";

export type DividerProps = React.HTMLAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLHRElement> & {
    type?: "line" | "text" | "icon";
    dotted?: boolean;
    text?: string;
    icon?: IconComponent;
  };

export const Divider = React.forwardRef<
  HTMLDivElement | HTMLHRElement,
  DividerProps
>(function Divider(
  { type = "line", dotted = false, text, icon: Icon, className, ...props },
  ref,
) {
  if (type === "line") {
    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role="separator"
        data-type="line"
        className={cx(styles.line, dotted && styles.dotted, className)}
        {...props}
      />
    );
  }

  const ariaLabel = type === "text" ? text : (text ?? "Divisor");

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role="separator"
      aria-label={ariaLabel}
      data-type={type}
      className={cx(styles.container, className)}
      {...props}
    >
      <span className={styles.segment} aria-hidden="true" />
      {type === "text" ? <span className={styles.text}>{text}</span> : null}
      {type === "icon" && Icon ? (
        <span className={styles.iconWrapper} aria-hidden="true">
          <Icon size={16} aria-hidden="true" />
        </span>
      ) : null}
      <span className={styles.segment} aria-hidden="true" />
    </div>
  );
});

Divider.displayName = "Divider";
