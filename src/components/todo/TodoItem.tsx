"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Trash2, GripVertical, Star } from "lucide-react";
import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onDone: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleImportant: (id: string) => void; // ✅ مهم جدًا
};

export default function TodoItem({ todo, onDone, onDelete, onToggleImportant }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 rounded-xl shadow-sm bg-background transition-all duration-200 ${
        todo.done ? "opacity-60" : ""
      }`}
      {...attributes}
    >
      {/* عنوان المهمة والتصنيف */}
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center gap-3">
          {/* عنوان المهمة */}
          <span
            className={`text-base sm:text-lg ${
              todo.done ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {todo.title}
          </span>

          {/* التصنيف */}
          {todo.category?.name && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {todo.category.name}
            </span>
          )}
        </div>

        {/* أزرار التحكم */}
        <div className="flex gap-2 items-center">
          {/* زر المفضلة */}
          <Button
            size="icon"
            variant={todo.isImportant ? "default" : "outline"}
            onClick={() => onToggleImportant(todo.id)}
            className="hover:bg-yellow-100"
          >
            <Star
              className={`w-5 h-5 ${
                todo.isImportant ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
              }`}
            />
          </Button>

          {/* زر الإنجاز */}
          {!todo.done && (
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-green-100"
              onClick={() => onDone(todo.id)}
            >
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </Button>
          )}

          {/* زر الحذف */}
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>

          {/* زر السحب */}
          <Button
            variant="outline"
            {...listeners}
            className="p-1 rounded-md hover:bg-muted transition"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
