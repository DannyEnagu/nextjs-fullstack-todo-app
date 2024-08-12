import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import AddForm from '../../src/components/AddForm';
import userEvent from '@testing-library/user-event';

describe('<AddForm />', () => {
    const handleSubmit = vi.fn();

    const renderComponent = () => {
        render(<AddForm addTask={handleSubmit} isAdding={false} />);
    };

    it('should render a form with an input field and a submit button', () => {
        renderComponent();
        const input = screen.getByPlaceholderText(/start typing/i);
        const submitBtn = screen.getByRole('button', { name: /add task/i });

        expect(input).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    });

    it('should update the input field when the user types', async () => {
        renderComponent();
        const input = screen.getByPlaceholderText(/start typing/i);

        // The input field should be empty
        // before the user types
        expect(input).toHaveValue('');

        const user = userEvent.setup();
        await user.type(input, 'New Task');

        // The input field should contain the text
        expect(input).toHaveValue('New Task');
    });

    it('should submit the form when the submit button is clicked', async () => {
        renderComponent();
        const form = screen.getByTestId('add-form');
        const submitBtn = screen.getByRole('button', { name: /add task/i });
        const input = screen.getByPlaceholderText(/start typing/i);

        const user = userEvent.setup();
        await user.type(input, 'New Task');
        await user.click(submitBtn);

        expect(form).toHaveFormValues({
            title: 'New Task'
        });

        expect(handleSubmit).toHaveBeenCalled();
        expect(handleSubmit).toHaveBeenCalledWith('New Task');
    });
});