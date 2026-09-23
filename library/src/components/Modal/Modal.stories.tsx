import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { InformationCircle } from "../../icons/InformationCircle";
import { WarningTriangle } from "../../icons/WarningTriangle";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Modal, type ModalProps, ModalFooter, ModalHeader } from "./Modal";

const docsDescription = [
  "## Introdução",
  "O Modal concentra decisões importantes ou etapas que precisam interromper o fluxo atual com foco controlado.",
  "## Quando usar",
  "- Confirmar ações críticas, revisar dados antes de salvar ou apresentar detalhes que exigem atenção exclusiva.",
  "- Agrupar conteúdo com título, descrição, ações e fechamento claro.",
  "## Quando não usar",
  "- Para feedbacks curtos e não bloqueantes — use alertas ou notificações inline.",
  "- Para navegação extensa ou conteúdos longos que funcionam melhor em página dedicada.",
  "## Playground",
  "Abra o modal e ajuste largura, botão de fechar e descrição para validar a hierarquia do conteúdo.",
  "## Matriz de variantes",
  "Use `ModalHeader` para cabeçalhos customizados e `ModalFooter` para organizar CTAs, informação, link e checkbox.",
  "## Estados",
  "O componente cobre fluxo controlado e não controlado, fechamento por overlay/Escape e restauração de foco.",
  "## Exemplo real",
  "Mostra um modal de confirmação de remoção com contexto e ações primária/secundária.",
  "## Acessibilidade",
  "Baseado em Radix Dialog, com `Dialog.Title`/`Dialog.Description`, foco preso, Escape e clique fora.",
  "## Navegação por teclado",
  "**Tab** circula dentro do modal, **Shift+Tab** retorna, **Escape** fecha e o foco volta ao gatilho.",
].join("\n\n");

function PlaygroundPreview(args: ModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>

      <Modal
        {...args}
        open={open}
        onOpenChange={setOpen}
        footer={
          args.footer ?? (
            <ModalFooter>
              <Button
                tone="neutral"
                visualStyle="light"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setOpen(false)}>Salvar alterações</Button>
            </ModalFooter>
          )
        }
      >
        {args.children ?? (
          <div style={{ display: "grid", gap: 12 }}>
            <p style={{ margin: 0 }}>
              Revise o conteúdo antes de concluir a ação. O corpo aceita
              qualquer composição da biblioteca.
            </p>
            <p style={{ margin: 0 }}>
              O foco entra automaticamente no modal e fica preso até o
              fechamento.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

function CustomHeaderPreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Abrir exemplo com ModalHeader
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Convidar responsáveis"
        description="Envie convites por e-mail e acompanhe quem já aceitou."
        header={
          <ModalHeader
            type="icon"
            icon={InformationCircle}
            title="Convidar responsáveis"
            subtitle="Envie convites por e-mail e acompanhe quem já aceitou."
          />
        }
        footer={
          <ModalFooter>
            <Button
              tone="neutral"
              visualStyle="light"
              onClick={() => setOpen(false)}
            >
              Depois
            </Button>
            <Button onClick={() => setOpen(false)}>Enviar convites</Button>
          </ModalFooter>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0 }}>
            Adicione pessoas responsáveis para que elas acompanhem mensagens,
            aprovações e documentos deste fluxo.
          </p>
          <p style={{ margin: 0 }}>
            O cabeçalho customizado mantém acessibilidade via título e descrição
            ocultos para o dialog.
          </p>
        </div>
      </Modal>
    </>
  );
}

function RealWorldExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button tone="error" onClick={() => setOpen(true)}>
        Excluir matrícula
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Excluir matrícula"
        description="Essa ação remove o vínculo da pessoa com a jornada atual e não poderá ser desfeita."
        header={
          <ModalHeader
            type="icon"
            icon={WarningTriangle}
            title="Excluir matrícula"
            subtitle="Essa ação remove o vínculo da pessoa com a jornada atual e não poderá ser desfeita."
          />
        }
        footer={
          <ModalFooter>
            <Button
              tone="neutral"
              visualStyle="light"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button tone="error" onClick={() => setOpen(false)}>
              Confirmar exclusão
            </Button>
          </ModalFooter>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0 }}>
            Antes de excluir, baixe os relatórios e registre a justificativa
            para auditoria.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Histórico de presença</li>
            <li>Checklist documental</li>
            <li>Observações da equipe</li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    open: { control: false },
    defaultOpen: { control: "boolean" },
    onOpenChange: { action: "open changed" },
    trigger: { control: false },
    title: { control: "text" },
    description: { control: "text" },
    closeLabel: { control: "text" },
    showCloseButton: { control: "boolean" },
    header: { control: false },
    footer: { control: false },
    width: { control: "text" },
    children: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "Editar dados da jornada",
    description:
      "Atualize responsáveis, prazo e visibilidade antes de publicar.",
    showCloseButton: true,
    closeLabel: "Fechar",
    width: 343,
  },
  render: (args) => <PlaygroundPreview {...args} />,
};

export const ModalHeaderExample: Story = {
  args: {
    title: "Convidar responsáveis",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibe um cabeçalho customizado com ícone e fechamento integrado ao Dialog.",
      },
    },
  },
  render: () => <CustomHeaderPreview />,
};

export const ModalFooterVariants: Story = {
  args: {
    title: "Layouts do rodapé",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra as cinco composições de layout do `ModalFooter`: cta, information, checkbox, link e cta-full.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
      <div
        style={{
          border: "1px solid var(--taskall-border-subtle)",
          borderRadius: 12,
        }}
      >
        <ModalFooter variant="cta">
          <Button tone="neutral" visualStyle="light">
            Cancelar
          </Button>
          <Button>Salvar</Button>
        </ModalFooter>
      </div>

      <div
        style={{
          border: "1px solid var(--taskall-border-subtle)",
          borderRadius: 12,
        }}
      >
        <ModalFooter variant="information">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <InformationCircle size={16} aria-hidden="true" />
            <span
              style={{
                color: "var(--taskall-content-secondary)",
                font: "var(--taskall-font-paragraph-s)",
              }}
            >
              Os convites expiram em 7 dias.
            </span>
          </div>
          <Button size="small" visualStyle="light" tone="neutral">
            Reenviar agora
          </Button>
        </ModalFooter>
      </div>

      <div
        style={{
          border: "1px solid var(--taskall-border-subtle)",
          borderRadius: 12,
        }}
      >
        <ModalFooter variant="checkbox">
          <Checkbox
            defaultChecked
            label="Enviar uma cópia por e-mail para a coordenação."
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button tone="neutral" visualStyle="light">
              Depois
            </Button>
            <Button>Confirmar</Button>
          </div>
        </ModalFooter>
      </div>

      <div
        style={{
          border: "1px solid var(--taskall-border-subtle)",
          borderRadius: 12,
        }}
      >
        <ModalFooter variant="link">
          <button
            type="button"
            style={{
              border: 0,
              padding: 0,
              background: "transparent",
              color: "var(--taskall-brand)",
              font: "var(--taskall-font-link-s)",
              cursor: "pointer",
            }}
          >
            Ver política de convites
          </button>
          <Button size="small" tone="neutral" visualStyle="light">
            Entendi
          </Button>
        </ModalFooter>
      </div>

      <div
        style={{
          border: "1px solid var(--taskall-border-subtle)",
          borderRadius: 12,
        }}
      >
        <ModalFooter variant="cta-full">
          <Button>Continuar</Button>
        </ModalFooter>
      </div>
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    title: "Excluir matrícula",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo real de confirmação destrutiva com contexto suficiente para tomada de decisão.",
      },
    },
  },
  render: () => <RealWorldExample />,
};

export const Accessibility: Story = {
  args: {
    title: "Acessibilidade do modal",
    description:
      "Confira como o foco, o título e a descrição se comportam com teclado e leitores de tela.",
    defaultOpen: true,
    footer: (
      <ModalFooter>
        <Button tone="neutral" visualStyle="light">
          Voltar
        </Button>
        <Button>Continuar</Button>
      </ModalFooter>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- Usa `Dialog.Title` e `Dialog.Description` para nome e descrição acessíveis do diálogo.",
          "- O overlay fecha por clique fora, `Escape` fecha o modal e o foco retorna ao gatilho anterior.",
          "- O cabeçalho customizado preserva esses vínculos com versões visualmente ocultas.",
          "## Navegação por teclado",
          "- **Tab** percorre somente elementos focáveis do modal.",
          "- **Shift+Tab** retorna sem escapar do diálogo.",
          "- **Escape** fecha e restaura o foco no elemento que abriu o modal.",
        ].join("\n\n"),
      },
    },
  },
  render: (args) => (
    <Modal {...args}>
      <div style={{ display: "grid", gap: 12 }}>
        <p style={{ margin: 0 }}>
          Abra esta story com um leitor de tela para validar o anúncio do título
          e da descrição.
        </p>
        <Button tone="neutral" visualStyle="light">
          Botão focável 1
        </Button>
        <Button>Botão focável 2</Button>
      </div>
    </Modal>
  ),
};
