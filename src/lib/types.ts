// Import and export types from prisma schema
import type { Todo, User } from '@prisma/client';
export type { Todo as Task, User };
export type Filters = 'completed' | 'starred' | 'all' | 'today' | 'week';
export type Property = 'isCompleted' | 'isStarred' | 'isDeleted';