import * as React from "react";

import { Add } from "../../icons/Add";
import { Check } from "../../icons/Check";
import { DeleteSmall } from "../../icons/DeleteSmall";
import type { IconComponent } from "../../icons/Icon";
import { StarFilled } from "../../icons/StarFilled";
import { cx } from "../../internal/cx";

import styles from "./StatusIndicator.module.css";

export type StatusIndicatorProps = {
  status:
    | "online"
    | "busy"
    | "away"
    | "offline"
    | "verified"
    | "add"
    | "delete"
    | "favorite";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLSpanElement>;

const iconByStatus: Partial<
  Record<StatusIndicatorProps["status"], IconComponent>
> = {
  verified: Check,
  add: Add,
  delete: DeleteSmall,
  favorite: StarFilled,
};

const iconSizeByIndicatorSize: Record<
  NonNullable<StatusIndicatorProps["size"]>,
  number
> = {
  xs: 6,
  sm: 6,
  md: 8,
  lg: 8,
  xl: 8,
};

export const StatusIndicator = React.forwardRef<
  HTMLSpanElement,
  StatusIndicatorProps
>(function StatusIndicator({ status, size = "md", className, ...props }, ref) {
  const Icon = iconByStatus[status];

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-size={size}
      data-state={status}
      className={cx(styles.root, styles[size], styles[status], className)}
      {...props}
    >
      {Icon ? (
        <Icon size={iconSizeByIndicatorSize[size]} aria-hidden="true" />
      ) : null}
    </span>
  );
});

StatusIndicator.displayName = "StatusIndicator";
