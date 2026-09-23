import { createRef } from "react";
import { fireEvent, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { renderWithHive } from "../../test/renderWithHive";
import { AlertNotification } from "./AlertNotification";

describe("AlertNotification", () => {
  it("renders status content with a polite live region by default", () => {
    renderWithHive(
      <AlertNotification title="Atualização enviada" body="Tudo certo." />,
    );

    const alert = screen.getByRole("status");
    expect(alert).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Atualização enviada")).toBeInTheDocument();
    expect(screen.getByText("Tudo certo.")).toBeInTheDocument();
  });

  it("uses role alert for error notifications", () => {
    renderWithHive(<AlertNotification title="Erro ao salvar" status="error" />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("forwards the ref to the root div", () => {
    const ref = createRef<HTMLDivElement>();

    renderWithHive(<AlertNotification ref={ref} title="Ref" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("exposes size, variant and tone data attributes", () => {
    renderWithHive(
      <AlertNotification
        title="Aviso"
        status="warning"
        visualStyle="outline"
        size="medium"
      />,
    );

    const alert = screen.getByRole("status");
    expect(alert).toHaveAttribute("data-size", "medium");
    expect(alert).toHaveAttribute("data-variant", "outline");
    expect(alert).toHaveAttribute("data-tone", "warning");
  });

  it("does not render the body in medium size", () => {
    renderWithHive(
      <AlertNotification
        title="Aviso"
        body="Esse texto não deve aparecer"
        size="medium"
      />,
    );

    expect(
      screen.queryByText("Esse texto não deve aparecer"),
    ).not.toBeInTheDocument();
  });

  it("renders only title content in small size", () => {
    renderWithHive(
      <AlertNotification
        title="Sincronizado"
        body="Oculto"
        linkLabel="Detalhes"
        linkHref="/detalhes"
        size="small"
      />,
    );

    expect(screen.getByText("Sincronizado")).toBeInTheDocument();
    expect(screen.queryByText("Oculto")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Detalhes" }),
    ).not.toBeInTheDocument();
  });

  it("dismisses itself and calls onClose when closable", () => {
    const onClose = vi.fn();

    renderWithHive(
      <AlertNotification title="Fechável" closable onClose={onClose} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Fechar notificação" }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders an accessible link when href and label are provided", () => {
    renderWithHive(
      <AlertNotification
        title="Leia mais"
        linkLabel="Abrir ajuda"
        linkHref="/ajuda"
      />,
    );

    expect(screen.getByRole("link", { name: "Abrir ajuda" })).toHaveAttribute(
      "href",
      "/ajuda",
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithHive(
      <>
        <AlertNotification title="Informação" body="Resumo importante" />
        <AlertNotification
          title="Erro"
          status="error"
          visualStyle="filled"
          closable
        />
      </>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
