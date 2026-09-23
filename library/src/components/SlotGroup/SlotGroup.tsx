import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./SlotGroup.module.css";

export type SlotGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  ariaLabel?: string;
};

export const SlotGroup = React.forwardRef<HTMLDivElement, SlotGroupProps>(
  function SlotGroup(
    { orientation = "horizontal", ariaLabel, className, children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel ?? "Grupo de slots"}
        data-orientation={orientation}
        className={cx(styles.group, styles[orientation], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SlotGroup.displayName = "SlotGroup";
