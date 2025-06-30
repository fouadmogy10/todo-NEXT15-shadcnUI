export type Category = {
  id: string;
  name: string;
};

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  isImportant: boolean;
  order: number | null;
  userId: string;

  // ✅ أضف هذا السطر لدعم العلاقة مع التصنيف
  category?: Category | null;
};
export type FilterType = "all" | "done" | "notDone";
