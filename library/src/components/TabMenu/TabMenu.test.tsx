import * as React from "react";
import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { HiveProvider } from "../Provider/HiveProvider";
import { renderWithHive } from "../../test/renderWithHive";
import { Star } from "../../icons/Star";
import { TabMenu } from "./TabMenu";

const items = [
  { key: "overview", label: "Visão geral" },
  { key: "details", label: "Detalhes" },
  { key: "history", label: "Histórico" },
];

describe("TabMenu", () => {
  it("renders a tablist with accessible tabs and panels", () => {
    renderWithHive(<TabMenu items={items} ariaLabel="Seções" />);

    expect(screen.getByRole("tablist", { name: "Seções" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Visão geral" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("tabpanel", { name: "Visão geral" }),
    ).toBeInTheDocument();
  });

  it("renders item content in the panel when provided", () => {
    renderWithHive(
      <TabMenu
        ariaLabel="Ficha"
        items={[
          { key: "notas", label: "Notas", content: <p>Média geral: 8,4</p> },
          { key: "faltas", label: "Faltas" },
        ]}
      />,
    );

    const panel = screen.getByRole("tabpanel", { name: "Notas" });
    expect(panel).toHaveTextContent("Média geral: 8,4");
    expect(panel).not.toHaveTextContent(/^Notas$/);
  });

  it("renders a decorative icon before the tab label", () => {
    renderWithHive(
      <TabMenu
        ariaLabel="Ficha"
        items={[{ key: "notas", label: "Notas", icon: Star }]}
      />,
    );

    const tab = screen.getByRole("tab", { name: "Notas" });
    expect(tab.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards the ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();

    renderWithHive(<TabMenu ref={ref} items={items} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports uncontrolled selection", () => {
    const onValueChange = vi.fn();

    renderWithHive(<TabMenu items={items} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole("tab", { name: "Detalhes" }));

    expect(onValueChange).toHaveBeenCalledWith("details");
    expect(screen.getByRole("tab", { name: "Detalhes" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("supports controlled selection", () => {
    const onValueChange = vi.fn();

    const ControlledExample = () => {
      const [value, setValue] = React.useState("overview");

      return (
        <TabMenu
          items={items}
          value={value}
          onValueChange={(nextValue) => {
            onValueChange(nextValue);
            setValue(nextValue);
          }}
        />
      );
    };

    renderWithHive(<ControlledExample />);

    fireEvent.click(screen.getByRole("tab", { name: "Histórico" }));

    expect(onValueChange).toHaveBeenCalledWith("history");
    expect(screen.getByRole("tab", { name: "Histórico" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("supports horizontal keyboard navigation with automatic activation", () => {
    renderWithHive(<TabMenu items={items} ariaLabel="Seções" />);

    const firstTab = screen.getByRole("tab", { name: "Visão geral" });
    const secondTab = screen.getByRole("tab", { name: "Detalhes" });
    const thirdTab = screen.getByRole("tab", { name: "Histórico" });

    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: "ArrowRight" });
    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(secondTab, { key: "End" });
    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(thirdTab, { key: "ArrowRight" });
    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  it("supports vertical keyboard navigation", () => {
    renderWithHive(
      <TabMenu items={items} type="vertical" ariaLabel="Seções verticais" />,
    );

    const firstTab = screen.getByRole("tab", { name: "Visão geral" });
    const secondTab = screen.getByRole("tab", { name: "Detalhes" });

    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: "ArrowDown" });

    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute("aria-selected", "true");
  });

  it("renders correctly in light and dark modes", () => {
    const { rerender } = render(
      <HiveProvider colorMode="light">
        <TabMenu items={items} />
      </HiveProvider>,
    );

    expect(
      screen.getByRole("tab", { name: "Visão geral" }),
    ).toBeInTheDocument();

    rerender(
      <HiveProvider colorMode="dark">
        <TabMenu items={items} />
      </HiveProvider>,
    );

    expect(
      screen.getByRole("tab", { name: "Visão geral" }),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <TabMenu items={items} ariaLabel="Seções" />,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toHaveLength(0);
  });
});
