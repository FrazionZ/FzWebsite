import { Link } from "@inertiajs/react";
import DropdownProfile from "../DropdownProfile";
export default function IsLogged({ auth }) {

    let childsElement = [
        {
            value: "/profile",
            name: "Profil"
        },
        {
            value: "/prfoile/settings",
            name: "Paramètres"
        },
        
    ]

    if(auth.isAdmin) 
        childsElement.push({
            value: "/admin",
            name: "Panel Admin"
        })

    childsElement.push({
        value: "/logout",
        name: "Déconnexion",
        method: 'post'
    })



    return (
        <DropdownProfile text={auth.user.name} user={auth.user} items={childsElement} />
    );
}
