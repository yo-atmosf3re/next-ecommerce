import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import React from 'react';

interface PricePropsI {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFiltersI extends PricePropsI {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface FiltersI {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PricePropsI;
}

interface ReturnPropsI extends FiltersI {
    setPrices: (name: keyof PricePropsI, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

/**
 * Функция для работы с фильтрацией (если существуют специальные куэри-параметры по фильтрации, то данные берут из URL);
 * @returns ReturnPropsI
 */
export const useFilters = (): ReturnPropsI => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFiltersI,
        string
    >;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(',')),
    );

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(
            searchParams.has('sizes')
                ? searchParams.get('sizes')?.split(',')
                : [],
        ),
    );

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has('pizzaTypes')
                ? searchParams.get('pizzaTypes')?.split(',')
                : [],
        ),
    );

    const [prices, setPrices] = React.useState<PricePropsI>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PricePropsI, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return React.useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: togglePizzaTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients,
        }),
        [sizes, pizzaTypes, selectedIngredients, prices],
    );
};
