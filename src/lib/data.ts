import prisma from "@/lib/prisma";
import { userSession } from "./actions";

export const getAllTasks = async () => {
    // Get all tasks for the current user 
    const session = await userSession();
    if (!session?.user?.id) return;

    try {
        // Get the newest task only
        const newestTasks = await prisma.todo.findMany({
            where: {
              userId: session.user.id
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
        });
        // Get the completed tasks only
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
          // Get the starred and incomplete tasks
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
          // Get the other incomplete tasks
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
          // Return:
            // the newest task,
            // starred and incomplete tasks,
            // other incomplete tasks, and
            // completed tasks last
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
