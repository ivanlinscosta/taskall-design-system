import * as React from "react";
import { createRef } from "react";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { MagnifyingGlass as Search } from "../../icons/MagnifyingGlass";
import { renderWithHive } from "../../test/renderWithHive";
import { Dropdown } from "./Dropdown";

const options = [
  { value: "draft", label: "Rascunho" },
  { value: "review", label: "Em revisão", meta: "Novo" },
  { value: "published", label: "Publicado", adornment: "check" as const },
];

describe("Dropdown", () => {
  it("renders a labelled combobox trigger", () => {
    renderWithHive(
      <Dropdown label="Status" options={options} placeholder="Selecione" />,
    );

    expect(
      screen.getByRole("combobox", { name: "Status" }),
    ).toBeInTheDocument();
  });

  it("forwards the ref to the trigger button", () => {
    const ref = createRef<HTMLButtonElement>();

    renderWithHive(<Dropdown label="Status" options={options} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports uncontrolled usage", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <Dropdown label="Status" options={options} defaultValue="draft" />,
    );

    const trigger = screen.getByRole("combobox", { name: "Status" });

    await user.click(trigger);
    await user.click(screen.getByRole("option", { name: "Em revisão" }));

    expect(trigger).toHaveTextContent("Em revisão");
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();

    function ControlledDropdown() {
      const [value, setValue] = React.useState("draft");

      return (
        <Dropdown
          label="Status"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      );
    }

    renderWithHive(<ControlledDropdown />);

    const trigger = screen.getByRole("combobox", { name: "Status" });

    await user.click(trigger);
    await user.click(screen.getByRole("option", { name: "Publicado" }));

    expect(trigger).toHaveTextContent("Publicado");
  });

  it("supports keyboard focus and selection", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <Dropdown label="Status" options={options} placeholder="Selecione" />,
    );

    await user.tab();

    const trigger = screen.getByRole("combobox", { name: "Status" });
    expect(trigger).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    await user.keyboard("[Enter]");

    expect(trigger).toHaveTextContent("Rascunho");
  });

  it("exposes aria-invalid and error description", () => {
    renderWithHive(
      <Dropdown label="Status" options={options} error="Selecione um status" />,
    );

    const trigger = screen.getByRole("combobox", { name: "Status" });
    const error = screen.getByRole("alert");

    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-describedby", error.id);
  });

  it("renders option adornments and meta content", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <Dropdown
        label="Pessoa"
        leftIcon={Search}
        options={[
          { value: "owner", label: "Responsável", adornment: "checkbox" },
          { value: "student", label: "Aluno", meta: "12 vagas" },
          {
            value: "guardian",
            label: "Responsável legal",
            adornment: "badge",
            meta: "Novo",
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Pessoa" }));

    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("12 vagas")).toBeInTheDocument();
    expect(within(listbox).getByText("Novo")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <Dropdown label="Status" options={options} placeholder="Selecione" />,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
