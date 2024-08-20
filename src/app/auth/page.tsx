import AuthWrapper from "@/components/AuthWapper";
import WithHeader from "@/components/WithHeader";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Sign In | Sign Up",
    description: "Authentication Page",
};

export default function AuthPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-8 md:pt-20">
            <div className="container">
                <WithHeader>
                    <AuthWrapper />
                </WithHeader>
            </div>
        </main>
    );
}