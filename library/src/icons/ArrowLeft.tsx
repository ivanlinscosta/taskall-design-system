import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function ArrowLeft(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        d="M15.5 10H4.5M8.5 6L4.5 10L8.5 14"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
