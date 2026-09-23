---
"@taskall/react": minor
---

Renomeação Hive → TaskAll.

- Pacote: `@hive/react` → `@taskall/react` (e `@taskall/react/styles.css`).
- Tokens CSS: `--hive-*` → `--taskall-*` (ex.: `--taskall-brand`, `--taskall-space-step-4`).
- Provider: `HiveProvider`/`HiveProviderProps` → `TaskAllProvider`/`TaskAllProviderProps`, com a classe `taskall-provider`.
- Keyframes e ids internos com prefixo `taskall-` (`taskall-spin`, `taskall-dropdown-…`, `taskall-text-input-…`).
