import prisma from "@/lib/prisma";
import { userSession } from "./actions";

export const getAllTasks = async () => {
    const session = await userSession();
    if (!session?.user?.id) return;
    try {
        const newestTasks = await prisma.todo.findMany({
            where: {
              userId: session.user.id
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
        });
        const completedTasks = await prisma.todo.findMany({
            where: {
              userId: session.user.id,
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
              userId: session.user.id,
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
              userId: session.user.id,
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
