import { createRef } from "react";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders a progressbar with the expected aria values", () => {
    renderWithHive(<ProgressBar value={48} label="Upload" />);

    const progressbar = screen.getByRole("progressbar", { name: "Upload" });
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-valuenow", "48");
  });

  it("forwards the ref to the root div", () => {
    const ref = createRef<HTMLDivElement>();

    renderWithHive(<ProgressBar ref={ref} value={20} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("clamps values outside the 0 to 100 range", () => {
    renderWithHive(<ProgressBar value={160} label="Clamped" />);

    expect(
      screen.getByRole("progressbar", { name: "Clamped" }),
    ).toHaveAttribute("aria-valuenow", "100");
  });

  it("shows the formatted percentage when requested", () => {
    renderWithHive(<ProgressBar value={33.3} showPercentage label="Entrega" />);

    expect(screen.getByText("33.3%")).toBeInTheDocument();
  });

  it("exposes tone and size data attributes", () => {
    renderWithHive(
      <ProgressBar
        value={12}
        tone="green"
        size="small"
        data-testid="progress"
      />,
    );

    expect(screen.getByTestId("progress")).toHaveAttribute(
      "data-tone",
      "green",
    );
    expect(screen.getByTestId("progress")).toHaveAttribute(
      "data-size",
      "small",
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <>
        <ProgressBar value={20} label="Início" />
        <ProgressBar
          value={76}
          label="Conclusão"
          showPercentage
          tone="purple"
        />
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
