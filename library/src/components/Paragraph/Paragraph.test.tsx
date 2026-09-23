import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { Paragraph } from "./Paragraph";

describe("Paragraph", () => {
  it("renders a native paragraph element", () => {
    renderWithHive(<Paragraph>Descrição breve</Paragraph>);
    const paragraph = screen.getByText("Descrição breve");
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveAttribute("data-size", "m");
  });

  it("supports compact paragraph sizes", () => {
    renderWithHive(<Paragraph size="xs">Texto auxiliar</Paragraph>);
    expect(screen.getByText("Texto auxiliar")).toHaveAttribute(
      "data-size",
      "xs",
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <Paragraph size="l">Texto acessível</Paragraph>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
