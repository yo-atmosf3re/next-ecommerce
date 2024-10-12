import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void;
}

/**
 * Функция, которая делает запрос на получение ингредиентов и возвращает их;
 * @returns ingredients
 */
export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    // ? В данном кортеже первый аргумент хранит сам массив с уникальными значениями, который объявлен в аргументе у useSet, второй аргумент - объект, в котором лежат следующие функции: add - добавление значения, has - проверка на наличие конкретного значения, remove - удаление конкретного значения, reset - очистка массива, toggle - удаление/добавление значения;
    const [selectedIds, { toggle }] = useSet(new Set<string>([]));

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

    return { ingredients, loading, onAddId: toggle, selectedIds };
};
