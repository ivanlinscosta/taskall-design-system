import { AlertNotification, type AlertNotificationProps } from "@taskall/react";

import { jsx } from "../../../lib/api";
import { definePlayground, example, type ComponentDoc } from "../../../lib/doc";
import { findPage } from "../../../lib/registry";
import { ComponentPage, pageMeta } from "../../../ui/ComponentPage";
import Dismissible from "./examples/Dismissible";
import dismissibleCode from "./examples/Dismissible?raw";
import Sizes from "./examples/Sizes";
import sizesCode from "./examples/Sizes?raw";
import SyncStatus from "./examples/SyncStatus";
import syncStatusCode from "./examples/SyncStatus?raw";
import Variants from "./examples/Variants";
import variantsCode from "./examples/Variants?raw";

const page = findPage("componentes", "alert-notification");

const doc: ComponentDoc = {
  page,
  description:
    "AlertNotification comunica feedback de sistema — sucesso, aviso, erro, informação ou atualização — com título curto, corpo opcional, link contextual e fechamento.",
  whenToUse: [
    "Confirmar o resultado de uma ação (tarefa publicada, notas importadas).",
    "Avisar sobre prazos, pendências ou mudanças de estado relevantes.",
    "Explicar um erro de sistema e oferecer o próximo passo por link.",
  ],
  whenNotToUse: [
    "Erros de validação de um campo — use `error` no TextInput/Dropdown.",
    "Decisões que exigem resposta — use Modal.",
    "Conteúdo promocional sem urgência.",
  ],
  usage: `import { AlertNotification } from "@taskall/react";

export function ImportResult({ count }: { count: number }) {
  return (
    <AlertNotification
      status="success"
      title={\`\${count} notas importadas\`}
      body="Os boletins ficam visíveis amanhã, 07:00."
      linkLabel="Revisar boletins"
      linkHref="/boletins"
      closable
    />
  );
}`,
  playground: definePlayground({
    component: "AlertNotification",
    initial: {
      title: "Tarefa publicada para a turma 8º B",
      body: "Os estudantes recebem uma notificação no app.",
      linkLabel: "Ver tarefa",
      status: "success" as NonNullable<AlertNotificationProps["status"]>,
      size: "large" as NonNullable<AlertNotificationProps["size"]>,
      visualStyle: "light" as NonNullable<
        AlertNotificationProps["visualStyle"]
      >,
      closable: true,
    },
    controls: {
      title: { type: "text" },
      body: { type: "text" },
      linkLabel: { type: "text" },
      status: {
        type: "select",
        options: ["information", "success", "warning", "error", "update"],
      },
      size: { type: "select", options: ["large", "medium", "small"] },
      visualStyle: { type: "select", options: ["light", "filled", "outline"] },
      closable: { type: "boolean" },
    },
    render: (props) => (
      <div style={{ width: "100%", maxWidth: 520 }}>
        <AlertNotification
          key={JSON.stringify(props)}
          {...props}
          linkHref="#tarefa"
        />
      </div>
    ),
    code: (props) =>
      jsx("AlertNotification", {
        ...props,
        linkHref: props.linkLabel ? "/tarefas/123" : undefined,
      }),
  }),
  examples: [
    example(
      {
        id: "status-estilos",
        kind: "variantes",
        title: "Status × estilos",
        description: "5 status em light, filled e outline.",
      },
      Variants,
      variantsCode,
    ),
    example(
      {
        id: "tamanhos",
        kind: "variantes",
        title: "Tamanhos",
        description:
          "large mostra body e link; medium mostra link; small só o título.",
      },
      Sizes,
      sizesCode,
    ),
    example(
      {
        id: "fechavel",
        kind: "estados",
        title: "Fechável",
        description:
          "closable adiciona o botão “Fechar notificação”; onClose avisa o pai.",
      },
      Dismissible,
      dismissibleCode,
    ),
    example(
      {
        id: "importacao-notas",
        kind: "aplicado",
        title: "Resultado da importação de notas",
        description:
          "Sucesso e erro parcial lado a lado, cada um com o próximo passo.",
      },
      SyncStatus,
      syncStatusCode,
    ),
  ],
  guidelines: [
    {
      do: "Título que diz o que aconteceu + link com o próximo passo.",
      dont: "Títulos genéricos (“Atenção!”, “Erro”) sem contexto.",
      doExample: (
        <AlertNotification
          size="medium"
          status="error"
          title="Boletim não enviado: e-mail inválido"
          linkLabel="Corrigir"
          linkHref="#corrigir"
        />
      ),
      dontExample: (
        <AlertNotification size="medium" status="error" title="Erro!" />
      ),
    },
    {
      do: "Use `error` só para falhas reais — ele é anunciado imediatamente (`role=alert`).",
      dont: "Usar `error`/`warning` para destacar conteúdo comum.",
    },
    {
      do: "Mostre uma notificação por evento e remova-a quando o estado mudar.",
      dont: "Empilhar várias notificações iguais na mesma área.",
    },
  ],
  accessibility: {
    notes: [
      '`status="error"` usa `role="alert"` (anúncio assertivo); os demais usam `role="status"` + `aria-live="polite"`.',
      "Ícones de status são decorativos; o significado está no texto — não dependa só da cor.",
      'O botão de fechar tem `aria-label="Fechar notificação"` e alvo de 44px.',
      "Ao fechar, devolva o foco para um elemento lógico se a notificação estava focada.",
    ],
    keyboard: [
      {
        keys: "Tab",
        action: "Alcança o link e o botão de fechar, quando existem.",
      },
      { keys: "Enter", action: "Segue o link ou fecha a notificação." },
    ],
  },
  api: [
    {
      name: "AlertNotification",
      native: "<div>",
      descriptions: {
        title: "Mensagem principal, curta.",
        body: 'Detalhe opcional (exibido só em `size="large"`).',
        linkLabel: "Texto do link de ação (large e medium).",
        linkHref: "Destino do link; requer `linkLabel`.",
        size: "large, medium ou small — controla o que é exibido.",
        status: "Tipo de feedback; define cor, ícone e papel ARIA.",
        visualStyle: "Ênfase: light (padrão), filled ou outline.",
        closable: "Exibe o botão de fechar.",
        onClose: "Chamado ao fechar; o componente se oculta internamente.",
      },
    },
  ],
};

export const meta = () => pageMeta(page);

export default function AlertNotificationPage() {
  return <ComponentPage doc={doc} />;
}
