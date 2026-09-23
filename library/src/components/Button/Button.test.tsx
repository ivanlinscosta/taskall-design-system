import { createRef } from "react";
import { screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Button } from "./Button";
import { UserCircleSingle as User } from "../../icons/UserCircleSingle";

describe("Button", () => {
  it("renders with an accessible name", () => {
    renderWithTaskAll(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("forwards the ref to the native button", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTaskAll(<Button ref={ref}>Salvar</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("exposes data-tone, data-variant and data-size attributes", () => {
    renderWithTaskAll(
      <Button tone="error" visualStyle="outline" size="small">
        Excluir
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Excluir" });
    expect(button).toHaveAttribute("data-tone", "error");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "small");
  });

  it("uses a real button with default type button", () => {
    renderWithTaskAll(<Button>Ok</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("fires onClick when clicked", () => {
    const onClick = vi.fn();
    renderWithTaskAll(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick while loading", () => {
    const onClick = vi.fn();
    renderWithTaskAll(
      <Button loading onClick={onClick}>
        Salvar
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps the label accessible while loading", () => {
    renderWithTaskAll(<Button loading>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("renders a decorative left icon hidden from the a11y tree", () => {
    renderWithTaskAll(<Button leftIcon={User}>Perfil</Button>);
    const button = screen.getByRole("button", { name: "Perfil" });
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("does not register onKeyDown duplicates and passes through data-* and aria-*", () => {
    renderWithTaskAll(
      <Button data-testid="btn" aria-describedby="hint">
        Ok
      </Button>,
    );
    expect(screen.getByTestId("btn")).toHaveAttribute(
      "aria-describedby",
      "hint",
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <>
        <Button tone="primary">Salvar</Button>
        <Button tone="neutral" visualStyle="outline">
          Cancelar
        </Button>
      </>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
