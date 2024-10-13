'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter } from 'next/navigation';

interface FiltersPropsI {
    className?: string;
}

interface PriceI {
    priceFrom?: number;
    priceTo?: number;
}

export const Filters: React.FC<FiltersPropsI> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIngredients } =
        useFilterIngredients();

    const [sizes, { toggle: toggleSize }] = useSet(new Set<string>([]));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>([]),
    );
    const router = useRouter();

    const [price, setPrice] = React.useState<PriceI>({});

    const items = ingredients.map((ingredient) => ({
        value: String(ingredient.id),
        text: ingredient.name,
    }));

    const updatePrice = (name: keyof PriceI, value: number) => {
        setPrice({
            ...price,
            [name]: value,
        });
    };

    React.useEffect(() => {
        const filters = {
            ...price,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients),
        };

        const query = qs.stringify(filters, {
            arrayFormat: 'comma',
        });

        router.push(`?${query}`);
    }, [sizes, pizzaTypes, price, selectedIngredients, router]);

    return (
        <div className={className}>
            <Title
                text="Фильтрация"
                size="sm"
                className="mb-5 font-bold"
            />
            <div className="flex flex-col gap-4">
                {/* // ? Верхние чекбоксы; */}
                <CheckboxFiltersGroup
                    title="Тип теста"
                    name="pizzaTypes"
                    className="mb-5"
                    onClickCheckbox={togglePizzaTypes}
                    selected={pizzaTypes}
                    items={[
                        { text: 'Тонкое', value: '1' },
                        { text: 'Традиционное', value: '2' },
                    ]}
                />
                <CheckboxFiltersGroup
                    title="Размеры"
                    name="sizes"
                    className="mb-5"
                    onClickCheckbox={toggleSize}
                    selected={sizes}
                    items={[
                        { text: '20 см', value: '20' },
                        { text: '30 см', value: '30' },
                        { text: '40 см', value: '40' },
                    ]}
                />
                {/* // ? Фильтры цены; */}
                <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                    <p className="font-bold mb-3">Цена от и до:</p>
                    <div className="flex gap-3 mb-5">
                        <Input
                            type="number"
                            placeholder="0"
                            min={0}
                            max={1000}
                            value={String(price.priceFrom)}
                            onChange={(e) =>
                                updatePrice('priceFrom', Number(e.target.value))
                            }
                        />
                        <Input
                            type="number"
                            min={100}
                            max={1000}
                            placeholder="1000"
                            value={String(price.priceTo)}
                            onChange={(e) =>
                                updatePrice('priceTo', Number(e.target.value))
                            }
                        />
                    </div>
                    <RangeSlider
                        min={0}
                        max={1000}
                        step={10}
                        value={[price.priceFrom || 0, price.priceTo || 1000]}
                        onValueChange={([priceFrom, priceTo]) =>
                            setPrice({ priceFrom, priceTo })
                        }
                    />
                </div>
                <CheckboxFiltersGroup
                    title="Ингредиенты"
                    name="ingredients"
                    className="mt-5"
                    limit={6}
                    defaultItems={items.slice(0, 6)}
                    items={items}
                    loading={loading}
                    onClickCheckbox={onAddId}
                    selected={selectedIngredients}
                />
            </div>
        </div>
    );
};
