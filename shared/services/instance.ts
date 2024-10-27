import axios from 'axios';

export const axiosInstance = axios.create({
    // ? Обязательно указывать переменную окружения именно так - NEXT_PUBLIC_API_URL - и если дать другое название, то не будет работать;
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
