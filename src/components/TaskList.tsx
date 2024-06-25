'use client';
import { useContext } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AppContext } from "@/lib/AppContext";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"

const tasks = [
    {
        id: 1,
        title: 'Task 1',
        completed: false
    },
    {
        id: 2,
        title: 'Task 2',
        completed: false
    },
    {
        id: 3,
        title: 'Task 3',
        completed: false
    },
    {
        id: 4,
        title: 'Task 4',
        completed: false
    },
    {
        id: 5,
        title: 'Task 5',
        completed: true
    }
];

export default function TasksList () {
    const { isMenuOpen } = useContext(AppContext);

    const tasksList = tasks.map(({title, id, completed}) => (
            <li
                key={title + id}
                className="flex items-center gap-4 bg-[#d3dee3] dark:bg-neutral-800 px-4 py-3 rounded-md my-2"
            >
                <Checkbox className="border border-rose-400 dark:border-indigo-500 data-[state=checked]:bg-rose-400 dark:data-[state=checked]:bg-indigo-500" />
                <span className="text-sm">{title}</span>
                {completed &&  <Button
                    variant='ghost'
                    size='icon'
                    className="text-rose-400 dark:text-indigo-500 ml-auto h-5 w-5"
                >
                    <Star size={16} />
                </Button>}
            </li>
    ));
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
                <form className="flex w-full items-center space-x-0 mt-auto">
                    <Input
                        type="text"
                        placeholder="Start Typing.."
                        className="bg-transparent dark:bg-transparent rounded-e-none"
                    />
                    <Button type="submit" className="rounded-s-none dark:bg-indigo-500 dark:text-[#dfe0fb] bg-rose-400">Add Task</Button>
                </form>
            </div>
        </section>
    );
}