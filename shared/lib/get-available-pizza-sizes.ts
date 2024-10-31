import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/pizza';
import { VariantI } from '../components/shared/group-variants';

/**
 * Функция, которая возвращает доступные варианты размеров для каждого из типа пиццы;
 * @param type - тип выбранной пиццы;
 * @param items - вариации пиццы;
 * @returns 
 */
export const getAvailablePizzaSizes = (
    type: PizzaType,
    items: ProductItem[],
): VariantI[] => {
    // ? Фильтрация пицц по типу - для типа теста находит доступные пиццы по размеру;
    const filteredPizzasByType = items.filter(
        (item) => item.pizzaType === type,
    );
    // ? Формирование списка доступных пицц для выбора, где disabled будет true в случае, если не нашлось ни одного доступого размера для выбранного типа пиццы;
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(
            (pizza) => Number(pizza.size) === Number(item.value),
        ),
    }));
};
