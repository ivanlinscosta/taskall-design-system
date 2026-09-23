import * as React from "react";
import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { WarningTriangle } from "../../icons/WarningTriangle";
import { renderWithHive } from "../../test/renderWithHive";
import { HiveProvider } from "../Provider/HiveProvider";
import { Modal, ModalFooter, ModalHeader } from "./Modal";

function UncontrolledModalExample() {
  return (
    <Modal
      trigger={<button type="button">Abrir modal</button>}
      title="Editar dados"
      description="Atualize as informações principais antes de salvar."
      footer={
        <ModalFooter>
          <button type="button">Cancelar</button>
          <button type="button">Salvar</button>
        </ModalFooter>
      }
    >
      <button type="button">Campo 1</button>
      <button type="button">Campo 2</button>
    </Modal>
  );
}

function ControlledModalExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir controlado
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Excluir item"
        description="Essa ação não poderá ser desfeita."
        footer={
          <ModalFooter>
            <button type="button" onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button type="button">Excluir</button>
          </ModalFooter>
        }
      >
        <p>Revise os detalhes antes de confirmar.</p>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("opens and closes in uncontrolled mode with the trigger prop", async () => {
    const user = userEvent.setup();

    renderWithHive(<UncontrolledModalExample />);

    await user.click(screen.getByRole("button", { name: "Abrir modal" }));
    expect(
      screen.getByRole("dialog", { name: "Editar dados" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar" }));
    expect(
      screen.queryByRole("dialog", { name: "Editar dados" }),
    ).not.toBeInTheDocument();
  });

  it("opens and closes in controlled mode", async () => {
    const user = userEvent.setup();

    renderWithHive(<ControlledModalExample />);

    await user.click(screen.getByRole("button", { name: "Abrir controlado" }));
    expect(
      screen.getByRole("dialog", { name: "Excluir item" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Excluir item" }),
    ).not.toBeInTheDocument();
  });

  it("forwards the ref to the dialog content element", () => {
    const ref = createRef<HTMLDivElement>();

    renderWithHive(
      <Modal open ref={ref} title="Detalhes">
        Conteúdo
      </Modal>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute("role", "dialog");
  });

  it("moves focus into the modal and traps it while open", async () => {
    const user = userEvent.setup();

    renderWithHive(<UncontrolledModalExample />);

    await user.click(screen.getByRole("button", { name: "Abrir modal" }));

    const closeButton = screen.getByRole("button", { name: "Fechar" });
    const fieldOne = screen.getByRole("button", { name: "Campo 1" });
    const fieldTwo = screen.getByRole("button", { name: "Campo 2" });
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    const saveButton = screen.getByRole("button", { name: "Salvar" });

    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(fieldOne).toHaveFocus();

    await user.tab();
    expect(fieldTwo).toHaveFocus();

    await user.tab();
    expect(cancelButton).toHaveFocus();

    await user.tab();
    expect(saveButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();

    renderWithHive(<UncontrolledModalExample />);

    const trigger = screen.getByRole("button", { name: "Abrir modal" });

    await user.click(trigger);
    expect(
      screen.getByRole("dialog", { name: "Editar dados" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Editar dados" }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("applies aria-labelledby and aria-describedby through title and description", () => {
    renderWithHive(
      <Modal
        open
        title="Excluir cadastro"
        description="Essa ação não poderá ser desfeita."
        header={
          <ModalHeader
            type="icon"
            icon={WarningTriangle}
            title="Excluir cadastro"
            subtitle="Essa ação não poderá ser desfeita."
          />
        }
      >
        Revise as consequências antes de continuar.
      </Modal>,
    );

    const dialog = screen.getByRole("dialog", { name: "Excluir cadastro" });
    const labelledBy = dialog.getAttribute("aria-labelledby");
    const describedBy = dialog.getAttribute("aria-describedby");

    expect(dialog).toHaveAccessibleDescription(
      "Essa ação não poderá ser desfeita.",
    );
    expect(labelledBy).toBeTruthy();
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(labelledBy ?? "")).toHaveTextContent(
      "Excluir cadastro",
    );
    expect(document.getElementById(describedBy ?? "")).toHaveTextContent(
      "Essa ação não poderá ser desfeita.",
    );
  });

  it("honors showCloseButton={false} when using a custom ModalHeader", () => {
    renderWithHive(
      <Modal
        open
        title="Editar responsáveis"
        showCloseButton={false}
        header={
          <ModalHeader
            title="Editar responsáveis"
            subtitle="Atualize a lista antes de salvar."
          />
        }
      >
        Conteúdo
      </Modal>,
    );

    expect(
      screen.queryByRole("button", { name: "Fechar" }),
    ).not.toBeInTheDocument();
  });

  it("uses ModalHeader inside Modal to close the dialog", async () => {
    const user = userEvent.setup();

    renderWithHive(
      <Modal
        trigger={<button type="button">Abrir com header customizado</button>}
        title="Excluir vínculo"
        description="Confirme antes de remover a pessoa da jornada."
        header={
          <ModalHeader
            type="icon"
            icon={WarningTriangle}
            title="Excluir vínculo"
            subtitle="Confirme antes de remover a pessoa da jornada."
          />
        }
      >
        <button type="button">Ação interna</button>
      </Modal>,
    );

    const trigger = screen.getByRole("button", {
      name: "Abrir com header customizado",
    });

    await user.click(trigger);
    expect(
      screen.getByRole("dialog", { name: "Excluir vínculo" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar" }));

    expect(
      screen.queryByRole("dialog", { name: "Excluir vínculo" }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when the user clicks the backdrop", async () => {
    // Radix aplica pointer-events: none no body enquanto o modal está aberto e
    // escuta o "pointerdown" fora do conteúdo no documento.
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    renderWithHive(<UncontrolledModalExample />);

    await user.click(screen.getByRole("button", { name: "Abrir modal" }));

    const overlay = document.body.querySelector<HTMLElement>(
      '[data-state="open"]:not([role="dialog"])',
    );

    expect(overlay).toBeTruthy();

    if (!overlay) {
      throw new Error("Overlay not found");
    }

    await user.click(overlay);

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Editar dados" }),
      ).not.toBeInTheDocument(),
    );
  });

  it("never portals into <html> when the document mirrors theme attributes", () => {
    const root = document.documentElement;
    const attrs = {
      "data-color-mode": "dark",
      "data-brand": "gestao",
      "data-density": "default",
      "data-shape": "default",
    };
    Object.entries(attrs).forEach(([name, value]) =>
      root.setAttribute(name, value),
    );

    try {
      render(
        <HiveProvider data-testid="provider" colorMode="dark" brand="gestao">
          <Modal open title="Portal">
            Conteúdo
          </Modal>
        </HiveProvider>,
      );

      const dialog = screen.getByRole("dialog", { name: "Portal" });
      expect(screen.getByTestId("provider")).toContainElement(dialog);
    } finally {
      Object.keys(attrs).forEach((name) => root.removeAttribute(name));
    }
  });

  it("renders a decorative header icon with tone", () => {
    renderWithHive(
      <Modal
        open
        title="Excluir tarefa?"
        icon={WarningTriangle}
        iconTone="error"
      >
        Conteúdo
      </Modal>,
    );

    const dialog = screen.getByRole("dialog", { name: "Excluir tarefa?" });
    const iconBox = dialog.querySelector('[data-tone="error"]');
    expect(iconBox).toHaveAttribute("aria-hidden", "true");
    expect(iconBox?.querySelector("svg")).toBeInTheDocument();
  });

  it("renders inside the nearest HiveProvider so dark mode tokens are preserved", () => {
    render(
      <HiveProvider data-testid="dark-provider" colorMode="dark">
        <Modal open title="Tema escuro">
          Conteúdo em dark mode.
        </Modal>
      </HiveProvider>,
    );

    const provider = screen.getByTestId("dark-provider");
    const dialog = screen.getByRole("dialog", { name: "Tema escuro" });

    expect(provider).toContainElement(dialog);
  });

  it("supports light mode rendering with the default helper", () => {
    renderWithHive(
      <Modal open title="Tema claro">
        Conteúdo em light mode.
      </Modal>,
    );

    const provider = document.querySelector('[data-color-mode="light"]');
    const dialog = screen.getByRole("dialog", { name: "Tema claro" });

    expect(provider).toContainElement(dialog);
  });

  it("has no axe violations", async () => {
    renderWithHive(
      <Modal
        open
        title="Acessibilidade"
        description="Confirme se o fluxo está legível para tecnologias assistivas."
        footer={
          <ModalFooter>
            <button type="button">Cancelar</button>
            <button type="button">Continuar</button>
          </ModalFooter>
        }
      >
        <p>Conteúdo do modal.</p>
      </Modal>,
    );

    const results = await axe(document.body, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });

  it("renders ModalHeader standalone and calls onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithHive(
      <ModalHeader
        type="icon"
        icon={WarningTriangle}
        title="Header avulso"
        subtitle="Pode ser usado fora do Dialog."
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Fechar" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
