import * as React from "react";

import type { IconComponent } from "../../icons/Icon";
import { cx } from "../../internal/cx";
import { Button, type ButtonProps } from "../Button/Button";

import styles from "./IconButton.module.css";

export type IconButtonProps = Omit<
  ButtonProps,
  "leftIcon" | "rightIcon" | "children" | "aria-label"
> & {
  /** Ícone exibido no botão. */
  icon: IconComponent;
  /** Nome acessível obrigatório: o botão não tem texto visível. */
  "aria-label": string;
};

/** Botão quadrado só com ícone, com os mesmos tons, estilos e tamanhos do Button. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ icon, size = "medium", className, ...props }, ref) {
    return (
      <Button
        ref={ref}
        size={size}
        leftIcon={icon}
        data-icon-only=""
        className={cx(styles.iconButton, className)}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
