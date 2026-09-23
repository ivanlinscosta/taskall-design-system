import * as React from "react";

import { cx } from "../../internal/cx";
import { useControllableState } from "../../internal/useControllableState";

import styles from "./Radio.module.css";

type RadioGroupContextValue = {
  disabled: boolean;
  name: string;
  size: "small" | "x-small";
  value?: string;
  onValueChange: (value: string) => void;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "small" | "x-small";
  label?: React.ReactNode;
};

export type RadioGroupProps = Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> & {
  name: string;
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "small" | "x-small";
  disabled?: boolean;
};

export const RadioGroup = React.forwardRef<
  HTMLFieldSetElement,
  RadioGroupProps
>(function RadioGroup(
  {
    name,
    label,
    value,
    defaultValue = "",
    onValueChange,
    size = "small",
    disabled = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({
      disabled,
      name,
      size,
      value: selectedValue,
      onValueChange: setSelectedValue,
    }),
    [disabled, name, selectedValue, setSelectedValue, size],
  );

  return (
    <fieldset
      {...props}
      ref={ref}
      disabled={disabled}
      data-size={size}
      data-variant="default"
      className={cx(styles.group, styles[size], className)}
    >
      {label ? <legend className={styles.legend}>{label}</legend> : null}
      <div className={styles.options}>
        <RadioGroupContext.Provider value={contextValue}>
          {children}
        </RadioGroupContext.Provider>
      </div>
    </fieldset>
  );
});

RadioGroup.displayName = "RadioGroup";

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(
    {
      size,
      label,
      checked: checkedProp,
      defaultChecked,
      disabled,
      name,
      value = "on",
      className,
      onChange,
      ...props
    },
    ref,
  ) {
    const group = React.useContext(RadioGroupContext);
    const isGrouped = group !== null;
    const resolvedSize = size ?? group?.size ?? "small";
    const resolvedDisabled = Boolean(disabled || group?.disabled);
    const resolvedName = name ?? group?.name;

    const [standaloneChecked, setStandaloneChecked] = useControllableState({
      value: checkedProp,
      defaultValue: Boolean(defaultChecked),
      onChange: undefined,
    });

    const checked = isGrouped ? group.value === value : standaloneChecked;

    return (
      <label
        data-size={resolvedSize}
        data-state={checked ? "checked" : "unchecked"}
        data-variant="default"
        className={cx(
          styles.root,
          styles[resolvedSize],
          resolvedDisabled && styles.disabled,
          className,
        )}
      >
        <input
          {...props}
          ref={ref}
          type="radio"
          name={resolvedName}
          value={value}
          disabled={resolvedDisabled}
          checked={checked}
          className={styles.input}
          onChange={(event) => {
            if (isGrouped && event.currentTarget.checked) {
              group.onValueChange(event.currentTarget.value);
            }

            if (!isGrouped) {
              setStandaloneChecked(event.currentTarget.checked);
            }

            onChange?.(event);
          }}
        />
        <span className={styles.control} aria-hidden="true">
          <span className={styles.dot} />
        </span>
        {label ? <span className={styles.label}>{label}</span> : null}
      </label>
    );
  },
);

Radio.displayName = "Radio";
