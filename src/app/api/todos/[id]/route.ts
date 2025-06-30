import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

type Params = { params:Promise<{ id: string }> };

// ✅ تحديث حالة المهمة
export async function PATCH(req: Request, { params }: Params) {
  const { userId } =await auth();
   const {id} =await params;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existingTodo = await prisma.todo.findUnique({ where: { id } });

  if (!existingTodo || existingTodo.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const todo = await prisma.todo.update({
    where: { id},
    data: { done: true },
  });

  return NextResponse.json(todo);
}

// ✅ حذف مهمة
export async function DELETE(req: Request, { params }: Params) {
  const { userId } =await auth();
   const {id} =await params;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existingTodo = await prisma.todo.findUnique({ where: { id } });

  if (!existingTodo || existingTodo.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
