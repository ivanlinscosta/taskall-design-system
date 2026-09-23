import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { BellNotification as Bell } from "../../icons/BellNotification";
import { renderWithHive } from "../../test/renderWithHive";
import { Slot } from "./Slot";

describe("Slot", () => {
  it("renders a span container with default md size", () => {
    renderWithHive(
      <Slot data-testid="slot">
        <Bell size={16} aria-hidden="true" />
      </Slot>,
    );
    const slot = screen.getByTestId("slot");
    expect(slot).toHaveAttribute("data-size", "md");
  });

  it("forwards the ref to the native span", () => {
    const ref = createRef<HTMLSpanElement>();
    renderWithHive(<Slot ref={ref}>A</Slot>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("supports xs size for dense layouts", () => {
    renderWithHive(<Slot size="xs">1</Slot>);
    expect(screen.getByText("1")).toHaveAttribute("data-size", "xs");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(<Slot aria-label="Atalho">+</Slot>);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
