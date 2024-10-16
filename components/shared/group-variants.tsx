'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export type VariantI = {
    name: string;
    value: string;
    disabled?: boolean;
};

interface Props {
    items: readonly VariantI[];
    onClick?: (value: VariantI['value']) => void;
    value?: VariantI['value'];
    className?: string;
}

// ? На странице с конкретным товаром отображается как селектор по выбору размера и типу пиццы;
export const GroupVariants: React.FC<Props> = ({
    items,
    onClick,
    className,
    value,
}) => {
    return (
        <div
            className={cn(
                className,
                'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
            )}
        >
            {items.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onClick?.(item.value)}
                    className={cn(
                        'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                        {
                            // ? Если у объекта с данными ключами значение будет true - то применятся классы, значениями которых будут ключи этих объектов;
                            'bg-white shadow': item.value === value,
                            'text-gray-500 opacity-50 pointer-events-none':
                                item.disabled,
                        },
                    )}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};
