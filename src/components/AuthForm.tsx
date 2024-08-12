'use client';
import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoaderCircle } from "lucide-react";

export interface AuthDataTypes {
    email: string;
    password: string;
}

interface AuthFormProps {
    onSubmit: (e: AuthDataTypes) => void;
    isSubmitting?: boolean;
}

export default function AuthForm({ onSubmit, isSubmitting }: AuthFormProps) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const data = { email: email as string, password: password as string };
        
        onSubmit(data);
    }

    return (
        <form data-testid="auth-form" onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full mt-8">
            <Input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
            />
            <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full dark:bg-indigo-500 dark:text-[#dfe0fb] dark:hover:bg-indigo-700 bg-rose-400 hover:bg-rose-500 text-[#dfe0fb] hover:text-[#dfe0fb] disabled:opacity-50"
            >
                {isSubmitting && <LoaderCircle size={16} className="mr-2" />}
                Submit
            </Button>
        </form>
    );
}