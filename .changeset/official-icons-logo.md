---
"@taskall/react": minor
---

Ícones oficiais, logo e IconButton.

- Conjunto oficial de 315 ícones (grade 20×20, `currentColor`) gerado de `src/assets/icons` por `pnpm --filter @taskall/react generate:icons`, com `iconSearchIndex` (palavras-chave PT/EN).
- **Atenção:** no conjunto oficial `Delete` é o “X” (fechar) e `DeleteSmall` o X compacto; para lixeira use `RecycleBin`/`RecycleBinFilled`. Os desenhos de `Add`, `Check`, `Star*`, `Heart*`, `Home`, `Filter`, `Visible`, `Invisible`, `Camera`, `Placeholder` e dos ícones de status foram atualizados.
- Nomes anteriores mantidos como aliases: `Bell`, `Calendar`, `ChevronDown/Up/Left/Right`, `Close`, `Download`, `Link`, `Mail`, `Search`, `Settings`, `Upload`, `User`. `ArrowUp/Down/Left/Right`, `Menu`, `More` e `Minus` seguem como complementares.
- Novo `Logo` (variantes `full` e `symbol`), temável via `currentColor` e tokens `--taskall-logo-accent`/`--taskall-logo-on-accent`.
- Novo `IconButton` (botão quadrado só com ícone, `aria-label` obrigatório). `Button` não renderiza mais um rótulo vazio.
- `Modal`/`ModalHeader`: `icon` e `iconTone` no cabeçalho. `TabItem`: `icon` opcional.
- `AlertNotification`: ícones por status revisados (`update` usa `Loop`; estilos não preenchidos usam versões em contorno).
- `Modal`: o portal nunca é montado em `<html>` quando o documento espelha os atributos de tema.
