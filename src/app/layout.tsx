// app/layout.tsx أو app/RootLayout.tsx

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/themToggle";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
export const metadata = {
  title: {
    default: "تطبيق المهام",
    template: "%s | مدير المهام",
  },
  description: "أفضل طريقة لتنظيم مهامك اليومية.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  let role: string | null = null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    role = user?.role ?? null;
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning dir="rtl">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* ✅ الهيدر */}
            <header className="flex justify-between items-start px-4 py-3 border-b container mx-auto">
              <div className="flex gap-3 items-center">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <UserButton />
                </SignedIn>
                <ModeToggle />
              </div>
              {/* ✅ عرض رابط التصنيفات فقط للمستخدم الأدمن */}
              {userId && (
                <div className="flex gap-2">
                  <Link
                    href="/"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-4 py-2 text-sm sm:text-base transition"
                  >
                    الصفحة الرئيسية
                  </Link>

                  <Link
                    href="/home"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-4 py-2 text-sm sm:text-base transition"
                  >
                    إدارة مهماتك
                  </Link>
                  {role === "ADMIN" && (
                    <Link
                      href="/admin/categories"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full px-4 py-2 text-sm sm:text-base transition"
                    >
                      إدارة التصنيفات
                    </Link>
                  )}
                </div>
              )}
            </header>

            {/* ✅ المحتوى في منتصف الصفحة */}
            <main className="min-h-[calc(100vh-64px)] flex items-start justify-center px-4">
              <div className="w-full ">{children}</div>
            </main>

            <ToastContainer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
