'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from "next/cache";
import prisma from "@/lib//prisma";
import { Task } from "@/lib//types";
import { signIn } from '@/lib/auth';

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

export async function authenticateUser(
    authType: 'signIn' | 'signUp',
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
    return 'Login Successful!';
}