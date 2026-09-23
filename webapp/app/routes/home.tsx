import { Link } from "react-router";
import {
  Add,
  AlertNotification,
  AvatarGroup,
  Badge,
  Button,
  Calendar,
  Content,
  Heading,
  Logo,
  ProgressBar,
} from "@hive/react";

import { COMPONENTS, FOUNDATIONS, GUIDES } from "../lib/registry";
import { SETTING_OPTIONS, useSettings } from "../lib/settings";
import { CodeBlock } from "../ui/CodeBlock";
import { DemoSurface } from "../ui/DemoSurface";
import styles from "./home.module.css";

export const meta = () => [
  { title: "Hive Design System · Task All" },
  {
    name: "description",
    content:
      "Fundamentos, componentes React acessíveis e padrões aplicados do design system do Task All.",
  },
];

const audiences: Record<string, string> = {
  coral: "Task All",
  gestao: "Gestão escolar",
  estudantes: "Estudantes",
  responsaveis: "Responsáveis",
};

const principles = [
  {
    title: "Acessível por padrão",
    text: "HTML semântico, foco visível, alvos de 44px, teclado completo e testes com jest-axe em todos os componentes.",
  },
  {
    title: "Um código, quatro públicos",
    text: "Modo, marca, densidade e forma trocam por atributos no HiveProvider — sem forks nem CSS por produto.",
  },
  {
    title: "Tipado e enxuto",
    text: "TypeScript strict, APIs pequenas, tokens em CSS e tree-shaking: você carrega só o que usa.",
  },
];

function HeroPreview() {
  return (
    <DemoSurface
      align="stretch"
      className={styles.preview}
      label="Prévia de componentes"
    >
      <div className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <div>
            <Heading level={2} as={6}>
              Projeto de Ciências
            </Heading>
            <Content
              type="icon"
              icon={Calendar}
              size="x-small"
              label="Entrega em 02/10"
            />
          </div>
          <Badge size="small" visualStyle="light">
            Em andamento
          </Badge>
        </div>
        <ProgressBar
          value={68}
          label="Etapas concluídas"
          showPercentage
          size="small"
        />
        <div className={styles.previewFooter}>
          <AvatarGroup
            size="sm"
            max={3}
            ariaLabel="Integrantes"
            avatars={["LM", "BF", "TC", "IR", "GN"].map((fallback) => ({
              fallback,
            }))}
          />
          <Button size="small" leftIcon={Add}>
            Nova etapa
          </Button>
        </div>
      </div>
      <AlertNotification
        size="small"
        status="success"
        title="Relatório enviado para a coordenação."
      />
    </DemoSurface>
  );
}

export default function Home() {
  const { settings, setSetting } = useSettings();

  return (
    <main id="conteudo" tabIndex={-1} className={styles.main}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <Logo className={styles.heroLogo} />
          <p className={styles.eyebrow}>Design system do Task All</p>
          <h1 id="hero-title" className={styles.title}>
            Hive
          </h1>
          <p className={styles.lead}>
            Fundamentos, componentes React e padrões para construir as telas de
            gestão escolar, estudantes e responsáveis com consistência e
            acessibilidade.
          </p>
          <div className={styles.actions}>
            <Link to="/guias/primeiros-passos" className={styles.primaryLink}>
              Primeiros passos
            </Link>
            <Link to="/componentes" className={styles.secondaryLink}>
              Ver {COMPONENTS.length} componentes
            </Link>
          </div>
          <CodeBlock
            language="shell"
            caption="instalação"
            code="pnpm add @hive/react"
            className={styles.install}
          />
        </div>
        <HeroPreview />
      </section>

      <section className={styles.section} aria-labelledby="marcas-title">
        <h2 id="marcas-title" className={styles.sectionTitle}>
          Experimente as marcas
        </h2>
        <p className={styles.sectionLead}>
          A mesma interface em cada público do Task All. A escolha vale para
          toda a documentação.
        </p>
        <div className={styles.brandPicker} role="group" aria-label="Marca">
          {SETTING_OPTIONS.brand.map((brand) => (
            <DemoSurface
              key={brand.value}
              overrides={{ brand: brand.value }}
              align="stretch"
              className={styles.brandSurface}
            >
              <button
                type="button"
                className={styles.brandButton}
                aria-pressed={settings.brand === brand.value}
                onClick={() => setSetting("brand", brand.value)}
              >
                <span className={styles.brandDot} aria-hidden="true" />
                <span className={styles.brandName}>{brand.label}</span>
                <span className={styles.brandAudience}>
                  {audiences[brand.value]}
                </span>
              </button>
            </DemoSurface>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="principios-title">
        <h2 id="principios-title" className={styles.sectionTitle}>
          Princípios
        </h2>
        <ul className={styles.principles}>
          {principles.map((principle) => (
            <li key={principle.title} className={styles.principle}>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleText}>{principle.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="explorar-title">
        <h2 id="explorar-title" className={styles.sectionTitle}>
          Explorar
        </h2>
        <div className={styles.columns}>
          {[
            { title: "Fundamentos", items: FOUNDATIONS },
            { title: "Componentes", items: COMPONENTS.slice(0, 8) },
            { title: "Guias", items: GUIDES },
          ].map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={styles.column}
            >
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <ul className={styles.linkList}>
                {column.items.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className={styles.link}>
                      {item.title}
                    </Link>
                  </li>
                ))}
                {column.title === "Componentes" ? (
                  <li>
                    <Link to="/componentes" className={styles.link}>
                      Todos os componentes →
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          Hive Design System · <code>@hive/react</code> · Documentação
          pré-renderizada com React Router 7 e Vite.
        </p>
      </footer>
    </main>
  );
}
