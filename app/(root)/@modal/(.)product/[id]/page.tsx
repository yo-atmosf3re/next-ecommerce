import { ChooseProductModal, Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React from 'react';

// ? Для слота modal будут перехватываться все роуты product с нужным id в рамках группы роутов root. Соответственно, при вызове модального окна для продукта с конкретным айди, будет отрисовываться эта страница;
/**
 * Модальное окно с конкретным продуктом;
 */
export default async function ProductModalPage({
    params: { id },
}: {
    params: { id: string };
}) {
    // ? Первый продукт с заданными условиями;
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        // ? Включить связанные данные;
        include: {
            // ? Включаем все связанные ингредиенты продукта;
            ingredients: true,
            // ? Включаем связанную категорию продукта и товары этой категории, а также их ;элементы
            category: {
                include: {
                    products: {
                        include: {
                            // ? Включаем связанные товары внутри категории и их элементы;
                            items: true,
                        },
                    },
                },
            },
            // ? Включаем связанные элементы продукта;
            items: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            {/* <ProductForm product={product} /> */}
            <ChooseProductModal product={product} />
        </Container>
    );
}
