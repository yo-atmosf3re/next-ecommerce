import {
    Container,
    Filters,
    ProductsGroupList,
    Title,
    TopBar,
} from '@/components/shared';

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title
                    text="Все пиццы"
                    size="lg"
                    className="font-extrabold"
                />
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    {/* // ? Фильтрация; */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* // ? Список товаров; */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                items={[
                                    {
                                        id: 1,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 4,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 5,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 6,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 7,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 8,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 9,
                                        name: 'Чизбургер-пицца',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                ]}
                                categoryId={0}
                            />
                            <ProductsGroupList
                                title="Комбо"
                                items={[
                                    {
                                        id: 0,
                                        name: 'Комбо Леди Баг и Супер-Кота',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF81834A57C5168C3393339EF5A3ED.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 1,
                                        name: 'Додо Бокс',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF7A3E8180CB1AADC5B1B9860DF0A2.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        name: 'Детское комбо',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF0800EABCBB7281BBB6BA0865D958.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        name: 'Чикен бокс',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEB05826E64288A83EFCF67DA86AAE.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 4,
                                        name: 'Комбо Завтрак на двоих',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EF112C05B1B9C193648449783C1A82.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 5,
                                        name: 'Четыре в одном',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEB0721E536EECA59C7BE93DC7E723.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 6,
                                        name: '3 пиццы 25 см',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EEB07EB1D19D15AF2389C1567FC88C.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                    {
                                        id: 7,
                                        name: '2 пиццы',
                                        imageUrl:
                                            'https://media.dodostatic.net/image/r:292x292/11EE7E21971194BA8CD8A49301256FC4.avif',
                                        price: 550,
                                        items: [
                                            {
                                                price: 550,
                                            },
                                        ],
                                    },
                                ]}
                                categoryId={1}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
