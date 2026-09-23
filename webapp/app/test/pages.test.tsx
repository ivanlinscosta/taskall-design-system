import type * as React from "react";
import { screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { ALL_PAGES, COMPONENTS, FOUNDATIONS, GUIDES } from "../lib/registry";
import { renderPage } from "./render";

type PageModule = { default: React.ComponentType };

const componentModules = import.meta.glob<PageModule>(
  "../pages/components/*/page.tsx",
);
const foundationModules = import.meta.glob<PageModule>(
  "../pages/foundations/*.tsx",
);
const guideModules = import.meta.glob<PageModule>("../pages/guides/*.tsx");
const routeModules = import.meta.glob<PageModule>("../routes/*.tsx");

function modulePath(section: string, slug: string) {
  if (section === "componentes") return `../pages/components/${slug}/page.tsx`;
  if (section === "fundamentos") return `../pages/foundations/${slug}.tsx`;
  return `../pages/guides/${slug}.tsx`;
}

const loaders: Record<string, Record<string, () => Promise<PageModule>>> = {
  componentes: componentModules,
  fundamentos: foundationModules,
  guias: guideModules,
};

async function violations(container: HTMLElement) {
  const results = await axe(container, axeOptions);
  return results.violations.map(
    (violation) =>
      `[${violation.impact}] ${violation.id}: ${violation.nodes
        .slice(0, 3)
        .map((node) => node.target.join(" "))
        .join(" | ")}`,
  );
}

/** Regras que dependem de layout real (não disponível no jsdom). */
const axeOptions = {
  rules: {
    "color-contrast": { enabled: false },
  },
};

describe("catálogo", () => {
  it("tem os 22 componentes, 7 fundamentos e os guias com página", () => {
    expect(COMPONENTS.length).toBeGreaterThanOrEqual(21);
    expect(FOUNDATIONS).toHaveLength(7);
    expect(GUIDES.length).toBeGreaterThanOrEqual(3);
    for (const page of ALL_PAGES) {
      expect(
        loaders[page.section]?.[modulePath(page.section, page.slug)],
        page.path,
      ).toBeDefined();
    }
  });

  it("lista os componentes em ordem alfabética", () => {
    const titles = COMPONENTS.map((item) => item.title);
    expect(titles).toEqual(
      [...titles].sort((a, b) => a.localeCompare(b, "pt-BR")),
    );
  });
});

describe.each(ALL_PAGES.map((page) => [page.path, page] as const))(
  "%s",
  (_path, page) => {
    it("renderiza sem violações de acessibilidade (axe)", async () => {
      const load = loaders[page.section]?.[modulePath(page.section, page.slug)];
      if (!load) throw new Error(`Módulo ausente para ${page.path}`);
      const { default: Page } = await load();
      const { container } = renderPage(Page, page.path);

      expect(
        await screen.findByRole("heading", { level: 1, name: page.title }),
      ).toBeInTheDocument();
      expect(await violations(container)).toEqual([]);
    });
  },
);

describe("páginas de componente", () => {
  it.each(COMPONENTS.map((page) => [page.slug, page] as const))(
    "%s segue o template completo e documenta todas as props",
    async (_slug, page) => {
      const load = componentModules[modulePath("componentes", page.slug)];
      if (!load) throw new Error(`Módulo ausente para ${page.path}`);
      const { default: Page } = await load();
      renderPage(Page, page.path);

      for (const id of [
        "visao-geral",
        "playground",
        "exemplos",
        "temas",
        "boas-praticas",
        "acessibilidade",
        "api",
        "codigo",
      ]) {
        expect(document.getElementById(id), `seção #${id}`).not.toBeNull();
      }

      const apiSection = document.getElementById("api")?.closest("section");
      if (!apiSection) throw new Error("Seção API ausente");
      const rows = within(apiSection).getAllByRole("row").slice(1);
      const undocumented = rows
        .filter(
          (row) => row.querySelector("td:last-child")?.textContent === "—",
        )
        .map((row) => row.querySelector("th")?.textContent);
      expect(undocumented, "props sem descrição").toEqual([]);

      expect(
        within(
          document
            .getElementById("exemplos")
            ?.closest("section") as HTMLElement,
        ).getAllByRole("tab", { name: "Código" }).length,
      ).toBeGreaterThan(0);
    },
  );
});

describe("rotas avulsas", () => {
  it.each(["home", "components-index", "not-found"])(
    "%s sem violações de acessibilidade",
    async (name) => {
      const load = routeModules[`../routes/${name}.tsx`];
      if (!load) throw new Error(`Rota ${name} ausente`);
      const { default: Page } = await load();
      const { container } = renderPage(Page, "/", {
        withMain: name === "components-index",
      });
      expect(await violations(container)).toEqual([]);
    },
  );
});
