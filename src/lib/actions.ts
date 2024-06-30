'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from "next/cache";
import prisma from "@/lib//prisma";
import { Prisma } from "@prisma/client";
import { Task, User } from "@/lib//types";
import { signIn, signOut, auth } from '@/lib/auth';
const bcrypt = require('bcrypt');

export const userSession = async () => {
    // Get the active user session
    const session = await auth();
    return session;
}

export const checkTask = async (id: Task['id'], isCompleted: Task['isCompleted']) => {
    // Update the task's completion status
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
    // Update the task's starred status
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
    // Delete the task
    try {
        await prisma.todo.delete({
            where: { id }
        });
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
}

export const createTask = async (data: { title: Task['title'], description?: Task['description'], userId: User['id'] }) => {
    // Create a new task only if the title and user ID are provided
    try {
        if (!data.title || !data.userId) return;
        await prisma.todo.create({
            data
        });
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
}

export const signOutUser = async () => {
    // Sign out the user
    try {
        await signOut({ redirectTo: '/auth', redirect: true });
    } catch (error) {
        console.error(error);
    }
};

export const signUp = async (data: { email: FormDataEntryValue | null; password: FormDataEntryValue | null }) => {
    // Create a new user account
    try {
        const hashedPassword = await bcrypt.hash(data.password as string, 10);
        await prisma.user.create({
            data: {
                name: data.email as string,
                email: data.email as string,
                password: hashedPassword
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export async function authenticateUser(
    authType: 'signIn' | 'signUp',
    data: { email: FormDataEntryValue | null; password: FormDataEntryValue | null },
  ) {
    // Authenticate the user
    try {
      if (authType === 'signUp') {
        // Sign up and then sign in
        const hashedPassword = await bcrypt.hash(data.password as string, 10);
        const user = await prisma.user.create({
            data: {
                name: data.email as string,
                email: data.email as string,
                password: hashedPassword
            }
        });
        if (user) {
            await signIn('credentials', { ...data, redirectTo: '/'});
        }
      } else {
        // Sign in
        await signIn('credentials', { ...data, redirectTo: '/'});
      }
    } catch (error) {
      if (error instanceof AuthError) {
        // Handle authentication errors
        switch (error.type) {
        case 'CredentialsSignin':
            return { message: 'Invalid credentials.', isSuccess: false};
        case 'CallbackRouteError':
            return { message: 'Invalid credentials.', isSuccess: false};
        default:
            return { message: 'Something went wrong! Please try again', isSuccess: false};
        }
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle Prisma errors when creating a user
        return { message: 'Failed to create user. Account may already exist.', isSuccess: false};
      }
    }
    return { message: authType === 'signIn' ? 'Login Successful!' : 'Account created successful!', isSuccess: true};
}