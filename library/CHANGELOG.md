# @taskall/react

## 0.1.0

### Minor Changes

- 54ed957: Ícones oficiais, logo e IconButton.

  - Conjunto oficial de 315 ícones (grade 20×20, `currentColor`) gerado de `src/assets/icons` por `pnpm --filter @taskall/react generate:icons`, com `iconSearchIndex` (palavras-chave PT/EN).
  - **Atenção:** no conjunto oficial `Delete` é o “X” (fechar) e `DeleteSmall` o X compacto; para lixeira use `RecycleBin`/`RecycleBinFilled`. Os desenhos de `Add`, `Check`, `Star*`, `Heart*`, `Home`, `Filter`, `Visible`, `Invisible`, `Camera`, `Placeholder` e dos ícones de status foram atualizados.
  - Nomes anteriores mantidos como aliases: `Bell`, `Calendar`, `ChevronDown/Up/Left/Right`, `Close`, `Download`, `Link`, `Mail`, `Search`, `Settings`, `Upload`, `User`. `ArrowUp/Down/Left/Right`, `Menu`, `More` e `Minus` seguem como complementares.
  - Novo `Logo` (variantes `full` e `symbol`), temável via `currentColor` e tokens `--taskall-logo-accent`/`--taskall-logo-on-accent`.
  - Novo `IconButton` (botão quadrado só com ícone, `aria-label` obrigatório). `Button` não renderiza mais um rótulo vazio.
  - `Modal`/`ModalHeader`: `icon` e `iconTone` no cabeçalho. `TabItem`: `icon` opcional.
  - `AlertNotification`: ícones por status revisados (`update` usa `Loop`; estilos não preenchidos usam versões em contorno).
  - `Modal`: o portal nunca é montado em `<html>` quando o documento espelha os atributos de tema.

- d0dd5e9: Renomeação Hive → TaskAll.

  - Pacote: `@hive/react` → `@taskall/react` (e `@taskall/react/styles.css`).
  - Tokens CSS: `--hive-*` → `--taskall-*` (ex.: `--taskall-brand`, `--taskall-space-step-4`).
  - Provider: `HiveProvider`/`HiveProviderProps` → `TaskAllProvider`/`TaskAllProviderProps`, com a classe `taskall-provider`.
  - Keyframes e ids internos com prefixo `taskall-` (`taskall-spin`, `taskall-dropdown-…`, `taskall-text-input-…`).

- 54ed957: TabMenu: `TabItem` aceita `content` opcional para o conteúdo do painel. Sem `content`, o painel continua exibindo o `label` (comportamento anterior).

  Ícones: `iconSearchIndex` (nome, palavras-chave PT/EN e nome do componente) agora é exportado por `@taskall/react`.

- d0dd5e9: Classes com prefixo `taskall-` e ajustes visuais.

  - **Classes CSS estáveis**: `taskall-<componente>` na raiz e `taskall-<componente>-<parte>` nas partes (ex.: `taskall-button`, `taskall-button-primary`, `taskall-text-input-field`), no lugar de nomes com hash. A classe global do `TaskAllProvider` passou de `taskall-base` para `taskall-base`.
  - **Avatar**: o indicador de status fica centralizado na borda do círculo (antes era cortado dentro dele).
  - **Content**: ícone e iniciais acompanham a altura do texto (32px sem descrição e 40px com ela no tamanho `small`; 24px e 32px no `x-small`). `avatarSize` agora é opcional.
  - **Dropdown**: a seta fica sempre alinhada à direita e gira ao abrir.
  - **TextInput**: sem anel de foco retangular no `<input>` interno; foco e hover seguem o contorno arredondado do campo.

- d0dd5e9: Initial release of TaskAll React: design tokens (light/dark, brands, densities, shapes), TaskAllProvider, 18 components, icon system, Storybook demo, and Vitest test suite.

### Patch Changes

- 54ed957: Tokens: cada `TaskAllProvider` (`[data-color-mode]`) volta a declarar o escopo base, então providers aninhados resolvem corretamente marca, modo claro dentro de escuro, densidade e forma padrão (antes os aliases como `--taskall-action-primary` herdavam o valor do provider pai).
- d0dd5e9: Build do pacote corrigido para publicação.

  - `react`, `react-dom`, `@radix-ui/*` e `clsx` não são mais embutidos no `dist` (evita React duplicado e “Invalid hook call”). O pacote caiu de 13,3 MB para ~5,7 MB.
  - `styles.css` agora inclui tokens (`--taskall-*`), temas e estilos base, além do CSS dos componentes.
  - Todos os módulos começam com `"use client"` (compatível com o App Router do Next.js).
  - Declarações de tipo só da API pública (sem testes, stories e scripts).
