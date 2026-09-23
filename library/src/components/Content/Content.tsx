import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./Content.module.css";

export type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "avatar" | "icon";
  size?: "small" | "x-small";
  label: string;
  description?: string;
  avatar?: React.ReactNode;
  icon?: IconComponent;
  badge?: React.ReactNode;
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl";
};

const avatarSizeClassNames: Record<
  NonNullable<ContentProps["avatarSize"]>,
  string
> = {
  xs: styles.avatarXs ?? "",
  sm: styles.avatarSm ?? "",
  md: styles.avatarMd ?? "",
  lg: styles.avatarLg ?? "",
  xl: styles.avatarXl ?? "",
};

function getInitials(label: string) {
  return label
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  function Content(
    {
      type = "avatar",
      size = "small",
      label,
      description,
      avatar,
      icon: Icon,
      badge,
      avatarSize = "md",
      className,
      ...props
    },
    ref,
  ) {
    const initials = getInitials(label);
    const isIcon = type === "icon";

    return (
      <div
        ref={ref}
        data-type={type}
        data-size={size}
        className={cx(styles.root, styles[size], className)}
        {...props}
      >
        {isIcon ? (
          Icon ? (
            <span
              className={cx(styles.leading, styles.iconBox)}
              aria-hidden="true"
            >
              <Icon size={size === "small" ? 20 : 16} aria-hidden="true" />
            </span>
          ) : null
        ) : avatar ? (
          <span className={styles.leading} title={label}>
            {avatar}
          </span>
        ) : (
          <span
            className={cx(
              styles.leading,
              styles.avatarFallback,
              avatarSizeClassNames[avatarSize],
            )}
            title={label}
            aria-hidden="true"
          >
            {initials}
          </span>
        )}

        <span className={styles.body}>
          <span
            className={cx(
              styles.label,
              size === "small" ? styles.labelSmall : styles.labelXSmall,
            )}
          >
            {label}
          </span>
          {description ? (
            <span
              className={cx(
                styles.description,
                size === "small"
                  ? styles.descriptionSmall
                  : styles.descriptionXSmall,
              )}
            >
              {description}
            </span>
          ) : null}
        </span>

        {badge ? <span className={styles.badge}>{badge}</span> : null}
      </div>
    );
  },
);

Content.displayName = "Content";
