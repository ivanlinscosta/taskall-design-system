import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Paragraph } from "./Paragraph";

describe("Paragraph", () => {
  it("renders a native paragraph element", () => {
    renderWithTaskAll(<Paragraph>Descrição breve</Paragraph>);
    const paragraph = screen.getByText("Descrição breve");
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveAttribute("data-size", "m");
  });

  it("supports compact paragraph sizes", () => {
    renderWithTaskAll(<Paragraph size="xs">Texto auxiliar</Paragraph>);
    expect(screen.getByText("Texto auxiliar")).toHaveAttribute(
      "data-size",
      "xs",
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <Paragraph size="l">Texto acessível</Paragraph>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
