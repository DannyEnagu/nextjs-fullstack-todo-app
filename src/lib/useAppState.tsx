'use client'
import { useContext } from "react";
import { AppContext } from "@/lib/AppContext";

export default function useAppState() {
    const { filter, isMenuOpen, openMenu, closeMenu, toggleMenu, changeFilter } = useContext(AppContext);

    return { filter, isMenuOpen, openMenu, closeMenu, toggleMenu, changeFilter };
}