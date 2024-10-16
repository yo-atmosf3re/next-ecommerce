import { cn } from '@/lib/utils';
import React from 'react';

interface ProductImagePropsI {
    className?: string;
    imageUrl: string;
    size: 20 | 30 | 40;
}

// ? Компонента, которая отрисовывает картинку продукта;
export const ProductImage: React.FC<ProductImagePropsI> = ({
    className,
    imageUrl,
    size,
}) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center flex-1 relative w-full',
                className,
            )}
        >
            <img
                src={imageUrl}
                alt="Logo"
                className={cn(
                    // ? Плавно анимированный переход к различным размерам в завимимости от размера пиццы;
                    'relative left-2 top-2 transition-all z-10 duration-300',
                    {
                        'w-[300px] h-[300px]': size === 20,
                        'w-[400px] h-[400px]': size === 30,
                        'w-[500px] h-[500px]': size === 40,
                    },
                )}
            />
            {/* // ? Два радиусных блока вокруг картинки с пунктирным указанием различного размера пиццы; */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </div>
    );
};
