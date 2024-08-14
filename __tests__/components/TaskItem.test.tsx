import { render, screen } from '@testing-library/react';
import { beforeEach, it, expect, describe, vi } from 'vitest';
import TaskItem from '@/components/TaskItem';
import userEvent from '@testing-library/user-event';
import { Task } from '@/lib/types';

describe('<TaskItem />', () => {
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

    it('should render a task item with a checkbox, a title and two buttons', () => {
        const checkbox = screen.getByRole('checkbox');
        const title = screen.getByText(task.title);
        const buttons = screen.getAllByRole('button');

        expect(checkbox).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(buttons).toHaveLength(2);
    });

    // it('should call the onUpdated function when the checkbox is clicked', async () => {
    //     const checkbox = screen.getByRole('checkbox');

    //     expect(task.onUpdated).not.toHaveBeenCalled();

    //     const user = userEvent.setup();
    //     await user.click(checkbox);

    //     expect(task.onUpdated).toHaveBeenCalled();
    //     expect(task.onUpdated).toHaveBeenCalledWith(
    //         task.id,
    //         'isCompleted',
    //     );
    // });

    // it('should call the onUpdated function when the star button is clicked', async () => {
    //     const starButton = screen.getByTestId('star-button');

    //     expect(task.onUpdated).not.toHaveBeenCalled();

    //     const user = userEvent.setup();
    //     await user.click(starButton);

    //     expect(task.onUpdated).toHaveBeenCalled();
    //     expect(task.onUpdated).toHaveBeenCalledWith(
    //         task.id,
    //         'isStarred',
    //     );
    // });

    // it('should call the onUpdated function when the delete button is clicked', async () => {
    //     const deleteButton = screen.getByTestId('delete-button');

    //     expect(task.onUpdated).not.toHaveBeenCalled();

    //     const user = userEvent.setup();
    //     await user.click(deleteButton);

    //     expect(task.onUpdated).toHaveBeenCalled();
    //     expect(task.onUpdated).toHaveBeenCalledWith(
    //         task.id,
    //         'isDeleted',
    //     );
    // });
})