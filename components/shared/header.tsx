import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import { Container, SearchInput } from '.';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderPropsI {
    className?: string;
}

export const Header: React.FC<HeaderPropsI> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                {/* // ? Левая часть; */}
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo_alt.png"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                N-Ecommerce
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                работайте с нами
                            </p>
                        </div>
                    </div>
                </Link>
                {/* // ? Центральная часть; */}
                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>
                {/* // ? Правая часть; */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <User size={16} />
                        Войти
                    </Button>
                    <Button className="group relative">
                        <b>228 ₽</b>
                        <span className="h-full w-[1px] bg-white/30 mx-3" />
                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingCart
                                size={16}
                                className="relative"
                                strokeWidth={2}
                            />
                            <b>8</b>
                        </div>
                        <ArrowRight
                            size={20}
                            className="absolute right-5 transition duration-400 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </Button>
                </div>
            </Container>
        </header>
    );
};
