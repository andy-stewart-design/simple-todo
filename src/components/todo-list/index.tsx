import { AnimatePresence, motion } from "framer-motion";
import Todo from "../todo";
import { type TodoType } from "@/db/schema";
import clsx from "clsx";

type PropTypes = {
  todos: Array<TodoType>;
  deleteTodo: (id: string) => void;
};

export default function TodoList({ todos, deleteTodo }: PropTypes) {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const orderedTodos = [...activeTodos, ...completedTodos];

  return (
    <div className="relative min-h-20 border-t border-gray-100 bg-gray-50">
      <div
        className={clsx(
          "absolute inset-0 grid place-content-center transition-opacity duration-300",
          activeTodos.length > 0 && "opacity-0",
          activeTodos.length > 0 ? "delay-0" : "delay-200",
        )}
      >
        <p className="opacity-40 select-none">Add a todo or two</p>
      </div>
      <ul role="list" className="relative overflow-clip">
        <AnimatePresence initial={false}>
          {orderedTodos.map((todo) => {
            console.log(todo);

            return (
              <motion.li
                key={todo.id}
                layout="position"
                initial={{ opacity: 1, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ ease: "circOut" }}
                className="relative border-b border-gray-100 bg-white last:border-b-0"
              >
                <Todo todo={todo} deleteTodo={deleteTodo} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
