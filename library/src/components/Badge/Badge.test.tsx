import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Add } from "../../icons/Add";
import { renderWithHive } from "../../test/renderWithHive";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its default content", () => {
    renderWithHive(<Badge />);

    expect(screen.getByText("Badge")).toBeInTheDocument();
  });

  it("forwards the ref to the span", () => {
    const ref = createRef<HTMLSpanElement>();

    renderWithHive(<Badge ref={ref}>Novo</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("exposes data attributes for type, size and variant", () => {
    renderWithHive(
      <Badge type="icon" size="x-small" visualStyle="outline" icon={Add}>
        Ação
      </Badge>,
    );

    const badge = screen.getByText("Ação").closest("[data-type]");
    expect(badge).toHaveAttribute("data-type", "icon");
    expect(badge).toHaveAttribute("data-size", "x-small");
    expect(badge).toHaveAttribute("data-variant", "outline");
  });

  it("renders decorative icons outside the accessibility tree", () => {
    renderWithHive(
      <Badge type="icon" icon={Add}>
        Adicionar
      </Badge>,
    );

    expect(
      screen
        .getByText("Adicionar")
        .closest("[data-type]")
        ?.querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("supports number badges with accessible text", () => {
    renderWithHive(<Badge type="number">12</Badge>);

    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("passes through aria-* and data-* props", () => {
    renderWithHive(
      <Badge data-testid="badge" aria-label="Itens pendentes">
        8
      </Badge>,
    );

    expect(screen.getByTestId("badge")).toHaveAttribute(
      "aria-label",
      "Itens pendentes",
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <>
        <Badge>Novo</Badge>
        <Badge type="icon" icon={Add} visualStyle="light">
          Criar
        </Badge>
        <Badge type="number" visualStyle="filled">
          3
        </Badge>
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
