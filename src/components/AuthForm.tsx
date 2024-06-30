'use client';
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { authenticateUser, userSession } from '@/lib/actions';
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default function AuthForm() {
    const [authType, setAuthType] = useState<'signIn' | 'signUp'>('signIn');
    const [isLoading, setIsLoading] = useState(false);

    const [authResponse, setAuthResponse] = useState<{
        message: string;
        isSuccess: boolean;
    } | null>({ message: '', isSuccess: false });

    
    const toggleAuthType = (e: React.MouseEvent) => {
        // Prevent the default form submission
        e.preventDefault();
        setAuthType(authType === 'signIn' ? 'signUp' : 'signIn');
    }

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        const email = formData.get('email');
        const password = formData.get('password');
        const res = await authenticateUser(authType,{ email, password });

        setAuthResponse(prev => ({ ...prev, ...res }));
    }

    useEffect(() => {
        if (authResponse?.isSuccess) {
            redirect('/');
        } else {
            setIsLoading(false);
        }
    }, [authResponse?.isSuccess]);

    return (
        <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
            <h1 className="text-4xl font-bold text-center">
                Sign {authType === 'signIn' ? 'In' : 'Up'}
            </h1>

            <p className={`text-sm mt-2 ${authResponse?.isSuccess ? 'text-green-500' : 'text-red-500'}`}>{authResponse?.message}</p>

            <form action={handleSubmit} className="flex flex-col items-center justify-center w-full mt-8">
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
                    disabled={isLoading}
                    type="submit"
                    className="w-full dark:bg-indigo-500 dark:text-[#dfe0fb] dark:hover:bg-indigo-700 bg-rose-400 hover:bg-rose-500 text-[#dfe0fb] hover:text-[#dfe0fb]"
                >
                    {isLoading
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