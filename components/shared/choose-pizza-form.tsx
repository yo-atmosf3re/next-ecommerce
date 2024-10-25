import { cn } from '@/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Button } from '../ui';
import { Title } from './title';

interface ChoosePizzaFormPropsI {
    imageUrl: string;
    name: string;
    ingredients: any[];
    items?: any[];
    onClickAdd?: VoidFunction;
    className?: string;
}

/**
 * Форма с выбранной пиццей;
 */
export const ChoosePizzaForm: React.FC<ChoosePizzaFormPropsI> = ({
    className,
    imageUrl,
    ingredients,
    name,
    items,
    onClickAdd,
}) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage
                imageUrl={imageUrl}
                size={30}
            />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title
                    text={name}
                    size="md"
                    className="font-extrabold mb-1"
                />
                <p className="text-gray-400">textDetaills</p>
                <div className="flex flex-col gap-4 mt-5"></div>
                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3"></div>
                </div>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за totalPrice ₽
                </Button>
            </div>
        </div>
    );
};
