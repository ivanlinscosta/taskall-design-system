import { Button } from "@hive/react";

import { findPage } from "../../lib/registry";
import { CodeBlock } from "../../ui/CodeBlock";
import { pageMeta } from "../../ui/ComponentPage";
import { DoDontList } from "../../ui/DoDont";
import {
  Article,
  BulletList,
  DocSection,
  PageHeader,
  Prose,
} from "../../ui/Page";

const page = findPage("guias", "boas-praticas");

export const meta = () => pageMeta(page);

export default function BestPracticesPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Guias"
        title="Boas práticas"
        lead="As convenções que mantêm o Hive consistente, temável e acessível — valem para a biblioteca e para o código dos produtos Task All."
      />

      <DocSection id="tokens" title="Tokens, nunca valores fixos">
        <Prose>
          <p>
            Cor, espaço, raio, sombra e tipografia vêm de <code>--hive-*</code>.
            Um hex no código quebra o modo escuro, as 4 marcas e as densidades
            de uma vez.
          </p>
        </Prose>
        <DoDontList
          items={[
            {
              do: "`color: var(--hive-content-secondary)` e `gap: var(--hive-space-step-4)`.",
              dont: "Cores em hexadecimal ou medidas como `padding: 13px` escritas à mão.",
            },
            {
              do: "Use o token pelo papel (`--hive-status-error`), não pela cor que ele tem hoje.",
              dont: "Usar `--hive-status-error` só porque “é vermelho” em algo que não é erro.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="estados" title="Estados em atributos data-*">
        <Prose>
          <p>
            Componentes expõem variações como <code>data-size</code>,{" "}
            <code>data-variant</code>, <code>data-tone</code> e{" "}
            <code>data-state</code>. Estilize e teste por eles em vez de classes
            geradas.
          </p>
        </Prose>
        <CodeBlock
          language="css"
          caption="TaskRow.module.css"
          code={`.row[data-state="late"] {
  border-left: 3px solid var(--hive-status-warning);
}

.row[data-state="done"] {
  color: var(--hive-content-secondary);
}`}
        />
      </DocSection>

      <DocSection id="foco" title="Foco sempre visível">
        <Prose>
          <p>
            O <code>.hive-base</code> aplica <code>:focus-visible</code> com{" "}
            <code>--hive-focus-ring-*</code>. Nunca remova o outline sem um
            substituto equivalente.
          </p>
        </Prose>
        <DoDontList
          items={[
            {
              do: "Teste toda tela só com Tab/Shift+Tab: o foco precisa ser visível e seguir a ordem de leitura.",
              dont: "`outline: none` em botões e links “porque ficou feio”.",
              doExample: <Button>Tab até aqui</Button>,
            },
          ]}
        />
      </DocSection>

      <DocSection id="toque" title="Alvos de toque de 44px">
        <BulletList
          items={[
            "Controles interativos: mínimo `--hive-touch-target` (44×44px).",
            "Tamanhos compactos (Button small, Rating) são exceções para desktop — documente quando usar.",
            "Aumente a área clicável com padding no contêiner, não aumentando o ícone.",
          ]}
        />
      </DocSection>

      <DocSection id="acessibilidade" title="Acessibilidade">
        <BulletList
          items={[
            "HTML semântico primeiro: `<button>` para ações, `<a>` para navegação, `<fieldset>` para grupos.",
            "Ícones decorativos com `aria-hidden`; botões só com ícone com `aria-label`.",
            "Nunca comunique algo só por cor — acompanhe de texto ou ícone.",
            "Respeite `prefers-reduced-motion` (o `.hive-base` já reduz animações).",
            "Contraste mínimo AA (4,5:1 para texto). Veja a tabela em Fundamentos → Cores.",
          ]}
        />
      </DocSection>

      <DocSection id="codigo" title="Convenções de código">
        <BulletList
          items={[
            "TypeScript strict, sem `any`, `@ts-ignore` ou `@ts-expect-error`.",
            "Componentes interativos com `React.forwardRef` e `displayName`.",
            "Todo componente aceita `className`, `style`, `data-*` e `aria-*` via `...props`.",
            "CSS Modules por componente; helper `cx` para classes condicionais.",
            "Testes com Vitest + Testing Library + jest-axe cobrindo papéis, teclado e light/dark.",
          ]}
        />
      </DocSection>
    </Article>
  );
}
