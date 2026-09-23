---
"@taskall/react": patch
---

Tokens: cada `TaskAllProvider` (`[data-color-mode]`) volta a declarar o escopo base, então providers aninhados resolvem corretamente marca, modo claro dentro de escuro, densidade e forma padrão (antes os aliases como `--taskall-action-primary` herdavam o valor do provider pai).
