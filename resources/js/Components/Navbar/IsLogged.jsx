import { Link } from "@inertiajs/react";
import DropdownProfile from "../DropdownProfile";
import ModalPromoCode from "../ModalPromoCode";
import { Dropdown } from "flowbite-react";
import { FaBell } from "react-icons/fa";
import DropdownNotifications from '@/Components/DropdownNotifications'

export default function IsLogged({ auth }) {

    let childsElement = [
        {
            value: "/profile",
            name: "Profil",
            type: "inerlink"
        },
        {
            value: "/profile?fastMenu=5",
            name: "Paramètres",
            type: "inerlink"
        },
        {
            value: "/promocode",
            name: "Utiliser un code promo",
            type: "modal",
            dom: <ModalPromoCode />
        },

    ]

    if (auth.isAccessAdmin)
        childsElement.push({
            value: "/admin",
            name: "Panel Admin",
            type: "inerlink"
        })

    childsElement.push({
        value: "/logout",
        name: "Déconnexion",
        method: 'post',
        type: "inerlink",
        as: "a"
    })



    return (
        <div className="flex items-center gap-6">
            <DropdownNotifications />
            <DropdownProfile text={auth.user.name} user={auth.user} items={childsElement} />
        </div>
    );
}
