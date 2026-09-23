# TaskAll React

Design system React do Task All, com tokens, temas, componentes acessíveis e build ESM/CJS pronta para publicação — e uma aplicação de documentação no estilo material.io, com os componentes aplicados a telas reais do Task All.

## Estrutura do monorepo

O projeto utiliza pnpm workspaces para gerenciar a biblioteca e a documentação.

| Caminho    | Pacote        | Descrição                                                                                      |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------- |
| `library/` | `@taskall/react` | Biblioteca de componentes React (pacote publicável).                                           |
| `webapp/`  | `taskall-docs`   | Documentação oficial (React Router 7 + Vite, pré-renderizada) e Storybook como bancada de dev. |

## Requisitos

- Node 20+
- pnpm 10

## Começando

```bash
# Instalação de dependências (use CI=false pnpm install se o lockfile reclamar)
pnpm install

# Documentação com hot-reload da biblioteca → http://localhost:5173/
pnpm dev

# Verificação
pnpm lint
pnpm typecheck
pnpm test

# Build de produção (biblioteca + documentação estática)
pnpm build

# Servir o build estático da documentação → http://localhost:4173/
pnpm preview

# Storybook (bancada isolada de componentes) → http://localhost:6006/
pnpm storybook
pnpm storybook:build
```

## Documentação (`webapp/`)

Briefing original: [TRANSFORMATION.md](./TRANSFORMATION.md).

A documentação é uma aplicação React Router 7 (framework mode, `ssr: false` + `prerender: true`) sobre Vite. Cada rota vira um HTML estático no build e um chunk JavaScript próprio.

- **Landing**, **Fundamentos** (cores, tipografia, espaçamento, raios, grid, temas, ícones), **Componentes** (22 páginas, uma por componente, em ordem alfabética) e **Guias** (primeiros passos, boas práticas, padrões aplicados, contribuição, changelog).
- **Template único por componente**: visão geral (quando usar / não usar), playground com controle de props e código gerado, exemplos com abas Preview/Código (variantes, estados e aplicado ao Task All), matriz de temas, Do's and Don'ts, acessibilidade (notas + teclado), tabela de API e código de uso.
- **Tema global persistido**: modo claro/escuro (respeita `prefers-color-scheme` até haver escolha), marca, densidade e forma — as mesmas 4 dimensões das toolbars do Storybook, salvas em `localStorage` e aplicadas antes da primeira pintura.
- **Busca** (⌘K, Ctrl+K ou `/`) fuzzy por componente, fundamento e guia; âncoras por seção e sumário "Nesta página".

### Como funciona

| Peça                              | Onde                                  | Observação                                                                                        |
| --------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Catálogo de páginas               | `webapp/app/lib/registry.ts`          | Alimenta rotas, sidebar e busca.                                                                  |
| Rotas                             | `webapp/app/routes.ts`                | Uma rota estática por página, geradas do catálogo.                                                |
| Página de componente              | `webapp/app/pages/components/<slug>/` | `page.tsx` (conteúdo em TS) + `examples/*.tsx`. O código exibido é o próprio arquivo (`?raw`).    |
| Tabela de API                     | `webapp/app/generated/api.json`       | Gerada dos tipos TS reais por `pnpm --filter taskall-docs gen:api` (roda em `dev` e `build`).        |
| Template e blocos                 | `webapp/app/ui/`                      | `ComponentPage`, `Playground`, `ExampleBlock`, `ThemeMatrix`, `PropsTable`, `CodeBlock`…          |
| Tema e persistência               | `webapp/app/lib/settings.tsx`         | `TaskAllProvider` global + script anti-"flash" no `<head>`.                                          |

Os componentes são consumidos **somente via `@taskall/react`**; em dev e build o alias aponta para `library/src` (mesmo padrão do Storybook), com hot-reload e tree-shaking.

### Decisão: React Router 7 + Vite (e não Next.js)

- **Reuso**: mesmo stack do repositório (Vite 8, React 18, CSS Modules); os exemplos são componentes comuns importando `@taskall/react`.
- **Renderização estática**: `prerender: true` gera HTML para todas as páginas, com hidratação e code-splitting por rota, sem servidor.
- **Custo**: nenhum framework novo; React Router 8 exigiria React 19, então a versão é a 7.x.
- **Storybook mantido** como bancada de desenvolvimento isolada (`pnpm storybook`), com config Vite próprio em `webapp/.storybook/vite.config.ts`. A documentação oficial passa a ser a aplicação.

### Garantias automatizadas (`pnpm test` na webapp)

- axe (jest-axe) sem violações em todas as páginas e rotas avulsas (contraste é verificado ao vivo em Fundamentos → Cores, pois depende de layout real).
- Toda página de componente tem as 8 seções do template e **todas as props documentadas**.
- Nenhuma cor fixa (hex/rgb/hsl) no código da app, nenhum `any`/`@ts-ignore`, nenhum import direto de `library/`.

## Componentes

AlertNotification · Avatar · AvatarGroup · Badge · Button · Checkbox · Content · Divider · Dropdown · Heading · LabelText · Modal (ModalHeader, ModalFooter) · Paragraph · ProgressBar · Radio (RadioGroup) · Rating · Slot · SlotGroup · StatusIndicator · TabMenu · TextInput · Tooltip · Ícones (44, com `iconSearchIndex` para busca).

## Publicação

O gerenciamento de versões e publicação é feito através do Changesets.

```bash
# Criar um novo changeset para descrever as mudanças
pnpm changeset

# Publicar novas versões (após o merge na branch principal)
pnpm release
```

O projeto segue o versionamento semântico (SemVer) para garantir a estabilidade das integrações. Mudanças ainda não publicadas aparecem em Guias → Changelog na documentação.
