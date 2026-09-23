import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { LabelText } from "./LabelText";

describe("LabelText", () => {
  it("renders a span label with default medium size", () => {
    renderWithHive(<LabelText>Status</LabelText>);
    const label = screen.getByText("Status");
    expect(label.tagName).toBe("SPAN");
    expect(label).toHaveAttribute("data-size", "m");
  });

  it("forwards the ref to the native span", () => {
    const ref = createRef<HTMLSpanElement>();
    renderWithHive(<LabelText ref={ref}>Categoria</LabelText>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <LabelText size="xs">Opcional</LabelText>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
