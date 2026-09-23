import * as React from "react";
import { createRef } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a native checkbox with an accessible label", () => {
    renderWithHive(<Checkbox label="Aceito os termos" />);

    expect(
      screen.getByRole("checkbox", { name: "Aceito os termos" }),
    ).toBeInTheDocument();
  });

  it("forwards the ref to the native input", () => {
    const ref = createRef<HTMLInputElement>();

    renderWithHive(<Checkbox ref={ref} label="Newsletter" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("supports uncontrolled usage", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <Checkbox label="Receber novidades" defaultChecked={false} />,
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Receber novidades",
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(checkbox.closest("label")).toHaveAttribute("data-state", "checked");
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();

    function ControlledCheckbox() {
      const [checked, setChecked] = React.useState(false);

      return (
        <Checkbox
          label="Selecionar"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
          }}
        />
      );
    }

    renderWithHive(<ControlledCheckbox />);

    const checkbox = screen.getByRole("checkbox", { name: "Selecionar" });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(checkbox.closest("label")).toHaveAttribute("data-state", "checked");
  });

  it("syncs the indeterminate DOM property and aria-checked", () => {
    renderWithHive(<Checkbox label="Parcial" indeterminate />);

    const checkbox = screen.getByRole("checkbox", { name: "Parcial" });

    expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox.closest("label")).toHaveAttribute(
      "data-state",
      "indeterminate",
    );
  });

  it("supports keyboard focus and toggling with space", async () => {
    const user = userEvent.setup();

    renderWithHive(<Checkbox label="Teclado" />);

    await user.tab();

    const checkbox = screen.getByRole("checkbox", { name: "Teclado" });
    expect(checkbox).toHaveFocus();

    await user.keyboard("[Space]");

    expect(checkbox).toBeChecked();
  });

  it("passes through data and aria attributes", () => {
    renderWithHive(
      <Checkbox
        label="Extra"
        data-testid="extra-checkbox"
        aria-describedby="hint"
      />,
    );

    expect(screen.getByTestId("extra-checkbox")).toHaveAttribute(
      "aria-describedby",
      "hint",
    );
  });

  it("fires the consumer onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithHive(<Checkbox label="Callback" onChange={onChange} />);

    await user.click(screen.getByRole("checkbox", { name: "Callback" }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <>
        <Checkbox label="Aceito os termos" defaultChecked />
        <Checkbox label="Parcial" indeterminate />
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
