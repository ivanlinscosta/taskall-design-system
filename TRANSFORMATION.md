# Transformar a Live Demo em Aplicação Web de Documentação

> **Para o Claude (ou qualquer agente):** este documento é o briefing completo para transformar a live demo atual (Storybook) em uma **aplicação web de documentação no estilo Material Design** (material.io/components), onde os componentes do TaskAll aparecem **aplicados em contextos reais**, com documentação rica, boas práticas e navegação profissional.

---

## 1. Contexto do projeto

O **Task All Design System** ("TaskAll") é o design system do Sistema Task All:

| Parte | Pasta | Pacote | Papel |
|-------|-------|--------|-------|
| Biblioteca de componentes | `library/` | `@taskall/react` | React + TypeScript strict, tokens CSS, temas, 21 grupos de componentes, 44 ícones. Publicável no NPM. |
| Aplicação web (docs/demo) | `webapp/` | `taskall-docs` | Hoje: Storybook live demo. **Alvo desta transformação.** |

Stack atual:

- React 18, TypeScript strict (`noUncheckedIndexedAccess`), pnpm workspaces, Vite 8.
- Storybook 10 (`@storybook/react-vite`) com toolbars de `colorMode` (light/dark), `brand` (coral/gestao/estudantes/responsaveis), `density` (compact/default/expanded) e `shape` (sharp/default/rounded) — essas são as 4 dimensões de customização do sistema.
- Acessibilidade: `forwardRef`, roles/ARIA, foco visível, alvos ≥44px, `prefers-reduced-motion`, testes com jest-axe.

## 2. Estado atual da live demo

- Roda com `pnpm storybook` → http://localhost:6006/
- 118 stories + 22 páginas de docs, incluindo páginas de **Foundations**: Colors, Typography, Spacing, Radius, Grid, Themes, Icons.
- As stories vivem em `library/src/**/*.stories.tsx` e as páginas de Foundation em `library/src/foundations/`.
- O `webapp/.storybook/preview.tsx` já aplica o `TaskAllProvider` globalmente (decorator) — a app real deve fazer o mesmo.
- **Importante:** o Storybook é a *matéria-prima*. As stories demonstram props; a aplicação deve reutilizar esses exemplos, mas com UX de site de documentação.

## 3. Objetivo

Construir em `webapp/` uma aplicação web própria (o Claude deve escolher e justificar o framework — ver §6) que substitua/eleve o Storybook como vitrine oficial, no espírito do Material Design documentation:

1. **Visível como aplicação**: landing page do design system, navegação lateral estábusca, URLs canônicas por componente, dark mode global, responsivo.
2. **Componentes aplicados**: não só playgrounds isolados — cada componente deve aparecer em **exemplos realistas** (formulários de cadastro, listas de tarefas, dashboards, flujos Task All) além dos exemplos mínimos.
3. **Documentação por componente** (padrão obrigatório para todos):
   - Desvisão geral + quando usar / quando não usar;
   - Demos interativas com controle de props (o equivalente aos controles do Storybook);
   - Variantes e estados (hover/focus/disabled/loading/erro);
   - **Tabela de API** (props: nome, tipo, padrão, descrição) gerada dos tipos TS reais ou mantida em MDX;
   - Exemplos de código copiáveis (syntax highlight);
   - Seção de acessibilidade (roles, teclado, contraste);
   - Do's and Don'ts;
   - Aplicação com os 4 temas/densidades/formas (toggle igual ao toolbar do Storybook).
4. **Foundations**: páginas de cores, tipografia, spacing, radius, grid e temas com previews ao vivo usando os tokens reais (`library/src/styles/tokens.css`).
5. **Boas práticas embutidas**: página/guia com as convenções do sistema (ver `library/docs/CONVENTIONS.md`) — tokens sem hex, `data-*` states, foco visível, 44px touch target, etc.

## 4. Diretrizes de conteúdo e UX

- **Idioma:** todo conteúdo em **português (PT-BR)**.
- **Navegação:** sidebar agrupando *Foundations* → *Componentes* (ordem alfabética) → *Guias* (boas práticas, contribution, changelog). Busca por componente (fuzzy é suficiente).
- **Cada componente = uma rota** com âncoras por seção (Visão geral, Demos, API, Acessibilidade, Código).
- **Dark mode persistido** (localStorage) + respeito a `prefers-color-scheme`; usar `TaskAllProvider colorMode`.
- **Troca de brand/density/shape** por página ou global (dev tools de demonstração), exatamente como o toolbar do Storybook.
- **Tabs/examples:** alternar entre "Preview" e "Code" no mesmo bloco de exemplo.
- Tom de voz: técnico, direto, sem marketing. Exemplos com o domínio do Task All (tarefas, equipes, prazos, estudantes/responsáveis — as 4 marcas já mapeiam esses públicos).

## 5. Diretrizes técnicas (obrigatórias)

- Consumir os componentes **apenas** via `@taskall/react` (workspace link já existe: `webapp/node_modules/@taskall/react → library`). **Não duplicar componentes dentro da app.** Para desenvolvimento com hot-reload da lib, alias para `library/src` é aceitável (padrão já usado no `webapp/.storybook/main.ts`).
- Nunca usar hex/cor fixa: **somente tokens** (`--taskall-*`) ou os componentes. Classes utilitárias da app própria devem usar os tokens.
- TypeScript strict, sem `any`/`@ts-ignore`; ESLint/Prettier do repo valem.
- Acessibilidade AA como mínimo: HTML semântico, landmarks (`header/nav/main`), `skip link`, foco visível, contraste verificado, ícones decorativos `aria-hidden`.
- Performance: código-splitting por rota; não importar a lib inteira quando um subconjunto basta (tree-shaking é suportado — `sideEffects: false`).
- Conteúdo/docs: preferir MDX ou arquivos TS de conteúdo versionados no repo.

## 6. Decisão que o agente deve tomar (e justificar)

Escolher a base da aplicação:

- **Vite + React Router (SPA/SSG via vite-plugin-ssg ou React Router 7)** — mais próximo do stack atual, migração barata das stories.
- **Next.js (App Router, SSG/ISR)** — melhor SEO e DX de docs; custo: introducing novo framework no repo.

Critérios: (a) esforço mínimo para reutilizar stories/exemplos; (b) renderização estática das páginas de docs; (c) manter `pnpm storybook` funcionando **ou** assumir explicitamente a remoção do Storybook no fim da migração (documentar a escolha).

## 7. Etapas sugeridas

1. Inventariar stories/docs existentes (`library/src/**/*.stories.tsx`, `library/src/foundations/`) como fonte dos exemplos.
2. Scaffold da app em `webapp/` (preservar `webapp/.storybook/` até a migração completar).
3. Layout base: shell com sidebar, toolbars de tema, roteamento, dark mode.
4. Página de componente padrão (template único) + migrar 2–3 componentes piloto (Button, TextInput, Modal) até o template ficar redondo.
5. Migrar o restante (21 grupos) + Foundations + landing + guia de boas práticas.
6. Busca, âncoras, syntax highlight, "copiar código".
7. Ajustar `package.json` scripts (`pnpm dev`, `pnpm build`, `pnpm preview`); manter/adaptar `storybook:*`.
8. Rodar a verificação completa (§9) e atualizar o `README.md`.

## 8. Fora de escopo

- Publicar `@taskall/react` no NPM (já tratado por Changesets, não é parte desta transformação).
- Alterar APIs públicas dos componentes sem necessidade demonstrada.
- Reescrever tokens/themes.
- Inserir novas dependências pesadas sem justificativa (analytics, CMS…).

## 9. Critérios de aceite (Definition of Done)

- [ ] `pnpm install && pnpm lint && pnpm typecheck && pnpm test` verdes.
- [ ] `pnpm dev` (ou equivalente) sobe a aplicação; landing + sidebar + ≥1 componente por página documentado no template completo da §3.
- [ ] Todos os 21 grupos de componentes + 7 páginas de Foundations presentes.
- [ ] Dark mode + os 4 brands + 3 densidades + 3 shapes aplicáveis e persistidos.
- [ ] Nenhum hex fora dos tokens; nenhum `any`; zero erros de a11y críticos (axe).
- [ ] Build de produção passa (`pnpm build`) com código-splitting por rota.
- [ ] README atualizado com a nova arquitetura e comandos.

## 10. Comandos úteis

```bash
pnpm install                 # workspace inteiro (use CI=false se o lockfile reclamar)
pnpm storybook               # live demo atual → http://localhost:6006/
pnpm lint && pnpm typecheck  # verificação
pnpm test                    # vitest (library)
pnpm build                   # build de tudo (lib + app)
```

Estrutura de referência:

```
taskall-design-system/
├── library/          # @taskall/react — src/, docs/CONVENTIONS.md, tokens em src/styles/
├── webapp/           # documentação/live demo — alvo da transformação
├── TRANSFORMATION.md # este arquivo
└── README.md
```

---

## 11. Pendências conhecidas do projeto

> Estado verificado em 23/09/2026. O agente deve tratar os itens 🔴 e 🟠 como **bloqueadores da §9 (DoD)**; os 🟡 são revisões/higiene.

### ✅ Já está verde

- `pnpm lint` → 0 erros · `pnpm typecheck` (library + webapp) → 0 erros
- Storybook dev → http://localhost:6006/ com 118 stories + 22 páginas de docs
- Workspace `@taskall/react → library` linkado; jsdom ajustado para 29.x (compatível com Node 20)

### 🔴 Assets gráficos ausentes (aguardam design — NÃO inventar)

Regra do projeto: **não inventar SVG paths**. Os arquivos abaixo não existem no repo e precisam ser fornecidos:

1. **44 ícones estão como placeholders geométricos** (`library/src/icons/*.tsx`, regeneráveis via `pnpm --filter @taskall/react generate:icons` a partir de SVGs originais, viewBox 24×24):

   - [ ] Add, ArrowDown, ArrowLeft, ArrowRight, ArrowUp
   - [ ] Bell, Calendar, Camera, Check, CheckCircleFilled
   - [ ] ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Close
   - [ ] Delete, DeleteSmall, Download, Filter, Heart
   - [ ] HeartFilled, HeartHalf, Home, InformationCircle, InformationCircleFilled
   - [ ] Invisible, Link, Mail, Menu, Minus
   - [ ] More, Placeholder, RecycleBinFilled, Search, Settings
   - [ ] Star, StarFilled, StarHalf, Upload, User
   - [ ] Visible, WarningCircleFilled, WarningTriangle, WarningTriangleFilled

2. **Marca/identidade** (necessários para landing, Themes e cabeçalho da app):
   - [ ] Logo oficial TaskAll (SVG) e variantes (mono, horizontal, ícone)
   - [ ] Favicon / ícone de app (multi-size 16–512) + `manifest.webmanifest`
   - [ ] Imagem social (og-image 1200×630)
   - [ ] Logos ou swatches oficiais das 4 marcas (coral, gestão, estudantes, responsáveis)
3. **Conteúdo de exemplo visual** (se existirem no Figma): ilustrações de empty state, avatares-placeholder, imagens de onboarding.
4. **LICENSE** — `package.json` declara MIT mas o arquivo `LICENSE` não existe na raiz.

### 🟠 Testes e cobertura (última execução: 29 falham / 119 passam)

| Qtd | Erro | Causa / ação |
|-----|------|--------------|
| 20 | `expectAssertion.call is not a function` em `toHaveNoViolations` | jest-axe v11 exporta o matcher com shape inesperado (`typeof object`); `library/src/test/setup.ts` ainda registra valor que não é função — corrigir o registro do matcher. |
| 4 | `toBeChecked()` — Checkbox | Bug real: estado `checked` do input nativo não reflete no DOM (uncontrolled/controlled/keyboard/onChange). |
| 3 | `toBeChecked()` — Radio | Mesmo problema no Radio/RadioGroup. |
| 1 | Modal: clique no backdrop não fecha | `pointer-events: none` no overlay / `onOpenChange` não disparado. |
| 1 | `vi.fn()` esperava 1 chamada, 0 | Callback do consumidor não disparado (relacionado aos casos acima). |

- [ ] Todos os 29 testes verdes (`./node_modules/.bin/vitest run` em `library/`)
- [ ] Cobertura **nunca foi executada com sucesso** — exigido: 90 stmts / 85 branches / 90 funcs / 90 lines (`pnpm --filter @taskall/react test:coverage`)
- [ ] **Testes de import/tree-shaking não existem**: (a) importar somente `Button` de `@taskall/react` não pode puxar os 44 ícones (usar esbuild `analyzeMetafile`); (b) entries ESM e CJS carregam sem erro
- [ ] A11y do Storybook desativada: `a11y: { test: "todo" }` em `webapp/.storybook/preview.tsx`

### 🟠 Build e entrega

- [ ] `pnpm build` nunca verificado de ponta a ponta — `library/dist/` existe (esm/cjs/styles.css, gerado em 23/09 16:31) mas está **potencialmente desatualizado** e **sem validação** de `index.d.mts` / `index.d.cts` / `styles.css` / sideEffects
- [ ] `pnpm storybook:build` nunca executado
- [ ] DoD completo da §9 (`install → lint → typecheck → test → build → storybook:build`) ainda não passou de verde integral
- [ ] Publicação: changeset inicial pronto (`.changeset/taskall-react-initial.md`); CI/pipeline de release (GitHub Actions) não configurado (opcional, se for publicar)

### 🟡 Revisões contra a especificação

- [ ] **Badge**: `type="status"` usa paleta `information` — a spec previa tons de status (success/warning/danger…); confirmar API
- [ ] **Content** reimplementa iniciais localmente em vez de reutilizar `Avatar` — confirmar se duplicação é aceitável
- [ ] **Spec truncada**: detalhes de dark mode, estados de status e alguns tokens foram **inferidos** — validar com design/produto
- [ ] Conferir nomes dos 44 ícones contra a lista oficial do design

### 🟡 Higiene do repositório

- [ ] **Git**: apenas `README.md` está commitado (1 commit); todo o código está **untracked** — definir a primeira subida (não commitar sem pedido explícito)
- [ ] Aviso do Storybook: glob `**/*.mdx` sem arquivos — remover o glob (`webapp/.storybook/main.ts`) ou criar docs MDX
- [ ] **Risco de ambiente**: o projeto está no Desktop sincronizado com iCloud; sob pressão de disco (~5,6 GB livres) o `node_modules` pode virar "dataless" e **travar tsc/eslint/vitest por horas** — liberar espaço, desativar sincronia do Desktop ou mover o projeto
- [ ] `webapp/debug-storybook.log` (log descartável) pode ser removido/ignorado no `.gitignore`
