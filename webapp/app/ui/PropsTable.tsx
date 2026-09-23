import { getApi } from "../lib/api";
import styles from "./PropsTable.module.css";

type PropsTableProps = {
  name: string;
  descriptions: Record<string, string>;
  native?: string;
};

/** Tabela de API gerada dos tipos TS reais (generated/api.json) + descrições em PT-BR. */
export function PropsTable({ name, descriptions, native }: PropsTableProps) {
  const entry = getApi(name);
  const isComponent =
    /^[A-Z]/.test(name) && !["DropdownOption", "TabItem"].includes(name);
  const caption = isComponent ? `${name}Props` : name;
  const captionId = `api-${name}`;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.scroller}
        tabIndex={0}
        role="region"
        aria-labelledby={captionId}
      >
        <div className={styles.caption}>
          <h3 id={captionId} className={styles.captionTitle}>
            <code>{caption}</code>
          </h3>
          <span className={styles.source}>{entry.source}</span>
        </div>
        <table className={styles.table} aria-labelledby={captionId}>
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Tipo</th>
              <th scope="col">Padrão</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {entry.props.map((prop) => (
              <tr key={prop.name}>
                <th scope="row">
                  <code className={styles.name}>{prop.name}</code>
                  {prop.required ? (
                    <span className={styles.required}>obrigatória</span>
                  ) : null}
                </th>
                <td>
                  <code className={styles.type}>{prop.type}</code>
                </td>
                <td>
                  {prop.defaultValue ? (
                    <code>{prop.defaultValue}</code>
                  ) : (
                    <span aria-label="sem padrão">—</span>
                  )}
                </td>
                <td className={styles.description}>
                  {descriptions[prop.name] ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {native ? (
        <p className={styles.native}>
          Também aceita os atributos nativos de <code>{native}</code> (
          <code>className</code>, <code>style</code>, <code>aria-*</code>,{" "}
          <code>data-*</code>, eventos…), repassados via <code>...props</code>.
        </p>
      ) : null}
    </div>
  );
}
