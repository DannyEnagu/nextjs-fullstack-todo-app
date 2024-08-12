'use client'
import { useContext } from "react";
import { AppContext } from "@/lib/AppContext";
import Header from "./Header";


export default function WithHeader({ children } : { children: React.ReactNode }) {
    const {isMenuOpen, toggleMenu} = useContext(AppContext);
    const openOrCloseMenu = () => toggleMenu();
    return (
        <div>
            <Header isMenuOpen={isMenuOpen} toggleMenu={openOrCloseMenu} />
            {children}
        </div>
    );
}