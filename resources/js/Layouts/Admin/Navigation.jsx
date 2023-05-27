import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Logo from '../../../assets/img/logo.svg'
import { FaHome, FaTools, FaUsers } from "react-icons/fa";

export default function Navigation() {

    const props = usePage().props;

    const navs = [
        {
            label: "Accueil",
            icon: <FaHome className="icon" />,
            href: route('admin.index')
        },
        {
            label: "Maintenance",
            icon: <FaTools className="icon" />,
            href: route('admin.maintenance.index')
        },
        {
            label: "Liste des joueurs",
            icon: <FaUsers className="icon" />,
            href: route('admin.users.index')
        },
    ]

    return (
        <>
            <div className="head">
                <Link href={route('index')}><img src={Logo} alt="logo_fz" /></Link>
                <div className="title">
                    <span>Admin</span>
                    <span className="gradient">Panel</span>
                </div>
            </div>
            <div className="menu">
                {navs.map((item, index) => {
                    return (
                        <li key={index}><Link className={`nav-link ${props.ziggy.location == item.href ? "active" : ""}`} href={item.href}>{item.icon} <span>{item.label}</span></Link></li>
                    )
                })}
            </div>
        </>
        
    );
}
