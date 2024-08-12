'use client'
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface HeaderProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

export default function Header ({isMenuOpen, toggleMenu}: HeaderProps) {
    const pathname = usePathname();
    return (
        <header className="flex justify-between items-center">
            <div className="dark:text-[#dfe0fb] text-3xl font-bold">
                <span>to</span>
                <span className="text-rose-400 dark:text-indigo-500">do.</span>
            </div>
            {/* Hide Hamburger icon on auth page */}
            <div className={`md:hidden ${pathname === '/auth' ? 'hidden': ''}`}>
                <Button
                    variant='ghost'
                    className="text-rose-400 dark:text-indigo-500 text-3xl"
                    onClick={toggleMenu}>
                    {isMenuOpen
                    ? <IoCloseSharp />
                    : <HiOutlineMenuAlt4 />}
                </Button>
            </div>
        </header>
    );
}