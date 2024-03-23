"use client";

import { useOptimistic, useTransition } from "react";
import { TodoType } from "@/db/schema";
import AddTodoForm from "../add-todo-form";
import TodoList from "../todo-list";
import { addTodo, deleteTodo } from "@/app/actions";

type PropTypes = {
  todos: Array<TodoType>;
};

export default function TodoWidget({ todos }: PropTypes) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);
  const [isPending, startTransition] = useTransition();

  function optimisticAdd(formData: FormData) {
    const todo = createTodo(formData);

    startTransition(() => {
      setOptimisticTodos([todo, ...optimisticTodos]);
      addTodo(todo);
    });
  }

  function optimisticDelete(id: string) {
    const nextTodos = optimisticTodos.filter((todo) => todo.id !== id);

    startTransition(() => {
      setOptimisticTodos(nextTodos);
      deleteTodo(id);
    });
  }

  return (
    <section className="mx-auto grid max-w-2xl gap-6 rounded-lg bg-white p-8 shadow">
      <AddTodoForm addTodo={optimisticAdd} disabled={isPending} />
      <TodoList todos={optimisticTodos} deleteTodo={optimisticDelete} />
    </section>
  );
}

function createTodo(formData: FormData) {
  const todo = formData.get("todo");

  if (!todo || typeof todo !== "string") {
    throw new Error("Invalid todo");
  }

  const id = crypto.randomUUID();

  return {
    id,
    todo,
    completed: false,
    created_at: new Date().toISOString(),
  };
}
