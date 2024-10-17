import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next Ecommerce | Dashboard',
    description: 'Dashboard page',
};

/**
 * Действующий лэйаут в рамках группы роутов для дашборда;
 */
export default function DashboardLayout({
    // ? Для всех роутов dashboard этот лэйаут будет применяться, так работает Route Groups;
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <div>{children}</div>
        </html>
    );
}
