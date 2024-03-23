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
    <form action={handleSubmit} className="flex gap-2">
      <input
        type="text"
        name="todo"
        className="focus-visible:outline-brand/50 border-slate-200 bg-slate-50 py-1 px-1.5"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
