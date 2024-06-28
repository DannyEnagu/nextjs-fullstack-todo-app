'use client'
import { useContext } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from "@/lib/AppContext";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";


export default function Header () {
    const pathname = usePathname();
    const {isMenuOpen, toggleMenu} = useContext(AppContext);
    const openOrCloseMenu = () => toggleMenu();
    return (
        <header className="flex justify-between items-center">
            <div className="dark:text-[#dfe0fb] text-3xl font-bold">
                <span>to</span>
                <span className="text-rose-400 dark:text-indigo-500">do.</span>
            </div>
            <div className={`md:hidden ${pathname === '/auth' ? 'hidden': ''}`}>
                <Button
                    variant='ghost'
                    className="text-rose-400 dark:text-indigo-500 text-3xl"
                    onClick={openOrCloseMenu}>
                    {isMenuOpen
                    ? <IoCloseSharp />
                    : <HiOutlineMenuAlt4 />}
                </Button>
            </div>
        </header>
    );
}