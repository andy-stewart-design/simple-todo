"use client";

import { useState } from "react";
import { clsx } from "clsx";

type PropTypes = {
  addTodo: (formData: FormData) => void;
  disabled: boolean;
};

export default function AddTodoForm({ addTodo, disabled }: PropTypes) {
  const [value, setValue] = useState("");

  function handleSubmit(formData: FormData) {
    if (formData.get("todo") === "" || disabled) return;

    setValue("");

    addTodo(formData);
  }

  return (
    <header className="p-8">
      <form action={handleSubmit} className="flex justify-center gap-1.5">
        <input
          type="text"
          name="todo"
          className={clsx(
            "focus-visible:outline-brand/50 max-w-80 rounded border-slate-200 bg-slate-50 py-1 px-1.5 font-light",
            disabled && "text-slate-300",
          )}
          style={{ flexGrow: 1 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-brand rounded py-1 px-2.5 text-sm font-medium text-white shadow-sm"
        >
          Add Todo
        </button>
      </form>
    </header>
  );
}
