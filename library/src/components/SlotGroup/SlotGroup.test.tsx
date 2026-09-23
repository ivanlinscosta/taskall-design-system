import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { BellNotification as Bell } from "../../icons/BellNotification";
import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Slot } from "../Slot/Slot";
import { SlotGroup } from "./SlotGroup";

describe("SlotGroup", () => {
  it("renders a named group with horizontal orientation by default", () => {
    renderWithTaskAll(
      <SlotGroup>
        <Slot>
          <Bell size={16} aria-hidden="true" />
        </Slot>
      </SlotGroup>,
    );

    const group = screen.getByRole("group", { name: "Grupo de slots" });
    expect(group).toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports custom ariaLabel and vertical layout", () => {
    renderWithTaskAll(
      <SlotGroup ariaLabel="Ações rápidas" orientation="vertical">
        <Slot>1</Slot>
        <Slot>2</Slot>
      </SlotGroup>,
    );

    expect(
      screen.getByRole("group", { name: "Ações rápidas" }),
    ).toHaveAttribute("data-orientation", "vertical");
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(
      <SlotGroup ariaLabel="Atalhos">
        <Slot>H</Slot>
        <Slot>B</Slot>
      </SlotGroup>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
