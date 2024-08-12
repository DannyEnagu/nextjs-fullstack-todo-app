import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import TasksFilter from '../../src/components/FilterButton';
import userEvent from '@testing-library/user-event';

describe('<TasksFilter />', () => {
    const onMockClick = vi.fn();

    const renderComponent = () => {
        render(<TasksFilter onClick={onMockClick}>{'all'}</TasksFilter>);
    }

    it('should render a button with the correct text', () => {
        renderComponent();

        const button = screen.getByRole('button', { name: /all/i });

        expect(button).toBeInTheDocument();
    });

    it('should call the onClick function when clicked', async () => {
        renderComponent();

        const button = screen.getByRole('button', { name: /all/i });

        const user = userEvent.setup();
        await user.click(button);

        expect(onMockClick).toHaveBeenCalled();
    });
});