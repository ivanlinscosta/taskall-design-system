import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Filter } from "../../icons/Filter";
import { renderWithHive } from "../../test/renderWithHive";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a line separator by default", () => {
    renderWithHive(<Divider data-testid="divider" />);
    const divider = screen.getByTestId("divider");
    expect(divider.tagName).toBe("HR");
    expect(divider).toHaveAttribute("data-type", "line");
  });

  it("renders a text separator with an accessible label", () => {
    renderWithHive(<Divider type="text" text="ou" />);
    expect(screen.getByRole("separator", { name: "ou" })).toBeInTheDocument();
    expect(screen.getByText("ou")).toBeInTheDocument();
  });

  it("renders an icon separator with fallback aria label", () => {
    renderWithHive(<Divider type="icon" icon={Filter} />);
    expect(
      screen.getByRole("separator", { name: "Divisor" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <Divider type="text" text="continuar" />,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
