import { ShoppingCart, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from './cart-drawer';

interface CartButtonPropsI {
    className?: string;
}

/**
 * Отображение корзины;
 */
export const CartButton: React.FC<CartButtonPropsI> = ({ className }) => {
    return (
        <CartDrawer>
            <Button className={cn('group relative', className)}>
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
        </CartDrawer>
    );
};
