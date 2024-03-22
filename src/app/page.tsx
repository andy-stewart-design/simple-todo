import { db } from "@/db";
import AddTodoForm from "@/components/add-todo-form";
import Todo from "@/components/todo";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main>
      <h1>Simple Todos</h1>
      <AddTodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </main>
  );
}

const getTodos = async () => await db.query.todosTable.findMany();
const getTodo = async () => await db.query.todosTable.findFirst();
export type Todo = Awaited<ReturnType<typeof getTodo>>;
