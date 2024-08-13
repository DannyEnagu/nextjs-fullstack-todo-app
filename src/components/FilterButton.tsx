'use client'
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export interface FilterButtonProps {
    children: React.ReactNode;
    isActive?: boolean;
    onClick: () => void;
}

export default function Filter({children, isActive, onClick }: FilterButtonProps) {
    return (
        <Button
            variant='ghost'
            className={cn('w-full justify-start gap-2 text-md bg-transparent dark:text-[inherit]',
            'hover:text-[#84849d]',
                isActive ? 'active' : ''
            )}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}