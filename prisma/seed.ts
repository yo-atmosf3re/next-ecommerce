import { Prisma } from "@prisma/client";
import { _ingredients, categories, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';
import { connect } from "http2";

// ? Случайное десятичное число;
const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

/**
 * Функция для генерации данных;
 */
async function up() {
  await prisma.user.createMany(
    {
        data: [
            {
                fullName: 'User',
                email: 'user@test.ru',
                password: hashSync('888888', 10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Admin',
                email: 'admin@test.ru',
                password: hashSync('888888', 10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    }
  )

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        '/assets/images/pizza_1.png',
      categoryId: 1,
      ingredients: {
        // ? Указываем связь, для этой пиццы будет пять ингредиентов;
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        '/assets/images/pizza_2.png',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        '/assets/images/pizza_3.png',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
        // ? Пицца "Пепперони фреш";
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // ? Пицца "Сырная";
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // ? Пицца "Чоризо фреш";
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // ? Остальные продукты - генерация с разной стоимостью, но без размера и вариации;
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 })
    ]
  })

  await prisma.cart.createMany(
    {
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '12345'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '54321'
            },
        ]
    }
  )

  await prisma.cartItem.create({
        data: 
            {
                productItemId: 1,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{id: 1}, {id: 2},{id: 3},]
                }
            }
    }
  )
}

/**
 * Функция для очистки данных перед генерацией для избавления от одних и тех же данных;
 */
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

// ? $executeRaw — метод клиента Prisma для выполнения необработанных SQL-запросов;
// * Все запроса к SQL нужно обрамлять в бэктики;
// ? TRUNCATE TABLE — SQL-команда, которая очищает таблицу, удаляя все записи в ней. В отличие от DELETE, команда TRUNCATE быстрее, так как не создаёт журнал транзакций для каждой строки и не вызывает триггеры;
// * Очистка таблицы в данном случае происходит по имени в двойных кавычках - User;
// ? RESTART IDENTITY — опция команды TRUNCATE, которая сбрасывает идентификаторы (обычно первичные ключи с автоинкрементом) в начальное состояние (например, 1). Это полезно, если записи будут добавляться позже, и нужно, чтобы идентификаторы начинались с начала;
// " CASCADE — ещё одна опция TRUNCATE, которая автоматически удаляет записи в других таблицах, если у них есть ссылки (внешние ключи) на таблицу User. Без этой опции запрос не будет выполнен, если существуют связанные записи в других таблицах;


async function main() {
  try {
    // ? Сначала чистим данные, а потом заново их создаём второй функцией;
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

// ? Ну и так как это промис, ждём, когда он выполнится и отключаемся от призмы, даже если возникает ошибка - всё равно отключаемся;
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });