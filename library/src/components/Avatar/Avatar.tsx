import * as React from "react";

import { Add } from "../../icons/Add";
import { Check } from "../../icons/Check";
import { DeleteSmall } from "../../icons/DeleteSmall";
import type { IconComponent } from "../../icons/Icon";
import { StarFilled } from "../../icons/StarFilled";
import { cx } from "../../internal/cx";

import styles from "./Avatar.module.css";

export type AvatarProps = {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?:
    | "online"
    | "busy"
    | "away"
    | "offline"
    | "verified"
    | "add"
    | "delete"
    | "favorite";
} & React.HTMLAttributes<HTMLSpanElement>;

const iconByStatus: Partial<
  Record<NonNullable<AvatarProps["status"]>, IconComponent>
> = {
  verified: Check,
  add: Add,
  delete: DeleteSmall,
  favorite: StarFilled,
};

const iconSizeByAvatarSize: Record<NonNullable<AvatarProps["size"]>, number> = {
  xs: 6,
  sm: 6,
  md: 8,
  lg: 8,
  xl: 8,
};

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(
    { src, alt, fallback, size = "md", status, className, ...props },
    ref,
  ) {
    const [hasImageError, setHasImageError] = React.useState(false);
    const showImage = Boolean(src) && !hasImageError;
    const StatusIcon = status ? iconByStatus[status] : undefined;

    return (
      <span
        ref={ref}
        data-size={size}
        data-state={status}
        className={cx(styles.root, styles[size], className)}
        {...props}
      >
        <span
          className={styles.fallback}
          role={showImage ? undefined : "img"}
          aria-label={showImage ? undefined : fallback}
          aria-hidden={showImage ? "true" : undefined}
        >
          {fallback}
        </span>
        {src ? (
          <img
            className={cx(
              styles.image,
              showImage ? styles.imageVisible : styles.imageHidden,
            )}
            src={src}
            alt={alt ?? fallback}
            onError={() => setHasImageError(true)}
          />
        ) : null}
        {status ? (
          <span
            className={cx(styles.statusIndicator, styles[status])}
            data-state={status}
            aria-hidden="true"
          >
            {StatusIcon ? (
              <StatusIcon
                size={iconSizeByAvatarSize[size]}
                aria-hidden="true"
              />
            ) : null}
          </span>
        ) : null}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";
