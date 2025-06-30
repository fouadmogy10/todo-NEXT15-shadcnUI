// app/actions/suggestion-actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function isAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("غير مصرح");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") throw new Error("ممنوع");
}

export async function approveSuggestion(formData: FormData) {
  await isAdmin();
  const id = formData.get("id") as string;
  const suggestion = await prisma.categorySuggestion.findUnique({ where: { id } });
  if (!suggestion) return;

  await prisma.category.create({
  data: {
    name: suggestion.name,
    pending: false, // ✅ إضافة ضرورية
  },
});

await prisma.categorySuggestion.delete({
  where: { id },
});

  revalidatePath("/admin/suggestions");
  revalidatePath("/categories"); 
}

export async function deleteSuggestion(formData: FormData) {
  await isAdmin();
  const id = formData.get("id") as string;
  await prisma.categorySuggestion.delete({ where: { id } });
  revalidatePath("/admin/suggestions");
}
