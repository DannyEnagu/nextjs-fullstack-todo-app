import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Header from '../../src/components/Header';


describe('<Header />', () => {
    let isOpen = false;
    const renderComponent = () => {
        const toggleMenu = () => {
            isOpen = !isOpen;
        }
        render(<Header isMenuOpen={isOpen} toggleMenu={toggleMenu} />);

        return {
            button: screen.getByRole('button'),
            to: screen.getByText('to'),
            do: screen.getByText('do.'),
        };
    };

    it('should render "todo." text', () => {
        const { to: toText, do: doText } = renderComponent();
        expect(toText).toBeInTheDocument();
        expect(doText).toBeInTheDocument();
    })

    it('should render a button', () => {
        const { button } = renderComponent();
        expect(button).toBeInTheDocument();
    });

    it('should toggle menu when button is clicked', async () => {
        const { button } = renderComponent();

        expect(isOpen).toBeFalsy();

        const user = userEvent.setup();

        await user.click(button);
        
        expect(isOpen).toBeTruthy();
    });
});