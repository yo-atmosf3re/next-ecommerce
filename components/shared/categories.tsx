'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface CategoriesPropsI {
    className?: string;
    items: Category[];
}

export const Categories: React.FC<CategoriesPropsI> = ({ className, items: categories }) => {
    const categoryActiveId = useCategoryStore(({ activeId }) => activeId);

    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',
                className,
            )}
        >
            {categories.map(({ id, name }, index) => (
                <a
                    key={index}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        categoryActiveId === id &&
                            'bg-white shadow-md shadow-gray-200 text-primary',
                    )}
                    href={`/#${name}`}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
