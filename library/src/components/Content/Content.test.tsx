import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { BellNotification as Bell } from "../../icons/BellNotification";
import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Content } from "./Content";

describe("Content", () => {
  it("renders avatar content with fallback initials from the label", () => {
    renderWithTaskAll(
      <Content label="Maria Silva" description="Responsável" />,
    );

    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Responsável")).toBeInTheDocument();
    expect(screen.getByText("MS")).toBeInTheDocument();
  });

  it("renders icon content with the requested size and trailing badge", () => {
    renderWithTaskAll(
      <Content
        type="icon"
        size="x-small"
        label="Notificações"
        icon={Bell}
        badge={<span>3</span>}
      />,
    );

    const content = screen.getByText("Notificações").closest("div");
    expect(content).toHaveAttribute("data-type", "icon");
    expect(content).toHaveAttribute("data-size", "x-small");
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(content?.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("preserves a custom avatar node and title for context", () => {
    renderWithTaskAll(
      <Content
        label="Carlos Souza"
        avatar={<span aria-hidden="true">CS</span>}
        badge={<span>Ativo</span>}
      />,
    );

    expect(screen.getByTitle("Carlos Souza")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <Content
        type="icon"
        label="Agenda"
        description="Hoje às 14h"
        icon={Bell}
      />,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
