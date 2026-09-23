import { Link } from "react-router";

import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { TokenTable, useComputedTokens } from "../../ui/Foundation";
import {
  Article,
  BulletList,
  DocSection,
  PageHeader,
  Prose,
} from "../../ui/Page";

const page = findPage("fundamentos", "tipografia");

type Style = {
  name: string;
  font: string;
  size: string;
  lineHeight: string;
  weight: string;
  use: string;
};

function scale(
  prefix: string,
  names: string[],
  sizePrefix: string,
  weight: string,
  use: string[],
): Style[] {
  return names.map((name, index) => ({
    name: `${prefix} ${name.toUpperCase()}`,
    font: `--taskall-font-${prefix.toLowerCase()}-${name}`,
    size: `--taskall-font-size-${sizePrefix}-${name}`,
    lineHeight: `--taskall-line-height-${sizePrefix}-${name}`,
    weight,
    use: use[index] ?? "",
  }));
}

const groups: Array<{
  id: string;
  title: string;
  intro: string;
  styles: Style[];
}> = [
  {
    id: "display",
    title: "Display",
    intro: "Números e títulos de destaque (hero, indicadores de painel). Bold.",
    styles: [1, 2, 3, 4].map((level) => ({
      name: `Display ${level}`,
      font: `--taskall-font-display-${level}`,
      size: `--taskall-font-size-display-${level}`,
      lineHeight: `--taskall-line-height-display-${level}`,
      weight: "700",
      use:
        level === 1
          ? "Indicador principal"
          : level === 4
            ? "Título de landing"
            : "Destaques",
    })),
  },
  {
    id: "headings",
    title: "Headings",
    intro:
      "Estrutura de páginas e seções, via componente Heading. h1–h4 bold, h5–h6 semibold.",
    styles: [1, 2, 3, 4, 5, 6].map((level) => ({
      name: `Heading ${level}`,
      font: `--taskall-font-h${level}`,
      size: `--taskall-font-size-h${level}`,
      lineHeight: `--taskall-line-height-h${level}`,
      weight: level <= 4 ? "700" : "600",
      use:
        [
          "Título de página",
          "Seção principal",
          "Seção",
          "Subseção",
          "Card / modal",
          "Grupo",
        ][level - 1] ?? "",
    })),
  },
  {
    id: "paragrafos",
    title: "Parágrafos",
    intro: "Texto corrido, via componente Paragraph. Regular.",
    styles: scale("Paragraph", ["l", "m", "s", "xs"], "paragraph", "400", [
      "Introduções",
      "Padrão",
      "Apoio / tabelas",
      "Metadados",
    ]),
  },
  {
    id: "labels",
    title: "Labels e links",
    intro:
      "Rótulos de interface (LabelText, botões, campos) e links. Semibold (link XS bold).",
    styles: [
      ...scale("Label", ["l", "m", "s", "xs"], "paragraph", "600", [
        "Destaques",
        "Botões / campos",
        "Controles pequenos",
        "Legendas",
      ]),
      ...["m", "s", "xs"].map((size) => ({
        name: `Link ${size.toUpperCase()}`,
        font: `--taskall-font-link-${size}`,
        size: `--taskall-font-size-paragraph-${size}`,
        lineHeight: `--taskall-line-height-paragraph-${size}`,
        weight: size === "xs" ? "700" : "600",
        use: "Links inline",
      })),
    ],
  },
];

function TypeScale({ styles, title }: { styles: Style[]; title: string }) {
  const [ref, values] = useComputedTokens<HTMLDivElement>(
    styles.flatMap((style) => [style.size, style.lineHeight]),
  );
  return (
    <div ref={ref}>
      <TokenTable
        caption={`Escala tipográfica: ${title}`}
        columns={["Estilo", "Amostra", "Token", "Tamanho / altura", "Uso"]}
        rows={styles.map((style) => ({
          key: style.font,
          cells: [
            style.name,
            <span
              key="sample"
              style={{ font: `var(${style.font})`, whiteSpace: "nowrap" }}
            >
              Tarefa 3
            </span>,
            <code key="token" style={{ fontSize: 12 }}>
              {style.font}
            </code>,
            `${values[style.size] || "…"} / ${values[style.lineHeight] || "…"} · ${style.weight}`,
            style.use,
          ],
        }))}
      />
    </div>
  );
}

export const meta = () => pageMeta(page);

export default function TypographyPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Fundamentos"
        title="Tipografia"
        lead="Uma família (Archivo), três pesos e tokens compostos (--taskall-font-*) que já trazem peso, tamanho, altura de linha e família."
      />
      <DocSection id="uso" title="Como usar">
        <Prose>
          <p>
            Prefira os componentes{" "}
            <Link to="/componentes/heading">Heading</Link>,{" "}
            <Link to="/componentes/paragraph">Paragraph</Link> e{" "}
            <Link to="/componentes/label-text">LabelText</Link>. Em CSS próprio,
            use o token composto na propriedade <code>font</code>:
          </p>
        </Prose>
        <CodeBlock
          language="css"
          caption="Resumo.module.css"
          code={`.title {
  font: var(--taskall-font-h5);
}

.meta {
  font: var(--taskall-font-paragraph-xs);
  color: var(--taskall-content-secondary);
}`}
        />
        <BulletList
          items={[
            "Fonte: Archivo (400, 600, 700), com fallback `system-ui`. Carregue os pesos no app (ex.: `@fontsource/archivo`).",
            "Pesos por token: `--taskall-weight-regular`, `--taskall-weight-semibold`, `--taskall-weight-bold`.",
            "Tamanhos em px fixos: respeite o zoom do navegador e evite reduzir abaixo de 12px.",
          ]}
        />
      </DocSection>
      {groups.map((group) => (
        <DocSection
          key={group.id}
          id={group.id}
          title={group.title}
          intro={<p>{group.intro}</p>}
        >
          <TypeScale styles={group.styles} title={group.title} />
        </DocSection>
      ))}
    </Article>
  );
}
