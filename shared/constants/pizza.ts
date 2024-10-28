/**
 * Объект, при доступу к которому по ключу будем получать нужное значение - размеры;
 */
export const mapPizzaSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая',
} as const;

/**
 * Объект, при доступу к которому по ключу будем получать нужное значение - тип пиццы;
 */
export const mapPizzaType = {
    1: 'традиционная',
    2: 'тонкая',
} as const;

/**
 * Массив с размерами пиццы;
 */
export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    name,
    value,
}));

/**
 * Массив с типами пиццы;
 */
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
