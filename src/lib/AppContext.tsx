'use client'
import { useState, createContext } from "react";

export const AppContext = createContext({
    isMenuOpen: false,
    openMenu: () => {},
    closeMenu: () => {},
    toggleMenu: () => {}
});

export default function AppContextProvider({
    children
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); 
    return (
        <AppContext.Provider value={{ 
            isMenuOpen,
            openMenu,
            closeMenu,
            toggleMenu
            }}
        >
        {children}
        </AppContext.Provider>
    );
}