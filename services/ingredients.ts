import { Ingredient, Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

/**
 * Клиентская функция отправки запроса на сервер для получения списка ингредиентов;
 * @param query
 * @returns Products[]
 */
export const getAll = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
