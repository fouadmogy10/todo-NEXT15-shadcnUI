import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "اسم غير صالح" }, { status: 400 });
  }

  await prisma.categorySuggestion.create({
    data: { name, userId },
  });

  return NextResponse.json({ success: true });
}