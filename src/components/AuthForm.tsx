'use client';
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { authenticateUser } from '@/lib/actions';
import { LoaderCircle } from "lucide-react";

export default function AuthForm() {
    const [authType, setAuthType] = useState<'signIn' | 'signUp'>('signIn');
    const [message, setMessage] = useState<string | null>(null);
    
    const toggleAuthType = (e: React.MouseEvent) => {
        e.preventDefault();
        setAuthType(authType === 'signIn' ? 'signUp' : 'signIn');
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const msg = await authenticateUser(authType, formData);
    }
    return (
        <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
            <h1 className="text-4xl font-bold text-center">
                Sign {authType === 'signIn' ? 'In' : 'Up'}
            </h1>
            {/* {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )} */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full mt-8">
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <Button
                    disabled={false}
                    type="submit"
                    className="w-full dark:bg-indigo-500 dark:text-[#dfe0fb] dark:hover:bg-indigo-700 bg-rose-400 hover:bg-rose-500 text-[#dfe0fb] hover:text-[#dfe0fb]"
                >
                    {true
                    ? (<LoaderCircle size={16} className="mr-2" />)
                    : (`Sign ${authType === 'signIn' ? 'In' : 'Up'}`)}
                </Button>
                <p>
                    {authType === 'signIn' ? (
                        <>
                            Don&#39;t have an account?{' '}
                            <Button variant='link'
                                className="text-rose-400" onClick={toggleAuthType}>
                                Sign up
                            </Button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <Button variant='link'
                                className="text-rose-400" onClick={toggleAuthType}>
                                Sign in
                            </Button>
                        </>
                    
                    )}
                </p>
            </form>
        </div>
    );
}