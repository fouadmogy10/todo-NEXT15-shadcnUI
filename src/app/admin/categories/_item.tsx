"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Check } from "lucide-react";
import { toast } from "react-toastify";
import { updateCategory, deleteCategory } from "@/actions/category-actions";

type Props = {
  id: string;
  name: string;
};

export default function CategoryItem({ id, name }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    if (!newName.trim()) return toast.error("الاسم لا يمكن أن يكون فارغًا");

    startTransition(async () => {
      try {
        await updateCategory(id, newName);
        toast.success("تم تحديث التصنيف ✅");
        setEditMode(false);
      } catch {
        toast.error("فشل في تحديث التصنيف");
      }
    });
  };

  const handleDelete = () => {

    startTransition(async () => {
      try {
        await deleteCategory(id);
        toast.success("تم حذف التصنيف 🗑️");
      } catch {
        toast.error("فشل في حذف التصنيف");
      }
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        {editMode ? (
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1"
          />
        ) : (
          <p className="text-lg font-medium flex-1">{name}</p>
        )}

        <div className="flex items-center gap-2">
          {editMode ? (
            <Button size="icon" onClick={handleUpdate} disabled={isPending}>
              <Check className="w-5 h-5" />
            </Button>
          ) : (
            <Button size="icon" onClick={() => setEditMode(true)}>
              <Pencil className="w-5 h-5" />
            </Button>
          )}

          <Button
            size="icon"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
