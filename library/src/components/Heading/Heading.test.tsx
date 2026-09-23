import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders a native heading with semantic and visual levels", () => {
    renderWithTaskAll(
      <Heading level={3} as={1}>
        Título da seção
      </Heading>,
    );

    const heading = screen.getByRole("heading", {
      name: "Título da seção",
      level: 3,
    });
    expect(heading.tagName).toBe("H3");
    expect(heading).toHaveAttribute("data-as", "1");
    expect(heading).toHaveAttribute("data-level", "3");
  });

  it("defaults the visual appearance to the semantic level", () => {
    renderWithTaskAll(<Heading level={4}>Subtítulo</Heading>);
    expect(
      screen.getByRole("heading", { name: "Subtítulo", level: 4 }),
    ).toHaveAttribute("data-as", "4");
  });

  it("forwards the ref to the native heading element", () => {
    const ref = createRef<HTMLHeadingElement>();
    renderWithTaskAll(<Heading ref={ref}>Título</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <Heading level={2} as={5}>
        Heading acessível
      </Heading>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
