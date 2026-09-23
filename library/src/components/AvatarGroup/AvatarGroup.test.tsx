import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { Avatar } from "../Avatar/Avatar";
import { AvatarGroup } from "./AvatarGroup";

describe("AvatarGroup", () => {
  it("renders a group with a default accessible name", () => {
    renderWithHive(
      <AvatarGroup
        avatars={[{ fallback: "IC" }, { fallback: "AM" }, { fallback: "NO" }]}
      />,
    );

    expect(screen.getByRole("group", { name: "Avatares" })).toBeInTheDocument();
  });

  it("forwards the ref to the root div", () => {
    const ref = createRef<HTMLDivElement>();

    renderWithHive(<AvatarGroup ref={ref} avatars={[{ fallback: "IC" }]} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("uses a custom ariaLabel when provided", () => {
    renderWithHive(
      <AvatarGroup
        avatars={[{ fallback: "IC" }]}
        ariaLabel="Equipe pedagógica"
      />,
    );

    expect(
      screen.getByRole("group", { name: "Equipe pedagógica" }),
    ).toBeInTheDocument();
  });

  it("respects max and renders a surplus avatar", () => {
    renderWithHive(
      <AvatarGroup
        max={2}
        avatars={[
          { fallback: "IC" },
          { fallback: "AM" },
          { fallback: "NO" },
          { fallback: "BR" },
        ]}
      />,
    );

    expect(
      screen.getByRole("img", { name: "+2 avatares adicionais" }),
    ).toBeInTheDocument();
  });

  it("accepts Avatar elements and applies the group size fallback", () => {
    renderWithHive(
      <AvatarGroup
        avatars={[
          <Avatar key="1" fallback="IC" />,
          <Avatar key="2" fallback="AM" />,
        ]}
        size="lg"
      />,
    );

    const group = screen.getByRole("group");
    const avatar = screen.getByText("IC").closest("[data-size]");
    expect(group).toHaveAttribute("data-size", "lg");
    expect(avatar).toHaveAttribute("data-size", "lg");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <AvatarGroup
        avatars={[{ fallback: "IC" }, { fallback: "AM" }, { fallback: "NO" }]}
        max={2}
      />,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
