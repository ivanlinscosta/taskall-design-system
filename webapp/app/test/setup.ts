import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import jestAxe from "jest-axe";
import { afterEach, expect, vi } from "vitest";

expect.extend(jestAxe.toHaveNoViolations);

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", MockResizeObserver);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props?: PointerEventInit) {
    super(type, props);
    this.button = props?.button ?? 0;
    this.ctrlKey = props?.ctrlKey ?? false;
    this.pointerType = props?.pointerType ?? "mouse";
  }
}

if (typeof window.PointerEvent === "undefined") {
  window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
}

Element.prototype.hasPointerCapture ??= function () {
  return false;
};
Element.prototype.setPointerCapture ??= function () {};
Element.prototype.releasePointerCapture ??= function () {};
Element.prototype.scrollIntoView ??= function () {};

afterEach(() => {
  cleanup();
});
