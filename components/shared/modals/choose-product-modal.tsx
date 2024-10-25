'use client';

import { Dialog, DialogContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { ProductWithRelations } from '@/@types/product';
import { ChooseProductForm } from '../choose-product-form';

interface ChooseProductModalPropsI {
    className?: string;
    product: ProductWithRelations;
}

/**
 * Модальное окно с конкретным продуктом;
 */
export const ChooseProductModal: React.FC<ChooseProductModalPropsI> = ({
    className,
    product,
}) => {
    const router = useRouter();
    // ? Если у вариации нет типа пиццы, то это значит, что продукт не пицца, потому что в таком случае pizzaType = null;
    const isPizzaForm = Boolean(product.items[0].pizzaType);

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
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={[]}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
