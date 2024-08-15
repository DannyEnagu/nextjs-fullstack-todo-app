import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import TaskList from '@/components/TaskList';
import { Task } from '@/lib/types';
import AppProvider from '@/lib/AppProvider';

describe('<TaskList />', () => {

    const renderComponent = () => {
        render(
            <AppProvider>
                <TaskList />
            </AppProvider>
        );
    }

    it('should render "no task" if the task list is empty', () => {
        renderComponent()

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