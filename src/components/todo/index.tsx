"use client";

import { useState, useOptimistic, useTransition, startTransition } from "react";
import { deleteTodo, updateTodo } from "@/app/actions";
import { Todo } from "@/app/page";

type PropTypes = {
  todo: Todo;
};

export default function Todo({ todo }: PropTypes) {
  let [optimisticCompleted, setOptimsticCompleted] = useOptimistic(
    Boolean(todo?.completed)
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
    <div style={{ display: "flex", gap: "1rem" }}>
      <input
        type="checkbox"
        checked={optimisticCompleted}
        onChange={handleChange}
      />
      <h2
        style={{
          textDecoration: optimisticCompleted ? "line-through" : "",
          opacity: optimisticCompleted ? 0.5 : 1,
          userSelect: "none",
        }}
      >
        {todo.todo} {`${optimisticCompleted}`}
      </h2>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}
