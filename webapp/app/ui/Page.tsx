import * as React from "react";

import styles from "./Page.module.css";

/** Artigo de documentação: o TOC lê os <h2 id> dentro dele. */
export function Article({ children }: { children: React.ReactNode }) {
  return (
    <article data-docs-article className={styles.article}>
      {children}
    </article>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>
        <InlineCode text={lead} />
      </p>
      {children}
    </header>
  );
}

export function DocSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.sectionTitle}>
        <a href={`#${id}`} className={styles.anchor}>
          {title}
        </a>
      </h2>
      {intro ? <div className={styles.intro}>{intro}</div> : null}
      {children}
    </section>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.subsection}>
      <h3 className={styles.subsectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}

export function Callout({
  tone = "information",
  title,
  children,
}: {
  tone?: "information" | "warning" | "success";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className={styles.callout} data-tone={tone}>
      <p className={styles.calloutTitle}>{title}</p>
      <div className={styles.calloutBody}>{children}</div>
    </aside>
  );
}

export function BulletList({
  items,
  tone,
}: {
  items: string[];
  tone?: "positive" | "negative";
}) {
  return (
    <ul className={styles.bullets} data-tone={tone}>
      {items.map((item) => (
        <li key={item}>
          <InlineCode text={item} />
        </li>
      ))}
    </ul>
  );
}

/** Renderiza `trechos` entre crases como <code>, para textos vindos de dados. */
export function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={index}>{part.slice(1, -1)}</code>
        ) : (
          part
        ),
      )}
    </>
  );
}
