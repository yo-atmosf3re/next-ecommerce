import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunit',
    weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Самый главный лэйаут приложения;
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/favicon.ico"
                    sizes="16x16"
                />
            </head>
            <body className={nunito.className}>{children}</body>
        </html>
    );
}
