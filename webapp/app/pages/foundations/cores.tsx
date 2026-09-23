import * as React from "react";
import { Badge } from "@taskall/react";

import { findPage } from "../../lib/registry";
import { useSettings } from "../../lib/settings";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import {
  ColorGroup,
  contrastRatio,
  resolveColor,
  TokenTable,
} from "../../ui/Foundation";
import {
  Article,
  Callout,
  DocSection,
  InlineCode,
  PageHeader,
  Prose,
} from "../../ui/Page";

const page = findPage("fundamentos", "cores");

const groups: Array<{
  id: string;
  title: string;
  intro: string;
  tokens: Array<{ name: string; token: string }>;
}> = [
  {
    id: "conteudo",
    title: "Conteúdo",
    intro:
      "Texto e ícones. `primary` para conteúdo principal, `secondary` para apoio; `tertiary` só para elementos não essenciais.",
    tokens: [
      { name: "Primary", token: "--taskall-content-primary" },
      { name: "Secondary", token: "--taskall-content-secondary" },
      { name: "Tertiary", token: "--taskall-content-tertiary" },
      { name: "Inverse", token: "--taskall-content-inverse" },
      { name: "Disabled", token: "--taskall-content-disabled" },
      { name: "On brand", token: "--taskall-content-on-brand" },
      { name: "On soft", token: "--taskall-content-on-soft" },
    ],
  },
  {
    id: "fundo",
    title: "Fundo",
    intro:
      "Superfícies em camadas: `primary` é a página, `secondary`/`tertiary` agrupam conteúdo.",
    tokens: [
      { name: "Primary", token: "--taskall-background-primary" },
      { name: "Secondary", token: "--taskall-background-secondary" },
      { name: "Tertiary", token: "--taskall-background-tertiary" },
      { name: "Inverse", token: "--taskall-background-inverse" },
      { name: "Disabled", token: "--taskall-background-disabled" },
      { name: "Hover", token: "--taskall-background-hover" },
    ],
  },
  {
    id: "borda",
    title: "Borda",
    intro:
      "Divisores e contornos. `subtle` separa, `default` delimita campos, `strong` destaca.",
    tokens: [
      { name: "Default", token: "--taskall-border-default" },
      { name: "Subtle", token: "--taskall-border-subtle" },
      { name: "Strong", token: "--taskall-border-strong" },
      { name: "Inverse", token: "--taskall-border-inverse" },
    ],
  },
  {
    id: "marca",
    title: "Marca",
    intro:
      "Mudam com `brand` (Coral, Gestão, Estudantes, Responsáveis) e com o modo de cor.",
    tokens: [
      { name: "Brand", token: "--taskall-brand" },
      { name: "Soft", token: "--taskall-brand-soft" },
      { name: "Hover", token: "--taskall-brand-hover" },
      { name: "Active", token: "--taskall-brand-active" },
      { name: "Soft hover", token: "--taskall-brand-soft-hover" },
    ],
  },
  {
    id: "acao",
    title: "Ação",
    intro: "Usados por Button e controles. `primary` é um alias da marca.",
    tokens: [
      { name: "Primary", token: "--taskall-action-primary" },
      { name: "Primary contrast", token: "--taskall-action-primary-contrast" },
      { name: "Neutral fill", token: "--taskall-action-neutral-fill" },
      { name: "Neutral light", token: "--taskall-action-neutral-light" },
      { name: "Error fill", token: "--taskall-action-error-fill" },
      { name: "Error light", token: "--taskall-action-error-light" },
      { name: "Disabled fill", token: "--taskall-action-disabled-fill" },
      {
        name: "Disabled contrast",
        token: "--taskall-action-disabled-contrast",
      },
    ],
  },
  {
    id: "status",
    title: "Status",
    intro:
      "Feedback semântico. Cada status tem `soft`, `outline` e `contrast` para compor fundos, bordas e texto sobre cor.",
    tokens: ["information", "success", "warning", "error", "update"].flatMap(
      (status) => [
        { name: status, token: `--taskall-status-${status}` },
        { name: `${status} soft`, token: `--taskall-status-${status}-soft` },
      ],
    ),
  },
  {
    id: "progresso",
    title: "Categorias (progresso)",
    intro:
      "Tons de categoria do ProgressBar. Não carregam significado de status.",
    tokens: [
      "brand",
      "purple",
      "blue",
      "green",
      "yellow",
      "orange",
      "red",
      "pink",
    ].map((tone) => ({
      name: tone,
      token: `--taskall-progress-${tone}`,
    })),
  },
];

const contrastPairs = [
  {
    text: "--taskall-content-primary",
    background: "--taskall-background-primary",
    use: "Texto principal",
  },
  {
    text: "--taskall-content-secondary",
    background: "--taskall-background-primary",
    use: "Texto de apoio",
  },
  {
    text: "--taskall-content-secondary",
    background: "--taskall-background-secondary",
    use: "Apoio em superfície",
  },
  {
    text: "--taskall-content-tertiary",
    background: "--taskall-background-primary",
    use: "Placeholder / decorativo",
  },
  {
    text: "--taskall-content-on-brand",
    background: "--taskall-brand",
    use: "Texto sobre a marca",
  },
  {
    text: "--taskall-content-on-soft",
    background: "--taskall-brand-soft",
    use: "Texto sobre marca suave",
  },
  {
    text: "--taskall-action-neutral-contrast",
    background: "--taskall-action-neutral-fill",
    use: "Botão neutral filled",
  },
  {
    text: "--taskall-action-error-contrast",
    background: "--taskall-action-error-fill",
    use: "Botão error filled",
  },
  {
    text: "--taskall-status-error",
    background: "--taskall-background-primary",
    use: "Texto de erro",
  },
];

function ContrastTable() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { settings } = useSettings();
  const [ratios, setRatios] = React.useState<Array<number | null>>([]);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const frame = window.requestAnimationFrame(() => {
      setRatios(
        contrastPairs.map((pair) => {
          const text = resolveColor(element, pair.text);
          const background = resolveColor(element, pair.background);
          return text && background ? contrastRatio(text, background) : null;
        }),
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, [settings]);

  return (
    <div ref={ref}>
      <TokenTable
        caption="Contraste dos pares de tokens no tema atual"
        columns={["Uso", "Amostra", "Texto / fundo", "Contraste", "WCAG"]}
        rows={contrastPairs.map((pair, index) => {
          const ratio = ratios[index];
          const level =
            ratio === undefined || ratio === null
              ? "…"
              : ratio >= 7
                ? "AAA"
                : ratio >= 4.5
                  ? "AA"
                  : ratio >= 3
                    ? "AA grande"
                    : "Falha";
          return {
            key: `${pair.text}-${pair.background}`,
            cells: [
              pair.use,
              <span
                key="sample"
                style={{
                  display: "inline-block",
                  padding: "var(--taskall-space-4) var(--taskall-space-12)",
                  borderRadius: "var(--taskall-radius-2)",
                  border: "1px solid var(--taskall-border-subtle)",
                  background: `var(${pair.background})`,
                  color: `var(${pair.text})`,
                  font: "var(--taskall-font-label-s)",
                  whiteSpace: "nowrap",
                }}
              >
                Aa Tarefa
              </span>,
              <code key="tokens" style={{ fontSize: 12 }}>
                {pair.text.replace("--taskall-", "")} /{" "}
                {pair.background.replace("--taskall-", "")}
              </code>,
              ratio ? `${ratio.toFixed(2)}:1` : "…",
              <Badge
                key="level"
                size="x-small"
                visualStyle={level === "Falha" ? "filled" : "light"}
              >
                {level}
              </Badge>,
            ],
          };
        })}
      />
    </div>
  );
}

export const meta = () => pageMeta(page);

export default function ColorsPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Cores"
        lead="Cores do TaskAll são tokens semânticos: o nome diz o papel (conteúdo, fundo, ação, status), não a tonalidade. Os valores mudam com o modo de cor e a marca — nunca use hex diretamente."
      />

      <DocSection id="uso" title="Como usar">
        <Prose>
          <p>
            Consuma as cores como CSS Custom Properties dentro de um{" "}
            <code>TaskAllProvider</code>. Os valores exibidos abaixo são lidos
            ao vivo do tema atual — troque modo e marca no topo da página para
            ver a mudança.
          </p>
        </Prose>
        <CodeBlock
          language="css"
          caption="TaskCard.module.css"
          code={`.card {
  background: var(--taskall-background-primary);
  border: 1px solid var(--taskall-border-subtle);
  color: var(--taskall-content-primary);
}

.card[data-state="late"] {
  border-color: var(--taskall-status-warning-outline);
  background: var(--taskall-status-warning-soft);
}`}
        />
      </DocSection>

      {groups.map((group) => (
        <DocSection
          key={group.id}
          id={group.id}
          title={group.title}
          intro={
            <p>
              <InlineCode text={group.intro} />
            </p>
          }
        >
          <ColorGroup tokens={group.tokens} />
        </DocSection>
      ))}

      <DocSection
        id="contraste"
        title="Contraste"
        intro={
          <p>
            Razões WCAG 2.1 calculadas no navegador para os pares mais usados,
            no modo e marca atuais.
          </p>
        }
      >
        <ContrastTable />
        <Callout tone="warning" title="Pares abaixo de 4,5:1">
          <p>
            <code>content-tertiary</code> e alguns tons de marca não atingem AA
            para texto pequeno. Use-os apenas em elementos decorativos, texto
            grande (≥ 24px ou 18,66px bold) ou reforce com outro sinal.
          </p>
        </Callout>
      </DocSection>
    </Article>
  );
}
