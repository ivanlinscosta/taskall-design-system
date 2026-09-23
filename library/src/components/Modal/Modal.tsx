import * as React from "react";
import { useId } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { Delete as Close } from "../../icons/Delete";
import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";

import styles from "./Modal.module.css";

// Ignora <html>: apps podem espelhar o tema no documento (ex.: evitar "flash"
// de tema em páginas pré-renderizadas), mas o portal deve ir para um provider.
const HIVE_PROVIDER_SELECTOR =
  ":not(html)[data-color-mode][data-brand][data-density][data-shape]";
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

type ModalHeaderContextValue = {
  closeLabel: string;
  showCloseButton: boolean;
};

const ModalHeaderContext = React.createContext<ModalHeaderContextValue | null>(
  null,
);

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactElement;
  title: string;
  description?: string;
  children?: React.ReactNode;
  closeLabel?: string;
  showCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  /** Ícone em destaque no cabeçalho padrão (decorativo). */
  icon?: IconComponent;
  /** Tom do ícone do cabeçalho. */
  iconTone?: ModalIconTone;
};

export type ModalIconTone =
  "brand" | "information" | "success" | "warning" | "error";

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "slot" | "icon";
  icon?: IconComponent;
  /** Tom do ícone quando `type="icon"`. */
  iconTone?: ModalIconTone;
  title: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeLabel?: string;
  onClose?: () => void;
};

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "cta" | "information" | "checkbox" | "link" | "cta-full";
  children?: React.ReactNode;
};

function joinIds(...ids: Array<string | undefined>) {
  const value = ids.filter((id): id is string => Boolean(id)).join(" ");
  return value || undefined;
}

function getPortalContainer() {
  if (typeof document === "undefined") {
    return undefined;
  }

  if (document.activeElement instanceof HTMLElement) {
    const closestProvider = document.activeElement.closest<HTMLElement>(
      HIVE_PROVIDER_SELECTOR,
    );

    if (closestProvider) {
      return closestProvider;
    }
  }

  return (
    document.querySelector<HTMLElement>(HIVE_PROVIDER_SELECTOR) ?? undefined
  );
}

type ModalCloseButtonProps = {
  closeLabel: string;
  withinDialog: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function ModalCloseButton({
  closeLabel,
  withinDialog,
  onClick,
}: ModalCloseButtonProps) {
  const button = (
    <button
      type="button"
      className={styles.closeButton}
      onClick={onClick}
      aria-label={closeLabel}
    >
      <Close size={16} aria-hidden="true" />
    </button>
  );

  if (withinDialog) {
    return <Dialog.Close asChild>{button}</Dialog.Close>;
  }

  return button;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  function Modal(
    {
      open,
      defaultOpen,
      onOpenChange,
      trigger,
      title,
      description,
      children,
      closeLabel = "Fechar",
      showCloseButton = true,
      header,
      footer,
      width = 343,
      icon: Icon,
      iconTone = "brand",
      className,
      style,
      ...props
    },
    ref,
  ) {
    const isControlled = open !== undefined;
    const titleId = useId();
    const descriptionId = useId();
    const ariaLabelledBy = joinIds(props["aria-labelledby"], titleId);
    const ariaDescribedBy = description
      ? joinIds(props["aria-describedby"], descriptionId)
      : props["aria-describedby"];
    const contentStyle: React.CSSProperties = {
      ...style,
      width,
    };
    const [portalContainer, setPortalContainer] =
      React.useState<HTMLElement | null>(null);
    const headerContextValue = React.useMemo(
      () => ({
        closeLabel,
        showCloseButton,
      }),
      [closeLabel, showCloseButton],
    );

    useIsomorphicLayoutEffect(() => {
      const nextContainer = getPortalContainer() ?? null;

      setPortalContainer((currentContainer) =>
        currentContainer === nextContainer ? currentContainer : nextContainer,
      );
    });

    return (
      <Dialog.Root
        open={isControlled ? open : undefined}
        defaultOpen={isControlled ? undefined : defaultOpen}
        onOpenChange={onOpenChange}
      >
        {!isControlled && trigger ? (
          <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        ) : null}

        <Dialog.Portal container={portalContainer ?? undefined}>
          <Dialog.Overlay className={styles.overlay} />

          <Dialog.Content
            ref={ref}
            {...props}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            data-variant="none"
            className={cx(styles.content, className)}
            style={contentStyle}
          >
            <ModalHeaderContext.Provider value={headerContextValue}>
              {header ? (
                <>
                  <Dialog.Title id={titleId} className={styles.visuallyHidden}>
                    {title}
                  </Dialog.Title>

                  {description ? (
                    <Dialog.Description
                      id={descriptionId}
                      className={styles.visuallyHidden}
                    >
                      {description}
                    </Dialog.Description>
                  ) : null}

                  {header}
                </>
              ) : (
                <div className={styles.header}>
                  {Icon ? (
                    <div
                      className={styles.headerIconBox}
                      data-tone={iconTone}
                      aria-hidden="true"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                  ) : null}
                  <div className={styles.headerContent}>
                    <Dialog.Title id={titleId} className={styles.title}>
                      {title}
                    </Dialog.Title>

                    {description ? (
                      <Dialog.Description
                        id={descriptionId}
                        className={styles.description}
                      >
                        {description}
                      </Dialog.Description>
                    ) : null}
                  </div>

                  {showCloseButton ? (
                    <ModalCloseButton closeLabel={closeLabel} withinDialog />
                  ) : null}
                </div>
              )}

              {children !== null && children !== undefined ? (
                <div className={styles.body}>{children}</div>
              ) : null}

              {footer}
            </ModalHeaderContext.Provider>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Modal.displayName = "Modal";

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(
    {
      type = "slot",
      icon: Icon,
      iconTone = "brand",
      title,
      subtitle,
      showCloseButton,
      closeLabel,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const context = React.useContext(ModalHeaderContext);
    const resolvedCloseLabel = closeLabel ?? context?.closeLabel ?? "Fechar";
    const resolvedShowCloseButton =
      showCloseButton ?? context?.showCloseButton ?? true;
    const withinDialog = Boolean(context);

    return (
      <div
        ref={ref}
        data-type={type}
        className={cx(styles.customHeader, className)}
        {...props}
      >
        <div className={styles.customHeaderContent}>
          {type === "slot" && children ? (
            <div className={styles.headerSlot}>{children}</div>
          ) : null}

          {type === "icon" && Icon ? (
            <div
              className={styles.headerIconBox}
              data-tone={iconTone}
              aria-hidden="true"
            >
              <Icon size={20} aria-hidden="true" />
            </div>
          ) : null}

          <div className={styles.headerTextBlock}>
            <span className={styles.title}>{title}</span>
            {subtitle ? (
              <span className={styles.description}>{subtitle}</span>
            ) : null}
          </div>
        </div>

        {resolvedShowCloseButton ? (
          <ModalCloseButton
            closeLabel={resolvedCloseLabel}
            withinDialog={withinDialog}
            onClick={onClose}
          />
        ) : null}
      </div>
    );
  },
);

ModalHeader.displayName = "ModalHeader";

const footerVariantClassNames: Record<
  NonNullable<ModalFooterProps["variant"]>,
  string
> = {
  cta: styles.footerCta ?? "",
  information: styles.footerInformation ?? "",
  checkbox: styles.footerCheckbox ?? "",
  link: styles.footerLink ?? "",
  "cta-full": styles.footerCtaFull ?? "",
};

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter(
    { variant = "cta", className, children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-variant={variant}
        className={cx(
          styles.footer,
          footerVariantClassNames[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = "ModalFooter";
