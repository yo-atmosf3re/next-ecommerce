import { cn } from '@/shared/lib/utils';

interface Props {
    value: number;
    className?: string;
}

/**
 * Информация о цене элемента в дровере корзины;
 */
export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
    return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
