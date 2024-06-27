import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-8 md:pt-20">
            <div className="container">
                <Header />
                <AuthForm />
            </div>
        </main>
    );
}