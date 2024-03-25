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
    <div className="group flex min-h-20 items-center gap-4 py-6 px-8 text-xl font-light">
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
      <button
        className="rotate-180 scale-0 opacity-0 transition-all delay-200 duration-300 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-75"
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </div>
  );
}
