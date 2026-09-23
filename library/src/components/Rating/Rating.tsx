import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { Heart } from "../../icons/Heart";
import { HeartFilled } from "../../icons/HeartFilled";
import { Star } from "../../icons/Star";
import { StarFilled } from "../../icons/StarFilled";
import { cx } from "../../internal/cx";
import { useControllableState } from "../../internal/useControllableState";

import styles from "./Rating.module.css";

export type RatingProps = {
  value?: number;
  max?: number;
  type?: "star" | "heart";
  readOnly?: boolean;
  onChange?: (value: number) => void;
  label?: string;
  direction?: "horizontal" | "vertical";
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

type IconSet = {
  outline: IconComponent;
  filled: IconComponent;
};

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getIconSet(type: RatingProps["type"]): IconSet {
  if (type === "heart") {
    return { outline: Heart, filled: HeartFilled };
  }

  return { outline: Star, filled: StarFilled };
}

function getItemLabel(type: RatingProps["type"], value: number) {
  return type === "heart" ? `${value} corações` : `${value} estrelas`;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  function Rating(
    {
      value,
      max = 5,
      type = "star",
      readOnly = false,
      onChange,
      label,
      direction = "horizontal",
      className,
      onMouseLeave,
      ...props
    },
    ref,
  ) {
    const itemCount = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
    const groupLabel = label ?? "Avaliação";
    const [currentValue, setCurrentValue] = useControllableState<number>({
      value,
      defaultValue: 0,
      onChange,
    });
    const interactiveValue = clampValue(Math.round(currentValue), 0, itemCount);
    const [focusIndex, setFocusIndex] = React.useState(
      interactiveValue > 0 ? interactiveValue - 1 : 0,
    );
    const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
    const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const icons = React.useMemo(() => getIconSet(type), [type]);
    const previewValue =
      hoverIndex === null ? interactiveValue : hoverIndex + 1;

    React.useEffect(() => {
      setFocusIndex(interactiveValue > 0 ? interactiveValue - 1 : 0);
    }, [interactiveValue]);

    const selectValue = React.useCallback(
      (nextValue: number) => {
        if (readOnly) {
          return;
        }

        setCurrentValue(clampValue(nextValue, 0, itemCount));
      },
      [itemCount, readOnly, setCurrentValue],
    );

    const moveFocus = React.useCallback(
      (nextIndex: number, shouldSelect: boolean) => {
        const safeIndex = clampValue(nextIndex, 0, itemCount - 1);
        setFocusIndex(safeIndex);

        const nextButton = buttonRefs.current[safeIndex];
        nextButton?.focus();

        if (shouldSelect) {
          selectValue(safeIndex + 1);
        }
      },
      [itemCount, selectValue],
    );

    const handleItemKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown": {
            event.preventDefault();
            moveFocus(index + 1, true);
            return;
          }
          case "ArrowLeft":
          case "ArrowUp": {
            event.preventDefault();
            moveFocus(index - 1, true);
            return;
          }
          case "Home": {
            event.preventDefault();
            moveFocus(0, true);
            return;
          }
          case "End": {
            event.preventDefault();
            moveFocus(itemCount - 1, true);
            return;
          }
          case " ":
          case "Enter": {
            event.preventDefault();
            selectValue(index + 1);
            return;
          }
          default:
        }
      },
      [itemCount, moveFocus, selectValue],
    );

    const renderDisplayIcon = (index: number) => {
      const itemValue = index + 1;
      const isFilled = currentValue >= itemValue;
      const isHalf = currentValue > index && currentValue < itemValue;
      const OutlineIcon = icons.outline;
      const FilledIcon = icons.filled;

      if (isFilled) {
        return (
          <FilledIcon
            size={20}
            className={cx(styles.icon, styles.filled)}
            aria-hidden="true"
          />
        );
      }

      if (isHalf) {
        return (
          <span className={styles.iconStack} aria-hidden="true">
            <OutlineIcon size={20} className={cx(styles.icon, styles.empty)} />
            <span className={styles.halfFill}>
              <FilledIcon
                size={20}
                className={cx(styles.icon, styles.filled)}
              />
            </span>
          </span>
        );
      }

      return (
        <OutlineIcon
          size={20}
          className={cx(styles.icon, styles.empty)}
          aria-hidden="true"
        />
      );
    };

    const renderInteractiveIcon = (index: number) => {
      const isFilled = index < previewValue;
      const OutlineIcon = icons.outline;
      const FilledIcon = icons.filled;

      if (isFilled) {
        return (
          <FilledIcon
            size={20}
            className={cx(styles.icon, styles.filled)}
            aria-hidden="true"
          />
        );
      }

      return (
        <OutlineIcon
          size={20}
          className={cx(styles.icon, styles.empty)}
          aria-hidden="true"
        />
      );
    };

    if (readOnly) {
      return (
        <div
          ref={ref}
          role="img"
          aria-label={`${groupLabel}: ${currentValue} de ${itemCount}`}
          data-direction={direction}
          data-state="read-only"
          data-type={type}
          className={cx(styles.root, styles.readOnly, className)}
          {...props}
        >
          {Array.from({ length: itemCount }, (_, index) => (
            <span key={index} className={styles.itemStatic}>
              {renderDisplayIcon(index)}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={groupLabel}
        data-direction={direction}
        data-state="interactive"
        data-type={type}
        data-hovering={hoverIndex === null ? undefined : "true"}
        className={cx(styles.root, className)}
        onMouseLeave={(event) => {
          setHoverIndex(null);
          onMouseLeave?.(event);
        }}
        {...props}
      >
        {Array.from({ length: itemCount }, (_, index) => {
          const isChecked = interactiveValue === index + 1;
          const isTabStop = focusIndex === index;

          return (
            <button
              key={index}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={isChecked}
              aria-label={getItemLabel(type, index + 1)}
              tabIndex={isTabStop ? 0 : -1}
              data-active={index < previewValue ? "true" : undefined}
              data-checked={isChecked ? "true" : undefined}
              className={styles.item}
              onFocus={() => setFocusIndex(index)}
              onMouseEnter={() => setHoverIndex(index)}
              onClick={() => {
                setFocusIndex(index);
                selectValue(index + 1);
              }}
              onKeyDown={(event) => handleItemKeyDown(event, index)}
            >
              {renderInteractiveIcon(index)}
            </button>
          );
        })}
      </div>
    );
  },
);

Rating.displayName = "Rating";
