import {
  Button,
  Megaphone,
  Modal,
  ModalFooter,
  Paragraph,
  SendEmail,
  WarningTriangle,
  type ModalIconTone,
} from "@hive/react";

import { jsx, raw } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Basic from "./examples/Basic";
import basicCode from "./examples/Basic?raw";
import ConfirmDelete from "./examples/ConfirmDelete";
import confirmDeleteCode from "./examples/ConfirmDelete?raw";
import CustomHeader from "./examples/CustomHeader";
import customHeaderCode from "./examples/CustomHeader?raw";
import FooterVariants from "./examples/FooterVariants";
import footerVariantsCode from "./examples/FooterVariants?raw";

const page = findPage("componentes", "modal");

const icons = {
  nenhum: undefined,
  Megaphone,
  SendEmail,
  WarningTriangle,
} as const;
type IconName = keyof typeof icons;

const doc: ComponentDoc = {
  page,
  description:
    "Modal interrompe o fluxo para uma decisão ou etapa que exige atenção exclusiva. É baseado em Radix Dialog: foco preso, Escape, clique fora e retorno de foco ao gatilho.",
  whenToUse: [
    "Confirmar ações destrutivas ou irreversíveis (excluir tarefa, encerrar turma).",
    "Editar poucos campos sem sair do contexto (prazo, responsáveis).",
    "Apresentar informação que precisa ser reconhecida antes de continuar.",
  ],
  whenNotToUse: [
    "Feedback curto e não bloqueante — use AlertNotification.",
    "Fluxos longos ou com navegação própria — use uma página dedicada.",
    "Abrir um modal a partir de outro modal.",
  ],
  usage: `import * as React from "react";
import { Button, Modal, ModalFooter } from "@hive/react";

export function EditDeadline() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Editar prazo</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Editar prazo da tarefa"
        description="A nova data será comunicada à turma."
        footer={
          <ModalFooter>
            <Button tone="neutral" visualStyle="light" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setOpen(false)}>Salvar</Button>
          </ModalFooter>
        }
      >
        {/* conteúdo */}
      </Modal>
    </>
  );
}`,
  playground: definePlayground({
    component: "Modal",
    initial: {
      title: "Publicar comunicado",
      description: "O comunicado será enviado para 32 responsáveis.",
      width: 400,
      icon: "Megaphone" as IconName,
      iconTone: "brand" as ModalIconTone,
      showCloseButton: true,
      closeLabel: "Fechar",
    },
    controls: {
      title: { type: "text" },
      description: { type: "text" },
      width: { type: "number", min: 280, max: 640, step: 8 },
      icon: { type: "select", options: Object.keys(icons) as IconName[] },
      iconTone: {
        type: "select",
        options: ["brand", "information", "success", "warning", "error"],
      },
      showCloseButton: { type: "boolean" },
      closeLabel: { type: "text" },
    },
    render: ({ icon, ...props }) => (
      <Modal
        {...props}
        icon={icons[icon]}
        description={props.description || undefined}
        trigger={
          <Button visualStyle="outline" leftIcon={Megaphone}>
            Abrir modal
          </Button>
        }
        footer={
          <ModalFooter variant="cta-full">
            <Button leftIcon={SendEmail}>Publicar agora</Button>
          </ModalFooter>
        }
      >
        <Paragraph size="s">
          Revise o texto antes de publicar. Responsáveis recebem notificação no
          app.
        </Paragraph>
      </Modal>
    ),
    code: ({ icon, ...props }) =>
      jsx(
        "Modal",
        {
          ...props,
          icon: icon === "nenhum" ? undefined : raw(icon),
          iconTone: icon === "nenhum" ? undefined : props.iconTone,
          trigger: raw(
            `<Button visualStyle="outline" leftIcon={Megaphone}>Abrir modal</Button>`,
          ),
          footer: raw(
            `<ModalFooter variant="cta-full"><Button leftIcon={SendEmail}>Publicar agora</Button></ModalFooter>`,
          ),
        },
        `<Paragraph size="s">Revise o texto antes de publicar.</Paragraph>`,
      ),
  }),
  examples: [
    example(
      {
        id: "rodape",
        kind: "variantes",
        title: "Layouts do ModalFooter",
        description: "cta, information, checkbox, link e cta-full.",
      },
      FooterVariants,
      footerVariantsCode,
    ),
    example(
      {
        id: "cabecalho-customizado",
        kind: "variantes",
        title: "ModalHeader com ícone",
        description:
          "O title/description do Modal continuam como nome e descrição acessíveis (ocultos visualmente).",
      },
      CustomHeader,
      customHeaderCode,
    ),
    example(
      {
        id: "controlado",
        kind: "estados",
        title: "Controlado",
        description:
          "open + onOpenChange: o estado fica no seu componente e as ações do rodapé fecham o modal.",
      },
      Basic,
      basicCode,
    ),
    example(
      {
        id: "confirmar-exclusao",
        kind: "aplicado",
        title: "Confirmar exclusão de tarefa",
        description:
          "Ação destrutiva com consequência explícita e feedback após confirmar.",
      },
      ConfirmDelete,
      confirmDeleteCode,
    ),
  ],
  guidelines: [
    {
      do: "Título em forma de pergunta ou ação clara e botão que repete o verbo (“Excluir tarefa”).",
      dont: "Botões genéricos como “Sim / Não” ou “OK”, que exigem reler o texto.",
    },
    {
      do: "Explique a consequência na `description` (o que será perdido, quem será notificado).",
      dont: "Usar modal para mensagens que não exigem decisão — prefira um alerta inline.",
    },
    {
      do: 'Use `icon` + `iconTone="error"` em confirmações destrutivas e repita o ícone no botão de ação.',
      dont: "Ícones decorativos sem relação com a decisão, ou tons de erro em modais informativos.",
    },
    {
      do: "Mantenha o conteúdo curto: uma decisão, até ~3 campos.",
      dont: "Empilhar modais ou colocar formulários longos com rolagem interna.",
    },
  ],
  accessibility: {
    notes: [
      "`title` e `description` viram `aria-labelledby`/`aria-describedby` do diálogo — sempre informe `title`, mesmo com `header` customizado.",
      "O foco entra no modal ao abrir, fica preso nele e volta ao gatilho ao fechar.",
      "O ícone do cabeçalho (`icon`) é decorativo (`aria-hidden`): o significado fica no `title`.",
      "O botão de fechar tem `aria-label` configurável por `closeLabel` (padrão “Fechar”) e 44×44px.",
      "O portal é montado dentro do HiveProvider mais próximo, preservando tema e marca.",
    ],
    keyboard: [
      {
        keys: "Tab",
        action: "Percorre apenas os elementos focáveis dentro do modal.",
      },
      { keys: "Shift + Tab", action: "Volta sem escapar do diálogo." },
      { keys: "Esc", action: "Fecha o modal e devolve o foco ao gatilho." },
    ],
  },
  api: [
    {
      name: "Modal",
      native: '<div role="dialog">',
      descriptions: {
        title: "Título do diálogo; também é o nome acessível.",
        description: "Texto de apoio; vira a descrição acessível.",
        open: "Estado controlado de abertura.",
        defaultOpen: "Abertura inicial no modo não controlado.",
        onOpenChange: "Chamado ao abrir/fechar (Esc, overlay, botão fechar).",
        trigger: "Elemento que abre o modal (somente no modo não controlado).",
        children: "Conteúdo do corpo.",
        header: "Substitui o cabeçalho padrão (ex.: `<ModalHeader>`).",
        footer: "Rodapé, normalmente `<ModalFooter>` com ações.",
        width: "Largura do diálogo (limitada à viewport).",
        showCloseButton: "Exibe o botão de fechar no cabeçalho.",
        closeLabel: "Rótulo acessível do botão de fechar.",
        icon: "Ícone decorativo em destaque no cabeçalho padrão.",
        iconTone:
          "Tom do ícone: brand, information, success, warning ou error.",
      },
    },
    {
      name: "ModalHeader",
      native: "<div>",
      descriptions: {
        title: "Título visível do cabeçalho customizado.",
        subtitle: "Linha de apoio abaixo do título.",
        type: "`icon` exibe o ícone em destaque; `slot` renderiza `children`.",
        icon: 'Ícone usado quando `type="icon"`.',
        iconTone:
          "Tom do ícone: brand, information, success, warning ou error.",
        showCloseButton: "Sobrescreve o valor herdado do Modal.",
        closeLabel: "Sobrescreve o rótulo herdado do Modal.",
        onClose: "Callback extra ao clicar em fechar.",
      },
    },
    {
      name: "ModalFooter",
      native: "<div>",
      descriptions: {
        variant:
          "Layout do rodapé: cta, information, checkbox, link ou cta-full.",
        children: "Ações e conteúdo do rodapé.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function ModalPage() {
  return <ComponentPage doc={doc} />;
}
