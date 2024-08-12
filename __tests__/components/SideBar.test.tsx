import { it, expect, describe } from 'vitest';
import SideBar from '../../src/components/SideBar';
import { render, screen } from '@testing-library/react';


describe('<SideBar />', () => {
    it('should render filter heading', () => {
        render(<SideBar />);
        const heading = screen.getByRole('heading', { name: /filter/i });
        expect(heading).toBeInTheDocument();

    });

    it('should render a list of buttons used for filtering', () => {
        render(<SideBar />);
        const buttonText = ['All', 'Starred', 'Completed', 'Today', 'Week'];
        buttonText.forEach(text => {
            const button = screen.getByRole('button', { name: text });

            expect(button).toBeInTheDocument();
        });
    });
})