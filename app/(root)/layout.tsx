import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';

export const metadata: Metadata = {
    title: 'Next Ecommerce | Main',
    description: 'Main page',
};

/**
 * Лэйаут для группы роутов главной страницы;
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen">
            <Header />
            {children}
        </main>
    );
}
