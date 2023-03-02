import { FaHome } from "react-icons/fa";
import { BsFillBarChartFill, BsFiles } from 'react-icons/bs'
import { FiNavigation } from 'react-icons/fi'
import { IoMdCart } from "react-icons/io"
import { Link } from "@inertiajs/react";
import { Sidebar } from "flowbite-react";

export default function AdminSidebar({ auth }) {
    return (
        <>
            <aside
                id="sidebar"
                className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
                aria-label="Sidebar"
            >
                <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col flex-1 pt-1 pb-4 overflow-y-auto">
                        <div className="flex-1 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <ul className="pb-2 space-y-2">
                                <Sidebar className="w-full">
                                    <Sidebar.Items className="py-0 px-0">
                                        <Sidebar.ItemGroup className="py-0 px-0">
                                            <Link href={route('admin.index')}>
                                                <Sidebar.Item
                                                    icon={FaHome}
                                                    >
                                                    Accueil
                                                </Sidebar.Item>
                                            </Link>
                                            <div className="categorie-sidebar">
                                                <span className="title">Général</span>
                                                <Sidebar.Collapse
                                                        icon={BsFillBarChartFill}
                                                        open={true}
                                                        label="Paramètres"
                                                    >  
                                                    {auth.permissions.includes('admin.maintenance') && 
                                                        <Link href={route('admin.maintenance.index')} preserveState>
                                                            <Sidebar.Item>
                                                                Maintenance
                                                            </Sidebar.Item>
                                                        </Link>
                                                    }
                                                    {auth.permissions.includes('admin.users.list') && 
                                                        <Link href={ route('admin.users.index') } preserveState>
                                                            <Sidebar.Item>
                                                                Liste des joueurs
                                                            </Sidebar.Item>
                                                        </Link> 
                                                    }
                                                    <Link href={route('admin.roles.index')} preserveState>
                                                        <Sidebar.Item>
                                                            Rôles
                                                        </Sidebar.Item>
                                                    </Link> 
                                                    <Link href={route('admin.index')} preserveState>
                                                        <Sidebar.Item>
                                                            Features
                                                        </Sidebar.Item>
                                                    </Link> 
                                                    <Link href={route('admin.index')} preserveState>
                                                        <Sidebar.Item>
                                                            Réseaux Sociaux
                                                        </Sidebar.Item>
                                                    </Link>
                                                    <Link href={route('admin.index')} preserveState>
                                                        <Sidebar.Item>
                                                            CGU/CGV
                                                        </Sidebar.Item>
                                                    </Link>  
                                                </Sidebar.Collapse>
                                                <Link href={route('admin.index')} preserveState>
                                                    <Sidebar.Item icon={FiNavigation}>
                                                        Navigation
                                                    </Sidebar.Item>
                                                </Link>
                                            </div>
                                            
                                            <Sidebar.Collapse
                                                    icon={IoMdCart}
                                                    label="Boutique"
                                                    open={true}
                                                >
                                                <Link href={route('admin.index')} preserveState>
                                                    <Sidebar.Item>
                                                        Liste des articles
                                                    </Sidebar.Item>
                                                </Link> 
                                                <Link href={route('admin.index')} preserveState>
                                                    <Sidebar.Item>
                                                        Historique d'achats
                                                    </Sidebar.Item>
                                                </Link>    
                                            </Sidebar.Collapse>

                                            <Link href={route('admin.logs.index')} preserveState>
                                                <Sidebar.Item icon={BsFiles}>
                                                    Logs
                                                </Sidebar.Item>
                                            </Link>  
                                        </Sidebar.ItemGroup>
                                    </Sidebar.Items>
                                </Sidebar>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>

            <div
                className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
                id="sidebarBackdrop"
            ></div>
        </>
    );
}
