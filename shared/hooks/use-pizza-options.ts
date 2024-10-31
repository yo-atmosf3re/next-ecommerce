import { ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { VariantI } from '../components/shared/group-variants';
import React from 'react';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';

interface ReturnPropsI {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: VariantI[];
    currentItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

/**
 * Кастомный хук, который управляет выбором вариации для конкретной пиццы - размер, ингредиенты, тип теста;
 * @param items - вариации для конкретной пиццы;
 */
export const usePizzaOptions = (items: ProductItem[]): ReturnPropsI => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);

    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([]),
    );

    const availableSizes = getAvailablePizzaSizes(type, items);

    const currentItemId = items.find(
        (item) => item.pizzaType === type && item.size === size,
    )?.id;

    React.useEffect(() => {
        // ? Выбранный и !disabled размер;
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled,
        );
        // ? Первый доступный размер;
        const avialbleSize = availableSizes?.find((item) => !item.disabled);

        // ? Если выбранный текущий размер стал disabled, то устанавливаем выбранным первый найденный доступный размер;
        if (!isAvailableSize && avialbleSize) {
            setSize(Number(avialbleSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient,
    };
};
