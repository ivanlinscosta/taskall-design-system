import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function ArrowUp(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M10 15.5V4.5M6 8.5L10 4.5L14 8.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
