import * as React from "react";
import { Badge } from "@hive/react";

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
      { name: "Primary", token: "--hive-content-primary" },
      { name: "Secondary", token: "--hive-content-secondary" },
      { name: "Tertiary", token: "--hive-content-tertiary" },
      { name: "Inverse", token: "--hive-content-inverse" },
      { name: "Disabled", token: "--hive-content-disabled" },
      { name: "On brand", token: "--hive-content-on-brand" },
      { name: "On soft", token: "--hive-content-on-soft" },
    ],
  },
  {
    id: "fundo",
    title: "Fundo",
    intro:
      "Superfícies em camadas: `primary` é a página, `secondary`/`tertiary` agrupam conteúdo.",
    tokens: [
      { name: "Primary", token: "--hive-background-primary" },
      { name: "Secondary", token: "--hive-background-secondary" },
      { name: "Tertiary", token: "--hive-background-tertiary" },
      { name: "Inverse", token: "--hive-background-inverse" },
      { name: "Disabled", token: "--hive-background-disabled" },
      { name: "Hover", token: "--hive-background-hover" },
    ],
  },
  {
    id: "borda",
    title: "Borda",
    intro:
      "Divisores e contornos. `subtle` separa, `default` delimita campos, `strong` destaca.",
    tokens: [
      { name: "Default", token: "--hive-border-default" },
      { name: "Subtle", token: "--hive-border-subtle" },
      { name: "Strong", token: "--hive-border-strong" },
      { name: "Inverse", token: "--hive-border-inverse" },
    ],
  },
  {
    id: "marca",
    title: "Marca",
    intro:
      "Mudam com `brand` (Coral, Gestão, Estudantes, Responsáveis) e com o modo de cor.",
    tokens: [
      { name: "Brand", token: "--hive-brand" },
      { name: "Soft", token: "--hive-brand-soft" },
      { name: "Hover", token: "--hive-brand-hover" },
      { name: "Active", token: "--hive-brand-active" },
      { name: "Soft hover", token: "--hive-brand-soft-hover" },
    ],
  },
  {
    id: "acao",
    title: "Ação",
    intro: "Usados por Button e controles. `primary` é um alias da marca.",
    tokens: [
      { name: "Primary", token: "--hive-action-primary" },
      { name: "Primary contrast", token: "--hive-action-primary-contrast" },
      { name: "Neutral fill", token: "--hive-action-neutral-fill" },
      { name: "Neutral light", token: "--hive-action-neutral-light" },
      { name: "Error fill", token: "--hive-action-error-fill" },
      { name: "Error light", token: "--hive-action-error-light" },
      { name: "Disabled fill", token: "--hive-action-disabled-fill" },
      { name: "Disabled contrast", token: "--hive-action-disabled-contrast" },
    ],
  },
  {
    id: "status",
    title: "Status",
    intro:
      "Feedback semântico. Cada status tem `soft`, `outline` e `contrast` para compor fundos, bordas e texto sobre cor.",
    tokens: ["information", "success", "warning", "error", "update"].flatMap(
      (status) => [
        { name: status, token: `--hive-status-${status}` },
        { name: `${status} soft`, token: `--hive-status-${status}-soft` },
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
      token: `--hive-progress-${tone}`,
    })),
  },
];

const contrastPairs = [
  {
    text: "--hive-content-primary",
    background: "--hive-background-primary",
    use: "Texto principal",
  },
  {
    text: "--hive-content-secondary",
    background: "--hive-background-primary",
    use: "Texto de apoio",
  },
  {
    text: "--hive-content-secondary",
    background: "--hive-background-secondary",
    use: "Apoio em superfície",
  },
  {
    text: "--hive-content-tertiary",
    background: "--hive-background-primary",
    use: "Placeholder / decorativo",
  },
  {
    text: "--hive-content-on-brand",
    background: "--hive-brand",
    use: "Texto sobre a marca",
  },
  {
    text: "--hive-content-on-soft",
    background: "--hive-brand-soft",
    use: "Texto sobre marca suave",
  },
  {
    text: "--hive-action-neutral-contrast",
    background: "--hive-action-neutral-fill",
    use: "Botão neutral filled",
  },
  {
    text: "--hive-action-error-contrast",
    background: "--hive-action-error-fill",
    use: "Botão error filled",
  },
  {
    text: "--hive-status-error",
    background: "--hive-background-primary",
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
                  padding: "var(--hive-space-4) var(--hive-space-12)",
                  borderRadius: "var(--hive-radius-2)",
                  border: "1px solid var(--hive-border-subtle)",
                  background: `var(${pair.background})`,
                  color: `var(${pair.text})`,
                  font: "var(--hive-font-label-s)",
                  whiteSpace: "nowrap",
                }}
              >
                Aa Tarefa
              </span>,
              <code key="tokens" style={{ fontSize: 12 }}>
                {pair.text.replace("--hive-", "")} /{" "}
                {pair.background.replace("--hive-", "")}
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
        lead="Cores do Hive são tokens semânticos: o nome diz o papel (conteúdo, fundo, ação, status), não a tonalidade. Os valores mudam com o modo de cor e a marca — nunca use hex diretamente."
      />

      <DocSection id="uso" title="Como usar">
        <Prose>
          <p>
            Consuma as cores como CSS Custom Properties dentro de um{" "}
            <code>HiveProvider</code>. Os valores exibidos abaixo são lidos ao
            vivo do tema atual — troque modo e marca no topo da página para ver
            a mudança.
          </p>
        </Prose>
        <CodeBlock
          language="css"
          caption="TaskCard.module.css"
          code={`.card {
  background: var(--hive-background-primary);
  border: 1px solid var(--hive-border-subtle);
  color: var(--hive-content-primary);
}

.card[data-state="late"] {
  border-color: var(--hive-status-warning-outline);
  background: var(--hive-status-warning-soft);
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
