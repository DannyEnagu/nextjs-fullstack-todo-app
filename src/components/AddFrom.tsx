'use client';
import { Loader } from 'lucide-react';
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react";
import { createTask, userSession } from "@/lib/actions";


export default function AddForm() {
    const [adding, setAdding] = useState(false);
    const [title, setTitle] = useState('' as string);

    const addTask = async (formDate: FormData) => {
        setAdding(true);
        const title = formDate.get('title');
        
        if (title !== '') {
            const session = await userSession(); 
            await createTask({ title: title as string, userId: session?.user?.id as string});
            formDate.set('title', '');
            setTitle('');
            setAdding(false);
        }
    }
    return (
        <form
            action={addTask}
            className="flex w-full items-center space-x-0 mt-auto pt-3"
        >
            <Input
                type="text"
                name="title"
                value={title}
                placeholder="Start Typing.."
                className="bg-transparent dark:bg-transparent rounded-e-none"
                onChange={e => setTitle(e.target.value)}
            />
            <Button
                disabled={adding || title === ''}
                type="submit"
                className="rounded-s-none dark:bg-indigo-500 dark:text-[#dfe0fb] dark:hover:bg-indigo-700 bg-rose-400 hover:bg-rose-500 text-[#dfe0fb] hover:text-[#dfe0fb]"
            >
               {adding ? <Loader size={16} /> : 'Add Task'}
            </Button>
        </form>
    )
}