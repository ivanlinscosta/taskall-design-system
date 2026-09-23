import * as React from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Close, Logo, Menu, Search } from "@taskall/react";

import { NAV_GROUPS } from "../lib/registry";
import { useSearch } from "./SearchDialog";
import { SideNav } from "./SideNav";
import { ColorModeToggle, ThemeControls } from "./ThemeControls";
import styles from "./SiteHeader.module.css";

function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== "function") return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-label="Menu de navegação"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className={styles.drawerHeader}>
        <Link
          to="/"
          className={styles.brand}
          onClick={onClose}
          aria-label="TaskAll Design System — início"
        >
          <Logo className={styles.logo} title="" />
        </Link>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Fechar menu"
          onClick={onClose}
        >
          <Close size={20} aria-hidden="true" />
        </button>
      </div>
      <SideNav idPrefix="drawer" onNavigate={onClose} />
    </dialog>
  );
}

export function SiteHeader() {
  const { openSearch } = useSearch();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => setDrawerOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.menuButton}`}
          aria-label="Abrir menu de navegação"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <Link
          to="/"
          className={styles.brand}
          aria-label="TaskAll Design System — início"
        >
          <Logo className={styles.logo} title="" />
          <span className={styles.brandTag}>Design System</span>
        </Link>

        <nav aria-label="Seções" className={styles.sections}>
          {NAV_GROUPS.map((group) => (
            <NavLink
              key={group.id}
              to={group.path}
              className={({ isActive }) =>
                isActive || pathname.startsWith(`/${group.id}`)
                  ? `${styles.sectionLink} ${styles.sectionLinkActive}`
                  : styles.sectionLink
              }
            >
              {group.title}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.search}
            onClick={openSearch}
            aria-keyshortcuts="Control+K Meta+K /"
          >
            <Search size={16} aria-hidden="true" />
            <span className={styles.searchLabel}>Buscar</span>
            <kbd className={styles.searchKbd} aria-hidden="true">
              ⌘K
            </kbd>
          </button>
          <ThemeControls />
          <ColorModeToggle />
        </div>
      </div>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
