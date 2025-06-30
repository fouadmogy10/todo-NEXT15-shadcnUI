// app/api/categories/route.ts

import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ✅ GET: كل التصنيفات
export async function GET() {
const categories = await prisma.category.findMany({
  where: { pending: false }, // ✅ فقط المعتمدة
  orderBy: { name: "asc" },
});


  return NextResponse.json(categories);
}

// ✅ POST: إنشاء تصنيف جديد (Admin فقط)
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ✅ تحقق من صلاحية المسؤول
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const existing = await prisma.category.findFirst({ where: { name } });
  if (existing) {
    return NextResponse.json({ error: "Category already exists" }, { status: 400 });
  }

  const created = await prisma.category.create({
  data: {
    name,
    pending: false, 
  },
});
  return NextResponse.json(created);
}
