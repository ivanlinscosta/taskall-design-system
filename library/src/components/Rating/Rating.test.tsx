import * as React from "react";
import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { TaskAllProvider } from "../Provider/TaskAllProvider";
import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Rating } from "./Rating";

describe("Rating", () => {
  it("renders an editable radiogroup with an accessible name", () => {
    renderWithTaskAll(<Rating label="Avaliação do curso" value={3} />);

    const group = screen.getByRole("radiogroup", {
      name: "Avaliação do curso",
    });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "3 estrelas" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("forwards the ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();

    renderWithTaskAll(<Rating ref={ref} label="Nota" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute("role", "radiogroup");
  });

  it("supports uncontrolled selection", () => {
    const onChange = vi.fn();

    renderWithTaskAll(<Rating label="Nota" onChange={onChange} />);

    const fourthItem = screen.getByRole("radio", { name: "4 estrelas" });
    fireEvent.click(fourthItem);

    expect(fourthItem).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("supports controlled selection", () => {
    const onChange = vi.fn();

    const ControlledExample = () => {
      const [value, setValue] = React.useState(2);

      return (
        <Rating
          label="Nota"
          value={value}
          onChange={(nextValue) => {
            onChange(nextValue);
            setValue(nextValue);
          }}
        />
      );
    };

    renderWithTaskAll(<ControlledExample />);

    const fifthItem = screen.getByRole("radio", { name: "5 estrelas" });
    fireEvent.click(fifthItem);

    expect(onChange).toHaveBeenCalledWith(5);
    expect(fifthItem).toHaveAttribute("aria-checked", "true");
  });

  it("supports keyboard navigation and keeps roving focus on radios", () => {
    renderWithTaskAll(<Rating label="Nota" value={2} />);

    const secondItem = screen.getByRole("radio", { name: "2 estrelas" });
    const thirdItem = screen.getByRole("radio", { name: "3 estrelas" });
    const fifthItem = screen.getByRole("radio", { name: "5 estrelas" });

    secondItem.focus();
    fireEvent.keyDown(secondItem, { key: "ArrowRight" });
    expect(thirdItem).toHaveFocus();
    expect(thirdItem).toHaveAttribute("tabindex", "0");
    expect(secondItem).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(thirdItem, { key: "End" });
    expect(fifthItem).toHaveFocus();

    fireEvent.keyDown(fifthItem, { key: "Home" });
    expect(screen.getByRole("radio", { name: "1 estrelas" })).toHaveFocus();
  });

  it("renders read-only mode as an image and does not call onChange", () => {
    const onChange = vi.fn();

    renderWithTaskAll(
      <Rating label="Avaliação" value={2.5} readOnly onChange={onChange} />,
    );

    const image = screen.getByRole("img", { name: "Avaliação: 2.5 de 5" });
    expect(image).toBeInTheDocument();
    expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders inside light and dark providers", () => {
    const { rerender } = render(
      <TaskAllProvider colorMode="light">
        <Rating label="Tema" value={4} />
      </TaskAllProvider>,
    );

    expect(
      screen.getByRole("radiogroup", { name: "Tema" }),
    ).toBeInTheDocument();

    rerender(
      <TaskAllProvider colorMode="dark">
        <Rating label="Tema" value={4} />
      </TaskAllProvider>,
    );

    expect(
      screen.getByRole("radiogroup", { name: "Tema" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithTaskAll(<Rating label="Nota" value={3} />);

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toHaveLength(0);
  });
});
