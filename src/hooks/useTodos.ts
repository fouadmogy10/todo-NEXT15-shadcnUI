import { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  markTodoDone,
  toggleImportant,
  suggestCategory,
} from "@/lib/api";
import { Todo } from "@/types/todo";
import { toast } from "react-toastify";

export function useTodos(_userId: string) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        const sorted = data.sort((a, b) => {
          if (a.isImportant === b.isImportant) return 0;
          return b.isImportant ? 1 : -1;
        });
        setTodos(sorted);
      })
      .catch(() => toast.error("فشل تحميل المهام"));
  }, []);

const handleAdd = async (
  title: string,
  categoryId: string | null,
  suggestedCategory?: string
) => {
  try {
    if (!categoryId && suggestedCategory) {
      // ✅ إرسال اقتراح التصنيف
      await suggestCategory(suggestedCategory);
      toast.info("تم إرسال التصنيف للمراجعة ✅");
    }

    // ✅ إضافة المهمة لو فيه تصنيف (أو بدون تصنيف)
    const newTodo = await addTodo(title, categoryId);
    setTodos((prev) => [newTodo, ...prev]);
    toast.success("تمت الإضافة ✅");
  } catch {
    toast.error("فشل في إضافة المهمة");
  }
};



  const handleDone = async (id: string) => {
    try {
      const updated = await markTodoDone(id);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: updated.done } : t))
      );
      toast.info("تم تحديد المهمة كمُنجزة ✅");
    } catch {
      toast.error("فشل في تحديث المهمة");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("تم الحذف 🗑️");
    } catch {
      toast.error("فشل في حذف المهمة");
    }
  };

  const handleToggleImportant = async (id: string) => {
    try {
      const updated = await toggleImportant(id);
      setTodos((prev) =>
        prev
          .map((t) => (t.id === id ? updated : t))
          .sort((a, b) =>
            b.isImportant === a.isImportant ? 0 : b.isImportant ? 1 : -1
          )
      );
      toast.info("تم تعديل أهمية المهمة ⭐");
    } catch {
      toast.error("فشل في تعديل المهمة");
    }
  };

  return {
    todos,
    handleAdd,
    handleDone,
    handleDelete,
    handleToggleImportant, // ✅
  };
}
