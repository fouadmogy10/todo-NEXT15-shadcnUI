import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ClientTodoPage from "@/components/ClientTodoPage";
import { createUserIfNotExists } from "@/lib/clerk/createUserIfNotExists";

export const metadata = {
  title: "مهامي",
  description: "نظّم وتابع مهامك في تطبيق المهام.",
};


export default async function HomePage() {
  const { userId } = await auth();
  const user = await createUserIfNotExists();
  if (!userId) {
    redirect("/sign-in");
  }

  return <ClientTodoPage userId={userId} />;
}
