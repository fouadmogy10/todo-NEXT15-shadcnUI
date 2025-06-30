import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function ensureUserExists() {
  const { userId, sessionClaims } =await auth();
  if (!userId) return;

  const email = sessionClaims?.email as string;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    await prisma.user.create({
      data: {
        id: userId,
        email,
        role: "USER", // أو "ADMIN" أول مرة يدويًا من قاعدة البيانات
      },
    });
  }
}
