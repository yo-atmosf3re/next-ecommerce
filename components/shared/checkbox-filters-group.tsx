'use client';

import React from 'react';
import { FilterCheckbox, FilterCheckboxPropsI } from './filter-checkbox';
import { Input } from '../ui';

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
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupPropsI> = ({
    className,
    items,
    title,
    defaultItems,
    limit = 5,
    onClickCheckbox,
    searchInputPlaceholder = 'Поиск...',
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

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
                        checked={false}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
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
