import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/shared/header';

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Next Ecommerce | Main',
    description: 'Main page',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link
                rel="icon"
                href="/favicon.ico"
                sizes="16x16"
            />
            <body className={nunito.className}>
                <main className="min-h-screen">
                    <Header />
                    {children}
                </main>
            </body>
        </html>
    );
}
