import logo from '../../assets/img/logo.svg'
import { Link, usePage } from '@inertiajs/react';
import IsLogged from './Navbar/IsLogged';
import NotLogged from '@/Components/Navbar/NotLogged'
import logo_header from '../../assets/img/logo.png'
import Dropdown from './Dropdown';
import { useDimensions } from './useDimensions';
import { useState, useRef } from 'react';
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { MenuToggle } from './MenuToggle';


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
    const [isOpen, toggleOpen] = useState(false);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }),
        closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    async function handleHeaderClick(e) {
        e.preventDefault()
        if(e.target.nodeName !== "svg" && e.target.nodeName !== "BUTTON")
            toggleOpen(false)
    }

    if(isOpen)
        window.scrollTo(0, 0);

    isOpen ? 
        document.body.style.overflow = "hidden" : 
        document.body.style.overflow = "auto"

    return (
        <>
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                className="parent_button_mobile_menu"
                ref={containerRef}
            >
                <MenuToggle toggle={() => toggleOpen(isOpen ? false : true)} />
            </motion.div>
            <AnimatePresence>
                <motion.div className={`bannerShadow ${isOpen ? "" : "closed"}`} onClick={handleHeaderClick}
                    initial={{ 
                        opacity: 0, 
                        display: "none", 
                        backdropFilter: "blur(0px)" 
                    }}
                    animate={{
                        opacity: isOpen ? "1" : "0",
                        display: "block",
                        backdropFilter: `blur(${isOpen ? "5px" : "0px"})`
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: `blur(0)`,
                        display: "none",
                        transition: { delay: 0.7, duration: 0.1 }
                    }} />
            </AnimatePresence>
            <header onClick={handleHeaderClick}>
                <nav>
                    <div className="menu_general">
                        <AnimatePresence>
                            <motion.div className="mobile_menu">
                                <Link href="/"><img src={logo} className="logo" alt="logo" /></Link>
                                <div className="menu_account">
                                    {auth.isLogged ? <IsLogged auth={auth} /> : <NotLogged />}
                                </div>
                            </motion.div>
                            {isOpen && (
                                <>
                                    <motion.aside
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: "80%"
                                        }}
                                        exit={{
                                            width: 0,
                                            transition: { delay: 0.7, duration: 0.1 }
                                        }}
                                    >
                                        <motion.div
                                            className="container"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                        >
                                            {navbar.map((elem, i) => {
                                                if (elem.type !== "dropdown" && elem.parent_id == null)
                                                    return (
                                                        <motion.div
                                                            key={i}
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
                                                            variants={itemVariants}
                                                        >
                                                            <Dropdown key={i} text={elem.name} items={childsElement} />
                                                        </motion.div>
                                                    )
                                                }
                                            })}
                                        </motion.div>
                                    </motion.aside>
                                </>

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
        </>

    );
}
