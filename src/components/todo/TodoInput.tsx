"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";

type Category = {
  id: string;
  name: string;
};

type Props = {
  onAdd: (title: string, categoryId: string | null, suggestedCategory?: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suggestedCategory, setSuggestedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch {
        toast.error("فشل تحميل التصنيفات");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("يجب إدخال عنوان المهمة");

    if (categoryId === "other" && !suggestedCategory.trim()) {
      return toast.error("يرجى إدخال اسم التصنيف المقترح");
    }

    onAdd(title.trim(), categoryId === "other" ? null : categoryId, suggestedCategory.trim());
    setTitle("");
    setCategoryId(null);
    setSuggestedCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2">
        <Label>عنوان المهمة</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: مراجعة الدروس"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>التصنيف</Label>
        <Select
          onValueChange={(val) => setCategoryId(val)}
          value={categoryId ?? ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر تصنيفًا (اختياري)" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
            <SelectItem value="other">تصنيف آخر...</SelectItem>
            {categories.length === 0 && (
              <SelectItem disabled value="none">
                لا توجد تصنيفات
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* إذا المستخدم اختار "تصنيف آخر" يظهر هذا الحقل */}
      {categoryId === "other" && (
        <div className="flex flex-col gap-2">
          <Label>اسم التصنيف المقترح</Label>
          <Input
            value={suggestedCategory}
            onChange={(e) => setSuggestedCategory(e.target.value)}
            placeholder="مثال: تطوير ذات"
          />
        </div>
      )}

      <Button type="submit" className="w-full">
        إضافة
      </Button>
    </form>
  );
}
