import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "primary" | "neutral" | "error";
  visualStyle?: "filled" | "light" | "outline";
  size?: "medium" | "small";
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      tone = "primary",
      visualStyle = "filled",
      size = "medium",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;
    const iconSize = size === "medium" ? 20 : 16;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-tone={tone}
        data-variant={visualStyle}
        data-size={size}
        className={cx(
          styles.button,
          styles[tone],
          styles[visualStyle],
          styles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : null}
        {!loading && LeftIcon ? (
          <LeftIcon size={iconSize} aria-hidden="true" />
        ) : null}
        {children !== undefined &&
        children !== null &&
        children !== false &&
        children !== "" ? (
          <span className={styles.label}>{children}</span>
        ) : null}
        {RightIcon ? <RightIcon size={iconSize} aria-hidden="true" /> : null}
      </button>
    );
  },
);
