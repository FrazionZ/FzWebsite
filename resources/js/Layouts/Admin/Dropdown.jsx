import { useState } from "react"
import { HiChevronDown } from "react-icons/hi"
import { Link } from "@inertiajs/react"
import { motion } from "framer-motion"

const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

export default function Dropdown(props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
            <div className="nav-link" onClick={() => { setIsOpen(!isOpen) }}>
                <div className="flex gap-4">{props.item.icon} <span>{props.item.label}</span></div>
                <HiChevronDown className="arrow" style={{ width: "24px", height: "24px" }} />
            </div>
            <motion.ul>
                {props.item.menu.map((item, index) => {
                    return (
                        <li><Link href={item.href}>{item.label}</Link></li>
                    )
                })}
            </motion.ul>
        </div>
        
    )

}