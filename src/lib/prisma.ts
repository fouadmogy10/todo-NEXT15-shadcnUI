import { PrismaClient } from "@/generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

// ✅ استخدم Prisma client واحد فقط (حماية من إعادة الإنشاء في dev)
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // اختياري: يظهر استعلامات Prisma في console
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
