'use client';
import { useContext } from "react";
import TasksFilters from "./TasksFilters";
import { Switch } from "./ui/switch";
import { AppContext } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

export default function SideBar () {
    const { isMenuOpen } = useContext(AppContext);
    
    return (
        <nav className={cn('hidden md:block bg-white dark:bg-[#18181c] rounded-2xl p-6',
            isMenuOpen ? 'block' : ''
        )}>
            <h2 className="flex justify-between items-center text-rose-400 dark:text-indigo-500 font-bold text-lg mb-4">
                <span>Filter</span>
                <Switch />
            </h2>
            <TasksFilters />
        </nav>
    );
}