import prisma from "@/lib/prisma";
// import { Filters, Task } from "./types";

export const getAllTasks = async () => {
    try {
        const newestTasks = await prisma.todo.findMany({
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
        });
        const completedTasks = await prisma.todo.findMany({
            where: {
              isCompleted: true,
              id: {
                not: newestTasks[0].id
              }
            },
            orderBy: {
              updatedAt: 'desc'
            }
          });
          
          const starredInCompleteTasks = await prisma.todo.findMany({
            where: {
              isCompleted: false,
              isStarred: true,
              id: {
                not: newestTasks[0].id
              }
            },
            orderBy: {
              updatedAt: 'desc'
            }
          });
          
          const otherIncompleteTasks = await prisma.todo.findMany({
            where: {
              isCompleted: false,
              isStarred: false,
              id: {
                not: newestTasks[0].id
              }
            },
            orderBy: {
              updatedAt: 'desc'
            }
          });
          return [
            newestTasks[0],
            ...starredInCompleteTasks,
            ...otherIncompleteTasks,
            ...completedTasks
        ];
    } catch (error) {
        console.error(error);
    }
}
