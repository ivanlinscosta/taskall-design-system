import * as React from "react";

import { Check } from "../../icons/Check";
import { Minus } from "../../icons/Minus";
import { cx } from "../../internal/cx";
import { useControllableState } from "../../internal/useControllableState";

import styles from "./Checkbox.module.css";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "small" | "x-small";
  indeterminate?: boolean;
  label?: React.ReactNode;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = "small",
      indeterminate = false,
      label,
      checked: checkedProp,
      defaultChecked,
      disabled = false,
      className,
      onChange,
      ...props
    },
    ref,
  ) {
    const [checked, setChecked] = useControllableState({
      value: checkedProp,
      defaultValue: Boolean(defaultChecked),
      onChange: undefined,
    });

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.indeterminate = indeterminate;

      if (indeterminate) {
        inputRef.current.setAttribute("aria-checked", "mixed");
        return;
      }

      inputRef.current.removeAttribute("aria-checked");
    }, [checked, indeterminate]);

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof ref === "function") {
          ref(node);
          return;
        }

        if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const state = indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked";
    const iconSize = size === "small" ? 16 : 12;

    return (
      <label
        data-size={size}
        data-state={state}
        data-variant="default"
        className={cx(
          styles.root,
          styles[size],
          disabled && styles.disabled,
          className,
        )}
      >
        <input
          {...props}
          ref={setRefs}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          aria-checked={indeterminate ? "mixed" : undefined}
          className={styles.input}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
            onChange?.(event);
          }}
        />
        <span className={styles.control} aria-hidden="true">
          <Check
            size={iconSize}
            className={styles.checkIcon}
            aria-hidden="true"
          />
          <Minus
            size={iconSize}
            className={styles.minusIcon}
            aria-hidden="true"
          />
        </span>
        {label ? <span className={styles.label}>{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
