import * as React from "react";

import { CodeBlock } from "./CodeBlock";
import { DemoSurface } from "./DemoSurface";
import { InlineCode } from "./Page";
import { Tabs } from "./Tabs";
import styles from "./ExampleBlock.module.css";

type ExampleBlockProps = {
  id: string;
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
  align?: "center" | "start" | "stretch";
};

/** Exemplo com alternância Preview/Código no mesmo bloco. */
export function ExampleBlock({
  id,
  title,
  description,
  code,
  children,
  align,
}: ExampleBlockProps) {
  return (
    <div className={styles.example}>
      <div className={styles.header}>
        <h3 id={id} className={styles.title}>
          <a href={`#${id}`} className={styles.anchor}>
            {title}
          </a>
        </h3>
        {description ? (
          <p className={styles.description}>
            <InlineCode text={description} />
          </p>
        ) : null}
      </div>
      <div className={styles.frame}>
        <Tabs
          label={`${title}: visualização`}
          tabs={[
            {
              id: "preview",
              label: "Preview",
              content: <DemoSurface align={align}>{children}</DemoSurface>,
            },
            {
              id: "code",
              label: "Código",
              content: (
                <CodeBlock code={code} caption="tsx" className={styles.code} />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
