import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function ArrowDown(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M10 4.5V15.5M6 11.5L10 15.5L14 11.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
