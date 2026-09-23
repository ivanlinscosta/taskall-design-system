import * as React from "react";
import * as Select from "@radix-ui/react-select";

import { Check } from "../../icons/Check";
import { TaillessLineArrowDown as ChevronDown } from "../../icons/TaillessLineArrowDown";
import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./Dropdown.module.css";

export type DropdownAdornment =
  "check" | "checkbox" | "flag" | "radio" | "badge";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: IconComponent;
  meta?: React.ReactNode;
  adornment?: DropdownAdornment;
};

export type DropdownProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  options: DropdownOption[];
  label?: string;
  sublabel?: string;
  error?: string;
  placeholder?: string;
  leftIcon?: IconComponent;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "medium" | "small";
};

type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type TriggerPassthroughProps = React.AriaAttributes & DataAttributes;

function joinIds(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ") || undefined;
}

function getTriggerPassthroughProps(
  props: Record<string, unknown>,
  describedBy: string | undefined,
  invalid: boolean,
): TriggerPassthroughProps {
  const passthroughEntries = Object.entries(props).filter(
    ([key]) => key.startsWith("aria-") || key.startsWith("data-"),
  );
  const passthrough = Object.fromEntries(
    passthroughEntries,
  ) as TriggerPassthroughProps;

  return {
    ...passthrough,
    "aria-describedby": describedBy,
    "aria-invalid": invalid || undefined,
  };
}

function renderTrailingAdornment(option: DropdownOption) {
  if (option.adornment === "check") {
    return (
      <Select.ItemIndicator className={styles.itemIndicator}>
        <Check size={16} aria-hidden="true" />
      </Select.ItemIndicator>
    );
  }

  if (option.adornment === "checkbox") {
    return (
      <span className={styles.selectionBox} aria-hidden="true">
        <Select.ItemIndicator className={styles.embeddedIndicator}>
          <Check size={12} aria-hidden="true" />
        </Select.ItemIndicator>
      </span>
    );
  }

  if (option.adornment === "radio") {
    return (
      <span className={styles.selectionRadio} aria-hidden="true">
        <Select.ItemIndicator className={styles.embeddedRadioIndicator}>
          <span className={styles.selectionRadioDot} />
        </Select.ItemIndicator>
      </span>
    );
  }

  if (option.adornment === "flag") {
    return <span className={styles.flagAdornment} aria-hidden="true" />;
  }

  if (option.adornment === "badge" && option.meta) {
    return <span className={styles.badge}>{option.meta}</span>;
  }

  if (!option.adornment && option.meta) {
    return <span className={styles.meta}>{option.meta}</span>;
  }

  return null;
}

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  function Dropdown(
    {
      options,
      label,
      sublabel,
      error,
      placeholder = "Selecione",
      leftIcon: LeftIcon,
      value,
      defaultValue,
      onValueChange,
      size = "medium",
      className,
      disabled = false,
      id,
      name,
      form,
      required,
      autoComplete,
      title,
      tabIndex,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      onMouseEnter,
      onMouseLeave,
      onClick,
      style,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const reactId = React.useId();
    const triggerId = id ?? `hive-dropdown-${reactId}`;
    const descriptionId = sublabel ? `${triggerId}-description` : undefined;
    const errorId = error ? `${triggerId}-error` : undefined;
    const describedBy = joinIds(ariaDescribedBy, descriptionId, errorId);
    const triggerPassthroughProps = getTriggerPassthroughProps(
      props,
      describedBy,
      Boolean(error),
    );
    const triggerOnBlur = onBlur as
      React.FocusEventHandler<HTMLButtonElement> | undefined;
    const triggerOnFocus = onFocus as
      React.FocusEventHandler<HTMLButtonElement> | undefined;
    const triggerOnKeyDown = onKeyDown as
      React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    const triggerOnKeyUp = onKeyUp as
      React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    const triggerOnPointerDown = onPointerDown as
      React.PointerEventHandler<HTMLButtonElement> | undefined;
    const triggerOnPointerUp = onPointerUp as
      React.PointerEventHandler<HTMLButtonElement> | undefined;
    const triggerOnMouseEnter = onMouseEnter as
      React.MouseEventHandler<HTMLButtonElement> | undefined;
    const triggerOnMouseLeave = onMouseLeave as
      React.MouseEventHandler<HTMLButtonElement> | undefined;
    const triggerOnClick = onClick as
      React.MouseEventHandler<HTMLButtonElement> | undefined;

    return (
      <div
        data-size={size}
        data-state={disabled ? "disabled" : "default"}
        data-variant={error ? "error" : "default"}
        className={cx(styles.root, styles[size], className)}
        style={style}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        {sublabel ? (
          <span id={descriptionId} className={styles.sublabel}>
            {sublabel}
          </span>
        ) : null}
        <Select.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          name={name}
          form={form}
          required={required}
          autoComplete={autoComplete}
        >
          <Select.Trigger
            {...triggerPassthroughProps}
            ref={ref}
            id={triggerId}
            className={cx(
              styles.field,
              error && styles.fieldError,
              disabled && styles.fieldDisabled,
            )}
            title={title}
            tabIndex={tabIndex}
            onBlur={triggerOnBlur}
            onFocus={triggerOnFocus}
            onKeyDown={triggerOnKeyDown}
            onKeyUp={triggerOnKeyUp}
            onPointerDown={triggerOnPointerDown}
            onPointerUp={triggerOnPointerUp}
            onMouseEnter={triggerOnMouseEnter}
            onMouseLeave={triggerOnMouseLeave}
            onClick={triggerOnClick}
            aria-label={ariaLabel ?? label}
          >
            {LeftIcon ? (
              <LeftIcon size={16} aria-hidden="true" className={styles.icon} />
            ) : null}
            <Select.Value className={styles.value} placeholder={placeholder} />
            <Select.Icon asChild>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={styles.chevron}
              />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className={styles.content}
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport className={styles.viewport}>
                {options.map((option) => {
                  const OptionIcon = option.icon;

                  return (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className={styles.item}
                      textValue={option.label}
                    >
                      {OptionIcon ? (
                        <OptionIcon
                          size={16}
                          aria-hidden="true"
                          className={styles.itemIcon}
                        />
                      ) : null}
                      <Select.ItemText className={styles.itemText}>
                        {option.label}
                      </Select.ItemText>
                      <span className={styles.trailing}>
                        {renderTrailingAdornment(option)}
                      </span>
                    </Select.Item>
                  );
                })}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        {error ? (
          <span id={errorId} role="alert" className={styles.error}>
            {error}
          </span>
        ) : null}
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";
