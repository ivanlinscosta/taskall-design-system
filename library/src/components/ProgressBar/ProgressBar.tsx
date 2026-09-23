import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./ProgressBar.module.css";

export type ProgressBarProps = {
  value: number;
  tone?:
    | "brand"
    | "purple"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "red"
    | "pink";
  label?: string;
  showPercentage?: boolean;
  size?: "small" | "medium";
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

function clampValue(value: number) {
  return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

function formatPercentage(value: number) {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    {
      value,
      tone = "brand",
      label,
      showPercentage = false,
      size = "medium",
      className,
      ...props
    },
    ref,
  ) {
    const clampedValue = clampValue(value);
    const valueText = formatPercentage(clampedValue);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        aria-valuetext={valueText}
        aria-label={label}
        data-tone={tone}
        data-size={size}
        className={cx(styles.root, styles[size], className)}
        {...props}
      >
        {label || showPercentage ? (
          <div className={styles.header}>
            <span className={styles.label}>{label}</span>
            {showPercentage ? (
              <span className={styles.label}>{valueText}</span>
            ) : null}
          </div>
        ) : null}
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: valueText }} />
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = "ProgressBar";
