import type { IconProps } from "./Icon";
import { IconBase } from "./Icon";

export function More(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="5.5" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="14.5" cy="10" r="1" fill="currentColor" />
    </IconBase>
  );
}
