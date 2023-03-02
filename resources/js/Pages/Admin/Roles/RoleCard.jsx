import { Badge } from "flowbite-react";
import { Link, usePage } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";

export default function RoleCard({ authRoleHigh, role }) {
    let perms = usePage().props.auth.permissions;

    return (
        <div className="p-4 mb-4 justify-between flex items-center gap-10 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <Badge
                size="sm"
                style={{
                    background: role.barStyle.background,
                    color: role.barStyle.color,
                }}
                className="justify-center text-white"
            >
                <span className="text-xl">{role.name}</span>
            </Badge>
            <>
                {perms.includes("admin.role.edit") &&
                    authRoleHigh.position < role.position && (
                        <div className="whitespace-nowrap">
                            <Link
                                href={route("admin.roles.edit", {
                                    id: role.id,
                                })}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <FaEdit /> Editer le rôle
                            </Link>
                        </div>
                    )}
                {perms.includes("admin.role.edit") &&
                    role.level >= 5 &&
                    authRoleHigh.level >= 5 && (
                        <div className="whitespace-nowrap">
                            <Link
                                href={route("admin.roles.edit", {
                                    id: role.id,
                                })}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <FaEdit /> Editer le rôle
                            </Link>
                        </div>
                    )}
            </>
        </div>
    );
}
