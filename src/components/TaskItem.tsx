import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Trash2 } from "lucide-react";
import { Property, Task } from "@/lib/types";
import { checkTask, deleteTask, starTask } from "@/lib/actions";

interface TaskProps {
    title: Task['title'];
    id: Task['id'];
    isCompleted: boolean;
    isStarred: boolean;
    onUpdated?: (id: Task['id'], props: Property) => void;
}

export default function TaskItem ({
    title, id, isCompleted, isStarred, onUpdated
}: TaskProps) {
    const handleStarring = () => {
        onUpdated && onUpdated(id, 'isStarred');
        starTask(id, !isStarred);
    }
    const handleCompletion = () => {
        onUpdated && onUpdated(id, 'isCompleted');
        checkTask(id, !isCompleted);
    }
    const handleDeletion = () => {
        onUpdated && onUpdated(id, 'isDeleted');
        deleteTask(id);
    }

    return (
        <li
            className="flex items-center gap-4 bg-[#d3dee3] dark:bg-neutral-800 px-4 py-3 rounded-md my-2"
        >
            <Checkbox
                defaultChecked={isCompleted}
                className="border border-rose-400 dark:border-indigo-500 data-[state=checked]:bg-rose-400 dark:data-[state=checked]:bg-indigo-500"
                onCheckedChange={handleCompletion}
            />
            <span className={`text-sm ${isCompleted ? 'line-through' : ''}`}>{title}</span>
            <span className="ml-auto flex gap-2">
                <Button
                    variant='ghost'
                    size='icon'
                    className="text-gray-400  h-5 w-5"
                    onClick={handleStarring}
                >
                    <Star size={16} className={`${isStarred ? 'text-rose-400 dark:text-indigo-500 fill-rose-400 dark:fill-indigo-500': ''}`} />
                </Button>
                <Button
                    variant='ghost'
                    size='icon'
                    className="text-red-400 h-5 w-5"
                    onClick={handleDeletion}
                >
                    <Trash2 size={16} />
                </Button>
            </span>
        </li>
    );
}