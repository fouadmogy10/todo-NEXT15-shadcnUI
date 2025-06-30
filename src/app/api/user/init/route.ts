import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId, sessionClaims } =await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = sessionClaims?.email as string;

  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing) {
    await prisma.user.create({
      data: {
        id: userId,
        email,
        role: "USER", // أول مرة
      },
    });
  }

  return NextResponse.json({ success: true });
}
