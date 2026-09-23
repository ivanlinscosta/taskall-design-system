import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function ArrowRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M4.5 10H15.5M11.5 6L15.5 10L11.5 14"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
