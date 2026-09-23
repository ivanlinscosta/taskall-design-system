import * as React from "react";
import { render } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { HiveProvider } from "@hive/react";

import { SettingsProvider } from "../lib/settings";
import { SearchProvider } from "../ui/SearchDialog";

/** Renderiza uma página dentro dos mesmos providers do root, em uma rota de teste. */
export function renderPage(
  Page: React.ComponentType,
  path = "/",
  { withMain = true } = {},
) {
  const Stub = createRoutesStub([
    {
      path,
      Component: () => (
        <SettingsProvider>
          <HiveProvider>
            <SearchProvider>
              {withMain ? (
                <main>
                  <Page />
                </main>
              ) : (
                <Page />
              )}
            </SearchProvider>
          </HiveProvider>
        </SettingsProvider>
      ),
    },
  ]);
  return render(<Stub initialEntries={[path]} />);
}
