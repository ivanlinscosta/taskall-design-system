import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./Heading.module.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  as?: HeadingLevel;
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ level = 1, as, className, children, ...props }, ref) {
    const appearance = as ?? level;
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return React.createElement(
      Tag,
      {
        ref,
        className: cx(styles.heading, styles[`lvl${appearance}`], className),
        "data-as": String(appearance),
        "data-level": String(level),
        ...props,
      },
      children,
    );
  },
);

Heading.displayName = "Heading";
