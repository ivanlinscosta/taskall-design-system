---
"@taskall/react": patch
---

Build do pacote corrigido para publicação.

- `react`, `react-dom`, `@radix-ui/*` e `clsx` não são mais embutidos no `dist` (evita React duplicado e “Invalid hook call”). O pacote caiu de 13,3 MB para ~5,7 MB.
- `styles.css` agora inclui tokens (`--taskall-*`), temas e estilos base, além do CSS dos componentes.
- Todos os módulos começam com `"use client"` (compatível com o App Router do Next.js).
- Declarações de tipo só da API pública (sem testes, stories e scripts).
