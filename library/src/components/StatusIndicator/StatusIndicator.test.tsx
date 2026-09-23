import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { StatusIndicator } from "./StatusIndicator";

describe("StatusIndicator", () => {
  it("renders as decorative content", () => {
    renderWithTaskAll(
      <StatusIndicator status="online" data-testid="indicator" />,
    );

    expect(screen.getByTestId("indicator")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("forwards the ref to the root span", () => {
    const ref = createRef<HTMLSpanElement>();

    renderWithTaskAll(<StatusIndicator ref={ref} status="busy" />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("exposes size and state data attributes", () => {
    renderWithTaskAll(
      <StatusIndicator status="verified" size="xl" data-testid="indicator" />,
    );

    expect(screen.getByTestId("indicator")).toHaveAttribute("data-size", "xl");
    expect(screen.getByTestId("indicator")).toHaveAttribute(
      "data-state",
      "verified",
    );
  });

  it("renders a decorative icon for icon based states", () => {
    renderWithTaskAll(
      <StatusIndicator status="favorite" data-testid="indicator" />,
    );

    expect(
      screen.getByTestId("indicator").querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("supports dot-only states without exposing a role", () => {
    renderWithTaskAll(
      <StatusIndicator status="offline" data-testid="indicator" />,
    );

    expect(screen.getByTestId("indicator")).not.toHaveAttribute("role");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <>
        <StatusIndicator status="online" />
        <StatusIndicator status="verified" />
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
