import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const { userId } = await auth();
   const {id} =await params;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.todo.findUnique({
    where: { id},
  });

  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.todo.update({
    where: { id},
    data: { isImportant: !existing.isImportant },
  });

  return NextResponse.json(updated);
}
