import * as React from "react";
import { Outlet, useLocation } from "react-router";

import { SideNav } from "../ui/SideNav";
import { TableOfContents } from "../ui/TableOfContents";
import styles from "./docs.module.css";

export default function DocsLayout() {
  const { pathname } = useLocation();
  const mainRef = React.useRef<HTMLElement>(null);
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!window.location.hash) {
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <SideNav idPrefix="sidebar" />
      </aside>
      <main id="conteudo" ref={mainRef} tabIndex={-1} className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
        <TableOfContents key={pathname} />
      </main>
    </div>
  );
}
