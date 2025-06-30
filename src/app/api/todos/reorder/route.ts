import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const { orderedIds }: { orderedIds: string[] } = await req.json();

  try {
    const updates = orderedIds.map((id, index) =>
      prisma.todo.update({
        where: { id },
        data: { order: index },
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
