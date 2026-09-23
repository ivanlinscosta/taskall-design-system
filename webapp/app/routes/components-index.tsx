import { Link } from "react-router";

import { COMPONENTS, pageTitle } from "../lib/registry";
import { Article, DocSection, PageHeader } from "../ui/Page";
import styles from "./components-index.module.css";

export const meta = () => [
  { title: pageTitle("Componentes") },
  {
    name: "description",
    content: "Todos os componentes React do TaskAll, em ordem alfabética.",
  },
];

export default function ComponentsIndex() {
  return (
    <Article>
      <PageHeader
        eyebrow="Componentes"
        title="Componentes"
        lead={`${COMPONENTS.length} componentes React acessíveis, tipados e temáveis. Cada página traz playground, exemplos aplicados ao Task All, API e acessibilidade.`}
      />
      <DocSection id="todos" title="Todos os componentes">
        <ul className={styles.grid}>
          {COMPONENTS.map((item) => (
            <li key={item.slug}>
              <Link to={item.path} className={styles.card}>
                <span className={styles.name}>{item.title}</span>
                <span className={styles.summary}>{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </DocSection>
    </Article>
  );
}
