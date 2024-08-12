import { render, screen } from '@testing-library/react';
import { it, expect, describe, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AuthWrapper from '@/components/AuthWapper';

// Example 1: next way
// Need to install an extra package "next-router-mock"
// vi.mock('next/navigation', () => vi.importActual('next-router-mock'));

// Example 2
vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
        ...actual,
        useRouter: vi.fn(() => ({
            push: vi.fn(),
        })),
        useSearchParams: vi.fn(() => ({
            get: vi.fn(),
        })),
        usePathname: vi.fn()
    }
});

describe('<AuthForm />', () => {
    beforeEach(() => {
        render(<AuthWrapper />);
    });

    it('should render a heading with the correct text', () => {
        const heading = screen.getByRole('heading', { name: /sign in/i });

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/sign in/i);
    });

    it('should render an empty authentication response paragraph', () => {
        const paragraph = screen.getByTestId('auth-response');

        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveTextContent('');
    });

    it('should change the heading text when the toggle button is clicked', async () => {
        const toggleButton = screen.getByRole('button', { name: /sign up/i });
        const heading = screen.getByRole('heading', { name: /sign in/i });
        const user = userEvent.setup();
        const paragraph = screen.getByText(/have an account?/i);

        expect(heading).toBeInTheDocument();
        expect(paragraph).toHaveTextContent(/don't/i);

        await user.click(toggleButton);

        expect(heading).toHaveTextContent(/sign up/i);
        expect(paragraph).toHaveTextContent(/already/i);
    });
})