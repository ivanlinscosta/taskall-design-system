import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./TextInput.module.css";

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  sublabel?: string;
  error?: string;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  size?: "medium" | "small";
};

function joinIds(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ") || undefined;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      sublabel,
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      size = "medium",
      className,
      disabled = false,
      id,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const reactId = React.useId();
    const inputId = id ?? `taskall-text-input-${reactId}`;
    const descriptionId = sublabel ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = joinIds(ariaDescribedBy, descriptionId, errorId);

    return (
      <div
        data-size={size}
        data-state={disabled ? "disabled" : "default"}
        data-variant={error ? "error" : "default"}
        className={cx(styles.root, styles[size], className)}
      >
        {label ? (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        ) : null}
        {sublabel ? (
          <span id={descriptionId} className={styles.sublabel}>
            {sublabel}
          </span>
        ) : null}
        <div
          className={cx(
            styles.field,
            error && styles.fieldError,
            disabled && styles.fieldDisabled,
          )}
        >
          {LeftIcon ? (
            <LeftIcon size={16} aria-hidden="true" className={styles.icon} />
          ) : null}
          <input
            {...props}
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            aria-label={ariaLabel ?? label}
            className={styles.input}
          />
          {RightIcon ? (
            <RightIcon size={16} aria-hidden="true" className={styles.icon} />
          ) : null}
        </div>
        {error ? (
          <span id={errorId} role="alert" className={styles.error}>
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
