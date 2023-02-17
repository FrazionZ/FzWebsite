import { Link } from "@inertiajs/react";

export default function NotLogged(){

    return (
        <div className="not_logged">
            <Link className="nav-link" href="/login">Connexion</Link>
            <Link className="nav-link" href="/register">Inscription</Link>
        </div>
    )

}