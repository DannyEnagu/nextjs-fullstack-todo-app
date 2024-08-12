'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import AuthForm, { AuthDataTypes } from "./AuthForm";
import { authenticateUser } from '@/lib/actions';
import { Button } from "./ui/button";


export default function AuthWrapper() {
    const router = useRouter();
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

    const handleSubmit = async ({email, password} : AuthDataTypes) => {
        setIsLoading(true);
        const res = await authenticateUser(authType, { email, password });
        setAuthResponse(prev => ({ ...prev, ...res }));
        if (res.isSuccess) {
            // Redirect to Home page
            router.push('/');
        }
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
            <h1 className="text-4xl font-bold text-center">
                Sign {authType === 'signIn' ? 'In' : 'Up'}
            </h1>
            {/* Display Authentication status */}
            <p data-testid='auth-response' className={`text-sm mt-2 ${authResponse?.isSuccess ? 'text-green-500' : 'text-red-500'}`}>{authResponse?.message}</p>
            {/* Sign In or Sign Up form */}
            <AuthForm onSubmit={handleSubmit} isSubmitting={isLoading} />
            
            <p>
                {/* Toggle Authentication Type */}
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
        </div>
    );
}