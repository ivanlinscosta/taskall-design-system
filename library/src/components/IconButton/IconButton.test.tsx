import { createRef } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Cog } from "../../icons/Cog";
import { renderWithHive } from "../../test/renderWithHive";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders an accessible button with only an icon", () => {
    renderWithHive(<IconButton icon={Cog} aria-label="Configurações" />);

    const button = screen.getByRole("button", { name: "Configurações" });
    expect(button).toHaveAttribute("data-icon-only");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(button.textContent).toBe("");
  });

  it("forwards ref, variants and click handler", async () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    renderWithHive(
      <IconButton
        ref={ref}
        icon={Cog}
        aria-label="Ajustes"
        tone="error"
        visualStyle="outline"
        size="small"
        onClick={onClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Ajustes" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("data-tone", "error");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "small");

    await userEvent.setup().click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state with aria-busy", () => {
    renderWithHive(<IconButton icon={Cog} aria-label="Salvando" loading />);
    const button = screen.getByRole("button", { name: "Salvando" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <IconButton icon={Cog} aria-label="Configurações" />,
    );
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
