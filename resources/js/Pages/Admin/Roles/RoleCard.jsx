import { Badge } from "flowbite-react";
import { Link, usePage } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";

export default function RoleCard({ authRoleHigh, role }) {
    let perms = usePage().props.auth.permissions;

    return (
        <div className="card justify-between">
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
                                className="btn tiny"
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
                                className="btn tiny"
                            >
                                <FaEdit /> Editer le rôle
                            </Link>
                        </div>
                    )}
            </>
        </div>
    );
}
