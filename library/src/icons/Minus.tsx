import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function Minus(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M4.5 10H15.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
