'use client';

import TasksList from "@/components/TaskList";
import useAppState from "@/lib/useAppState";
import { Task } from '@/lib/types';
import { useEffect } from "react";

export default function Tasks(tasks: Task[]) {
    const { setTasks } = useAppState();

    useEffect(() => {
        if (tasks.length === 0) return
        setTasks(tasks);
    }, [tasks, setTasks])
  
    return (
        <TasksList />
    )
}