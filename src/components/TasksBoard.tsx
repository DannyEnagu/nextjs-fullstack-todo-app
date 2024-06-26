import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import TasksList from "@/components/TaskList";

export default function TasksBoard() {
    return (
        <div className="container">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(400px,_1fr)] gap-4 mt-8">
                <SideBar />
                <TasksList />
            </div>
        </div>
    );
}