import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import TaskList from '@/components/TaskList';
import { Task } from '@/lib/types';

describe('<TaskList />', () => {

    const tasks: Task[] = [
        {
            id: '1',
            userId: '1',
            title: 'Task 1',
            description: 'Task 1 description',
            isCompleted: false,
            isStarred: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            userId: '1',
            title: 'Task 2',
            description: 'Task 2 description',
            isCompleted: true,
            isStarred: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '3',
            userId: '1',
            title: 'Task 3',
            description: 'Task 3 description',
            isCompleted: false,
            isStarred: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];


    const renderComponent = (tasks: Task[]) => {
        render(<TaskList tasks={tasks} />);
    }

    
    it('should render an empty list if no task is passed', () => {
        renderComponent([]);
        
        const taskList  = screen.getByTestId('task-list');
        expect(taskList).toBeInTheDocument();
        expect(taskList.children).toHaveLength(0);
    });
    
    it('should render a list of tasks', () => {
        renderComponent(tasks);
        const taskList  = screen.getByTestId('task-list');

        expect(taskList.children).toHaveLength(3);
    });

    it('should render a list of tasks with the correct title', () => {
        renderComponent(tasks);
        const taskList  = screen.getByTestId('task-list');

        expect(taskList.children[0]).toHaveTextContent('Task 1');
        expect(taskList.children[1]).toHaveTextContent('Task 2');
        expect(taskList.children[2]).toHaveTextContent('Task 3');
    });
});