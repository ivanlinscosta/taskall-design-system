import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  title?: string;
};

export type IconComponent = React.ComponentType<IconProps>;

export const IconBase = React.forwardRef<SVGSVGElement, IconProps>(function IconBase(
  { size = 20, title, children, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
});

IconBase.displayName = "HiveIcon";