import * as React from "react";

import { Delete as Close } from "../../icons/Delete";
import { InformationCircle } from "../../icons/InformationCircle";
import { InformationCircleFilled } from "../../icons/InformationCircleFilled";
import type { IconComponent } from "../../icons/Icon";
import { Loop } from "../../icons/Loop";
import { CheckCircle } from "../../icons/CheckCircle";
import { CheckCircleFilled } from "../../icons/CheckCircleFilled";
import { WarningCircle } from "../../icons/WarningCircle";
import { WarningCircleFilled } from "../../icons/WarningCircleFilled";
import { WarningTriangle } from "../../icons/WarningTriangle";
import { WarningTriangleFilled } from "../../icons/WarningTriangleFilled";
import { cx } from "../../internal/cx";

import styles from "./AlertNotification.module.css";

export type AlertNotificationProps = {
  title: string;
  body?: string;
  linkLabel?: string;
  linkHref?: string;
  size?: "large" | "medium" | "small";
  status?: "information" | "warning" | "success" | "error" | "update";
  visualStyle?: "filled" | "light" | "outline";
  closable?: boolean;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const iconByStatus: Record<
  NonNullable<AlertNotificationProps["status"]>,
  { regular: IconComponent; filled: IconComponent }
> = {
  information: {
    regular: InformationCircle,
    filled: InformationCircleFilled,
  },
  warning: {
    regular: WarningTriangle,
    filled: WarningTriangleFilled,
  },
  success: {
    regular: CheckCircle,
    filled: CheckCircleFilled,
  },
  error: {
    regular: WarningCircle,
    filled: WarningCircleFilled,
  },
  update: {
    regular: Loop,
    filled: Loop,
  },
};

export const AlertNotification = React.forwardRef<
  HTMLDivElement,
  AlertNotificationProps
>(function AlertNotification(
  {
    title,
    body,
    linkLabel,
    linkHref,
    size = "large",
    status = "information",
    visualStyle = "light",
    closable = false,
    onClose,
    className,
    ...props
  },
  ref,
) {
  const [open, setOpen] = React.useState(true);

  if (!open) {
    return null;
  }

  const role = status === "error" ? "alert" : "status";
  const iconSize = size === "large" ? 20 : 16;
  const Icon =
    visualStyle === "filled"
      ? iconByStatus[status].filled
      : iconByStatus[status].regular;
  const shouldRenderBody = size === "large" && Boolean(body);
  const shouldRenderLink = size !== "small" && Boolean(linkLabel && linkHref);

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      role={role}
      aria-live={role === "status" ? "polite" : undefined}
      data-size={size}
      data-variant={visualStyle}
      data-tone={status}
      className={cx(styles.root, styles[size], styles[visualStyle], className)}
      {...props}
    >
      <div className={styles.leading}>
        <Icon size={iconSize} aria-hidden="true" className={styles.icon} />
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          {shouldRenderBody ? (
            <span className={styles.body}>{body}</span>
          ) : null}
          {shouldRenderLink ? (
            <a className={styles.link} href={linkHref}>
              {linkLabel}
            </a>
          ) : null}
        </div>
      </div>
      {closable ? (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Fechar notificação"
        >
          <Close size={16} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

AlertNotification.displayName = "AlertNotification";
