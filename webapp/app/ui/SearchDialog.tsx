import * as React from "react";
import { useNavigate } from "react-router";
import { Modal, Search, TextInput } from "@taskall/react";

import { rankBy } from "../lib/fuzzy";
import { ALL_PAGES, type NavItem } from "../lib/registry";
import styles from "./SearchDialog.module.css";

type SearchContextValue = { openSearch: () => void };

const SearchContext = React.createContext<SearchContextValue>({
  openSearch: () => {},
});

export function useSearch() {
  return React.useContext(SearchContext);
}

const SECTION_LABEL: Record<NavItem["section"], string> = {
  fundamentos: "Fundamentos",
  componentes: "Componente",
  guias: "Guia",
};

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const isSlash = event.key === "/" && !isTypingTarget(event.target);
      if (isShortcut || isSlash) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = React.useMemo(() => ({ openSearch: () => setOpen(true) }), []);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Buscar na documentação"
        description="Digite o nome de um componente, fundamento ou guia. Use as setas para navegar e Enter para abrir."
        width={600}
        className={styles.modal}
      >
        {open ? <SearchPanel onNavigate={() => setOpen(false)} /> : null}
      </Modal>
    </SearchContext.Provider>
  );
}

function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const listId = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Foca o campo antes do FocusScope do Radix (que mantém o foco já interno).
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = React.useMemo(
    () =>
      rankBy(ALL_PAGES, query, (item) => [
        { text: item.title, weight: 3 },
        { text: item.keywords.join(" "), weight: 2, fuzzy: false },
        { text: item.summary, weight: 1, fuzzy: false },
      ]).slice(0, 12),
    [query],
  );

  React.useEffect(() => setActiveIndex(0), [query]);

  const go = (item: NavItem | undefined) => {
    if (!item) return;
    onNavigate();
    navigate(item.path);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[activeIndex]);
    }
  };

  const activeId = results[activeIndex]
    ? `${listId}-${activeIndex}`
    : undefined;

  return (
    <div className={styles.panel}>
      <TextInput
        ref={inputRef}
        label="Buscar"
        placeholder="Ex.: botão, modal, cores, dark mode"
        leftIcon={Search}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={results.length > 0}
        aria-controls={listId}
        aria-activedescendant={activeId}
        autoComplete="off"
        spellCheck={false}
      />
      <p className="visually-hidden" aria-live="polite">
        {results.length === 0
          ? "Nenhum resultado."
          : `${results.length} resultados.`}
      </p>
      {results.length === 0 ? (
        <p className={styles.empty}>Nada encontrado para “{query}”.</p>
      ) : (
        <ul
          id={listId}
          role="listbox"
          aria-label="Resultados"
          className={styles.list}
        >
          {results.map((item, index) => (
            <li
              key={item.path}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={styles.option}
              onMouseMove={() => setActiveIndex(index)}
              onClick={() => go(item)}
            >
              <span className={styles.optionTitle}>
                {item.title}
                <span className={styles.optionSection}>
                  {SECTION_LABEL[item.section]}
                </span>
              </span>
              <span className={styles.optionSummary}>{item.summary}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
