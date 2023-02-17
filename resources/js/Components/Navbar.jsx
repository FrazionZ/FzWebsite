import logo from '../../assets/img/logo.svg'
import { Link } from '@inertiajs/react';
import IsLogged from './Navbar/IsLogged';
import NotLogged from '@/Components/Navbar/NotLogged'
import { usePage } from '@inertiajs/react'
import logo_header from '../../assets/img/logo.png'
import Dropdown from './Dropdown';


export default function Navbar({ auth, navbar, mc, isHome, title, className }) {
    
    const { url, component } = usePage()

    return (
        <header>
            <nav>
                <div className="menu_general">
                    <Link href="/"><img src={ logo } className="logo" alt="logo" /></Link>
                    <div className="menu_subgeneral">
                        {navbar.map((elem, i) => {
                            if(elem.type !== "dropdown" && elem.parent_id == null)
                                return (<Link preserveState key={i} className={`nav-link ${(url == elem.value) ? 'active' : ''}`} href={elem.value}>{ elem.name }</Link>)
                            else if(elem.type == "dropdown" && elem.parent_id == null){
                                let childsElement = []
                                navbar.forEach((childElem, i) => {
                                    if(childElem.parent_id == elem.id)
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
            { isHome && (
                <div className="flex gap-[300px] justify-center home">
                    <div className="header-title">
                        <span className="text-96 pacifico text-white title">Un serveur</span>
                        <span className="text-144 pacifico  text-white subtitle">Faction</span>
                        <span className="text-36 text-white server">
                            <span className="text-[var(--color-2)] pr-3"> 
                            { 
                                (mc !== null) ? (mc.online) ? mc.players.online : "-" : "-" 
                            } 
                            </span> 
                            joueurs connectés</span>
                    </div>
                    <img src={logo_header} className="header-logo" width="372"/>
                </div> 
            )}
            {!isHome && (
                <div className="title_top">
                    { title }
                </div>
            )}
        </header>
    );
}
