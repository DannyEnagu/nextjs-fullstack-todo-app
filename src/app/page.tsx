import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TasksList from "@/components/TaskList";
import { getAllTasks } from "@/lib/data";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default async function Home() {
  const tasks = await getAllTasks() || [];
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth');
  }
  return (
    <main className="flex min-h-screen flex-col items-center pt-8 md:pt-0 md:justify-center">
        <div className="container">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(400px,_1fr)] gap-4 mt-8">
                <SideBar />
                <Suspense fallback={<div>Loading...</div>}>
                  <TasksList tasks={tasks} />
                </Suspense>
          </div>
        </div>
    </main>
  );
}
