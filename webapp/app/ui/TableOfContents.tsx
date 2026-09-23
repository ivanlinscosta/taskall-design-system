import * as React from "react";

import styles from "./TableOfContents.module.css";

type Heading = { id: string; text: string };

/** Lê os <h2 id> da página atual e acompanha a seção visível. */
export function TableOfContents() {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        "[data-docs-article] h2[id]",
      ),
    );
    setHeadings(
      nodes.map((node) => ({
        id: node.id,
        text: node.dataset.tocLabel ?? node.textContent ?? "",
      })),
    );

    if (typeof IntersectionObserver === "undefined" || nodes.length === 0)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        const first = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0];
        if (first) setActiveId(first.target.id);
      },
      { rootMargin: "-72px 0px -70% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return <div aria-hidden="true" />;

  return (
    <nav aria-label="Nesta página" className={styles.toc}>
      <p className={styles.title}>Nesta página</p>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={styles.link}
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
