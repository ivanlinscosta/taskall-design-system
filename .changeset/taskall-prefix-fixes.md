---
"@taskall/react": minor
---

Classes com prefixo `taskall-` e ajustes visuais.

- **Classes CSS estáveis**: `taskall-<componente>` na raiz e `taskall-<componente>-<parte>` nas partes (ex.: `taskall-button`, `taskall-button-primary`, `taskall-text-input-field`), no lugar de nomes com hash. A classe global do `TaskAllProvider` passou de `taskall-base` para `taskall-base`.
- **Avatar**: o indicador de status fica centralizado na borda do círculo (antes era cortado dentro dele).
- **Content**: ícone e iniciais acompanham a altura do texto (32px sem descrição e 40px com ela no tamanho `small`; 24px e 32px no `x-small`). `avatarSize` agora é opcional.
- **Dropdown**: a seta fica sempre alinhada à direita e gira ao abrir.
- **TextInput**: sem anel de foco retangular no `<input>` interno; foco e hover seguem o contorno arredondado do campo.
