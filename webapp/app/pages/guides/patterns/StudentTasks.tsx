import * as React from "react";
import {
  Badge,
  Button,
  Check,
  Content,
  Heading,
  Modal,
  ModalFooter,
  Paragraph,
  ProgressBar,
  Rating,
  Upload,
} from "@taskall/react";

type Task = {
  id: string;
  title: string;
  subject: string;
  due: string;
  done: boolean;
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Mapa mental de Biologia",
    subject: "Ciências",
    due: "Hoje",
    done: false,
  },
  {
    id: "2",
    title: "Redação: carta argumentativa",
    subject: "Português",
    due: "Quarta",
    done: false,
  },
  {
    id: "3",
    title: "Exercícios de frações",
    subject: "Matemática",
    due: "Ontem",
    done: true,
  },
];

export default function StudentTasks() {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [delivering, setDelivering] = React.useState<Task | null>(null);
  const [rating, setRating] = React.useState(0);
  const done = tasks.filter((task) => task.done).length;

  const finish = () => {
    if (!delivering) return;
    setTasks((current) =>
      current.map((task) =>
        task.id === delivering.id ? { ...task, done: true } : task,
      ),
    );
    setDelivering(null);
    setRating(0);
  };

  return (
    <section
      aria-labelledby="minhas-tarefas"
      style={{
        display: "grid",
        gap: "var(--taskall-space-step-6)",
        maxWidth: 560,
        margin: "0 auto",
        padding: "var(--taskall-space-step-7)",
        border: "1px solid var(--taskall-border-default)",
        borderRadius: "var(--taskall-radius-surface)",
        backgroundColor: "var(--taskall-background-primary)",
      }}
    >
      <div>
        <Heading level={2} as={5} id="minhas-tarefas">
          Minhas tarefas
        </Heading>
        <Paragraph
          size="s"
          style={{ margin: 0, color: "var(--taskall-content-secondary)" }}
        >
          Semana de 22 a 26/09
        </Paragraph>
      </div>
      <ProgressBar
        value={(done / tasks.length) * 100}
        label={`${done} de ${tasks.length} entregues`}
        showPercentage
      />
      <ul
        style={{
          display: "grid",
          gap: "var(--taskall-space-step-4)",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--taskall-space-12)",
            }}
          >
            <Content
              style={{ flex: 1 }}
              type="avatar"
              label={task.title}
              description={`${task.subject} · ${task.due}`}
              badge={
                task.done ? (
                  <Badge size="x-small" type="icon" icon={Check}>
                    Entregue
                  </Badge>
                ) : undefined
              }
            />
            {task.done ? null : (
              <Button
                size="small"
                visualStyle="light"
                leftIcon={Upload}
                onClick={() => setDelivering(task)}
              >
                Entregar
              </Button>
            )}
          </li>
        ))}
      </ul>
      <Modal
        open={delivering !== null}
        onOpenChange={(open) => (open ? undefined : setDelivering(null))}
        title={`Entregar “${delivering?.title ?? ""}”`}
        description="Confirme o envio. Depois de entregue, a tarefa fica disponível para correção."
        width={440}
        footer={
          <ModalFooter>
            <Button
              tone="neutral"
              visualStyle="light"
              onClick={() => setDelivering(null)}
            >
              Cancelar
            </Button>
            <Button onClick={finish}>Confirmar entrega</Button>
          </ModalFooter>
        }
      >
        <div style={{ display: "grid", gap: "var(--taskall-space-8)" }}>
          <Paragraph size="s" style={{ margin: 0 }}>
            Opcional: como foi fazer esta tarefa?
          </Paragraph>
          <Rating
            label="Dificuldade percebida"
            value={rating}
            onChange={setRating}
          />
        </div>
      </Modal>
    </section>
  );
}
