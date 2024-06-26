import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TasksList from "@/components/TaskList";
import { getAllTasks } from "@/lib/data";
import { Suspense } from "react";


export default async function Home() {
  const tasks = await getAllTasks() || [];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8 md:pt-20">
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
