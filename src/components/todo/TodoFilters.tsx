"use client";

import { FilterType } from "@/types/todo";
import { Button } from "@/components/ui/button";

type Props = {
  current: FilterType;
  onChange: (filter: FilterType) => void;
};

export default function TodoFilters({ current, onChange }: Props) {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "الكل" },
    { key: "done", label: "المنجزة" },
    { key: "notDone", label: "غير المنجزة" },
  ];

  return (
    <div className="flex justify-center gap-2">
      {filters.map((f) => (
        <Button
          key={f.key}
          variant={current === f.key ? "default" : "outline"}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
}
