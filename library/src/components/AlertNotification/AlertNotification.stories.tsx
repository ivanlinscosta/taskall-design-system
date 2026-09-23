import type { Meta, StoryObj } from "@storybook/react";

import { AlertNotification } from "./AlertNotification";

const docsDescription = [
  "## Introdução",
  "O AlertNotification comunica feedbacks de sistema com hierarquia visual curta e legível.",
  "## Quando usar",
  "- Confirmar resultados, avisos e mudanças de estado importantes.",
  "- Exibir mensagens curtas com link contextual ou ação de fechamento.",
  "## Quando não usar",
  "- Para fluxos longos ou com múltiplas ações — prefira um modal ou painel dedicado.",
  "- Para conteúdo puramente promocional sem urgência ou contexto.",
  "## Playground",
  "Ajuste status, tamanho e estilo visual para validar a leitura da mensagem.",
  "## Matriz de variantes",
  "Compare filled, light e outline nos estados principais.",
  "## Estados",
  "Inclui mensagens com fechamento, erro e versão compacta.",
  "## Exemplo real",
  "Mostra a notificação em um fluxo de acompanhamento de processo.",
  "## Acessibilidade",
  "Usa `role=status` com `aria-live=polite` ou `role=alert` em erro. Ícones são decorativos.",
  "## Navegação por teclado",
  "Quando fechável, o botão interno entra na ordem de tabulação e mantém foco visível.",
].join("\n\n");

const meta = {
  title: "Components/AlertNotification",
  component: AlertNotification,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docsDescription,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium", "small"],
    },
    status: {
      control: "select",
      options: ["information", "warning", "success", "error", "update"],
    },
    visualStyle: {
      control: "select",
      options: ["filled", "light", "outline"],
    },
    closable: { control: "boolean" },
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof AlertNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "Cadastro concluído com sucesso",
    body: "A nova pessoa usuária já pode acessar a plataforma.",
    linkLabel: "Ver detalhes",
    linkHref: "#",
    size: "large",
    status: "success",
    visualStyle: "light",
    closable: true,
  },
};

export const Variants: Story = {
  args: {
    title: "Informação",
  },
  parameters: {
    docs: {
      description: { story: "Matriz com os estilos filled, light e outline." },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <AlertNotification
        title="Informação"
        visualStyle="filled"
        status="information"
      />
      <AlertNotification title="Aviso" visualStyle="light" status="warning" />
      <AlertNotification
        title="Atualização"
        visualStyle="outline"
        status="update"
      />
    </div>
  ),
};

export const States: Story = {
  args: {
    title: "Falha ao salvar",
  },
  parameters: {
    docs: {
      description: {
        story: "Exibe erro assertivo, fechamento e variação compacta.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <AlertNotification
        title="Falha ao salvar"
        body="Tente novamente."
        status="error"
      />
      <AlertNotification
        title="Integração atualizada"
        status="update"
        closable
      />
      <AlertNotification title="Sincronizado" size="small" status="success" />
    </div>
  ),
};

export const RealExample: Story = {
  args: {
    title: "Documentação pendente",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo real em uma visão de acompanhamento de matrícula.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <AlertNotification
        title="Documentação pendente"
        body="Ainda faltam comprovantes para concluir a matrícula. Revise os anexos antes do prazo final."
        status="warning"
        visualStyle="light"
        linkLabel="Abrir checklist"
        linkHref="#"
        closable
      />
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    title: "Erro de conexão",
  },
  parameters: {
    docs: {
      description: {
        story: [
          "## Acessibilidade",
          "- `error` usa `role=alert`; os demais estados usam `role=status` com `aria-live=polite`.",
          "- O texto do link permanece legível e o ícone é decorativo com `aria-hidden`.",
          "## Navegação por teclado",
          "- **Tab** alcança o link e o botão de fechar quando presentes.",
          "- O botão de fechar preserva foco visível via tokens do tema.",
        ].join("\n\n"),
      },
    },
  },
  render: () => (
    <AlertNotification
      title="Erro de conexão"
      body="Reconecte sua conta para continuar recebendo atualizações."
      status="error"
      visualStyle="outline"
      linkLabel="Reconectar"
      linkHref="#"
      closable
    />
  ),
};
