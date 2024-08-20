import { render, screen } from '@testing-library/react';
import { beforeEach, it, expect, describe, vi, afterEach } from 'vitest';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/lib/types';

describe('<TaskItem />', () => {
    const mockTaskUpdated = vi.fn();
    const mockTaskDeleted = vi.fn(); 

    const task: Task = {
        id: '1',
        userId: '1',
        description: 'description',
        title: 'Task 1',
        isCompleted: false,
        isStarred: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(() => {
        render(<TaskItem {...task} />);
    });

    afterEach(() => {
        mockTaskUpdated.mockClear();
        mockTaskDeleted.mockClear();
    });

    it('should render a task item with a checkbox, a title and two buttons', () => {
        const checkbox = screen.getByRole('checkbox');
        const title = screen.getByText(task.title);
        const buttons = screen.getAllByRole('button');

        expect(checkbox).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(buttons).toHaveLength(2);
    });
})