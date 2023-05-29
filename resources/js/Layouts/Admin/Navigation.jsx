import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Logo from '../../../assets/img/logo.svg'
import { FaFile, FaComments, FaHome, FaTools, FaUsers } from "react-icons/fa";
import { HiShoppingBag, HiWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlineLabelImportant } from 'react-icons/md'
import Dropdown from "./Dropdown";

export default function Navigation() {

    const props = usePage().props;

    const navs = [
        {
            label: "Accueil",
            icon: <FaHome className="icon" />,
            href: route('admin.index'),
            type: "link"
        },
        {
            label: "Maintenance",
            icon: <HiWrenchScrewdriver className="icon" />,
            href: route('admin.maintenance.index'),
            type: "link"
        },
        {
            label: "Liste des joueurs",
            icon: <FaUsers className="icon" />,
            href: route('admin.users.index'),
            type: "link"
        },
        {
            label: "Rôles & Permissions",
            icon: <MdOutlineLabelImportant className="icon" />,
            href: route('admin.roles.index'),
            type: "link"
        },
        {
            label: "Logs système",
            icon: <FaFile className="icon" />,
            href: route('admin.logs.index'),
            type: "link"
        },
        {
            label: "Boutique",
            icon: <HiShoppingBag className="icon" />,
            type: "dropdown",
            menu: [
                {
                    label: "Ajouter un article",
                    href: route('admin.index')
                },
                {
                    label: "Liste des articles",
                    href: route('admin.index')
                },
                {
                    label: "Code promo",
                    href: route('admin.promocode.index')
                }
            ]
        },
        {
            label: "Forum",
            icon: <FaComments className="icon" />,
            type: "dropdown",
            menu: [
                {
                    label: "Catégories",
                    href: route('admin.forum.categories.index')
                },
                {
                    label: "Threads",
                    href: route('admin.forum.threads.index')
                }
            ]
        }
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
                    if(item.type == "link")
                        return (
                            <li key={index}><Link className={`nav-link ${props.ziggy.location == item.href ? "active" : ""}`} href={item.href}><div className="flex gap-4">{item.icon} <span>{item.label}</span></div></Link></li>
                        )
                    else if(item.type == "dropdown")
                        return (
                            <li key={index}>
                                <Dropdown item={item} />
                            </li>
                        )
                })}
            </div>
        </>
        
    );
}
