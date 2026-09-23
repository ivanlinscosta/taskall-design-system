import * as React from "react";
import { highlight, type LanguageName } from "sugar-high";
import { HiveProvider } from "@hive/react";

import { useSettings } from "../lib/settings";
import styles from "./CodeBlock.module.css";

type CodeBlockProps = {
  code: string;
  language?: LanguageName;
  /** Rótulo exibido acima do código (ex.: nome do arquivo). */
  caption?: string;
  className?: string;
};

export function CopyButton({
  text,
  label = "Copiar código",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button type="button" className={styles.copy} onClick={copy}>
        {copied ? "Copiado" : label}
      </button>
      <span className="visually-hidden" aria-live="polite">
        {copied ? "Código copiado para a área de transferência." : ""}
      </span>
    </>
  );
}

/**
 * Bloco de código com realce de sintaxe. Sempre renderizado em modo escuro
 * (tokens dark do Hive) para contraste consistente em ambos os temas.
 */
export function CodeBlock({
  code,
  language = "typescript",
  caption,
  className,
}: CodeBlockProps) {
  const { settings } = useSettings();
  const html = React.useMemo(
    () => highlight(code, { lang: language }),
    [code, language],
  );

  return (
    <HiveProvider
      colorMode="dark"
      brand={settings.brand}
      className={[styles.block, className].filter(Boolean).join(" ")}
    >
      <div className={styles.toolbar}>
        <span className={styles.caption}>{caption ?? language}</span>
        <CopyButton text={code} />
      </div>
      <pre
        className={styles.pre}
        tabIndex={0}
        aria-label={caption ? `Código: ${caption}` : "Código"}
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </HiveProvider>
  );
}
