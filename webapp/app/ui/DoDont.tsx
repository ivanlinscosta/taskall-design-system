import * as React from "react";
import { CheckCircleFilled, WarningCircleFilled } from "@taskall/react";

import type { Guideline } from "../lib/doc";
import { DemoSurface } from "./DemoSurface";
import { InlineCode } from "./Page";
import styles from "./DoDont.module.css";

function Card({
  tone,
  text,
  example,
}: {
  tone: "do" | "dont";
  text: string;
  example?: React.ReactNode;
}) {
  const Icon = tone === "do" ? CheckCircleFilled : WarningCircleFilled;
  return (
    <figure className={styles.card} data-tone={tone}>
      {example ? (
        <DemoSurface className={styles.example}>{example}</DemoSurface>
      ) : null}
      <figcaption className={styles.caption}>
        <span className={styles.verdict}>
          <Icon size={20} aria-hidden="true" />
          {tone === "do" ? "Faça" : "Não faça"}
        </span>
        <span>
          <InlineCode text={text} />
        </span>
      </figcaption>
    </figure>
  );
}

export function DoDontList({ items }: { items: Guideline[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.do} className={styles.pair}>
          <Card tone="do" text={item.do} example={item.doExample} />
          <Card tone="dont" text={item.dont} example={item.dontExample} />
        </div>
      ))}
    </div>
  );
}
