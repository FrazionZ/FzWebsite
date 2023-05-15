import { Link, usePage } from "@inertiajs/react";
import Dropdown from './Dropdown';
import logo from '../../assets/img/logo.svg'

export default function MobileSidebar({ auth, navbar, openSidebar, xPos }) {

    
    const { url, component } = usePage()

    return (
        <>
            <aside style={{ top: 0, height: "100vh", paddingBottom: "70px" }} class={`${openSidebar ? "open" : "close"} sidebar lg:hidden self-start fixed col-span-1 bg-[var(--fzbg-4)] overflow-y-auto z-10`}>
                <div className="logo flex justify-center">
                    <img src={logo} width={64} height={64} alt="logo" />
                </div>
                <div className="menu">
                    <hr />
                    {auth.isLogged && 
                        (
                            <>
                                <Link className="nav-link profile"><img src={`https://api.frazionz.net/user/${auth.user.uuid}/skin/head?s=32`} width={64} height={64} alt="logo" /> {auth.user.name}</Link>
                                <Link className="nav-link" href="/profile">Profil</Link>
                                { auth.isAccessAdmin && ( <a className="nav-link" href="/admin">Panel Admin</a> ) }
                                <Link className="nav-link" method="post" href="/logout">Déconnexion</Link>
                            </>
                        )
                    }
                    {!auth.isLogged && 
                        (
                            <>
                                <Link className="nav-link">Connexion</Link>
                                <Link className="nav-link">Inscription</Link>
                            </>
                        )
                    }
                </div>
                <div className="menu">
                    <hr />
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
            </aside>
        </>

    );
}
