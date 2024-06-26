'use client'
import { MouseEvent} from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
    children: React.ReactNode;
    filter: string;
}

export default function TasksFilter({children, filter }: FilterButtonProps) {
    const toggleActiveState = (e: MouseEvent<HTMLButtonElement>) => {
        const filters = document.querySelectorAll('[data-filter]');
        filters.forEach((btn, i) => {
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active')
            } else {
                btn.classList.remove('active')
            }
        });
    };
    return (
        <Button
            data-filter={filter}
            variant='ghost'
            className={cn('w-full justify-start gap-2 text-md bg-transparent dark:text-[inherit]',
            'hover:text-[#84849d]',
                filter === 'all' ? 'active' : ''
            )}
            onClick={toggleActiveState}
        >
            {children}
        </Button>
    );
}