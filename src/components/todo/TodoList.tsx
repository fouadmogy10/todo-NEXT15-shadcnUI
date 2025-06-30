"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
  todos: Todo[];
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleImportant: (id: string) => void;
};

export default function TodoList({
  todos,
  onDone,
  onDelete,
  onToggleImportant,
}: Props) {
  const [items, setItems] = useState<string[]>(todos.map((todo) => todo.id));

  useEffect(() => {
    setItems(todos.map((todo) => todo.id));
  }, [todos]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);

      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);

      await fetch("/api/todos/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: newOrder }),
      });
    }
  };

  const sortedTodos = items
    .map((id) => todos.find((t) => t.id === id))
    .filter(Boolean) as Todo[]; // نحذف undefined ونعرف النوع

  // ✅ لو مفيش مهام
  if (sortedTodos.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-6 text-lg">
        لا يوجد مهام حالياً
      </p>
    );
  }

  // ✅ عرض القائمة بالسحب والإفلات
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDone={onDone}
              onDelete={onDelete}
              onToggleImportant={onToggleImportant}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
