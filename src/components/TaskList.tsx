'use client';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AddForm from "./AddFrom";
import { AppContext } from "@/lib/AppContext";
import TaskItem from "./TaskItem";
import { Task, Property } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function TasksList ({ tasks }: { tasks: Task[] }) {
    const { isMenuOpen, filter } = useContext(AppContext);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    const handleTaskUpdate = (id: Task['id'], property: Property) => {
        if (property === 'isDeleted') {
            // Remove the task from the list
            setFilteredTasks(filteredTasks.filter(task => task.id !== id));
        } else {
            // Update the task property
            setFilteredTasks(filteredTasks.map((task, i) => {
                if (task.id === id && property === 'isCompleted') {
                    task[property] = !task[property];
                    console.log(task);
                } else if (task.id === id && property === 'isStarred') {
                    task[property] = !task[property];
                }
                return task;
            }));
    }
    };

    useEffect(() => {
        setFilteredTasks(tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.isCompleted;
            if (filter === 'starred') return task.isStarred;
            return false;
        }));
    }, [tasks, filter]);

    const tasksList = filteredTasks.map(({title, id, isCompleted, isStarred}) => (
        <TaskItem
            key={title + id}
            title={title}
            id={id}
            isCompleted={isCompleted}
            isStarred={isStarred}
            onUpdated={(tid, props) => handleTaskUpdate(tid, props)}
        />));

    return (
        <section className={cn('md:block bg-white dark:bg-[#18181c] rounded-2xl p-6',
            isMenuOpen ? 'hidden' : ''
        )}>
            <div className="min-h-96 flex flex-col">
                <h2 className="flex justify-between items-center text-rose-400 dark:text-indigo-500 font-bold text-lg mb-4">
                    <span>Tasks</span>
                </h2>
                <ul className="max-h-96 overflow-auto">
                    {tasksList}
                </ul>
                <AddForm />
            </div>
        </section>
    );
}