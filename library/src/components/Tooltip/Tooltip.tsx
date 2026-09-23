import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cx } from "../../internal/cx";

import styles from "./Tooltip.module.css";

export type TooltipProps = {
  title: string;
  description?: string;
  size?: "small" | "large";
  visualStyle?: "outline" | "light" | "filled";
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      title,
      description,
      size,
      visualStyle = "light",
      side = "top",
      children,
      className,
      ...props
    },
    ref,
  ) {
    const resolvedSize = size ?? (description ? "large" : "small");

    return (
      <TooltipPrimitive.Provider delayDuration={300}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              side={side}
              sideOffset={6}
              data-size={resolvedSize}
              data-variant={visualStyle}
              className={cx(
                styles.content,
                styles[resolvedSize],
                styles[visualStyle],
                className,
              )}
              {...props}
            >
              <div className={styles.title}>{title}</div>
              {description ? (
                <div className={styles.description}>{description}</div>
              ) : null}
              <TooltipPrimitive.Arrow
                className={styles.arrow}
                width={10}
                height={6}
              />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  },
);

Tooltip.displayName = "Tooltip";
