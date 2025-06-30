import { Todo } from "@/types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("/api/todos");
  return res.json();
};

export const addTodo = async (title: string, categoryId: string | null) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, categoryId }),
  });
  return res.json();
};

export const markTodoDone = async (id: string): Promise<Todo> => {
  const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
  return res.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
};
export const toggleImportant = async (id: string) => {
  const res = await fetch(`/api/todos/${id}/important`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("فشل تعديل الأهمية");

  return res.json();
};
export async function suggestCategory(name: string) {
  const res = await fetch("/api/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("فشل في إرسال الاقتراح");
}
