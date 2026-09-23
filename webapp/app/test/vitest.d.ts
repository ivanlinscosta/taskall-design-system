import "vitest";
import type { AxeMatchers } from "jest-axe";

declare module "vitest" {
  interface Assertion<T = any> extends AxeMatchers {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining extends AxeMatchers {
    toHaveNoViolations(): void;
  }
}
