import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useState } from "react";
import { Draggable } from "react-drag-reorder";
import { FaPlus, FaEdit } from "react-icons/fa";
import { Badge, Button } from "flowbite-react";
moment.locale("fr");

export default function RolesIndex(props) {
    let title = "Rôles";

    const [roles, setRoles] = useState(props.roles);

    async function getChangedPos(currentPos, newPos) {
        console.log(currentPos, newPos);
    }

    console.log(roles)

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">
                    {title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:gap-10 dark:bg-gray-900">
                    <div className="col-span-1">
                        <Draggable>
                            {roles.map((role, index) => {
                                return (
                                    <div key={index}>
                                        <div className="p-4 mb-4 justify-between flex items-center gap-10 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                            <Badge size="sm" style={{ background: role.barStyle.background, color: role.barStyle.color }} className="justify-center text-white">
                                                <span className="text-xl">{role.name}</span>
                                            </Badge>
                                            <div className="whitespace-nowrap">
                                                <Link href={route('admin.roles.edit', {id: role.id})} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    <FaEdit /> Editer le rôle
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Draggable>
                        <div className="flex justify-end">
                            <Button>Sauvegarder</Button>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center gap-5 border-gray-800 border-l pl-6">
                        <h2 className="text-3xl text-white">Comment fonctionne les rôles ?</h2>
                        <h4 className="text-1xl text-white">L'ordre d'affichage des cartes forment la hiérarchie des rôles. Plus un rôle est haut, plus il a de pribilèges. (NB. Si vous avez la permission d'éditer les permissions et les rôles, vous ne pouvez pas éditer vos propres rôles ni les rôles au dessus des votres)</h4>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
