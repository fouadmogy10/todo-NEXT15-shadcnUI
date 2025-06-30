"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  ShieldCheck,
  ListTodo,
  UserCircle2,
  FileCode2,
  Zap,
  Settings2,
  Database,
  Shield,
  LayoutDashboard,
  Braces,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4">
      <div className="container mx-auto">
        {/* العنوان الرئيسي */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          أهلاً بك في تطبيق إدارة المهام
        </motion.h1>

        <motion.p
          className="text-center text-lg sm:text-xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          نظم مهامك بسهولة، راقب تقدمك، واستفد من نظام صلاحيات وتصنيفات ذكي،
          مبني بأحدث تقنيات الويب.
        </motion.p>

        {/* ✅ مميزات التطبيق */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="hover:shadow-lg transition">
                <CardHeader className="flex flex-col items-center">
                  <feature.icon className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ التقنيات المستخدمة */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">التقنيات المستخدمة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techList.map(({ label, icon: Icon, lightColor, darkColor }) => {
              const color = theme === "dark" ? darkColor : lightColor;
              return (
                <div
                  key={label}
                  className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl border bg-muted transition duration-300 cursor-default hover:scale-[1.03]"
                  style={{
                    backgroundColor: `${color}11`,
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition"
                    style={{
                      color,
                      filter: `drop-shadow(0 0 5px ${color})`,
                    }}
                  />
                  <span
                    className="text-sm font-medium transition"
                    style={{
                      color,
                      textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ زر البدء */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
            <a href="/home">ابدأ الآن</a>
          </Button>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: "إدارة المهام ببساطة",
    description: "أضف، عدل، واحذف مهامك بسرعة وسهولة.",
    icon: ListTodo,
  },
  {
    title: "تسجيل دخول آمن",
    description: "باستخدام Clerk، نوفر تسجيل دخول موثوق وسلس.",
    icon: ShieldCheck,
  },
  {
    title: "نظام صلاحيات",
    description:
      "المستخدم العادي مقابل الأدمن مع تحكم كامل بالمهام والتصنيفات.",
    icon: UserCircle2,
  },
  {
    title: "تصنيفات قابلة للتوسعة",
    description: "يمكنك اقتراح تصنيفات جديدة، والأدمن يوافق عليها.",
    icon: BadgeCheck,
  },
];

const techList = [
  {
    label: "Next.js 15",
    icon: FileCode2,
    lightColor: "#000000",
    darkColor: "#ffffff",
  },
  {
    label: "React 19",
    icon: Zap,
    lightColor: "#17a9d1",
    darkColor: "#61DAFB",
  },
  {
    label: "TailwindCSS",
    icon: Settings2,
    lightColor: "#06B6D4",
    darkColor: "#38BDF8",
  },
  {
    label: "Prisma ORM",
    icon: Database,
    lightColor: "#0C344B",
    darkColor: "#00BDA5",
  },
  {
    label: "Clerk Auth",
    icon: Shield,
    lightColor: "#3B82F6",
    darkColor: "#60A5FA",
  },
  {
    label: "Shadcn UI",
    icon: LayoutDashboard,
    lightColor: "#8B5CF6",
    darkColor: "#C4B5FD",
  },
  {
    label: "Framer Motion",
    icon: Sparkles,
    lightColor: "#E94E89",
    darkColor: "#FF66A6",
  },
  {
    label: "TypeScript",
    icon: Braces,
    lightColor: "#3178C6",
    darkColor: "#60A5FA",
  },
];
