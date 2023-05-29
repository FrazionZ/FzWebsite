import { Badge } from "flowbite-react";
import { Link, usePage } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi"
import { Tooltip } from "flowbite-react";

export default function RoleCard({ authRoleHigh, role }) {
    let perms = usePage().props.auth.permissions;
    let roleDefaultId = usePage().props.roleDefaultId;

    return (
        <div className="flex items-center gap-3">
            <div className="card flex-1 justify-between">
                <Badge
                    size="sm"
                    style={{
                        background: role.barStyle.background,
                        color: role.barStyle.color,
                    }}
                    className="justify-center "
                >
                    <span className="text-xl" style={{ color: role.barStyle.color }}>{role.name}</span>
                </Badge>
                <div className="flex gap-3">
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
                    {roleDefaultId !== role.id &&
                        <Link
                            href={route("admin.roles.defineDefault")}
                            method="post"
                            data={{ role_id: role.id }}
                            className="btn tiny h-full"
                        >
                            <HiCheckCircle /> Définir par défaut
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}
