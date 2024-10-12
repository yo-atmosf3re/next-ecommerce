import React from 'react';
import { Checkbox } from '../ui';

export interface FilterCheckboxPropsI {
    text: string;
    value: string;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxPropsI> = ({
    text,
    value,
    checked,
    endAdornment,
    onCheckedChange,
    name
}) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="rounded-[8px] w-6 h-6"
                // ? Указание id для корректной работы label - если у htmlFor будет такой же как и id у Checkbox, то при клике на label будет срабатывать и Checkbox;
                id={`checkbox-${String(name)}-${String(value)}`}
            />
            <label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className="leading-none cursor-pointer flex-1"
            >
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
