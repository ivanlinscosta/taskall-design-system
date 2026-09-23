import * as React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
} from "react-router";
import { TaskAllProvider } from "@taskall/react";

import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@taskall/react/styles.css";
import "./app.css";

import { SiteHeader } from "./ui/SiteHeader";
import { SearchProvider } from "./ui/SearchDialog";
import {
  PROVIDER_BOOTSTRAP_SCRIPT,
  SettingsProvider,
  THEME_BOOTSTRAP_SCRIPT,
  useSettings,
} from "./lib/settings";
import styles from "./root.module.css";

export const meta: MetaFunction = () => [
  { title: "TaskAll Design System" },
  {
    name: "description",
    content:
      "Documentação do TaskAll, o design system do Task All: fundamentos, componentes React acessíveis e padrões aplicados.",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body className="taskall-base">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * TaskAllProvider global da aplicação. O "chrome" da documentação segue o modo de
 * cor e a marca; densidade e forma são aplicadas nas áreas de demonstração.
 */
function ThemedApp({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();

  return (
    <TaskAllProvider
      colorMode={settings.colorMode}
      brand={settings.brand}
      className={styles.app}
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: PROVIDER_BOOTSTRAP_SCRIPT }} />
      <a className={styles.skipLink} href="#conteudo">
        Pular para o conteúdo
      </a>
      <SearchProvider>
        <SiteHeader />
        {children}
      </SearchProvider>
    </TaskAllProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <ThemedApp>
        <Outlet />
      </ThemedApp>
    </SettingsProvider>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const title = isRouteErrorResponse(error)
    ? `${error.status}`
    : "Algo deu errado";
  const detail = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "Erro desconhecido.";

  return (
    <main className={styles.error}>
      <h1>{title}</h1>
      <p>{detail}</p>
      <a href="/">Voltar para o início</a>
    </main>
  );
}
