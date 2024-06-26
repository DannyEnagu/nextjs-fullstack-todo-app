'use server';

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { Task } from "./types";

export const checkTask = async (id: Task['id'], isCompleted: Task['isCompleted']) => {
    try {        
        await prisma.todo.update({
            where: { id },
            data: { isCompleted: isCompleted }
        });
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
}

export const starTask = async (id: Task['id'], isStarred: Task['isStarred']) => {
    try {
        await prisma.todo.update({
            where: { id },
            data: { isStarred: isStarred }
        });
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }

}

export const deleteTask = async (id: Task['id']) => {
    try {
        await prisma.todo.delete({
            where: { id }
        });
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
}

export const createTask = async (data: { title: Task['title'], description?: Task['description'] }) => {
    try {
        await prisma.todo.create({
            data
        });
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
}