import { Link } from "react-router";
import { Heading, Paragraph } from "@hive/react";

import styles from "./not-found.module.css";

export const meta = () => [
  { title: "Página não encontrada · Hive Design System" },
];

export default function NotFound() {
  return (
    <main id="conteudo" tabIndex={-1} className={styles.page}>
      <p className={styles.code}>404</p>
      <Heading level={1} as={3}>
        Página não encontrada
      </Heading>
      <Paragraph>
        O endereço pode ter mudado. Use a busca (⌘K) ou volte para o início.
      </Paragraph>
      <Link to="/" className={styles.link}>
        Ir para o início
      </Link>
    </main>
  );
}
