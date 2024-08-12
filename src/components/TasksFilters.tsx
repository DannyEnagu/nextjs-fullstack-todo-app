import FilterButton from "./FilterButton";
import { MdToday } from "react-icons/md";
import { BiCalendarWeek } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import useAppState from "@/lib/useAppState";
import { Filters } from "@/lib/types";

export default function TasksFilters() {
    const { closeMenu, changeFilter, filter } = useAppState();

    const setFIlter = (filter: Filters) => {
        // Change the filter option
        changeFilter(filter);
        // Close the menu on mobile devices
        closeMenu();
    };
    return (
        <ul>
            <li>
                <FilterButton isActive={filter === 'all'} onClick={() => setFIlter('all')}>
                    <RiTodoLine />
                    <span>All</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton isActive={filter === 'starred'} onClick={() => setFIlter('starred')}>
                    <CiStar />
                    <span>Starred</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton isActive={filter === 'completed'} onClick={() => setFIlter('completed')}>
                    <IoCheckmarkDoneCircleOutline />
                    <span>Completed</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton isActive={filter === 'today'} onClick={() => setFIlter('today')}>
                    <MdToday /> 
                    <span>Today</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton isActive={filter === 'week'} onClick={() => setFIlter('week')}>
                    <BiCalendarWeek />
                    <span>Week</span>
                </FilterButton>
            </li>
    </ul>
    );
}