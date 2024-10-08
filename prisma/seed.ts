import { _ingredients, categories, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

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
}

/**
 * Функция для очистки данных перед генерацией для избавления от одних и тех же данных;
 */
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
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