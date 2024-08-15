import { Suspense } from "react";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import WithHeader from "@/components/WithHeader";
import TasksList from "@/components/TaskList";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/auth');
  }
  return (
    <main className="flex min-h-screen flex-col items-center pt-8 md:pt-0 md:justify-center">
        <div className="container">
          <WithHeader>
            <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(400px,_1fr)] gap-4 mt-8">
                  <SideBar />
                  <Suspense fallback={<div>Loading...</div>}>
                    <TasksList />
                  </Suspense>
            </div>
          </WithHeader>
        </div>
    </main>
  );
}
