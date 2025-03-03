import { InferSelectModel, sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
  id: text("id").notNull().primaryKey(),
  todo: text("todo").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  created_at: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export type TodoType = InferSelectModel<typeof todosTable>;
