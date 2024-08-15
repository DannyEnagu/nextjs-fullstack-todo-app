'use client';
import { useContext, useEffect, useState } from "react";
import AddForm from "./AddForm";
import { AppContext } from "@/lib/AppProvider";
import TaskItem from "./TaskItem";
import { cn } from "@/lib/utils";
import { createTask, userSession } from "@/lib/actions";
import { Loader } from "lucide-react";
import { getAllTasks } from "@/lib/actions";

export default function TasksList () {
    const [isLoading, setIsLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const { isMenuOpen, tasks, addTask, setTasks } = useContext(AppContext);

    useEffect(() => {
        async function fetchTasks() {
            const DBTasks = await getAllTasks() || [];
            if (DBTasks.length === 0) return;
            setTasks([...DBTasks]);
            setIsLoading(false);
        }

        fetchTasks();
    }, [])

    // useEffect(() => {
    //     if (tasks.length === 0) return;
    // }, [tasks, setTasks]);

    const taskItems = tasks.map((task) => (
        <TaskItem
            key={task.title + task.id}
            {...task}
        />));

    const handleAddTask = async (title: string) => {
        setAdding(true);
        try {
            const session = await userSession(); 
            const task = await createTask({ title: title as string, userId: session?.user?.id as string});
            
            if (task) addTask(task);
            setAdding(false);
        } catch (error) {
            console.error(error);
            setAdding(false);
        }
    };


    return (
        <section className={cn('md:block bg-white dark:bg-[#18181c] rounded-2xl p-6',
            isMenuOpen ? 'hidden' : ''
        )}>
            <div className="min-h-96 flex flex-col">
                <h2 className="flex justify-between items-center text-rose-400 dark:text-indigo-500 font-bold text-lg mb-4">
                    <span>Tasks</span>
                </h2>
                {isLoading
                    ? <p className="flex justify-center items-center text-gray-500"><Loader /></p>
                    : tasks.length === 0
                        ? <p className="text-gray-500 text-center">No tasks found</p>
                        : <ul className="max-h-96 overflow-auto">
                        {taskItems}
                    </ul>}
                <AddForm addTask={handleAddTask} isAdding={adding} />
            </div>
        </section>
    );
}