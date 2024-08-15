'use client'
import { useState, createContext, useEffect } from "react";
import { Filters, Task } from "@/lib/types";

interface AppContextProps {
    filter: Filters;
    isMenuOpen: boolean;
    tasks: Task[];
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
    changeFilter: (newFilter: Filters) => void;
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    removeTask: (id: string) => void;
    updateTask: (task: Task) => void;
}

export const AppContext = createContext<AppContextProps>({
    filter: 'all',
    isMenuOpen: false,
    tasks: [],
    openMenu: () => {},
    closeMenu: () => {},
    toggleMenu: () => {},
    changeFilter: (newFilter: Filters) => {},
    setTasks: (tasks: Task[]) => {},
    addTask: (task: Task) => {},
    removeTask: (id: string) => {},
    updateTask: (task: Task) => {}
});

export default function AppProvider({
    children
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filter, setFilter] = useState<Filters>('all');
    const [taskList, setTaskList] = useState<Task[]>([]);

    // Menu related functions
    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); 
    const changeFilter = (newFilter: Filters) => {
        setFilter(newFilter);
        setTaskList(taskList.filter(task => {
            if (newFilter === 'all') return true;
            if (newFilter === 'completed') return task.isCompleted;
            if (newFilter === 'starred') return task.isStarred;
            
            return false;
        }));
    };

    // Task related functions
    const setTasks = (tasks: Task[]) => setTaskList(tasks);
    const addTask = (task: Task) => setTaskList([task, ...taskList]);
    // Todo: Move newly updated task around
    // 1. Move completed task to the bottom of the list
    // 2. Move Starred task to the top of the list
    const updateTask = (task: Task) => setTaskList(taskList.map(t => t.id === task.id ? task : t));
    const removeTask = (id: string) => setTaskList(taskList.filter(task => task.id !== id));
    
    return (
        <AppContext.Provider value={{
            filter,
            tasks: taskList,
            isMenuOpen,
            openMenu,
            closeMenu,
            toggleMenu,
            changeFilter,
            setTasks,
            addTask,
            removeTask,
            updateTask
            }}
        >
        {children}
        </AppContext.Provider>
    );
}