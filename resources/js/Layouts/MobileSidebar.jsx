
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiViewBoards, HiInbox, HiUser, HiShoppingBag, HiArrowSmRight, HiTable } from "react-icons/hi";

export default function MobileSidebar({ openSidebar, xPos }) {
    return (
        <>
            <aside style={{ top: 0, height: "105vh", }} class={`${openSidebar ? "open" : "close"} sidebar lg:hidden self-start fixed col-span-1 bg-[var(--fzbg-4)] overflow-y-auto z-10`}>
                // Fixed Sidebar
            </aside>
        </>
        
    );
}
