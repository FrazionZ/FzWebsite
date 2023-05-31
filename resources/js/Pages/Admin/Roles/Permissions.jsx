import { Alert, Card, Button } from "flowbite-react";
import { Checkbox } from "@mui/material";
import { useForm, usePage } from "@inertiajs/react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

export default function Permissions({ role, categoriePermission }) {

    const props = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        role_id: role.id,
        categoriePermission: categoriePermission,
        _token: props.csrf_token
    })

    console.log(data)

    async function submitPerms(e) {
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

    async function setCheckPerm(catIndex, permIndex, e) {
        let perms = data.categoriePermission
        perms[catIndex].perms[permIndex].hasCheck = e.target.checked
        setData('permissions', perms)
    }

    return (
        <div className="mt-4">
            <div className="col-span-2">
                <h3 className="text-2xl mb-2 mt-10">
                    Liste des permissions
                </h3>
                <form onSubmit={submitPerms} className="flex flex-col gap-4">
                    {data.categoriePermission !== null &&
                        <>
                            {data.categoriePermission.map((perm, catIndex) => {
                                return (
                                    <div className="card" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                        <h2 className="text-xl">{perm.name}</h2>
                                        <div className="grid grid-cols-3 gap-x-5 gap-y-3 w-full">
                                            {perm.perms.map((perm, permIndex) => {
                                                return (<>
                                                    <div className="flex">
                                                        <Checkbox
                                                            checked={perm.hasCheck}
                                                            onChange={(e) => {
                                                                setCheckPerm(catIndex, permIndex, e);
                                                            }}
                                                            
                                                        />
                                                        <div className="flex flex-col justify-center">
                                                            <span className="text-lg">
                                                                {perm.name}
                                                            </span>
                                                            <span className="text-sm text-[var(--text-inactive)]">
                                                                {perm.description}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </>)
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </>

                    }
                    <button className="btn w-fit" type="submit">Sauvegarder</button>
                </form>
            </div>
        </div>
    );
}
