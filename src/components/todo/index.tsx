"use client";

import { useOptimistic, startTransition } from "react";
import { updateTodo } from "@/app/actions";
import { TodoType } from "@/db/schema";

type PropTypes = {
  todo: TodoType;
  deleteTodo: (id: string) => void;
};

export default function Todo({ todo, deleteTodo }: PropTypes) {
  let [optimisticCompleted, setOptimsticCompleted] = useOptimistic(
    todo.completed,
  );

  function updateCompleted() {
    const nextCompleted = !optimisticCompleted;

    startTransition(() => {
      setOptimsticCompleted(nextCompleted);
      updateTodo(todo.id, nextCompleted);
    });
  }

  return (
    <div className="flex gap-4 border-b border-gray-100 p-3 text-xl font-light">
      <input
        type="checkbox"
        checked={optimisticCompleted}
        onChange={updateCompleted}
      />
      <h2
        className="user-select-none"
        style={{
          textDecoration: optimisticCompleted ? "line-through" : "",
          opacity: optimisticCompleted ? 0.5 : 1,
          flexGrow: 1,
        }}
      >
        {todo.todo}
      </h2>
      <button onClick={() => deleteTodo(todo.id)}>×</button>
    </div>
  );
}
