'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

type RangeSliderProps = {
    className?: string;
    min: number;
    max: number;
    step: number;
    formatLabel?: (value: number) => string;
    value?: number[] | readonly number[];
    onValueChange?: (values: number[]) => void;
};

/**
 * Компонент RangeSlider представляет собой слайдер для выбора диапазона значений.
 *
 * @param {string} [className] - Дополнительный класс для стилизации компонента;
 * @param {number} min - Минимальное значение слайдера;
 * @param {number} max - Максимальное значение слайдера;
 * @param {number} step - Шаг изменения значений слайдера;
 * @param {(value: number) => string} [formatLabel] - Функция для форматирования отображаемого значения;
 * @param {number[] | readonly number[]} [value] - Начальные значения слайдера. Может быть передано одно или несколько значений;
 * @param {(values: number[]) => void} [onValueChange] - Колбэк, вызываемый при изменении значений слайдера;
 *
 * @returns JSX.Element - Возвращает JSX элемент слайдера для выбора диапазона значений;
 */
const RangeSlider = React.forwardRef(
    // ? Объявляем компонент через forwardRef, чтобы была возможность передачи рефа;
    (
        {
            className,
            min,
            max,
            step,
            formatLabel,
            value,
            onValueChange,
            ...props
        }: RangeSliderProps,
        ref,
    ) => {
        const initialValue = Array.isArray(value) ? value : [min, max];
        // ? Текущее значение слайдера, которое устанавливается в зависимости от входного значения value. Если value массив, то localValues получает значение value, иначе [min, max];
        const [localValues, setLocalValues] = React.useState(initialValue);

        // ? Отслеживание изменений в min, max, value, корректировка значения в localValues;
        React.useEffect(() => {
            setLocalValues(Array.isArray(value) ? value : [min, max]);
        }, [min, max, value]);

        // ? Эта функция обновляет локальное состояние слайдера и вызывает переданный в пропсах колбэк onValueChange, если он был предоставлен. Таким образом, изменения слайдера могут быть отслежены как внутри компонента, так и переданы наружу для управления;
        const handleValueChange = (newValues: number[]) => {
            setLocalValues(newValues);
            if (onValueChange) {
                onValueChange(newValues);
            }
        };

        return (
            // ? Компонент SliderPrimitive.Root используется для создания самого слайдера, ему передаются значения min, max, step, а также текущее значение localValues;
            <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn(
                    'relative flex w-full touch-none select-none mb-6 items-center',
                    className,
                )}
                {...props}
            >
                {/* // ? SliderPrimitive.Track визуально отображает путь, по которому двигаются ползунки;*/}
                <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
                    <SliderPrimitive.Range className="absolute h-full bg-primary" />
                </SliderPrimitive.Track>
                {
                    // ? Для каждого значения localValues рендерится элемент, который позиционируется с помощью CSS left (рассчитывается пропорционально отношению текущего значения к диапазону от min до max);
                    localValues.map((value, index) => (
                        <React.Fragment key={index}>
                            <div
                                className="absolute text-center"
                                style={{
                                    left: `calc(${
                                        ((value - min) / (max - min)) * 100
                                    }% + 0px)`,
                                    top: `10px`,
                                }}
                            >
                                <span className="text-sm">
                                    {/* // ? Значение слайдера отображается над ползунками. Для этого используется функция formatLabel (если она предоставлена) или выводится просто числовое значение; */}
                                    {formatLabel ? formatLabel(value) : value}
                                </span>
                            </div>
                            {/* // ? Ползунки, перемещаемые для изменения значения; */}
                            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
                        </React.Fragment>
                    ))
                }
            </SliderPrimitive.Root>
        );
    },
);

// ? Для удобной отладки просто задаётся displayName, потому что RangeSlider создан через forwardRef;
RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };
