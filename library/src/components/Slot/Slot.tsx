import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./Slot.module.css";

export type SlotProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
};

const sizeClassNames: Record<NonNullable<SlotProps["size"]>, string> = {
  "2xl": styles.size2xl ?? "",
  xl: styles.sizeXl ?? "",
  lg: styles.sizeLg ?? "",
  md: styles.sizeMd ?? "",
  sm: styles.sizeSm ?? "",
  xs: styles.sizeXs ?? "",
};

export const Slot = React.forwardRef<HTMLSpanElement, SlotProps>(function Slot(
  { size = "md", className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-size={size}
      className={cx(styles.slot, sizeClassNames[size], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Slot.displayName = "Slot";
