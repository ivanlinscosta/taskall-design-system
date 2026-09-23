import { Link } from "react-router";

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

const page = findPage("guias", "primeiros-passos");

export const meta = () => pageMeta(page);

export default function GettingStartedPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Guias"
        title="Primeiros passos"
        lead="Instale @hive/react, importe os estilos, envolva a aplicação no HiveProvider e use o primeiro componente."
      />
      <DocSection id="requisitos" title="Requisitos">
        <BulletList
          items={[
            "React 18 ou 19 (`react` e `react-dom` são peer dependencies).",
            "Um bundler que processe CSS importado de pacotes (Vite, Next.js, webpack).",
            "Fonte Archivo (400, 600, 700) carregada pelo app — sem ela, o fallback é `system-ui`.",
          ]}
        />
      </DocSection>
      <DocSection id="instalacao" title="1. Instalação">
        <CodeBlock
          language="shell"
          caption="terminal"
          code={`pnpm add @hive/react\n# ou\nnpm install @hive/react`}
        />
      </DocSection>
      <DocSection id="estilos" title="2. Estilos e fonte">
        <Prose>
          <p>
            <code>@hive/react/styles.css</code> contém tokens, temas e o CSS de
            todos os componentes. Importe uma vez, no ponto de entrada.
          </p>
        </Prose>
        <CodeBlock
          caption="main.tsx"
          code={`import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@hive/react/styles.css";`}
        />
      </DocSection>
      <DocSection id="provider" title="3. HiveProvider">
        <Prose>
          <p>
            O provider aplica modo, marca, densidade e forma. Veja{" "}
            <Link to="/fundamentos/temas">Temas</Link> para detalhes.
          </p>
        </Prose>
        <CodeBlock
          caption="App.tsx"
          code={`import { HiveProvider } from "@hive/react";

export function App() {
  return (
    <HiveProvider brand="estudantes" colorMode="light">
      <StudentHome />
    </HiveProvider>
  );
}`}
        />
      </DocSection>
      <DocSection id="primeiro-componente" title="4. Primeiro componente">
        <CodeBlock
          caption="NewTaskButton.tsx"
          code={`import { Add, Button } from "@hive/react";

export function NewTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <Button leftIcon={Add} onClick={onClick}>
      Nova tarefa
    </Button>
  );
}`}
        />
        <Callout tone="success" title="Tree-shaking">
          <p>
            O pacote é <code>sideEffects: false</code> e publicado em módulos
            preservados: importe só o que usar e o bundler descarta o resto.
          </p>
        </Callout>
      </DocSection>
      <DocSection id="proximos-passos" title="Próximos passos">
        <BulletList
          items={[
            "Leia as Boas práticas antes de criar CSS próprio.",
            "Explore os Componentes: cada página tem playground, exemplos, API e acessibilidade.",
            "Veja os Padrões aplicados para telas completas do Task All.",
          ]}
        />
      </DocSection>
    </Article>
  );
}
