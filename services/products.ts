import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

/**
 * Клиентская функция отправки запроса на сервер для поиска продукта;
 * @param query
 * @returns Products[]
 */
export const search = async (query: string) => {
    return (
        await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
            params: { query },
        })
    ).data;
};
