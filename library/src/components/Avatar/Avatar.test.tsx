import { createRef } from "react";
import { fireEvent, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders the fallback as an accessible image when src is absent", () => {
    renderWithTaskAll(<Avatar fallback="IC" />);

    expect(screen.getByRole("img", { name: "IC" })).toBeInTheDocument();
  });

  it("renders the image alt text when src is provided", () => {
    renderWithTaskAll(
      <Avatar src="avatar.png" alt="Ivana Costa" fallback="IC" />,
    );

    expect(screen.getByAltText("Ivana Costa")).toBeInTheDocument();
  });

  it("falls back to initials when the image errors", () => {
    renderWithTaskAll(
      <Avatar src="avatar.png" alt="Ivana Costa" fallback="IC" />,
    );

    fireEvent.error(screen.getByAltText("Ivana Costa"));

    expect(screen.getByRole("img", { name: "IC" })).toBeInTheDocument();
  });

  it("forwards the ref to the root span", () => {
    const ref = createRef<HTMLSpanElement>();

    renderWithTaskAll(<Avatar ref={ref} fallback="RF" />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("exposes size and state data attributes when status is present", () => {
    renderWithTaskAll(<Avatar fallback="AB" size="xl" status="verified" />);

    const avatar = screen.getByText("AB").closest("[data-size]");
    expect(avatar).toHaveAttribute("data-size", "xl");
    expect(avatar).toHaveAttribute("data-state", "verified");
  });

  it("renders decorative status content outside the accessibility tree", () => {
    renderWithTaskAll(<Avatar fallback="AB" status="favorite" />);

    expect(
      screen.getByText("AB").closest("[data-size]")?.querySelector("svg"),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <>
        <Avatar fallback="IC" />
        <Avatar
          src="avatar.png"
          alt="Ivana Costa"
          fallback="IC"
          status="online"
        />
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
