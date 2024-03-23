import { db } from "@/db";
import AddTodoForm from "@/components/add-todo-form";
import Todo from "@/components/todo";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-8">
      <section className="mx-auto grid max-w-2xl gap-6 rounded-lg bg-white p-8 shadow">
        <AddTodoForm />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

const getTodos = async () => await db.query.todosTable.findMany();
const getTodo = async () => await db.query.todosTable.findFirst();
export type Todo = Awaited<ReturnType<typeof getTodo>>;
