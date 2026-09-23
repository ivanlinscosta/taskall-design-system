import * as React from "react";
import type { MetaDescriptor } from "react-router";

import type { ComponentDoc, ExampleKind } from "../lib/doc";
import { pageTitle, type NavItem } from "../lib/registry";
import { CodeBlock } from "./CodeBlock";
import { DoDontList } from "./DoDont";
import { ExampleBlock } from "./ExampleBlock";
import {
  Article,
  BulletList,
  DocSection,
  InlineCode,
  PageHeader,
  SubSection,
} from "./Page";
import { Playground } from "./Playground";
import { PropsTable } from "./PropsTable";
import { ThemeMatrix } from "./ThemeMatrix";
import styles from "./ComponentPage.module.css";

const KIND_TITLES: Record<ExampleKind, string> = {
  variantes: "Variantes",
  estados: "Estados",
  aplicado: "Aplicado no Task All",
};

export function pageMeta(page: NavItem): MetaDescriptor[] {
  return [
    { title: pageTitle(page.title) },
    { name: "description", content: page.summary },
  ];
}

/** Template único para todas as páginas de componente. */
export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const [values, setValues] = React.useState(doc.playground.initial);
  const kinds = (Object.keys(KIND_TITLES) as ExampleKind[]).filter((kind) =>
    doc.examples.some((item) => item.kind === kind),
  );
  const importNames = doc.api
    .map((entry) => entry.name)
    .filter((name) => !["DropdownOption", "TabItem"].includes(name));

  return (
    <Article>
      <PageHeader
        eyebrow="Componente"
        title={doc.page.title}
        lead={doc.description}
      >
        <div className={styles.meta}>
          <code
            className={styles.import}
          >{`import { ${importNames.join(", ")} } from "@hive/react";`}</code>
        </div>
      </PageHeader>

      <DocSection id="visao-geral" title="Visão geral">
        <div className={styles.usage}>
          <SubSection title="Quando usar">
            <BulletList items={doc.whenToUse} tone="positive" />
          </SubSection>
          <SubSection title="Quando não usar">
            <BulletList items={doc.whenNotToUse} tone="negative" />
          </SubSection>
        </div>
      </DocSection>

      <DocSection
        id="playground"
        title="Playground"
        intro={
          <p>
            Ajuste as props e copie o código gerado. O tema global (menu “Tema”)
            também se aplica aqui.
          </p>
        }
      >
        <Playground
          spec={doc.playground}
          values={values}
          onChange={setValues}
        />
      </DocSection>

      <DocSection id="exemplos" title="Exemplos">
        {kinds.map((kind) => (
          <div key={kind} className={styles.exampleGroup}>
            <p className={styles.kind}>{KIND_TITLES[kind]}</p>
            {doc.examples
              .filter((item) => item.kind === kind)
              .map((item) => (
                <ExampleBlock
                  key={item.id}
                  id={`exemplo-${item.id}`}
                  title={item.title}
                  description={item.description}
                  code={item.code}
                  align={kind === "aplicado" ? "stretch" : "center"}
                >
                  <item.Component />
                </ExampleBlock>
              ))}
          </div>
        ))}
      </DocSection>

      <DocSection
        id="temas"
        title="Temas, densidades e formas"
        intro={
          <p>
            O estado atual do playground renderizado em cada variação do
            HiveProvider.
          </p>
        }
      >
        <ThemeMatrix render={() => doc.playground.render(values)} />
      </DocSection>

      <DocSection id="boas-praticas" title="Do’s and Don’ts">
        <DoDontList items={doc.guidelines} />
      </DocSection>

      <DocSection id="acessibilidade" title="Acessibilidade">
        <ul className={styles.notes}>
          {doc.accessibility.notes.map((note) => (
            <li key={note}>
              <InlineCode text={note} />
            </li>
          ))}
        </ul>
        {doc.accessibility.keyboard.length > 0 ? (
          <div className={styles.keyboard}>
            <table>
              <caption>Teclado</caption>
              <thead>
                <tr>
                  <th scope="col">Tecla</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {doc.accessibility.keyboard.map((row) => (
                  <tr key={row.keys}>
                    <th scope="row">
                      {row.keys
                        .split(/( \+ | \/ )/)
                        .map((part, index) =>
                          index % 2 === 1 ? (
                            <React.Fragment key={index}>{part}</React.Fragment>
                          ) : (
                            <kbd key={index}>{part}</kbd>
                          ),
                        )}
                    </th>
                    <td>
                      <InlineCode text={row.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </DocSection>

      <DocSection id="api" title="API">
        {doc.api.map((entry) => (
          <PropsTable
            key={entry.name}
            name={entry.name}
            descriptions={entry.descriptions}
            native={entry.native}
          />
        ))}
      </DocSection>

      <DocSection id="codigo" title="Código">
        <CodeBlock code={doc.usage} caption={`${doc.page.title}.tsx`} />
      </DocSection>
    </Article>
  );
}
