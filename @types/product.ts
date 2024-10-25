import { Product, ProductItem, Ingredient } from '@prisma/client';

/**
 * Тип для продукта, у которого есть связь с вариациями продукта и ингредиентами;
 */
export type ProductWithRelations = Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
};
