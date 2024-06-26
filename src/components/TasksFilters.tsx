import FilterButton from "./TasksFilter";
import { MdToday } from "react-icons/md";
import { BiCalendarWeek } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

export default function TasksFilters() {
    return (
        <ul>
            <li>
                <FilterButton filter="all">
                    <RiTodoLine />
                    <span>All</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton filter="starred">
                    <CiStar />
                    <span>Starred</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton filter="completed">
                    <IoCheckmarkDoneCircleOutline />
                    <span>Completed</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton filter="today">
                    <MdToday /> 
                    <span>Today</span>
                </FilterButton>
            </li>
            <li>
                <FilterButton filter="week">
                    <BiCalendarWeek />
                    <span>Week</span>
                </FilterButton>
            </li>
    </ul>
    );
}