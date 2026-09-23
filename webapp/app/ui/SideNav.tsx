import { NavLink } from "react-router";

import { NAV_GROUPS } from "../lib/registry";
import styles from "./SideNav.module.css";

export function SideNav({
  onNavigate,
  idPrefix,
}: {
  onNavigate?: () => void;
  idPrefix: string;
}) {
  return (
    <nav aria-label="Documentação" className={styles.nav}>
      {NAV_GROUPS.map((group) => {
        const headingId = `${idPrefix}-${group.id}`;
        return (
          <section
            key={group.id}
            className={styles.group}
            aria-labelledby={headingId}
          >
            <h2 id={headingId} className={styles.groupTitle}>
              {group.title}
            </h2>
            <ul className={styles.list}>
              {group.id === "componentes" ? (
                <li>
                  <NavLink
                    to="/componentes"
                    end
                    className={styles.link}
                    onClick={onNavigate}
                  >
                    Visão geral
                  </NavLink>
                </li>
              ) : null}
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={styles.link}
                    onClick={onNavigate}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}
