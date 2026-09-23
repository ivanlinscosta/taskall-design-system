import * as React from "react";

import { Avatar, type AvatarProps } from "../Avatar/Avatar";
import { cx } from "../../internal/cx";

import styles from "./AvatarGroup.module.css";

type AvatarGroupItem =
  React.ReactElement<AvatarProps> | Omit<AvatarProps, "className" | "style">;

export type AvatarGroupProps = {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarProps["size"];
  surplusLabel?: string;
  ariaLabel?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { avatars, max, size = "md", surplusLabel, ariaLabel, className, ...props },
    ref,
  ) {
    const { ["aria-label"]: ariaLabelProp, ...restProps } = props;
    const visibleLimit =
      typeof max === "number" ? Math.max(max, 0) : avatars.length;
    const visibleAvatars = avatars.slice(0, visibleLimit);
    const hiddenCount = Math.max(avatars.length - visibleAvatars.length, 0);

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel ?? ariaLabelProp ?? "Avatares"}
        data-size={size}
        className={cx(styles.root, styles[size], className)}
        {...restProps}
      >
        {visibleAvatars.map((avatar, index) => {
          const node = React.isValidElement<AvatarProps>(avatar) ? (
            React.cloneElement(avatar, {
              size: avatar.props.size ?? size,
            })
          ) : (
            <Avatar {...avatar} size={avatar.size ?? size} />
          );

          return (
            <span
              key={React.isValidElement(avatar) ? (avatar.key ?? index) : index}
              className={styles.item}
            >
              {node}
            </span>
          );
        })}
        {hiddenCount > 0 ? (
          <span className={cx(styles.item, styles.overflowWrap)}>
            <span
              className={styles.overflow}
              role="img"
              aria-label={surplusLabel ?? `+${hiddenCount} avatares adicionais`}
            >
              +{hiddenCount}
            </span>
          </span>
        ) : null}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";
