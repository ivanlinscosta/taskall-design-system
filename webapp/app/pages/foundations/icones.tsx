import * as React from "react";
import * as TaskAll from "@taskall/react";
import {
  Dropdown,
  iconSearchIndex,
  MagnifyingGlass,
  TextInput,
  type IconComponent,
} from "@taskall/react";

import { rankBy } from "../../lib/fuzzy";
import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { DemoSurface } from "../../ui/DemoSurface";
import { TokenTable } from "../../ui/Foundation";
import {
  Article,
  BulletList,
  Callout,
  DocSection,
  PageHeader,
  Prose,
} from "../../ui/Page";
import styles from "./foundations.module.css";

const page = findPage("fundamentos", "icones");

/** Ícones de interface fora do conjunto oficial, mantidos na biblioteca. */
const COMPLEMENTARY = new Set([
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Menu",
  "Minus",
  "More",
]);

/** Nomes da API anterior que apontam para desenhos do conjunto oficial. */
const ALIASES: Array<[string, string]> = [
  ["Bell", "BellNotification"],
  ["Calendar", "BlankCalendar"],
  [
    "ChevronDown / Up / Left / Right",
    "TaillessLineArrowDown / Up / Left / Right",
  ],
  ["Close", "Delete"],
  ["Download", "DownloadTray"],
  ["Link", "LinkChain"],
  ["Mail", "MailSendEnvelope"],
  ["Search", "MagnifyingGlass"],
  ["Settings", "Cog"],
  ["Upload", "UploadTray"],
  ["User", "UserCircleSingle"],
];

const registry = TaskAll as unknown as Record<string, unknown>;

function getIcon(name: string): IconComponent | undefined {
  const candidate = registry[name];
  return typeof candidate === "function"
    ? (candidate as IconComponent)
    : undefined;
}

const officialCount = iconSearchIndex.filter(
  (item) => !COMPLEMENTARY.has(item.componentName),
).length;

const sizes = ["16", "20", "24", "32"];
const colors = [
  { value: "--taskall-content-primary", label: "Conteúdo" },
  { value: "--taskall-content-secondary", label: "Secundário" },
  { value: "--taskall-brand", label: "Marca" },
  { value: "--taskall-status-error", label: "Erro" },
  { value: "--taskall-status-success", label: "Sucesso" },
];
const sets = [
  { value: "todos", label: "Todos" },
  { value: "oficial", label: "Conjunto oficial" },
  { value: "complementar", label: "Complementares" },
];

function IconLibrary() {
  const [query, setQuery] = React.useState("");
  const [size, setSize] = React.useState("24");
  const [color, setColor] = React.useState("--taskall-content-primary");
  const [set, setSet] = React.useState("todos");
  const [copied, setCopied] = React.useState<string | null>(null);

  const results = React.useMemo(
    () =>
      rankBy(
        iconSearchIndex.filter((item) =>
          set === "todos"
            ? true
            : (set === "complementar") ===
              COMPLEMENTARY.has(item.componentName),
        ),
        query,
        (item) => [
          { text: item.componentName, weight: 3 },
          { text: item.name, weight: 2 },
          { text: item.keywords.join(" "), weight: 1, fuzzy: false },
        ],
      ),
    [query, set],
  );

  React.useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(
        `import { ${name} } from "@taskall/react";`,
      );
      setCopied(name);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div style={{ display: "grid", gap: "var(--taskall-space-16)" }}>
      <div className={styles.iconToolbar}>
        <div style={{ flex: "1 1 240px" }}>
          <TextInput
            label="Buscar ícone"
            placeholder="Ex.: lixeira, calendário, sparkle"
            leftIcon={MagnifyingGlass}
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </div>
        <div style={{ width: 170 }}>
          <Dropdown
            label="Conjunto"
            options={sets}
            value={set}
            onValueChange={setSet}
          />
        </div>
        <div style={{ width: 120 }}>
          <Dropdown
            label="Tamanho"
            options={sizes.map((value) => ({ value, label: `${value}px` }))}
            value={size}
            onValueChange={setSize}
          />
        </div>
        <div style={{ width: 150 }}>
          <Dropdown
            label="Cor"
            options={colors}
            value={color}
            onValueChange={setColor}
          />
        </div>
      </div>
      <p
        role="status"
        style={{
          margin: 0,
          font: "var(--taskall-font-paragraph-s)",
          color: "var(--taskall-content-secondary)",
        }}
      >
        {copied
          ? `Importação de ${copied} copiada.`
          : `${results.length} de ${iconSearchIndex.length} ícones. Clique para copiar a importação.`}
      </p>
      <DemoSurface align="stretch">
        <ul className={styles.iconGrid}>
          {results.map((item) => {
            const Icon = getIcon(item.componentName);
            return (
              <li key={item.name}>
                <button
                  type="button"
                  className={styles.iconButton}
                  data-copied={copied === item.componentName}
                  onClick={() => copy(item.componentName)}
                  aria-label={`${item.componentName}: copiar importação`}
                  title={item.keywords.join(", ")}
                >
                  {Icon ? (
                    <Icon
                      size={Number(size)}
                      aria-hidden="true"
                      style={{ color: `var(${color})` }}
                    />
                  ) : null}
                  <span className={styles.iconName}>{item.componentName}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </DemoSurface>
    </div>
  );
}

export const meta = () => pageMeta(page);

export default function IconsPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Ícones"
        lead={`${officialCount} ícones oficiais do Task All em SVG (grade 20×20, preenchimento em currentColor), exportados como componentes React por @taskall/react. A cor vem do texto ao redor.`}
      />
      <DocSection id="biblioteca" title="Biblioteca">
        <IconLibrary />
      </DocSection>
      <DocSection id="uso" title="Como usar">
        <CodeBlock
          caption="Uso"
          code={`import { BellNotification, Button, IconButton, RecycleBin } from "@taskall/react";

// Decorativo (padrão): aria-hidden automático
<BellNotification size={16} />

// Em componentes que aceitam ícone
<Button leftIcon={BellNotification}>Lembrar turma</Button>
<IconButton icon={RecycleBin} aria-label="Excluir tarefa" tone="error" />

// Ícone com significado próprio: passe title
<BellNotification title="Notificações não lidas" />`}
        />
        <BulletList
          items={[
            "Sem `title`, o SVG recebe `aria-hidden` — ideal ao lado de texto.",
            'Com `title`, vira `role="img"` com nome acessível.',
            "Botões só com ícone: use IconButton (o `aria-label` é obrigatório).",
            "Tamanhos recomendados: 16 (inline), 20 (padrão, grade nativa) e 24 (destaque).",
            "Cor: nunca passe hex — o ícone herda `color`; use tokens (`--taskall-content-*`, `--taskall-status-*`).",
            "A busca usa `iconSearchIndex`, exportado pela biblioteca, com palavras-chave em PT e EN.",
          ]}
        />
      </DocSection>
      <DocSection id="nomes" title="Nomes e compatibilidade">
        <Prose>
          <p>
            Os nomes seguem os arquivos do conjunto oficial em PascalCase (
            <code>bell-notification.svg</code> → <code>BellNotification</code>).
            No conjunto, <code>Delete</code> é o “X” de fechar e{" "}
            <code>RecycleBin</code> é a lixeira; as setas sem haste são{" "}
            <code>TaillessLineArrow*</code>.
          </p>
        </Prose>
        <TokenTable
          caption="Aliases de compatibilidade"
          columns={[
            "Nome anterior (ainda exportado)",
            "Desenho do conjunto oficial",
          ]}
          rows={ALIASES.map(([legacy, target]) => ({
            key: legacy,
            cells: [
              <code key="l">{legacy}</code>,
              <code key="t">{target}</code>,
            ],
          }))}
        />
        <Callout title="Complementares">
          <p>
            <code>ArrowUp/Down/Left/Right</code>, <code>Menu</code>,{" "}
            <code>More</code> e <code>Minus</code> não existem no conjunto
            oficial e continuam na biblioteca com o desenho anterior (o Checkbox
            usa <code>Minus</code> no estado parcial). Quando o conjunto oficial
            ganhar equivalentes, eles viram aliases.
          </p>
        </Callout>
      </DocSection>
      <DocSection id="novos-icones" title="Adicionar ícones">
        <CodeBlock
          language="shell"
          caption="terminal"
          code={`# 1. Coloque o SVG (20×20) em library/src/assets/icons/nome-do-icone.svg
# 2. Gere os componentes, o índice e as palavras-chave
pnpm --filter @taskall/react generate:icons`}
        />
      </DocSection>
    </Article>
  );
}
