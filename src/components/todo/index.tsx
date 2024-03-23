"use client";

import { useState, useOptimistic, useTransition, startTransition } from "react";
import { deleteTodo, updateTodo } from "@/app/actions";
import { Todo } from "@/app/page";

type PropTypes = {
  todo: Todo;
};

export default function Todo({ todo }: PropTypes) {
  let [optimisticCompleted, setOptimsticCompleted] = useOptimistic(
    Boolean(todo?.completed),
  );

  function handleChange() {
    if (!todo) return null;

    const nextCompleted = !optimisticCompleted;

    startTransition(() => {
      setOptimsticCompleted(nextCompleted);
      updateTodo(todo.id, nextCompleted);
    });
  }

  if (!todo) return null;

  return (
    <div className="flex gap-4 border-b border-gray-100 p-3 text-xl font-light">
      <input
        type="checkbox"
        checked={optimisticCompleted}
        onChange={handleChange}
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
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}
