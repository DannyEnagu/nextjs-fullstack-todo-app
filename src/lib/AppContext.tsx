'use client'
import { useState, createContext } from "react";
import { Filters } from "@/lib/types";

export const AppContext = createContext({
    filter: 'all',
    isMenuOpen: false,
    openMenu: () => {},
    closeMenu: () => {},
    toggleMenu: () => {},
    changeFilter: (newFilter: Filters) => {}
});

export default function AppContextProvider({
    children
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filter, setFilter] = useState<Filters>('all');
    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); 
    const changeFilter = (newFilter: Filters) => setFilter(newFilter);
    return (
        <AppContext.Provider value={{
            filter,
            isMenuOpen,
            openMenu,
            closeMenu,
            toggleMenu,
            changeFilter
            }}
        >
        {children}
        </AppContext.Provider>
    );
}