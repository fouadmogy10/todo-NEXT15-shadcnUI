// app/actions/category-actions.ts
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

export async function createCategory(name: string) {
  await isAdmin();
 await prisma.category.create({
  data: {
    name,
    pending: false, // ✅ مهم
  },
});

  revalidatePath("/categories");
}

export async function updateCategory(id: string, newName: string) {
  await isAdmin();
  await prisma.category.update({
    where: { id },
    data: { name: newName },
  });
  revalidatePath("/categories");
}

export async function deleteCategory(id: string) {
  await isAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/categories");
}
