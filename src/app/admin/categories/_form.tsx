"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createCategory } from "@/actions/category-actions"; // ✅

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    if (!name.trim()) return;

    startTransition(() => {
      createCategory(name)
        .then(() => {
          toast.success("تمت الإضافة ✅");
          setName("");
        })
        .catch(() => toast.error("فشل في الإضافة ❌"));
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd();
      }}
      className="flex items-center gap-2"
    >
      <Input
        placeholder="أدخل اسم التصنيف"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "جارٍ..." : "إضافة"}
      </Button>
    </form>
  );
}
