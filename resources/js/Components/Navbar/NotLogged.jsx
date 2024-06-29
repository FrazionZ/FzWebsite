import { Link } from "@inertiajs/react";
import { BiLogInCircle, BiUserPlus } from 'react-icons/bi'
import { BsMicrosoft } from 'react-icons/bs'
export default function NotLogged(){

    return (
        <>
            <div className="not_logged">
                <Link className="nav-link" style={{ gap: '10px' }} href="/login"><BsMicrosoft /> Se connecter avec Microsoft</Link>
            </div>
            <div className="not_logged mobile">
                <Link className="nav-link" href="/login"><BiLogInCircle /></Link>
                <Link className="nav-link" href="/register"><BiUserPlus /></Link>
            </div>
        </>
    )

}
