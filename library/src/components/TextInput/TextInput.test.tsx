import * as React from "react";
import { createRef } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { MailSendEnvelope as Mail } from "../../icons/MailSendEnvelope";
import { MagnifyingGlass as Search } from "../../icons/MagnifyingGlass";
import { renderWithHive } from "../../test/renderWithHive";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders a labelled textbox", () => {
    renderWithHive(<TextInput label="E-mail" placeholder="nome@empresa.com" />);

    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInTheDocument();
  });

  it("forwards the ref to the native input", () => {
    const ref = createRef<HTMLInputElement>();

    renderWithHive(<TextInput label="Busca" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("supports uncontrolled typing", async () => {
    const user = userEvent.setup();

    renderWithHive(<TextInput label="Nome" />);

    const input = screen.getByRole("textbox", { name: "Nome" });
    await user.type(input, "Hive");

    expect(input).toHaveValue("Hive");
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();

    function ControlledInput() {
      const [value, setValue] = React.useState("");

      return (
        <TextInput
          label="Cidade"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      );
    }

    renderWithHive(<ControlledInput />);

    const input = screen.getByRole("textbox", { name: "Cidade" });
    await user.type(input, "Recife");

    expect(input).toHaveValue("Recife");
  });

  it("exposes aria-invalid and error description", () => {
    renderWithHive(
      <TextInput label="E-mail" error="Informe um e-mail válido" />,
    );

    const input = screen.getByRole("textbox", { name: "E-mail" });
    const error = screen.getByRole("alert");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", error.id);
  });

  it("keeps decorative icons out of the accessibility tree", () => {
    renderWithHive(
      <TextInput label="Busca" leftIcon={Search} rightIcon={Mail} />,
    );

    const input = screen.getByRole("textbox", { name: "Busca" });
    const icons = input.parentElement?.querySelectorAll("svg") ?? [];

    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("supports keyboard focus", async () => {
    const user = userEvent.setup();

    renderWithHive(<TextInput label="Senha" />);

    await user.tab();

    expect(screen.getByRole("textbox", { name: "Senha" })).toHaveFocus();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <>
        <TextInput label="Nome" sublabel="Como deve aparecer no crachá" />
        <TextInput label="E-mail" error="Informe um e-mail válido" />
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
