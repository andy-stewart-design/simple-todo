import { type TodoType } from "@/db/schema";
import Todo from "../todo";

type PropTypes = {
  todos: Array<TodoType>;
  deleteTodo: (id: string) => void;
};

export default function TodoList({ todos, deleteTodo }: PropTypes) {
  if (todos.length === 0) return null;

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const orderedTodos = [...activeTodos, ...completedTodos];

  return (
    <ul role="list">
      {orderedTodos.map((todo) => (
        <li key={todo.id}>
          <Todo todo={todo} deleteTodo={deleteTodo} />
        </li>
      ))}
    </ul>
  );
}
