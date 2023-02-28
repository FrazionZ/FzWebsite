import { Link } from "@inertiajs/react";
import DropdownProfile from "../DropdownProfile";
export default function IsLogged({ auth }) {

    let childsElement = [
        {
            value: "/profile",
            name: "Profil",
            type: "inerlink"
        },
        {
            value: "/profile/settings",
            name: "Paramètres",
            type: "inerlink"
        },
        
    ]

    if(auth.isAccessAdmin) 
        childsElement.push({
            value: "/admin",
            name: "Panel Admin",
            type: "hyperlink"
        })

    childsElement.push({
        value: "/logout",
        name: "Déconnexion",
        method: 'post',
        type: "inerlink"
    })



    return (
        <DropdownProfile text={auth.user.name} user={auth.user} items={childsElement} />
    );
}
