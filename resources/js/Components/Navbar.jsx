import logo from '../../assets/img/logo.svg'
import { Link } from '@inertiajs/react';
import IsLogged from './Navbar/IsLogged';
import NotLogged from '@/Components/Navbar/NotLogged'
import { usePage } from '@inertiajs/react'
import logo_header from '../../assets/img/logo.png'
import Dropdown from './Dropdown';
import { FaHamburger } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi'
import { useState } from 'react';
import { AnimatePresence, motion, useCycle } from "framer-motion";


const links = [
    { name: "Home", to: "#", id: 1 },
    { name: "About", to: "#", id: 2 },
    { name: "Blog", to: "#", id: 3 },
    { name: "Contact", to: "#", id: 4 }
];

const itemVariants = {
    closed: {
        opacity: 0
    },
    open: { opacity: 1 }
};

const sideVariants = {
    closed: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1
        }
    },
    open: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: 1
        }
    }
};

export default function Navbar({ auth, navbar, mc, isHome, title, className }) {

    const { url, component } = usePage()
    const [showNavigationMobile, setShowNavigationMobile] = useState(false);
    const [open, cycleOpen] = useCycle(false, true);

    return (
        <header>
            <nav>
                <div className="menu_general">
                    <div className="mobile_menu">
                        <div className="hamburger" onClick={cycleOpen}>
                            <BiMenu />
                        </div>
                        <Link href="/"><img src={logo} className="logo" alt="logo" /></Link>
                        <div className="menu_account">
                            {auth.isLogged ? <IsLogged auth={auth} /> : <NotLogged />}
                        </div>
                    </div>
                    <AnimatePresence>
                        {open && (
                            <motion.aside
                                initial={{ width: 0 }}
                                animate={{
                                    width: "100%"
                                }}
                                exit={{
                                    width: 0,
                                    transition: { delay: 0.7, duration: 0.3 }
                                }}
                            >
                                <motion.div
                                    className="container"
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={sideVariants}
                                >
                                    {navbar.map((elem, i) => {
                                        if (elem.type !== "dropdown" && elem.parent_id == null)
                                            return (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.1 }}
                                                    variants={itemVariants}
                                                >
                                                    <Link preserveState key={i} className={`nav-link ${(url == elem.value) ? 'active' : ''}`} href={elem.value}>
                                                        {elem.name}
                                                    </Link>
                                                </motion.div>

                                            )
                                        else if (elem.type == "dropdown" && elem.parent_id == null) {
                                            let childsElement = []
                                            navbar.forEach((childElem, i) => {
                                                if (childElem.parent_id == elem.id)
                                                    childsElement.push(childElem)
                                            })
                                            return (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.1 }}
                                                    variants={itemVariants}
                                                >
                                                    <Dropdown key={i} text={elem.name} items={childsElement} />
                                                </motion.div>
                                            )
                                        }
                                    })}
                                </motion.div>
                            </motion.aside>
                        )}
                    </AnimatePresence>
                    <div className={`menu_subgeneral ${showNavigationMobile ? "open" : "closed"}`}>
                        {navbar.map((elem, i) => {
                            if (elem.type !== "dropdown" && elem.parent_id == null)
                                return (<Link preserveState key={i} className={`nav-link ${(url == elem.value) ? 'active' : ''}`} href={elem.value}>{elem.name}</Link>)
                            else if (elem.type == "dropdown" && elem.parent_id == null) {
                                let childsElement = []
                                navbar.forEach((childElem, i) => {
                                    if (childElem.parent_id == elem.id)
                                        childsElement.push(childElem)
                                })
                                return (
                                    <Dropdown key={i} text={elem.name} items={childsElement} />
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="menu_account">
                    {auth.isLogged ? <IsLogged auth={auth} /> : <NotLogged />}
                </div>
            </nav>
            {isHome && (
                <div className="flex gap-[300px] justify-center home">
                    <div className="header-title">
                        <span className="text-white title">Un serveur</span>
                        <span className="text-white subtitle">Faction</span>
                        <span className="text-white server">
                            <span className="text-[var(--color-2)] pr-3">
                                {
                                    (mc !== null) ? (mc.online) ? mc.players.online : "-" : "-"
                                }
                            </span>
                            joueurs connectés</span>
                    </div>
                    <img src={logo_header} className="header-logo" width="372" />
                </div>
            )}
            {!isHome && (
                <div className="title_top">
                    {title}
                </div>
            )}
        </header>
    );
}
