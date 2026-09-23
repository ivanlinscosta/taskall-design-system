import {
  AlertNotification,
  AvatarGroup,
  Badge,
  Button,
  Calendar,
  Content,
  Divider,
  Heading,
  LabelText,
  Paragraph,
  ProgressBar,
  TabMenu,
  Tooltip,
  Add,
  Download,
} from "@hive/react";

const kpis = [
  { label: "Entregas no prazo", value: 86, tone: "green" as const },
  { label: "Tarefas corrigidas", value: 64, tone: "brand" as const },
  { label: "Frequência média", value: 94, tone: "blue" as const },
];

const tasks = [
  {
    title: "Resumo do capítulo 3",
    meta: "8º B · vence hoje, 23:59",
    pending: 7,
    status: "Aberta",
  },
  {
    title: "Lista de exercícios 5",
    meta: "8º A · vence sexta",
    pending: 18,
    status: "Aberta",
  },
  {
    title: "Relatório da feira",
    meta: "8º B · encerrada",
    pending: 0,
    status: "Corrigir",
  },
];

const card = {
  padding: "var(--hive-space-step-6)",
  border: "1px solid var(--hive-border-default)",
  borderRadius: "var(--hive-radius-surface)",
  backgroundColor: "var(--hive-background-primary)",
};

export default function TeacherDashboard() {
  return (
    <div style={{ display: "grid", gap: "var(--hive-space-step-6)" }}>
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "end",
          justifyContent: "space-between",
          gap: "var(--hive-space-12)",
        }}
      >
        <div>
          <LabelText
            size="xs"
            style={{ color: "var(--hive-content-secondary)" }}
          >
            Segunda-feira, 22 de setembro
          </LabelText>
          <Heading level={2} as={4}>
            Bom dia, Helena
          </Heading>
        </div>
        <div style={{ display: "flex", gap: "var(--hive-space-8)" }}>
          <Tooltip title="Exportar notas do bimestre">
            <Button
              tone="neutral"
              visualStyle="outline"
              leftIcon={Download}
              aria-label="Exportar notas do bimestre"
            />
          </Tooltip>
          <Button leftIcon={Add}>Nova tarefa</Button>
        </div>
      </header>

      <AlertNotification
        status="warning"
        size="medium"
        title="Conselho de classe na quinta: 4 notas do 8º B ainda não foram lançadas."
        linkLabel="Lançar notas"
        linkHref="#notas"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--hive-space-step-5)",
        }}
      >
        {kpis.map((kpi) => (
          <section key={kpi.label} style={card} aria-label={kpi.label}>
            <p style={{ margin: 0, font: "var(--hive-font-display-4)" }}>
              {kpi.value}%
            </p>
            <ProgressBar
              value={kpi.value}
              label={kpi.label}
              tone={kpi.tone}
              size="small"
            />
          </section>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--hive-space-step-5)",
        }}
      >
        <section
          style={{ ...card, display: "grid", gap: "var(--hive-space-step-4)" }}
          aria-labelledby="dash-tarefas"
        >
          <Heading level={3} as={6} id="dash-tarefas">
            Tarefas da semana
          </Heading>
          <TabMenu
            ariaLabel="Filtrar tarefas"
            items={[
              {
                key: "abertas",
                label: "Abertas",
                content: (
                  <ul
                    style={{
                      display: "grid",
                      gap: "var(--hive-space-step-4)",
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                    }}
                  >
                    {tasks.map((task, index) => (
                      <li
                        key={task.title}
                        style={{
                          display: "grid",
                          gap: "var(--hive-space-step-4)",
                        }}
                      >
                        {index > 0 ? <Divider /> : null}
                        <Content
                          type="icon"
                          icon={Calendar}
                          label={task.title}
                          description={task.meta}
                          badge={
                            task.pending > 0 ? (
                              <Badge
                                type="number"
                                size="small"
                                role="img"
                                aria-label={`${task.pending} entregas pendentes`}
                              >
                                {task.pending}
                              </Badge>
                            ) : (
                              <Badge size="small">{task.status}</Badge>
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: "rascunhos",
                label: "Rascunhos",
                content: <Paragraph size="s">2 rascunhos salvos.</Paragraph>,
              },
            ]}
          />
        </section>

        <section
          style={{
            ...card,
            display: "grid",
            gap: "var(--hive-space-step-4)",
            alignContent: "start",
          }}
          aria-labelledby="dash-turma"
        >
          <Heading level={3} as={6} id="dash-turma">
            8º B · Grupos do projeto
          </Heading>
          {["Grupo 1", "Grupo 2", "Grupo 3"].map((group, index) => (
            <div
              key={group}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--hive-space-8)",
              }}
            >
              <LabelText size="s">{group}</LabelText>
              <AvatarGroup
                size="sm"
                max={3}
                ariaLabel={`Integrantes do ${group}`}
                avatars={["LM", "BF", "TC", "IR", "GN"]
                  .slice(index, index + 4)
                  .map((fallback) => ({ fallback }))}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
