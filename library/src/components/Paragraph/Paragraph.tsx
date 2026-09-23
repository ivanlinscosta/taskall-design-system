import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./Paragraph.module.css";

export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: "l" | "m" | "s" | "xs";
};

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  function Paragraph({ size = "m", className, children, ...props }, ref) {
    return (
      <p
        ref={ref}
        data-size={size}
        className={cx(styles.paragraph, styles[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = "Paragraph";
