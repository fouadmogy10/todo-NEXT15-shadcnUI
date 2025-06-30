import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// جلب كل المهام
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([], { status: 401 });

 const todos = await prisma.todo.findMany({
  where: { userId },
  include: { category: true },
  orderBy: { order: "asc" },
});


  return NextResponse.json(todos);
}

// إضافة مهمة
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, categoryId } = await req.json();

  const todo = await prisma.todo.create({
    data: {
      title,
      userId,
      categoryId: categoryId || null,
    },
  });

  return NextResponse.json(todo);
}

