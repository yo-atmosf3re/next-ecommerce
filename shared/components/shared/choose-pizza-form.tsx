'use client';

import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { PizzaImage } from './pizza-image';
import { Button } from '../ui';
import { Title } from './title';
import { GroupVariants } from './group-variants';
import {
    mapPizzaType,
    PizzaSize,
    pizzaSizes,
    PizzaType,
    pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';

interface ChoosePizzaFormPropsI {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
    className?: string;
}

/**
 * Форма с выбранной пиццей;
 */
export const ChoosePizzaForm: React.FC<ChoosePizzaFormPropsI> = ({
    className,
    imageUrl,
    ingredients,
    name,
    items,
    onClickAddCart,
}) => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const [selectedIngredients, { toggle: addIngredient }] = useSet(
        new Set<number>([]),
    );

    // ? Для выбранного размера и типа находим цену;
    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;

    // ? Для выбранной пиццы находим выбранные ингредиенты и суммируем их между собой;
    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    // ? Финальная цена - цена пиццы + цена выбранных ингредиентов;
    const totalPrice = pizzaPrice + totalIngredientsPrice;

    const textDetails = `${size} см, ${mapPizzaType[type]} пицца, ингредиенты (${selectedIngredients.size})`;

    const handleClickAdd = () => {
        onClickAddCart?.();
        console.log({
            size,
            type,
            ingredient: selectedIngredients,
        });
    };

    // ? Фильтрация пицц по типу - для типа теста находит доступные пиццы по размеру;
    const availablePizzas = items.filter((item) => item.pizzaType === type);
    // ? Формирование списка доступных пицц для выбора, где disabled будет true в случае, если не нашлось ни одного доступого размера для выбранного типа пиццы;
    const availabelPizzaSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some(
            (pizza) => Number(pizza.size) === Number(item.value),
        ),
    }));

    React.useEffect(() => {
        // ? Выбранный и !disabled размер;
        const isAvailableSize = availabelPizzaSizes?.find(
            (item) => Number(item.value) === size && !item.disabled,
        );
        // ? Первый доступный размер;
        const avialbleSize = availabelPizzaSizes?.find(
            (item) => !item.disabled,
        );

        // ? Если выбранный текущий размер стал disabled, то устанавливаем выбранным первый найденный доступный размер;
        if (!isAvailableSize && avialbleSize) {
            setSize(Number(avialbleSize.value) as PizzaSize);
        }
    }, [type]);

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage
                imageUrl={imageUrl}
                size={size}
            />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title
                    text={name}
                    size="md"
                    className="font-extrabold mb-1"
                />
                <p className="text-gray-400">{textDetails}</p>
                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants
                        items={availabelPizzaSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>
                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                imageUrl={ingredient.imageUrl}
                                name={ingredient.name}
                                price={ingredient.price}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
