import React from 'react';

// ? Для слота modal будут перехватываться все роуты product с нужным id в рамках группы роутов root. Соответственно, при вызове модального окна для продукта с конкретным айди, будет отрисовываться эта страница;
/**
 * Модальное окно с конкретным продуктом;
 */
export default async function ProductModalPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return <h1>111</h1>;
}
