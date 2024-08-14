import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import TaskList from '@/components/TaskList';
import { Task } from '@/lib/types';
import AppProvider from '@/lib/AppProvider';

describe('<TaskList />', () => {

    const tasks: Task[] = [
        {
            id: '1',
            title: 'Task 1',
            isCompleted: false,
            description: 'Description 1',
            isStarred: false,
            userId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            title: 'Task 2',
            isCompleted: true,
            description: 'Description 2',
            isStarred: false,
            userId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            title: 'Task 3',
            isCompleted: true,
            description: 'Description 2',
            isStarred: true,
            userId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const renderComponent = () => {
        render(
            <AppProvider>
                <TaskList tasks={tasks} />
            </AppProvider>
        );
    }

    it('should render "no task" if the task list is empty', () => {
        render(<TaskList tasks={[]} />);

        const noTask = screen.getByText(/no task/i)

        expect(noTask).toBeInTheDocument()
    });
    
    it('should render a list of tasks', () => {
        renderComponent();

        const taskItems = screen.getAllByRole('listitem');
        const taskList  = screen.getByTestId('task-list')

        expect(taskItems).toHaveLength(3);
        expect(taskList).toBeInTheDocument()
    });
});