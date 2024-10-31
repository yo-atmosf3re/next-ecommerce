import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza';

/**
 * Функция, которая предоставляет базовую информацию о конкретной пицце;
 * @param type - тип пиццы;
 * @param size - размер пиццы;
 * @param items - вариации у конкретной пиццы;
 * @param ingredients - доступные ингредиенты для пиццы;
 * @param selectedIngredients - выбранные ингредиенты;
 */
export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcTotalPizzaPrice(
        type,
        size,
        items,
        ingredients,
        selectedIngredients,
    );
    const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

    return { totalPrice, textDetails };
};
