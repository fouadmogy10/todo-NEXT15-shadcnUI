"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function TodoSearch({ search, setSearch }: Props) {
  return (
    <Input
      placeholder="ابحث عن مهمة..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="max-w-md mx-auto"
    />
  );
}
