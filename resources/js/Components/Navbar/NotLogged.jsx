import { Link } from "@inertiajs/react";
import { BiLogInCircle, BiUserPlus } from 'react-icons/bi'

export default function NotLogged(){

    return (
        <>
            <div className="not_logged">
                <Link className="nav-link" href="/login">Connexion</Link>
                <Link className="nav-link" href="/register">Inscription</Link>
            </div>
            <div className="not_logged mobile">
                <Link className="nav-link" href="/login"><BiLogInCircle /></Link>
                <Link className="nav-link" href="/register"><BiUserPlus /></Link>
            </div>
        </>
    )

}