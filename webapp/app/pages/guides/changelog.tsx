import { Badge } from "@taskall/react";

import { findPage } from "../../lib/registry";
import { pageMeta } from "../../ui/ComponentPage";
import {
  Article,
  DocSection,
  InlineCode,
  PageHeader,
  Prose,
} from "../../ui/Page";
import styles from "./changelog.module.css";

const page = findPage("guias", "changelog");

/** Changesets pendentes do repositório, lidos no build. */
const changesetFiles = import.meta.glob<string>("../../../../.changeset/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

type Entry = { id: string; bump: string; summary: string };

function parseChangeset(id: string, source: string): Entry | null {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const bump = match[1]?.match(/:\s*(major|minor|patch)/)?.[1] ?? "patch";
  return { id, bump, summary: (match[2] ?? "").trim() };
}

const pending = Object.entries(changesetFiles)
  .map(([path, source]) =>
    parseChangeset(path.split("/").pop()?.replace(".md", "") ?? path, source),
  )
  .filter((entry): entry is Entry => entry !== null);

const bumpOrder = { major: 0, minor: 1, patch: 2 } as const;

export const meta = () => pageMeta(page);

export default function ChangelogPage() {
  const sorted = [...pending].sort(
    (a, b) =>
      bumpOrder[a.bump as keyof typeof bumpOrder] -
      bumpOrder[b.bump as keyof typeof bumpOrder],
  );

  return (
    <Article>
      <PageHeader
        eyebrow="Guias"
        title="Changelog"
        lead="Versões de @taskall/react. As mudanças ainda não publicadas vêm direto dos changesets do repositório."
      />
      <DocSection id="nao-publicado" title="Não publicado">
        {sorted.length === 0 ? (
          <Prose>
            <p>Nenhuma mudança pendente.</p>
          </Prose>
        ) : (
          <ul className={styles.list}>
            {sorted.map((entry) => (
              <li key={entry.id} className={styles.item}>
                <Badge
                  size="small"
                  visualStyle={entry.bump === "patch" ? "outline" : "light"}
                >
                  {entry.bump}
                </Badge>
                <div className={styles.body}>
                  {entry.summary.split(/\n\n+/).map((paragraph) => (
                    <p key={paragraph}>
                      <InlineCode text={paragraph} />
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </DocSection>
      <DocSection id="v0-0-1" title="0.0.1">
        <Prose>
          <p>
            Base inicial: tokens (claro/escuro, 4 marcas, 3 densidades, 3
            formas), TaskAllProvider, componentes, sistema de ícones, Storybook
            e suíte Vitest.
          </p>
        </Prose>
      </DocSection>
    </Article>
  );
}
