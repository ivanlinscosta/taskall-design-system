import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import {
  Article,
  BulletList,
  Callout,
  DocSection,
  PageHeader,
  Prose,
} from "../../ui/Page";

const page = findPage("guias", "contribuicao");

export const meta = () => pageMeta(page);

export default function ContributingPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Guias"
        title="Contribuição"
        lead="Como propor, construir, testar e documentar um componente do TaskAll — do primeiro commit à página nesta documentação."
      />
      <DocSection id="estrutura" title="Estrutura do monorepo">
        <CodeBlock
          language="plaintext"
          caption="taskall-design-system/"
          code={`library/                 @taskall/react — componentes, tokens, ícones
  src/components/Nome/   Nome.tsx · Nome.module.css · Nome.test.tsx · Nome.stories.tsx
  src/styles/tokens.css  tokens e temas
  docs/CONVENTIONS.md    convenções obrigatórias
webapp/                  taskall-docs — esta documentação (React Router 7 + Vite)
  app/pages/components/  uma pasta por componente: page.tsx + examples/
  app/generated/api.json tabela de props gerada dos tipos TS
  .storybook/            Storybook (bancada de desenvolvimento)`}
        />
      </DocSection>
      <DocSection id="fluxo" title="Fluxo">
        <CodeBlock
          language="shell"
          caption="terminal"
          code={`pnpm install
pnpm dev            # documentação em http://localhost:5173
pnpm storybook      # bancada isolada em http://localhost:6006
pnpm lint && pnpm typecheck && pnpm test
pnpm changeset      # descreva a mudança para o changelog`}
        />
        <BulletList
          items={[
            "Siga `library/docs/CONVENTIONS.md`: forwardRef, `...props`, tokens, `data-*`, sem `any`.",
            "Teste papéis ARIA, teclado, estados controlado/não controlado, light/dark e jest-axe.",
            "Adicione um changeset (`patch`, `minor` ou `major`) em toda mudança publicável.",
          ]}
        />
      </DocSection>
      <DocSection id="documentar" title="Documentar um componente">
        <Prose>
          <p>
            Cada componente tem uma rota própria gerada a partir do catálogo.
            Para adicionar um novo:
          </p>
          <ol>
            <li>
              Registre-o em <code>app/lib/registry.ts</code> (slug, título,
              resumo, palavras-chave).
            </li>
            <li>
              Crie <code>app/pages/components/slug/page.tsx</code> exportando um{" "}
              <code>ComponentDoc</code> e renderizando{" "}
              <code>&lt;ComponentPage&gt;</code>.
            </li>
            <li>
              Escreva exemplos em <code>examples/*.tsx</code> importando só de{" "}
              <code>@taskall/react</code>; o código exibido vem do próprio
              arquivo (<code>?raw</code>).
            </li>
            <li>
              Rode <code>pnpm --filter taskall-docs gen:api</code> e descreva
              todas as props — o teste de documentação falha se faltar alguma.
            </li>
          </ol>
        </Prose>
        <Callout title="Template obrigatório">
          <p>
            Visão geral (quando usar / não usar), Playground, Exemplos
            (variantes, estados, aplicado), Temas, Do’s and Don’ts,
            Acessibilidade (notas + teclado), API e Código.
          </p>
        </Callout>
      </DocSection>
    </Article>
  );
}
