"use client";

import { useState } from "react";
import { addTodo } from "@/app/actions";

export default function AddTodoForm() {
  const [value, setValue] = useState("");

  function handleSubmit(formData: FormData) {
    if (formData.get("todo") === "") return;

    setValue("");
    addTodo(formData);
  }

  return (
    <form action={handleSubmit} className="flex justify-center gap-1.5">
      <input
        type="text"
        name="todo"
        className="focus-visible:outline-brand/50 max-w-80 rounded border-slate-200 bg-slate-50 py-1 px-1.5"
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
  );
}
