import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "../Button/Button";
import { TaskAllProvider } from "../Provider/TaskAllProvider";
import { renderWithTaskAll } from "../../test/renderWithTaskAll";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the trigger and opens the tooltip with an accessible role", async () => {
    vi.useFakeTimers();

    renderWithTaskAll(
      <Tooltip title="Mais detalhes">
        <Button>Ajuda</Button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Ajuda" });
    await act(async () => {
      fireEvent.focus(trigger);
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Mais detalhes")).toBeInTheDocument();
  });

  it("forwards the ref to the tooltip content", async () => {
    vi.useFakeTimers();

    const ref = createRef<HTMLDivElement>();

    renderWithTaskAll(
      <Tooltip ref={ref} title="Detalhes">
        <Button>Ajuda</Button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Ajuda" });
    await act(async () => {
      fireEvent.focus(trigger);
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute("role", "tooltip");
  });

  it("supports large size, description and variant data attributes", async () => {
    vi.useFakeTimers();

    renderWithTaskAll(
      <Tooltip
        title="Atalho"
        description="Use este botão para continuar a jornada."
        size="large"
        visualStyle="filled"
      >
        <Button>Continuar</Button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Continuar" });
    await act(async () => {
      fireEvent.focus(trigger);
      await vi.advanceTimersByTimeAsync(300);
    });

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveAttribute("data-size", "large");
    expect(tooltip).toHaveAttribute("data-variant", "filled");
    expect(
      screen.getByText("Use este botão para continuar a jornada."),
    ).toBeInTheDocument();
  });

  it("opens on keyboard focus", async () => {
    vi.useFakeTimers();

    renderWithTaskAll(
      <Tooltip title="Dica rápida" side="right">
        <Button>Focar</Button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Focar" });
    await act(async () => {
      trigger.focus();
      await vi.advanceTimersByTimeAsync(300);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("renders correctly in light and dark modes", async () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <TaskAllProvider colorMode="light">
        <Tooltip title="Tema claro">
          <Button>Modo</Button>
        </Tooltip>
      </TaskAllProvider>,
    );

    await act(async () => {
      fireEvent.focus(screen.getByRole("button", { name: "Modo" }));
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.getByText("Tema claro")).toBeInTheDocument();

    rerender(
      <TaskAllProvider colorMode="dark">
        <Tooltip title="Tema escuro">
          <Button>Modo</Button>
        </Tooltip>
      </TaskAllProvider>,
    );

    await act(async () => {
      fireEvent.focus(screen.getByRole("button", { name: "Modo" }));
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.getByText("Tema escuro")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    vi.useFakeTimers();

    const { baseElement } = renderWithTaskAll(
      <Tooltip title="Informação" description="Texto complementar.">
        <Button>Ajuda</Button>
      </Tooltip>,
    );

    await act(async () => {
      fireEvent.focus(screen.getByRole("button", { name: "Ajuda" }));
      await vi.advanceTimersByTimeAsync(300);
    });
    vi.useRealTimers();

    const results = await axe(baseElement, {
      rules: {
        "color-contrast": { enabled: false },
        region: { enabled: false },
      },
    });

    expect(results.violations).toHaveLength(0);
  });
});
