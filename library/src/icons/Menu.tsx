import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function Menu(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M4.5 6H15.5M4.5 10H15.5M4.5 14H15.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
