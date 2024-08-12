import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import AuthForm from '../../src/components/AuthForm';
import userEvent from '@testing-library/user-event';

describe('<AuthForm />', () => {
    const handleSubmit = vi.fn();

    beforeEach(() => {
        render(<AuthForm onSubmit={handleSubmit} />);
    });

    it('should render a form with two input fields and a submit button', () => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    });

    it('should submit the form when the submit button is clicked and form data is returned', async () => {
        const submitBtn = screen.getByRole('button', { name: /submit/i });
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const form = screen.getByTestId('auth-form');

        const user = userEvent.setup();
        await user.type(emailInput, 'Danny@email.com');
        await user.type(passwordInput, 'password');
        await user.click(submitBtn);

        expect(form).toHaveFormValues({
            email: 'Danny@email.com',
            password: 'password'
        });

        expect(submitBtn).toBeInTheDocument();
        expect(handleSubmit).toHaveBeenCalled();
        expect(handleSubmit).toHaveBeenCalledWith({
            email: 'Danny@email.com',
            password: 'password'
        });
    });
})