// app/admin/suggestions/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { approveSuggestion, deleteSuggestion } from "@/actions/suggestion-actions";
export const metadata = {
  title: "مراجعة التصنيفات المقترحة",
  description: "قم بمراجعة وقبول أو رفض التصنيفات المقترحة من قبل المستخدمين.",
};

export default async function SuggestionsPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") return redirect("/");

  const suggestions = await prisma.categorySuggestion.findMany({
    where: { approved: false },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">📥 مراجعة التصنيفات المقترحة</h1>

      {suggestions.length === 0 ? (
        <p className="text-center text-muted-foreground">لا توجد اقتراحات حالية.</p>
      ) : (
        <div className="grid gap-4">
          {suggestions.map((sugg) => (
            <Card key={sugg.id} className="p-4 flex justify-between items-center gap-4">
              <div>
                <p className="font-semibold">{sugg.name}</p>
                <p className="text-xs text-muted-foreground">من: {sugg.user.email}</p>
              </div>
              <div className="flex gap-2">
                <form action={approveSuggestion}>
                  <input type="hidden" name="id" value={sugg.id} />
                  <Button size="icon"  variant="default">✔️</Button>
                </form>
                <form action={deleteSuggestion}>
                  <input type="hidden" name="id" value={sugg.id} />
                  <Button size="icon" variant="destructive">🗑️</Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
