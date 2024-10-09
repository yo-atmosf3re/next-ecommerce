import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

// ? Запрос на получение всех ингредиентов;
export async function GET() {
    const ingredients = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
}