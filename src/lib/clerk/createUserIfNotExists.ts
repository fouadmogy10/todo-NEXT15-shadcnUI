// src/lib/clerk/createUserIfNotExists.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function createUserIfNotExists() {
  const user = await currentUser();

  if (!user) return null;

  const existing = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        role: "USER", // أو "ADMIN" لو حبيت
      },
    });
  }

  return user;
}
