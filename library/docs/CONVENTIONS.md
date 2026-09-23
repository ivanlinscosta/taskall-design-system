# Hive React — Component Conventions

Norma para TODOS os componentes e arquivos da biblioteca. Siga estritamente.

## Stack & normas gerais

- React 18 (dev), TypeScript `strict`, peer deps aceitam React 18/19.
- CSS Modules (`*.module.css`), tokens por CSS Custom Properties — **NUNCA hex inline no componente**.
- `clsx` via helper `cx` de `src/internal/cx.ts`.
- Componentes interativos: `React.forwardRef` + `displayName`.
- Todo componente aceita `className`, `style`, `data-*` e `aria-*` (espalhados via `...props`).
- Expo nano atributos `data-size`, `data-variant`, `data-tone`, `data-state` quando aplicável.
- Ícones decorativos: `aria-hidden="true"`; foco visível nunca removido sem substituto (use `:focus-visible` com `--hive-focus-ring-*`).
- Alvo de interação ≥ 44×44px em modo touch (small/large compactos documentar a exceção, não forçar).
- `prefers-reduced-motion` respeitado globalmente pelo base.css (.hive-base) — não duplicar.
- Remover `role="alert"`/`role="status"` conforme necessidade do componente.

## Tom de código

- `import * as React from "react"` nos .tsx, forwardRef com `function Nome(props, ref)`.
- Type-only imports com `type` (`import type { IconComponent } from "../icons/Icon"`).
- Sem `any`, sem `@ts-ignore`, sem `@ts-expect-error`.
- Sem comentários óbvios; só comentários de seção/documentação quando carregarem valor (API pública, lógica complexa).

## Estrutura de pasta de componente

```
src/components/Nome/
  Nome.tsx          (componente + tipos exportados: NomeProps, Nome)
  Nome.module.css   (CSS Module)
  Nome.test.tsx     (Vitest + Testing Library + jest-axe)
  Nome.stories.tsx  (Storybook CSF3 + autodocs)
```

Export público via barrel: `src/index.ts` (NÃO editar manualmente — o orquestrador mantém).

## Tokens disponíveis (de src/styles/tokens.css)

- Cores: `--hive-content-*`, `--hive-background-*`, `--hive-border-*`, `--hive-brand`, `--hive-brand-soft`,
  `--hive-action-*` (primary/neutral/error × filled/light/outline + disabled), `--hive-status-*`
  (information/warning/success/error/update × soft/outline/contrast), `--hive-overlay`, `--hive-shadow-*`,
  `--hive-focus-ring-*`, `--hive-touch-target`.
- Espaço primitivo: `--hive-space-N` (px exatos). Steps de densidade: `--hive-space-step-1..9`.
- Radius: `--hive-radius-1..9`, `--hive-radius-surface`, `--hive-radius-pill`.
- Tipografia: `--hive-font-*` (display-1..4, h1..h6, paragraph-l..xs, label-l..xs, link-*),
  `--hive-font-size-*`, `--hive-line-height-*`, `--hive-weight-*`, `--hive-font-family`.
- Progressões: `--hive-progress-*`.

## Personalidade (data attributes)

`data-color-mode`, `data-brand`, `data-density`, `data-shape` definem contexto no HiveProvider.
Componentes SEMPRE leem tokens; nunca codificar modo/brand.

## Testes (Vitest + Testing Library + jest-axe)

- Helper `renderWithHive` de `src/test/renderWithHive.tsx`.
- Cobertura de renderização, ref forwarding, ARIA roles / accessible names, estados,
  props controladas/não controladas, teclado/foco, light e dark (render segundo provider),
  e jest-axe (`axe(container, { rules: { "color-contrast": { enabled: false } } })`).
- Matchers jest-dom + `toHaveNoViolations` via setup global (`src/test/setup.ts`).

## Stories (Storybook 10, CSF3)

- `Meta` com `title: "Components/Nome"`, `tags: ["autodocs"]`, `argTypes` completos.
- Seções de doc via `parameters.docs.description`: Introdução / Quando usar / Quando não usar /
  Playground / Matriz de variantes / Estados / Exemplo real / Acessibilidade / Navegação por teclado.
- Varredura de variantes em `<div style={{display:"flex", flexWrap:"wrap", gap:12}}>`.
- Stories: `Playground`, `Variants`, `States`, `RealExample`, `Accessibility`.