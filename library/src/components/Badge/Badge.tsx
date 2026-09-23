import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./Badge.module.css";

export type BadgeProps = {
  type?: "status" | "icon" | "number";
  size?: "medium" | "small" | "x-small";
  visualStyle?: "filled" | "light" | "outline";
  icon?: IconComponent;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      type = "status",
      size = "medium",
      visualStyle = type === "number" ? "light" : "filled",
      icon: Icon,
      className,
      children = "Badge",
      ...props
    },
    ref,
  ) {
    const iconSizeByBadgeSize: Record<
      NonNullable<BadgeProps["size"]>,
      number
    > = {
      medium: 16,
      small: 14,
      "x-small": 12,
    };

    return (
      <span
        ref={ref}
        data-type={type}
        data-size={size}
        data-variant={visualStyle}
        className={cx(
          styles.root,
          styles[size],
          styles[visualStyle],
          styles[type],
          type === "icon" && !children ? styles.iconOnly : undefined,
          className,
        )}
        {...props}
      >
        {Icon ? (
          <Icon size={iconSizeByBadgeSize[size]} aria-hidden="true" />
        ) : null}
        {children ? <span className={styles.label}>{children}</span> : null}
      </span>
    );
  },
);

Badge.displayName = "Badge";
