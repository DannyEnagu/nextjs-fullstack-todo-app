'use client'
import { useContext } from "react";
import { AppContext } from "@/lib/AppProvider";

export default function useAppState() {
    const { 
        filter,
        isMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        changeFilter,
        tasks,
        setTasks,
        addTask,
        removeTask,
        updateTask
    } = useContext(AppContext);

    return {
        filter,
        isMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        changeFilter,
        tasks,
        setTasks,
        addTask,
        removeTask,
        updateTask
    };
}