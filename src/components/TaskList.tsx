import TaskItem from "./TaskItem";
import { Task } from "@/lib/types";

export default function TasksList ({tasks}: {tasks: Task[]}) {
    const taskItems = tasks.map((task) => (
        <TaskItem
            key={task.title + task.id}
            {...task}
        />));

    return (
        <ul data-testid="task-list" className="max-h-96 overflow-auto">
            {taskItems}
        </ul>
    );
}