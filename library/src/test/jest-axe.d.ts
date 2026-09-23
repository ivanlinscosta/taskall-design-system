declare module "jest-axe" {
  import type { AxeResults, RunOptions } from "axe-core";

  export interface AxeMatchers<R = unknown> {
    toHaveNoViolations(): R;
  }

  type MatcherFn = (
    received: unknown,
    ...expected: unknown[]
  ) => { pass: boolean; message: () => string };

  export function axe(html: Element | string, options?: RunOptions): Promise<AxeResults>;
  export function configureAxe(options?: RunOptions): typeof axe;

  const jestAxe: {
    axe: typeof axe;
    configureAxe: typeof configureAxe;
    toHaveNoViolations: { toHaveNoViolations: MatcherFn };
  };
  export default jestAxe;
}