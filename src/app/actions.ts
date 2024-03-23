"use server";

import { db } from "@/db";
import { TodoType, todosTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const todo = formData.get("todo");

  if (!todo || typeof todo !== "string") {
    throw new Error("Invalid todo");
  }

  const id = crypto.randomUUID();

  return {
    id,
    todo,
    completed: false,
    created_at: "",
  };
}

export async function addTodo(todo: TodoType) {
  await db.insert(todosTable).values(todo);
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await db.delete(todosTable).where(eq(todosTable.id, id));
  revalidatePath("/");
}

export async function updateTodo(id: string, completed: boolean) {
  await db.update(todosTable).set({ completed }).where(eq(todosTable.id, id));
  revalidatePath("/");
}
