import TasksBoard from "@/components/TasksBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8 md:pt-20">
      <TasksBoard />
    </main> 
  );
}
