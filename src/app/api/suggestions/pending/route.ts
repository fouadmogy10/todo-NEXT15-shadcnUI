// ✅ API: GET /api/suggestions/pending/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([], { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") return NextResponse.json([], { status: 403 });

  const suggestions = await prisma.categorySuggestion.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(suggestions);
}
