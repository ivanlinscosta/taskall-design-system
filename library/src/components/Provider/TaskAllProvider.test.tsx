import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { TaskAllProvider } from "./TaskAllProvider";

describe("TaskAllProvider", () => {
  it("renders children with default personality attributes", () => {
    render(
      <TaskAllProvider>
        <h1>Olá</h1>
      </TaskAllProvider>,
    );
    const provider = screen.getByText("Olá").parentElement;
    expect(provider).toHaveAttribute("data-color-mode", "light");
    expect(provider).toHaveAttribute("data-brand", "coral");
    expect(provider).toHaveAttribute("data-density", "default");
    expect(provider).toHaveAttribute("data-shape", "default");
  });

  it("applies every personality attribute", () => {
    render(
      <TaskAllProvider
        data-testid="provider"
        colorMode="dark"
        brand="gestao"
        density="expanded"
        shape="rounded"
      >
        <div />
      </TaskAllProvider>,
    );
    const provider = screen.getByTestId("provider");
    expect(provider).toHaveAttribute("data-color-mode", "dark");
    expect(provider).toHaveAttribute("data-brand", "gestao");
    expect(provider).toHaveAttribute("data-density", "expanded");
    expect(provider).toHaveAttribute("data-shape", "rounded");
  });

  it("forwards ref, className and extra attributes", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TaskAllProvider
        ref={ref}
        className="app"
        data-testid="provider"
        aria-label="App"
      >
        <span />
      </TaskAllProvider>,
    );
    const provider = screen.getByTestId("provider");
    expect(ref.current).toBe(provider);
    expect(provider).toHaveClass("app");
    expect(provider).toHaveAttribute("aria-label", "App");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <TaskAllProvider>
        <main aria-label="Conteúdo">Demo</main>
      </TaskAllProvider>,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
