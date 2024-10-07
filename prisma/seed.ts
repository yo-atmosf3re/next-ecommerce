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
}

/**
 * Функция для очистки данных перед генерацией для избавления от одних и тех же данных;
 */
async function down() {
  
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}