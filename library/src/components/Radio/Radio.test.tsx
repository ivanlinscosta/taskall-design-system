import * as React from "react";
import { createRef } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { Radio, RadioGroup } from "./Radio";

describe("Radio", () => {
  it("renders radios inside a fieldset with legend", () => {
    renderWithHive(
      <RadioGroup name="status" label="Status">
        <Radio value="draft" label="Rascunho" />
        <Radio value="published" label="Publicado" />
      </RadioGroup>,
    );

    expect(screen.getByRole("group", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Rascunho" })).toBeInTheDocument();
  });

  it("forwards the ref to the native input", () => {
    const ref = createRef<HTMLInputElement>();

    renderWithHive(<Radio value="draft" label="Rascunho" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("supports uncontrolled radio groups", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <RadioGroup name="priority" label="Prioridade" defaultValue="high">
        <Radio value="high" label="Alta" />
        <Radio value="low" label="Baixa" />
      </RadioGroup>,
    );

    const low = screen.getByRole("radio", { name: "Baixa" });

    await user.click(low);

    expect(low).toBeChecked();
    expect(low.closest("label")).toHaveAttribute("data-state", "checked");
  });

  it("supports controlled radio groups", async () => {
    const user = userEvent.setup();

    function ControlledGroup() {
      const [value, setValue] = React.useState("draft");

      return (
        <RadioGroup
          name="stage"
          label="Etapa"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="draft" label="Rascunho" />
          <Radio value="review" label="Revisão" />
        </RadioGroup>
      );
    }

    renderWithHive(<ControlledGroup />);

    const review = screen.getByRole("radio", { name: "Revisão" });

    await user.click(review);

    expect(review).toBeChecked();
  });

  it("supports standalone radios", async () => {
    const user = userEvent.setup();

    renderWithHive(<Radio name="single" value="only" label="Única" />);

    const radio = screen.getByRole("radio", { name: "Única" });

    await user.click(radio);

    expect(radio).toBeChecked();
  });

  it("supports keyboard focus and native radio selection", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <RadioGroup name="channel" label="Canal">
        <Radio value="email" label="E-mail" />
        <Radio value="sms" label="SMS" />
      </RadioGroup>,
    );

    await user.tab();

    const email = screen.getByRole("radio", { name: "E-mail" });
    expect(email).toHaveFocus();

    await user.keyboard("[Space]");

    expect(email).toBeChecked();
  });

  it("inherits name, disabled and size from the group", () => {
    renderWithHive(
      <RadioGroup name="permissions" label="Permissões" size="x-small" disabled>
        <Radio value="view" label="Visualizar" />
      </RadioGroup>,
    );

    const radio = screen.getByRole("radio", { name: "Visualizar" });

    expect(radio).toHaveAttribute("name", "permissions");
    expect(radio).toBeDisabled();
    expect(radio.closest("label")).toHaveAttribute("data-size", "x-small");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <RadioGroup name="frequency" label="Frequência" defaultValue="daily">
        <Radio value="daily" label="Diário" />
        <Radio value="weekly" label="Semanal" />
      </RadioGroup>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
