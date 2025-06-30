"use client";

import { useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import TodoFilters from "@/components/todo/TodoFilters";
import { FilterType } from "@/types/todo";
import TodoSearch from "@/components/todo/TodoSearch";


import { useInitUser } from "@/hooks/useInitUser";

export default function ClientTodoPage({ userId }: { userId: string }) {
  const {
    todos,
    handleAdd,
    handleDone,
    handleDelete,
    handleToggleImportant, // ✅ أضفناها هنا
  } = useTodos(userId);
  useInitUser();

  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "done") return todo.done;
      if (filter === "notDone") return !todo.done;
      return true;
    })
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="max-w-xl mx-auto mt-10 space-y-4 ">
      <h1 className="text-2xl font-bold text-center">📝 قائمة المهام</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoSearch search={search} setSearch={setSearch} />
      <TodoFilters current={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onDone={handleDone}
        onDelete={handleDelete}
        onToggleImportant={handleToggleImportant} // ✅ بقت شغالة
      />
    </main>
  );
}
