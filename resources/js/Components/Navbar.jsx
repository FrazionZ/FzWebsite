import logo from '../../assets/img/logo.svg'
import { Link, usePage } from '@inertiajs/react';
import IsLogged from './Navbar/IsLogged';
import NotLogged from '@/Components/Navbar/NotLogged'
import logo_header from '../../assets/img/logo.png'
import Dropdown from './Dropdown';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import MenuHamburger from '../../assets/img/icons/hamburger.svg'
import MobileSidebar from '@/Components/MobileSidebar'
import { useSwipeable } from 'react-swipeable';


export default function Navbar({ auth, navbar, mc, isHome, title, className }) {

    const { url, component } = usePage()
    const [showNavigationMobile, setShowNavigationMobile] = useState(false);
    const [isOpen, toggleOpen] = useState(false);
    const [xPos, setXPos] = useState(0)
    const containerRef = useRef(null);
    const handlerSwiper = useSwipeable({
        onSwiped: (eventData) => {
            const target = eventData.event.target;
            if(target.classList.contains('backdrop') && eventData.dir == "Left"){
                toggleOpen(false)
            }
        },
      });

    if (isOpen)
        window.scrollTo(0, 0);
    
    document.querySelector('body').classList.add('overflow-x-hidden')

    document.querySelector('body').classList.remove('overflow-y-hidden')
    document.querySelector('body').classList.remove('overflow-y-auto')

    document.querySelector('body').classList.add(isOpen ? 'overflow-y-hidden' : 'overflow-y-auto')
    
    async function swipeSidebar(){

    }

    return (
        <>
            <div className="mobile menu">
                <button onClick={() => { toggleOpen(!isOpen) }} className='lg:hidden w-fit'><img width={48} height={48} src={MenuHamburger} alt="" /></button>
                <div className={`backdrop ${isOpen ? "" : "hidden"}`} onClick={() => { toggleOpen(false) }} {...handlerSwiper} />
                <MobileSidebar auth={auth} navbar={navbar} xPos={xPos} openSidebar={isOpen} />
            </div>
            <header>
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
                    <div className="home_head flex lg:gap-[300px] justify-center home">
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
                    <div className="flex title_top">
                        {title}
                    </div>
                )}
            </header>
        </>

    );
}
