import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryForm from "./_form";
import CategoryItem from "./_item";
import Link from "next/link"; 

export const dynamic = "force-dynamic";


export const metadata = {
  title: "التصنيفات",
  description: "استعرض ونظم تصنيفات المهام أو اقترح تصنيفات جديدة.",
};


export default async function CategoriesPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") return redirect("/");

  // ✅ جلب التصنيفات الحالية
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // ✅ جلب عدد التصنيفات المقترحة غير الموافق عليها
  const suggestedCount = await prisma.categorySuggestion.count({
    where: { approved: false },
  });

  return (
    <main className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📂 التصنيفات</h1>

        {/* ✅ زر التصنيفات المقترحة */}
        <Link
          href="/admin/suggestions"
          className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium hover:bg-yellow-200 transition"
        >
          اقتراحات: {suggestedCount}
        </Link>
      </div>

      <CategoryForm />

      <div className="grid gap-4">
        {categories.length === 0 ? (
          <p className="text-center text-muted-foreground">
            لا توجد تصنيفات حاليًا.
          </p>
        ) : (
          categories.map((cat) => (
            <CategoryItem key={cat.id} id={cat.id} name={cat.name} />
          ))
        )}
      </div>
    </main>
  );
}