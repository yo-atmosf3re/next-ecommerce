import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// ? Запрос на получение пользователя из БД;
export async function GET() {
    // ? Наипростейшее взаимодействие и синтаксис для получения всех пользователей из БД;
    const users = await prisma.user.findMany();
    return NextResponse.json(
        users
    )
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const user = await prisma.user.create({data});
    return NextResponse.json(user);
}