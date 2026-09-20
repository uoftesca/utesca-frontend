import { ReactNode } from 'react';

export function RegistrationPageShell({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto flex min-h-screen max-w-2xl items-center justify-center px-8 py-16 md:py-24">
                <div className="w-full max-w-md space-y-5 text-center">{children}</div>
            </div>
        </main>
    );
}
