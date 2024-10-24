'use client';

import { Dialog, DialogContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ChooseProductModalPropsI {
    className?: string;
    product: Product;
}

/**
 * Модальное окно с конкретным продуктом;
 */
export const ChooseProductModal: React.FC<ChooseProductModalPropsI> = ({
    className,
    product,
}) => {
    const router = useRouter();

    return (
        <Dialog
            open={Boolean(product)}
            // ? Выполняем переход к предыдущей записи в истории, таким образом модальное окно и закрывается;
            onOpenChange={() => router.back()}
        >
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}
            >
                {product.name}
            </DialogContent>
        </Dialog>
    );
};
