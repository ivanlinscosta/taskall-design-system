# @taskall/react

Biblioteca oficial de componentes React do TaskAll Design System. Desenvolvida para oferecer uma experiência consistente, acessível e performática nas aplicações do ecossistema Task All.

## Instalação

Adicione o pacote ao seu projeto usando seu gerenciador de dependências preferido:

```bash
pnpm add @taskall/react
# ou
npm install @taskall/react
# ou
yarn add @taskall/react
```

## Uso rápido

Para começar a usar os componentes, envolva sua aplicação com o `TaskAllProvider` e importe os estilos globais.

```tsx
import { TaskAllProvider, Button } from "@taskall/react";
import "@taskall/react/styles.css";

function App() {
  return (
    <TaskAllProvider colorMode="light" brand="coral">
      <Button tone="primary" visualStyle="filled" size="medium">
        Enviar
      </Button>
    </TaskAllProvider>
  );
}
```

## Temas

O `TaskAllProvider` permite configurar a aparência global da aplicação através das seguintes propriedades:

- **colorMode**: Define o esquema de cores (`light` ou `dark`).
- **brand**: Define a identidade visual da marca (`coral`, `gestao`, `estudantes` ou `responsaveis`).
- **density**: Ajusta o espaçamento dos componentes (`compact`, `default` ou `expanded`).
- **shape**: Define o arredondamento das bordas (`sharp`, `default` ou `rounded`).

```tsx
<TaskAllProvider 
  colorMode="dark" 
  brand="gestao" 
  density="compact" 
  shape="rounded"
>
  {/* Conteúdo da aplicação */}
</TaskAllProvider>
```

## Componentes

| Componente | Descrição |
|------------|-----------|
| AlertNotification | Alertas de sistema para feedback imediato ao usuário. |
| Avatar | Representação visual de usuários com suporte a grupos e indicadores de status. |
| Badge | Pequenos rótulos para contagem ou sinalização de status. |
| Button | Gatilhos de ação com suporte a diferentes tons, estilos e ícones. |
| Checkbox | Seleção binária de opções em formulários. |
| Content | Container estrutural para organização de conteúdo. |
| Divider | Linha separadora horizontal ou vertical para organizar elementos. |
| Dropdown | Menus de contexto e listas de seleção suspensas. |
| Heading | Títulos hierárquicos para estruturação de conteúdo. |
| LabelText | Rótulos de texto para campos de entrada e formulários. |
| Modal | Diálogos sobrepostos para tarefas focadas ou confirmações. |
| Paragraph | Blocos de texto corrido com tipografia otimizada. |
| ProgressBar | Indicador visual de progresso de tarefas ou carregamentos. |
| Radio / RadioGroup | Seleção de uma única opção dentro de um conjunto. |
| Rating | Sistema de avaliação visual por estrelas ou corações. |
| Slot / SlotGroup | Utilitários para composição flexível de componentes. |
| TabMenu | Navegação por abas seguindo o padrão WAI-ARIA. |
| TextInput | Campo de entrada de texto simples ou com máscaras. |
| Tooltip | Informações contextuais exibidas ao pairar o mouse ou focar. |

## Ícones

A biblioteca inclui um conjunto de 44 ícones otimizados. Eles podem ser importados individualmente para garantir o tree-shaking:

```tsx
import { Search, ChevronRight } from "@taskall/react";

function MyComponent() {
  return <Search size={20} />;
}
```

## Acessibilidade

O TaskAll React é construído com foco total em acessibilidade, seguindo as diretrizes WCAG:

- Uso correto de roles e atributos ARIA.
- Suporte completo a estados nativos e navegação por teclado.
- Foco visível em todos os elementos interativos.
- Alvos de toque com no mínimo 44px de altura/largura.
- Respeito à preferência de movimento reduzido (`prefers-reduced-motion`).

## Desenvolvimento

Comandos úteis para contribuir com o pacote:

```bash
# Verificação de tipos
pnpm typecheck

# Linting de código
pnpm lint

# Executar testes unitários
pnpm test

# Cobertura de testes (mínimo exigido: 90%)
pnpm test:coverage
```
