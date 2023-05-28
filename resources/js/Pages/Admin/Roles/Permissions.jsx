import { Alert, Card, Checkbox, Button } from "flowbite-react";
import { useForm, usePage } from "@inertiajs/react";

export default function Permissions({ role, permissions }) {

    const props = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        role_id: role.id,
        permissions: permissions,
        _token: props.csrf_token
    })

    async function submitPerms(e){
        e.preventDefault()
        post(route('admin.roles.edit.perms'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (data) => {
            },
            onError: () => {
                
            },
        });
    }

    async function setCheckPerm(id, e){
        let perms = data.permissions
        perms[id].hasCheck = e.target.checked
        setData('permissions', perms)
    }

    return (
        <div className="mt-4">
            <div className="col-span-2">
                <div className="card" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <h3 className="text-xl font-semibold dark:text-white">
                        Liste des permissions
                    </h3>
                    <form onSubmit={submitPerms} className="flex flex-col gap-4">
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 xl:gap-4">
                            {data.permissions !== null &&
                                <>
                                    {data.permissions.map((perm, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="flex items-center gap-5 text-white"
                                            >
                                                <Checkbox
                                                    checked={perm.hasCheck}
                                                    onChange={(e) => {
                                                        setCheckPerm(index, e);
                                                    }}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-xl">
                                                        {perm.name}
                                                    </span>
                                                    <span className="text-sm">
                                                        {perm.description}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </>
                                
                            }
                        </ul>
                        <button className="btn w-fit" type="submit">Sauvegarder</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
