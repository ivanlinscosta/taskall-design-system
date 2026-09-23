import * as React from "react";

import { cx } from "../../internal/cx";

import styles from "./TaskAllProvider.module.css";

export type TaskAllProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  colorMode?: "light" | "dark";
  brand?: "coral" | "gestao" | "estudantes" | "responsaveis";
  density?: "compact" | "default" | "expanded";
  shape?: "sharp" | "default" | "rounded";
};

export const TaskAllProvider = React.forwardRef<
  HTMLDivElement,
  TaskAllProviderProps
>(function TaskAllProvider(
  {
    colorMode = "light",
    brand = "coral",
    density = "default",
    shape = "default",
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      data-color-mode={colorMode}
      data-brand={brand}
      data-density={density}
      data-shape={shape}
      className={cx("taskall-base", styles.provider, className)}
      {...props}
    >
      {children}
    </div>
  );
});
