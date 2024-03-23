import { db } from "@/db";
import TodoWidget from "@/components/todo-widget";
import { todosTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-8">
      <TodoWidget todos={todos} />
    </main>
  );
}

async function getTodos() {
  return await db
    .select()
    .from(todosTable)
    .orderBy(desc(todosTable.created_at));
}
