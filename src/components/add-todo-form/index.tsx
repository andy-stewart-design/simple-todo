"use client";

import { useState } from "react";
import { addTodo } from "@/app/actions";

export default function AddTodoForm() {
  const [value, setValue] = useState("");

  function handleSubmit(formData: FormData) {
    setValue("");
    addTodo(formData);
  }

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        name="todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
