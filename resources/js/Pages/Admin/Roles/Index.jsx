import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useState } from "react";
import { Draggable } from "react-drag-reorder";
import { FaPlus, FaEdit } from "react-icons/fa";
import { Badge, Button } from "flowbite-react";
import RoleCard from "./RoleCard";
moment.locale("fr");

export default function RolesIndex(props) {
    let title = "Rôles";

    const [roles, setRoles] = useState(props.roles);

    const [adminRoles, setAdminRoles] = useState([]);

    let perms = props.auth.permissions;

    let arh = props.authRoleHigh;
    
    roles.map((role, index) => {
        if(role.level >= 5 || arh.position >= role.position){
            let aRole = adminRoles
            aRole.push(role)

            setAdminRoles(aRole)
            delete roles[index]
            setRoles(roles);
        }
    })

    async function getChangedPos(currentPos, newPos) {
        let rolesPrepare = roles;
        rolesPrepare = rolesPrepare.swap(newPos, currentPos);
        rolesPrepare[newPos].position = newPos;
        rolesPrepare[currentPos].position = currentPos;
        setRoles(rolesPrepare);
    }

    async function submitRoles(){
        router.post(route('admin.roles.swap'), {roles: roles, _token: props.csrf_token}, { 
            onSuccess: (data) => {
            }
        })
    }

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <div className="p-10">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-3">
                        {adminRoles.map((arole, index) => {
                            return (
                                <RoleCard key={index} authRoleHigh={arh} role={arole} />
                            )
                        })}
                        {perms.includes('admin.role.swap') == true &&  
                            <Draggable onPosChange={getChangedPos}>
                                {roles.map((role, index) => {
                                    if (role.level < 5) {
                                        return (
                                            <RoleCard key={index} authRoleHigh={arh} role={role} />
                                        );
                                    }
                                })}
                            </Draggable>
                        }
                        {perms.includes('admin.role.swap') == false &&  
                            <>
                                {roles.map((role, index) => {
                                    if (role.level < 5) {
                                        return (
                                            <RoleCard key={index} authRoleHigh={arh} role={role} />
                                        );
                                    }
                                })} 
                            </>
                        }
                        <div className="flex justify-end">
                            <button className="btn" onClick={submitRoles}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
