import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

/**
 * Функция, которая делает запрос на получение ингредиентов и возвращает их;
 * @returns ingredients
 */
export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    return { ingredients, loading };
};
