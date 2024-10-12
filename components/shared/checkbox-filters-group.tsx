'use client';

import React from 'react';
import { FilterCheckbox, FilterCheckboxPropsI } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type ItemType = FilterCheckboxPropsI;

interface CheckboxFiltersGroupPropsI {
    title: string;
    items: ItemType[];
    defaultItems: ItemType[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selected?: Set<string>;
    className?: string;
    name?: string;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupPropsI> = ({
    className,
    items,
    title,
    defaultItems,
    limit = 5,
    onClickCheckbox,
    searchInputPlaceholder = 'Поиск...',
    selected,
    loading,
    name,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p>{title}</p>
                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 mb-4 rounded-[8px]"
                        />
                    ))}
                <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
            </div>
        );
    }

    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()),
          )
        : (defaultItems || items).slice(0, limit);

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>
            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        // ? Простейшая проверка на соответствие айдишников - если в выбранных такой айдишник есть - то есть если айдишник чекбокса равен айдишнику выбранному, то чекбокс перекрашивается;
                        checked={selected?.has(item.value)}
                        // ? Если что, то item.value это и есть айдишник чекбокса;
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>
            {items.length > limit && (
                <div
                    className={
                        showAll ? 'border-t border-t-neutral-100 mt-4' : ''
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-3"
                    >
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
