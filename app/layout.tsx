import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'UTESCA',
    description:
        'University of Toronto Engineering Student Consulting Association',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' data-theme='light' className='h-full'>
            <body
                className={`${inter.className} antialiased min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}
