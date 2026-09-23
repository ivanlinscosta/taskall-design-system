import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./LabelText.module.css";

export type LabelTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: "l" | "m" | "s" | "xs";
};

export const LabelText = React.forwardRef<HTMLSpanElement, LabelTextProps>(
  function LabelText({ size = "m", className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-size={size}
        className={cx(styles.labelText, styles[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

LabelText.displayName = "LabelText";
