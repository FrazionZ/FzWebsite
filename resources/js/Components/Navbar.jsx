import logo from '../../assets/img/logo.svg'
import { Link, usePage } from '@inertiajs/react';
import IsLogged from './Navbar/IsLogged';
import NotLogged from '@/Components/Navbar/NotLogged'
import logo_header from '../../assets/img/logo.png'
import Dropdown from './Dropdown';
import { useState, useRef } from 'react';
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { MenuToggle } from './MenuToggle';
import { BsFillHouseFill } from 'react-icons/bs';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Comments from '../../assets/img/icons/comments'
import MobileDropdownProfile from './MobileDropdownProfile';

const solutions = [
    {
        name: 'Insights',
        description: 'Measure actions your users take',
        href: '##',
    },
    {
        name: 'Automations',
        description: 'Create your own targeted content',
        href: '##',
    },
    {
        name: 'Reports',
        description: 'Keep track of your growth',
        href: '##',
    },
]

export default function Navbar({ auth, navbar, mc, isHome, title, className }) {

    const { url, component } = usePage()
    const [showNavigationMobile, setShowNavigationMobile] = useState(false);
    const [isOpen, toggleOpen] = useState(false);
    const containerRef = useRef(null);

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
        if (e.target.nodeName !== "svg" && e.target.nodeName !== "BUTTON")
            toggleOpen(false)
    }

    if (isOpen)
        window.scrollTo(0, 0);

    isOpen ?
        document.body.style.overflow = "hidden" :
        document.body.style.overflow = "overlay"

    document.body.style.overflowX = "hidden"

    return (
        <>
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
                            </motion.div>
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
            <div className="mobile_navbar">
                <div className="menu">
                    <Link href="/" className={`nav-link ${(url == "/") ? 'active' : ''}`}>
                        <BsFillHouseFill />
                    </Link>
                    <Link href="https://boutique.frazionz.net" className="nav-link">
                        <FaShoppingCart />
                    </Link>
                    <Link href={route('forum.index')} className={`nav-link ${url.startsWith("/forum") ? 'active' : ''}`}>
                        <Comments />
                    </Link>
                    <MobileDropdownProfile />
                </div>
            </div>
        </>

    );
}
