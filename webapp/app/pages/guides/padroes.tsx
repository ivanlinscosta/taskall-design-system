import { findPage } from "../../lib/registry";
import { pageMeta } from "../../ui/ComponentPage";
import { ExampleBlock } from "../../ui/ExampleBlock";
import { Article, DocSection, PageHeader, Prose } from "../../ui/Page";
import GuardianOnboarding from "./patterns/GuardianOnboarding";
import guardianOnboardingCode from "./patterns/GuardianOnboarding?raw";
import StudentTasks from "./patterns/StudentTasks";
import studentTasksCode from "./patterns/StudentTasks?raw";
import TeacherDashboard from "./patterns/TeacherDashboard";
import teacherDashboardCode from "./patterns/TeacherDashboard?raw";

const page = findPage("guias", "padroes");

export const meta = () => pageMeta(page);

export default function PatternsPage() {
  return (
    <Article>
      <PageHeader
        eyebrow="Guias"
        title="Padrões aplicados"
        lead="Telas do Task All montadas apenas com componentes e tokens do TaskAll. Troque marca, modo, densidade e forma no menu “Tema” para ver o mesmo código se adaptar."
      />
      <DocSection
        id="painel-professor"
        title="Painel do professor"
        intro={
          <Prose>
            <p>
              Marca sugerida: Gestão. Indicadores, alerta de pendência, tarefas
              por aba e grupos da turma.
            </p>
          </Prose>
        }
      >
        <ExampleBlock
          id="padrao-painel"
          title="Painel da semana"
          code={teacherDashboardCode.trim()}
          align="stretch"
        >
          <TeacherDashboard />
        </ExampleBlock>
      </DocSection>
      <DocSection
        id="tarefas-estudante"
        title="Tarefas do estudante"
        intro={
          <Prose>
            <p>
              Marca sugerida: Estudantes. Progresso da semana, lista de tarefas
              e entrega com confirmação em Modal.
            </p>
          </Prose>
        }
      >
        <ExampleBlock
          id="padrao-tarefas"
          title="Minhas tarefas"
          code={studentTasksCode.trim()}
          align="stretch"
        >
          <StudentTasks />
        </ExampleBlock>
      </DocSection>
      <DocSection
        id="cadastro-responsavel"
        title="Cadastro de responsável"
        intro={
          <Prose>
            <p>
              Marca sugerida: Responsáveis. Validação no envio com resumo de
              erro, campos com erro inline, escolha única e consentimento.
            </p>
          </Prose>
        }
      >
        <ExampleBlock
          id="padrao-cadastro"
          title="Convite de acesso"
          code={guardianOnboardingCode.trim()}
          align="stretch"
        >
          <GuardianOnboarding />
        </ExampleBlock>
      </DocSection>
    </Article>
  );
}
