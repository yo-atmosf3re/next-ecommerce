import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { FiltersI } from './use-filters';

/**
 * Функция, которая работает с URL и данными по фильтрации - преобразует данные по фильтрации в куэри-строку и вставляет эти данные в URL;
 * @param filters - объект с данными по фильтрации;
 */
export const useQueryFilters = (filters: FiltersI) => {
    // ? Флаг вмонтирования функции;
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
        // ? Функция отработает только после её вмонтирования;
        if (isMounted.current) {
            // ? Сборный объект из данных, которые получены при использовании фильтрации;
            const params = {
                ...filters.prices,
                pizzaTypes: Array.from(filters.pizzaTypes),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.selectedIngredients),
            };

            // ? Преобразование в куэри-строку данных по фильтрации;
            const query = qs.stringify(params, {
                arrayFormat: 'comma',
            });

            // ? Указание в URL преобразованной куэри-строки с данными по фильтрации;
            router.push(`?${query}`, {
                // ? Если scroll true, то при навигации прокручивает скролл в начало страницы;
                scroll: false,
            });

            console.log(filters, 999);
        }

        isMounted.current = true;
    }, [filters]);
};
